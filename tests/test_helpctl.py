from __future__ import annotations

import importlib.util
import tempfile
import unittest
from pathlib import Path


MODULE_PATH = Path(__file__).resolve().parents[1] / "scripts" / "helpctl.py"
SPEC = importlib.util.spec_from_file_location("helpctl", MODULE_PATH)
helpctl = importlib.util.module_from_spec(SPEC)
assert SPEC.loader
SPEC.loader.exec_module(helpctl)


class HelpCtlTests(unittest.TestCase):
    def test_article_url_normalization_and_mapping(self):
        url = helpctl.normalize_article_url("content/en/orders/invoice-vat.md")
        self.assertEqual(url, "https://help.playtronica.com/orders/invoice-vat/")
        self.assertTrue(helpctl.article_path(url).is_file())

    def test_duplicate_gap_adds_evidence_instead_of_duplicate(self):
        state = helpctl.empty_state()
        first, created = helpctl.upsert_gap(
            state,
            article_url="/orders/invoice-vat/",
            missing_answer="How to correct an issued invoice",
            source="freshdesk",
            ref="7917",
        )
        second, created_again = helpctl.upsert_gap(
            state,
            article_url="https://help.playtronica.com/orders/invoice-vat/",
            missing_answer="  how to CORRECT an issued invoice ",
            source="freshdesk",
            ref="8001",
        )
        self.assertTrue(created)
        self.assertFalse(created_again)
        self.assertEqual(first["id"], second["id"])
        self.assertEqual(second["occurrences"], 2)

    def test_private_state_round_trip_and_event_log(self):
        with tempfile.TemporaryDirectory() as tmp:
            state_dir = Path(tmp)
            state = helpctl.empty_state()
            item, _ = helpctl.upsert_gap(
                state,
                article_url="/orders/returns-refunds/",
                missing_answer="How to obtain an RMA reference",
                source="freshdesk",
                ref="7942",
            )
            helpctl.save_state(state_dir, state, {"action": "gap_added", "gap_id": item["id"]})
            loaded = helpctl.load_state(state_dir)
            self.assertEqual(loaded["gaps"][0]["id"], item["id"])
            self.assertIn(item["id"], (state_dir / "BACKLOG.md").read_text())
            self.assertIn("gap_added", (state_dir / "events.jsonl").read_text())

    def test_new_post_publish_evidence_reopens_but_reimport_does_not(self):
        state = helpctl.empty_state()
        item, _ = helpctl.upsert_gap(
            state,
            article_url="/orders/invoice-vat/",
            missing_answer="How to correct an issued invoice",
            source="freshdesk",
            ref="7917",
        )
        item["status"] = "published"
        helpctl.upsert_gap(
            state,
            article_url="/orders/invoice-vat/",
            missing_answer="How to correct an issued invoice",
            source="freshdesk",
            ref="7917",
        )
        self.assertEqual(item["status"], "published")
        helpctl.upsert_gap(
            state,
            article_url="/orders/invoice-vat/",
            missing_answer="How to correct an issued invoice",
            source="freshdesk",
            ref="8001",
        )
        self.assertEqual(item["status"], "open")
        self.assertEqual(item["occurrences"], 2)

    def test_find_returns_relevant_invoice_article(self):
        results = helpctl.rank_articles("correct billing details on company invoice", 5)
        urls = [item["url"] for item in results]
        self.assertIn("https://help.playtronica.com/orders/invoice-vat/", urls)

    def test_risk_routing(self):
        self.assertEqual(helpctl.risk_for("clinical adhesive disinfection"), "high")
        self.assertEqual(helpctl.risk_for("Chorus Pro public institution purchase"), "high")
        self.assertEqual(helpctl.risk_for("country shipping availability"), "medium")
        self.assertEqual(helpctl.risk_for("connect Ableton"), "normal")

    def test_hypothesis_inventory_matches_articles_after_rebuild(self):
        hypothesis_path = helpctl.REPO / "content" / "_data" / "hypotheses.json"
        hypotheses = helpctl.json.loads(hypothesis_path.read_text())
        actual = {helpctl.urlparse(r["url"]).path for r in helpctl.article_records()}
        logged = {p["url"] for p in hypotheses["pages"]}
        self.assertEqual(actual, logged)


if __name__ == "__main__":
    unittest.main()
