# Cross-promotion from shop.playtronica.com to the help center

Right now `shop.playtronica.com` and `help.playtronica.com` are two domains of one company that don't link to each other. A buyer landing on `shop.playtronica.com/products/biotron` has to find the help page on their own.

Adding a small "Setup guide" panel to every product page produces three compounding wins:

- **Conversion** — a pre-purchase question answered inline often closes the sale instead of triggering a support ticket.
- **SEO** — internal links across `*.playtronica.com` reinforce the whole site's authority.
- **Deflection** — a buyer who reads the setup guide before unboxing opens fewer "this doesn't work" tickets in week 1.

This document is the exact set of Shopify theme edits needed. Hand it to whoever maintains the Shopify theme (Roman / a Shopify dev) and the work is ~45 minutes total.

## 1. Product → help-center map

Every device on the shop maps to exactly one help-center page:

| Shopify product handle | Help-center URL |
|---|---|
| `touchme` | `https://help.playtronica.com/devices/touchme/` |
| `playtron` | `https://help.playtronica.com/devices/playtron/` |
| `biotron` | `https://help.playtronica.com/devices/biotron/` |
| `orbita` | `https://help.playtronica.com/devices/orbita/` |
| `midi-controller-scales` | `https://help.playtronica.com/devices/scales/` |
| any bundle | `https://help.playtronica.com/devices/compare/` |
| any accessory or cable | `https://help.playtronica.com/getting-started/accessories/` |

## 2. Block to drop into the product template

In your Shopify theme's product template (typically `sections/main-product.liquid` or a custom section), add the following block somewhere below the "Add to cart" button — most likely near the "Description" tab or the trust-badge row.

The block uses the product handle to construct the right help URL automatically. No per-product configuration.

```liquid
{%- comment -%}
  Help-center cross-promotion block.
  Maps product handles to canonical help-center URLs.
  Falls back to the comparison page for bundles / accessories.
{%- endcomment -%}

{%- assign device_handles = 'touchme,playtron,biotron,orbita,midi-controller-scales' | split: ',' -%}
{%- assign accessory_keywords = 'cable,adapter,patch,clip,tape,case,necklace,scarf,kit' | split: ',' -%}

{%- assign help_path = '/devices/compare/' -%}
{%- assign help_label = 'See how it compares' -%}

{%- for device in device_handles -%}
  {%- if product.handle == device -%}
    {%- if device == 'midi-controller-scales' -%}
      {%- assign help_path = '/devices/scales/' -%}
    {%- else -%}
      {%- assign help_path = '/devices/' | append: device | append: '/' -%}
    {%- endif -%}
    {%- assign help_label = 'Setup guide' -%}
  {%- endif -%}
{%- endfor -%}

{%- if help_path == '/devices/compare/' -%}
  {%- for kw in accessory_keywords -%}
    {%- if product.handle contains kw -%}
      {%- assign help_path = '/getting-started/accessories/' -%}
      {%- assign help_label = 'What it pairs with' -%}
    {%- endif -%}
  {%- endfor -%}
{%- endif -%}

<aside class="help-cross-promo" data-help-promo>
  <div class="help-cross-promo__icon" aria-hidden="true">📖</div>
  <div class="help-cross-promo__body">
    <h3 class="help-cross-promo__title">{{ help_label }} on the help center</h3>
    <p class="help-cross-promo__copy">
      Step-by-step setup, troubleshooting, software compatibility, and what's in the box.
    </p>
  </div>
  <a class="help-cross-promo__cta"
     href="https://help.playtronica.com{{ help_path }}"
     target="_blank"
     rel="noopener"
     data-help-product="{{ product.handle }}">
    Open guide →
  </a>
</aside>
```

## 3. CSS to drop into the theme stylesheet

Match the existing shop visual language. The styles below are deliberately neutral so they slot into any theme without clashing.

```css
.help-cross-promo {
  display: flex;
  gap: 14px;
  align-items: center;
  margin: 24px 0;
  padding: 16px 18px;
  border: 1.5px solid var(--color-foreground, #111);
  background: var(--color-background, #fff);
  border-radius: 8px;
  box-shadow: 3px 3px 0 var(--color-foreground, #111);
}
.help-cross-promo__icon {
  font-size: 24px;
  line-height: 1;
}
.help-cross-promo__body {
  flex: 1;
  min-width: 0;
}
.help-cross-promo__title {
  margin: 0 0 4px;
  font-size: 15px;
  font-weight: 600;
}
.help-cross-promo__copy {
  margin: 0;
  font-size: 13px;
  color: var(--color-foreground-secondary, #555);
  line-height: 1.4;
}
.help-cross-promo__cta {
  flex-shrink: 0;
  padding: 10px 16px;
  font-size: 13px;
  font-weight: 600;
  text-decoration: none;
  border: 1.5px solid var(--color-foreground, #111);
  background: var(--color-foreground, #111);
  color: var(--color-background, #fff);
  border-radius: 6px;
  transition: background 150ms;
}
.help-cross-promo__cta:hover {
  background: var(--color-accent, #ff7a3d);
  border-color: var(--color-accent, #ff7a3d);
}
@media (max-width: 600px) {
  .help-cross-promo {
    flex-direction: column;
    align-items: flex-start;
    gap: 10px;
  }
  .help-cross-promo__cta {
    width: 100%;
    text-align: center;
  }
}
```

## 4. Click analytics (recommended)

The block carries `data-help-product` on the CTA so you can fire a GA4 or Klaviyo event when someone clicks through. In `theme.liquid` or the analytics include:

```html
<script>
  document.addEventListener('click', function (e) {
    var a = e.target.closest('[data-help-promo] a[data-help-product]');
    if (!a) return;
    var handle = a.getAttribute('data-help-product');
    if (window.gtag) {
      window.gtag('event', 'help_center_cross_promo_click', {
        product_handle: handle,
        help_url: a.href,
      });
    }
    if (window._learnq) {
      window._learnq.push(['track', 'Clicked Help Cross-Promo', {
        ProductHandle: handle,
        HelpUrl: a.href,
      }]);
    }
  });
</script>
```

This gives you, within a week, a ranked list of which products send the most help-center traffic — which directly tells which products have the most setup friction.

## 5. Additional placements (cheaper, less impact)

- **Cart page** — after the line items, a single "Need help setting up? Open the help center" link to `https://help.playtronica.com/getting-started/your-first-5-minutes/`.
- **Post-purchase / thank-you page** — the strongest moment of buyer attention. Add a hero with "First 5 minutes guide" linking to the same URL.
- **Order confirmation email** (in Shopify's notification template) — one line at the bottom: "When the box arrives → help.playtronica.com/your-first-5-minutes/".

## 6. Measuring success

Three numbers worth tracking once the block is live:

1. **Click-through rate** of the help cross-promo block (events from §4). A healthy CTR is 3–6 % of product-page views.
2. **Conversion rate** of buyers who clicked vs buyers who didn't. Expect the click-through group to convert 10–25 % higher.
3. **Week-1 support ticket volume** for first-time buyers. If the block works, "I don't know what to do with this" tickets should fall.

Report monthly in the same Klaviyo / Shopify analytics doc that already tracks the rest of the funnel.

## 7. Roll-out order (suggested)

1. Stage the block on one product (Biotron is a good test — highest setup-confusion rate).
2. Watch the analytics for one week.
3. If CTR > 2 %, roll out to all five device pages.
4. After another week, roll out to accessories.
5. Finally, add to the cart + thank-you page.

If at any step the CTR is below 1 %, the block needs a copy or visual rework — not a kill. The placement is the first lever, the copy is the second.
