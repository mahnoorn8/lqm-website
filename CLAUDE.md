# LQM Mississauga Website

## Project Overview
This is a rebuild of lqmississauga.com — a volunteer-run organization that teaches Qur'anic Arabic in Mississauga, Ontario. The site is being rebuilt from scratch as a clean static HTML/CSS/JS site to replace an outdated WordPress installation.

## Tech Stack
- Plain HTML, CSS, JavaScript — no frameworks, no build tools
- One-pager architecture (index.html) with smooth scroll navigation
- Separate pages for each class registration form (e.g. /register/baku-25/index.html)
- Separate confirmation pages per registration (e.g. /register/baku-25/done/index.html)
- Hosted on Netlify (free tier), source on GitHub

## File Structure
```
lqm-website/
├── index.html              # Main one-pager (all sections)
├── css/
│   └── styles.css          # Global styles
├── js/
│   └── main.js             # Scroll behaviour, accordion logic
├── assets/
│   ├── images/             # Logo, hero image, etc.
│   └── fonts/              # Any local fonts if needed
├── register/
│   ├── baku-25/
│   │   ├── index.html      # Registration form for Baku 25
│   │   └── done/
│   │       └── index.html  # Confirmation page
│   └── baghdad-24/
│       ├── index.html
│       └── done/
│           └── index.html
└── CLAUDE.md
```

## Design Guidelines

### Colour Palette
- Primary red/crimson accent: #C0392B (used for CTAs, highlights, active states)
- Dark text: #1a1a1a
- Body text: #444444
- Light background: #f9f9f9
- White: #ffffff
- Border/divider: #e0e0e0

### Typography
- Headings: Georgia or a serif font (matches the Qur'anic/classical feel)
- Body: System sans-serif stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif
- Hero headline: Large serif, white, centered over hero image
- Section headings: Dark, centered, with subtle underline or spacing

### Layout
- Max content width: 1100px, centered
- Generous whitespace between sections
- Mobile-first, fully responsive

### Navigation
- Fixed top nav: Logo left, links right (About, Classes, Resources, Contact)
- All nav links scroll to their section on index.html (smooth scroll)
- A "View Classes" or "Register" CTA button in the nav (red, filled)
- Hamburger menu on mobile

### Sections (in order on index.html)
1. **Hero** — Full-width background image (books/study scene), large serif headline "Learn the Language of the Quran", centered "View Classes" button
2. **Current Classes** — Accordion list of active classes. Each row shows: Class name + schedule. On expand: class code, instructor, timing, prerequisite, start date, Register button (links to /register/[class-slug]/)
3. **Resources** — Accordion list. Top level: Madinah Book Resources, Quran Analysis Workbooks, Worksheets, Surat-ul-Kahf Vocabulary Practice. Madinah Book Resources expands to show Book 1, Book 2, Book 3 as sub-items (placeholder links for now)
4. **About LQM** — Two-column layout. Left: bold headline + 2-3 paragraphs about the organization. Right: placeholder image. Below: Mission card + Vision card side by side
5. **Contact** — Simple section with email address and a short contact form (name, email, message). Form submissions are placeholder for now.
6. **Footer** — Logo, copyright, "All rights reserved"

## Content

### Hero
Headline: "Learn the Language of the Quran"
CTA button: "View Classes" → scrolls to #classes

### About LQM
**Headline:** Dedicated to the Qur'an & Its Message

**Body:**
LQ Mississauga was established in 2010 by a group of volunteers dedicated to the learning and teaching of the Qur'anic Arabic Language — the language Allah chose for His final message, the Qur'an, and the language spoken by the Prophet (ﷺ) and his companions.

With gratitude, we offer free classes based on the world-renowned Madinah Arabic Books by Dr. V. Abdur Rahim, alongside extensive free student resources including notes, annotated solutions, worksheets, and verb practice sheets.

We are a strictly volunteer-run initiative, unaffiliated with any political or religious organization, and supported solely by our team's dedication. We expect no financial remuneration; our efforts are only for the sake of Allah (سبحانه وتعالى).

**Mission card:**
Title: Our Mission
Text: To help students learn and propagate the Qur'anic Arabic Language so they can understand Allah's final message — the Holy Qur'an — in its original language.

**Vision card:**
Title: Our Vision
Text: To regularly conduct multiple classes in parallel throughout the year, making Qur'anic Arabic an easily understood language for the next generations to come.

### Classes (current placeholder data)
- **Baku 25** | Level 1 – Online – Sundays 6:30–9:15 AM
  - Instructor: Javid Sheikh
  - Timing (EST): Sundays @ 6:30 AM – 9:15 AM
  - Prerequisite: Ability to read Quran
  - Started: Sept 14, 2025
  - Description: Begin your journey to understanding the Qur'an without translation. This course covers Madinah Book 1, establishing the essential foundations of Arabic grammar and sentence structure.
  - Register link: /register/baku-25/

- **Baghdad 24** | Level 1 – LQ101
  - Instructor: Javid Sheikh
  - Timing: Sundays @ 6:30–9:15 AM
  - Pre-req: Ability to read the Qur'an
  - Start Date: Sept 14, 2025
  - Register link: /register/baghdad-24/

- Placeholder class 3 (Level 1 – In Person Toronto)
- Placeholder class 4 (Level 1 – In Person Toronto)

### Resources (placeholder links — use # for all hrefs)
- Madinah Book Resources
  - Book 1 (placeholder)
  - Book 2 (placeholder)
  - Book 3 (placeholder)
- Quran Analysis Workbooks (placeholder)
- Worksheets (placeholder)
- Surat-ul-Kahf Vocabulary Practice (placeholder)

## Registration Form Pages
Each registration page (/register/[class-slug]/index.html) should include:
- Site header/nav (same as main site)
- Class name and details at the top (pulled from a data attribute or hardcoded per page)
- Form fields: Full Name, Email Address, Phone Number (optional), Age, Gender, How did you hear about us (dropdown), Any questions or comments (textarea)
- Submit button (red, full width on mobile)
- On submit: redirect to /register/[class-slug]/done/
- Form action: placeholder (#) for now — will be wired to Google Sheets API later

## Confirmation Pages
- Thank the registrant by name if possible (using URL params or sessionStorage)
- Show the class name they registered for
- Link back to home

## Behaviour & Interactions
- Smooth scroll for all anchor links
- Accordion: only one class open at a time (clicking another closes the current one)
- Resources accordion: independent of classes accordion
- Nav highlights the current section on scroll (active state)
- Register button in nav scrolls to #classes
- All external/unfinished links use href="#" with a TODO comment

## Placeholder Assets
- Hero image: use a placeholder (e.g. a dark overlay div with background-color: #2c2c2c) until real image is provided
- Logo: use text "LQM" styled in the nav until real logo SVG is provided
- All resource download links: href="#"

## Things NOT to build yet
- Blog section (exists on current site but deprioritized for now)
- Google Sheets form integration (placeholder only)
- Search functionality
- User accounts or login

## Notes
- Keep the code clean and well-commented so a volunteer developer can easily maintain it
- Avoid external dependencies where possible — no jQuery, no CSS frameworks
- If a font needs to be loaded, use Google Fonts with a single @import
- All placeholder links should have a comment: <!-- TODO: add real link -->
