TWO SHORES — Rajeev & Mana save-the-date website

Live links
  Main site:   https://likshman.github.io/rajeev-and-mana/
  Video page:  https://likshman.github.io/rajeev-and-mana/video/
  Japanese:    https://likshman.github.io/rajeev-and-mana/?lang=ja
  (Phones set to Japanese open in Japanese automatically.)

Hosting
  GitHub Pages, from the main branch of likshman/rajeev-and-mana.
  To update: upload changed files (Add file > Upload files) and commit.
  Changes go live in 1–3 minutes (check Deployments for the green tick).

Files
  index.html      the main page
  style.css       the look
  app.js          scrolling, music, countdown, language switch
  favicon.svg     browser-tab icon
  assets/         photos, music.mp3, og.jpg (link-preview image)
  video/
    index.html          video page: plays the save-the-date video, then
                        opens the main site 3 seconds after it ends
    save-the-date.mp4   video (H.264, plays on all phones and browsers)
    poster.jpg          still frame shown before the video loads
    share.jpg           link-preview image for the video page

Sharing
  Messaging apps and email can't open a link automatically from a video
  file, so there are two ways to share:
  1. Send the video page link (video/). It plays the video, then opens
     the site automatically.
  2. Attach Rajeev-and-Mana-Save-the-Date.mp4 (kept offline, not in
     this repo). It ends with a 4-second card and a QR code to the site
     ("Scan or screenshot for more details").
  For email, send both: the attachment plus the video page link.

Link previews (Messenger, Viber, LINE, WhatsApp)
  Preview images need full addresses. The video page already uses them.
  In the main index.html, og:image must read:
    <meta property="og:image"
      content="https://likshman.github.io/rajeev-and-mana/assets/og.jpg">
  WhatsApp caches previews, so test by sending the link to yourself
  before sending it to guests.

Video page notes
  Phones start videos muted. Guests tap "Tap for sound" to hear it.
  "Skip ›" (top right) goes straight to the main site.
  To change the 3-second delay, edit DELAY in video/index.html.

Optional custom domain (e.g. rajeevandmana.com)
  Buy it from any registrar, then in this repo go to Settings > Pages >
  Custom domain, and follow GitHub's DNS instructions.

Test on your own computer
  In this folder run:  python3 -m http.server
  then open http://localhost:8000 (or http://localhost:8000/video/)
