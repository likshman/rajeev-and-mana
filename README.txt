# Two Shores — Rajeev & Mana

**Save the date · Sunday, April 11, 2027 · Dumaguete, Philippines**

🔗 **Live site:** https://likshman.github.io/rajeev-and-mana/
🔗 **Japanese:** https://likshman.github.io/rajeev-and-mana/?lang=ja

---

## 1. What this website is for

A save-the-date for our family and friends in the Philippines and Japan. It has one job:
**make guests excited to come and get them to book their flights to Dumaguete early.**

It is **not** the invitation. It deliberately shares only:

- our names, Rajeev & Mana
- the date and city: Sunday, April 11, 2027, Dumaguete, Philippines
- how we met, and the proposal in Okinawa on May 7, 2026
- the line *"More details will follow with the invitation."*

Venue, schedule, RSVP and other details come later with the formal invitation.

---

## 2. Content rules (read before editing)

| Rule | Why |
|---|---|
| Show only the facts listed above. No venue names, events, schedule, RSVP, budgets or guest numbers. | Those belong in the invitation; this repository is public. |
| Always spell dates out: **April 11, 2027** / **2027年4月11日**. Never `11.04.2027` or `04/11/2027`. | Day/month order differs between countries and causes confusion. |
| Use the approved English and Japanese copy exactly. Don't machine-translate. | Some guests, including Mana's mother, read Japanese only. |
| Every text change must be made in **both** languages. | Each guest sees only their chosen language. |

---

## 3. What guests experience

The site tells our story as a journey from Japan to Negros, in seven scenes:

| # | Scene | What's in it |
|---|---|---|
| 0 | **Gate** | Names, date, **English / 日本語** buttons. Choosing a language starts the music. |
| 1 | **Japan shore** | Hakone · Fuji, a ramen night, a mountain village, Ushiku Daibutsu, Tokyo Skytree |
| 2 | **The crossing** | Flight strip *RM 0411 · TYO → DGT*, how we met: In the sky, After duties, Maldives, Okinawa |
| 3 | **The proposal** | Okinawa, May 7, 2026. Four photos wipe in as you scroll; *"She said yes."* appears on the third |
| 4 | **Negros shore** | Capiz shell window, Albay · Mayon, Talisay · The Ruins |
| 5 | **The date** | "April 11, 2027", Sunday · Dumaguete, Philippines, and a live countdown |
| 6 | **Save it** | "Book your flight to Dumaguete", calendar buttons, signed Rajeev & Mana |

**Computer (wide screen):** the story moves sideways, Japan on the left to Negros on the right, as the guest scrolls normally. Photos react gently to the mouse. The dots on the route line at the bottom jump to each scene.
**Phone / narrow screen:** the same scenes stack vertically; photos drift slightly while scrolling.
**Both:** the background shifts from a cool Japan morning to a warm Negros afternoon. Sakura petals turn into pearly capiz discs. A small plane on the route line shows progress from 日本 Japan to ネグロス Negros.

### Language
- Chosen on the gate, and switchable any time with **EN / 日本語** at the top right.
- `?lang=ja` on the link opens it in Japanese. Phones set to Japanese open in Japanese automatically.
- The guest's last choice is remembered on their device.

### Music
- Starts only after the guest picks a language or starts scrolling. Browsers block sound before that.
- Three songs: a random one plays first; when it ends, a different random one follows.
- The volume rises gently as the story goes on. **Mute** and the **volume slider** are always at the top right.

### Add to Calendar
- **iCloud** opens Apple Calendar on iPhone, iPad and Mac. On Windows or Android it downloads a calendar file.
- **Google, Outlook, Office 365, Yahoo** each open that calendar with the event filled in.
- The event is all day on April 11, 2027 in Dumaguete, and its wording follows the guest's language.

### Countdown
Counts down to **April 11, 2027, 00:00 Philippine time (UTC+8)** and stops at zero.

---

## 4. Sharing the link

- Send **https://likshman.github.io/rajeev-and-mana/** to everyone.
- For Japanese guests, send **https://likshman.github.io/rajeev-and-mana/?lang=ja**
- Messenger, Viber, LINE and WhatsApp show a preview photo (`assets/og.jpg`). After an update, apps may keep showing the old preview for a while.
- Suggest guests open it **with sound on**. Opening it in Safari or Chrome works best, rather than inside the chat app.

---

## 5. Files

```
index.html        the page: all text (EN + JA), photos, captions, buttons
style.css         the look: colours, fonts, layout for computer and phone
app.js            behaviour: scrolling, music, countdown, language, calendar
favicon.svg       browser-tab icon
README.md         this guide
assets/
  01-…50-*.jpg              story photos
  og.jpg                    link-preview image
  music.mp3                 background song 1
  bgm-summer.mp3            background song 2
  bgm-one-summers-day.mp3   background song 3
  save-the-date-en.ics      calendar event (English)
  save-the-date-ja.ics      calendar event (Japanese)
```

---

## 6. Updating the live site

Hosting is **GitHub Pages**, from branch **main**, folder **/ (root)**. Settings → Pages shows the status.

1. Make the change in your copy of the files, or ask Claude for updated files.
2. In this repository, click **Add file → Upload files**. For anything in `assets/`, open that folder first.
3. Drag in the changed files. A file with the same name replaces the old one. Click **Commit changes**.
4. Wait 1–2 minutes. The **Actions** tab shows a green tick when the update is live.
5. Reload the site with **Ctrl+Shift+R** on a computer, or open it in a private tab on a phone.

### Common edits

| Change | Where |
|---|---|
| **Replace a photo** | Upload the new photo under the **same file name** in `assets/`. Keep it about 1600 px on the long side so it loads fast. |
| **Text or a caption** | `index.html`. Every text appears **twice**, once in the computer layout and once in the phone layout, and in **both languages** (`class="en"` and `class="ja"`). Change all copies. |
| **Music** | Add the mp3 to `assets/` and list it in `TRACKS` near the top of the music section in `app.js`. |
| **Calendar wording** | `buildCalendarLinks()` in `app.js`, plus the two `.ics` files in `assets/`. |
| **Countdown target** | `TARGET` in `app.js` (set in UTC; midnight in the Philippines = 16:00 UTC the day before). |
| **Adding or removing a photo on the computer layout** | Photos are placed by position inside each scene, and the scene widths and jump points (`X3`, `X4`, `MAXTX`, `TOT`, `J` in `app.js`) depend on them. Ask Claude to adjust these together. |

The layout switches from phone to computer at **900 px wide and 560 px tall** (`style.css` and `app.js`).

---

## 7. Privacy and good to know

- This repository is **public**. Anyone with the link can see the photos and files here. Don't upload anything you wouldn't put on the website itself.
- The background songs are commercial recordings. They're fine for a small private site, but remove them if anyone ever asks.
- When the formal invitation goes out, consider adding a line or link here. The site itself should stay a save-the-date.
- After the wedding, the site can stay up as a keepsake. To take it offline: Settings → Pages → unpublish, or make the repository private.

---

## 8. Troubleshooting

| Problem | Fix |
|---|---|
| Still seeing the old version | Wait 2 minutes and check **Actions**, then hard-reload with Ctrl+Shift+R or use a private tab. |
| No music | Tap or scroll once; check that the phone isn't on silent and that **Mute** isn't on. |
| iCloud button does nothing inside Messenger/LINE | Open the link in Safari, then tap **iCloud** again. |
| A photo is missing | The file name in `assets/` must match the name in `index.html` exactly, including capitals. |
| Wrong language on open | Tap **EN / 日本語** at the top right; the choice is remembered. |

---

*Rajeev & Mana · 2027年4月11日 · Dumaguete, Philippines*
