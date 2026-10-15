TWO SHORES — Rajeev & Mana save-the-date website

Files
  index.html   the page
  style.css    the look
  app.js       scrolling, music, countdown, language switch
  favicon.svg  browser-tab icon
  assets/      photos, music.mp3, og.jpg (link-preview image)

Put it online (free, about 5 minutes) — Netlify
  1. Go to https://app.netlify.com/drop and sign up (free).
  2. Unzip this folder, then drag the whole "two-shores-site" folder onto the page.
  3. Netlify gives you a link such as https://something-random.netlify.app
  4. Site configuration > Change site name -> e.g. rajeev-and-mana
     -> your link becomes https://rajeev-and-mana.netlify.app
  To update later: Deploys > drag the folder in again.

Link previews (Messenger, Viber, LINE, WhatsApp)
  After you know your final link, open index.html in a text editor and change
    <meta property="og:image" content="assets/og.jpg">
  to the full address, e.g.
    <meta property="og:image" content="https://rajeev-and-mana.netlify.app/assets/og.jpg">
  then upload again. Without this, some apps show no preview photo.

Sending it to Japanese guests
  Add ?lang=ja to the link to open it in Japanese:
    https://rajeev-and-mana.netlify.app/?lang=ja
  (Phones set to Japanese open in Japanese automatically.)

Optional custom domain (e.g. rajeevandmana.com)
  Buy it from any registrar, then in Netlify: Domain management > Add a domain,
  and follow the DNS steps shown there.

Test on your own computer
  Double-clicking index.html mostly works, but music and fonts behave best
  when served. In this folder run:  python3 -m http.server  and open
  http://localhost:8000
