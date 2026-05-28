# Roman — set up `education.playtronica.com`

**Время:** ~15 минут. Полный runbook с пояснениями: `docs/EDUCATION-SUBDOMAIN-SETUP.md` (там и Option B на случай если что-то не пройдёт).

Ниже — самое короткое, что нужно сделать. Логически: подключить новое имя к существующему Pages проекту `help`, и переписывать путь так чтобы `/` на новом домене = `/education/` на старом.

---

## Шаг 1 — Custom domain в Pages (2 минуты)

1. Cloudflare → **Workers & Pages** → проект `help` → вкладка **Custom domains**.
2. **Set up a custom domain** → ввести `education.playtronica.com` → Continue.
3. Cloudflare сам создаст CNAME запись (зона `playtronica.com` уже на CF).
4. SSL выпустится за ~60 секунд. Проверить: `https://education.playtronica.com/` отдаёт **200** (пока что покажет home help-центра — это норма до Шага 2).

---

## Шаг 2 — Transform Rule (URL rewrite) — критично (5 минут)

Без этого правила `education.playtronica.com/` показывает help-центр. Правило молча переписывает путь так что `/pilot/` на новом домене = `/education/pilot/` в файлах.

1. Cloudflare → выбрать зону **`playtronica.com`** (не Pages) → **Rules** → **Transform Rules** → **URL Rewrite Rules** → **Create rule**.
2. **Rule name:** `education.playtronica.com — prepend /education path`
3. **When incoming requests match (custom filter expression):**
   ```
   (http.host eq "education.playtronica.com" and not starts_with(http.request.uri.path, "/education"))
   ```
4. **Then... Rewrite to... → Path → Dynamic:**
   ```
   concat("/education", http.request.uri.path)
   ```
5. Deploy. Подожди 30 секунд для пропагации.

---

## Шаг 3 — Проверь (3 минуты)

Из incognito браузера:

- [ ] `https://education.playtronica.com/` → education landing (hero, pricing, lessons)
- [ ] `https://education.playtronica.com/pilot/` → форма pilot application
- [ ] `https://education.playtronica.com/quote/` → форма institutional quote
- [ ] `https://education.playtronica.com/standards/` → таблица NCAS / UK MMC / NGSS / ISTE
- [ ] `https://education.playtronica.com/lesson-1-touch-as-conductor/` → Lesson 1
- [ ] `https://education.playtronica.com/playtronica-lesson-1.pdf` → PDF скачивается (без `/education/` в URL)
- [ ] `https://help.playtronica.com/` — старый help-центр **работает как раньше**, не поломан
- [ ] Никаких `/education/education/` дублей в URL

Если что-то из чек-листа упало — пиши в Slack, посмотрим вместе.

---

## Что добавить в env vars (1 минута)

Когда формы пойдут — нужны переменные на Cloudflare Pages (`Settings → Environment variables` для production):

| Имя | Значение | Кто даёт |
|---|---|---|
| `RESEND_API_KEY` | re_xxx... | Резенд (Андрей создал аккаунт) |
| `NOTIFY_TO` | manirko@playtronica.com | (опционально — fallback уже в коде) |

Без `RESEND_API_KEY` форма вернёт 500. Дефолт получатель — `manirko@playtronica.com`.

---

## Контакт

Вопросы — @Andrey в Slack или manirko@playtronica.com.
Полный runbook с обоснованиями — `docs/EDUCATION-SUBDOMAIN-SETUP.md` в репо `Playtronica/help`.
