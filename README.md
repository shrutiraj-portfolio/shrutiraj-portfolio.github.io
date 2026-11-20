# Shruti Raj — Modern Personal Portfolio Website

A clean, modern, responsive single-page portfolio website built for **Shruti Raj**, an MCA graduate specializing in Quality Assurance & Software Testing, with a rich background in classical Bharatanatyam dance.

Designed and engineered with strict static web standards: **pure HTML5, CSS3, and vanilla JavaScript (ES6+)** — zero frameworks, zero build tools, and no npm dependencies. Opens directly in any browser and is immediately hostable on GitHub Pages, Netlify, Vercel, or any static web host.

---

## 🚀 Features

- **Design & Theme**:
  - Deep Navy (`#1E3A8A`) and Soft Blue (`#3B82F6`) palette with gold Bharatanatyam accents.
  - Light and Dark mode toggle with persistent state saved in `localStorage` and automatic OS color scheme detection (`prefers-color-scheme`).
  - Sticky glassmorphism navigation bar with blur effect and scroll shadow.
  - Active section link highlighting as you scroll.
  - Fully responsive mobile drawer navigation with animated hamburger button.
- **Hero Section**:
  - Live "Open to opportunities" badge with pulsing beacon.
  - Circular profile photo with gradient ring, glow effect, and floating context badges.
  - Dynamic typing effect cycling through: *"QA Engineer | MCA Graduate | Software Testing Specialist | Bharatanatyam Artist"*.
  - Fast-action buttons: "Download CV" and "Contact Me".
  - Animated statistics counter strip (Distinction CGPA 81.3%, 500+ Test Cases, 10+ Years Dance, 100% Quality).
- **Core Portfolio Sections**:
  - **About Me**: Official profile narrative with key strength pillars (Meticulous Testing, Agile Collaboration, Analytical Thinking, Global Mindset) and quick facts sidebar.
  - **Experience (Vertical Timeline)**: Detailed internship roles at *Svaapta It-Ally Solutions Pvt Ltd* (QA Intern) and *Ballu's Hair Expert* (Salon Manager Intern) with responsibilities, achievements, and tech tags.
  - **Skills & Competencies**:
    - Animated progress bars for Testing & QA proficiencies (Manual Testing, Functional, Regression, Smoke Testing, Test Case Execution, Defect Lifecycle).
    - Interactive skill chips for Professional & Leadership skills.
  - **Academic Projects**: High-impact cards for *Complaint Portal for IT Company*, *Workforce Attendance Management System*, and *Restaurant Management System*, featuring custom dashboard illustrations, semester badges, feature highlights, and GitHub links.
  - **Education**: Milestone cards for MCA (SVIT Vasad, 81.3% CGPA Distinction), BCA (70%), Class XII, and Class X.
  - **Achievements & Bharatanatyam**:
    - Dedicated cultural showcase highlighting training under Guru Shivkumar Pillai since age 11, competition wins, and group choreography leadership.
    - Responsive 4-card photo gallery with an **interactive vanilla JavaScript Lightbox modal** (keyboard navigation with `ArrowLeft`, `ArrowRight`, `Esc`, click outside to dismiss, image counter, and captions).
  - **Contact Section**:
    - Direct contact cards (email with one-click copy button, phone/WhatsApp link, location, and social links).
    - Prominent "Send Me an Email" direct mailto action button.
  - **Footer & Extras**:
    - Smooth scroll back-to-top floating button.
    - Full keyboard accessibility, `:focus-visible` states, and `prefers-reduced-motion` compliance.

---

## 📂 File Structure

```text
S_CV/
├── index.html                     # Main semantic single-page markup
├── css/
│   └── style.css                  # Modern CSS3 with CSS variables & responsive rules
├── js/
│   └── script.js                  # Vanilla JavaScript interaction engine
├── assets/
│   ├── profile.jpg                # Shruti Raj profile photo (centered square crop)
│   ├── cv/
│   │   └── Shruti-Raj-CV.pdf      # Downloadable PDF curriculum vitae
│   ├── icons/
│   │   └── favicon.svg            # Custom SVG monogram favicon
│   └── images/
│       ├── project-complaint.svg  # Complaint Portal dashboard illustration
│       ├── project-attendance.svg # Attendance system dashboard illustration
│       ├── project-restaurant.svg # Restaurant POS system dashboard illustration
│       ├── bharatanatyam-1.jpg    # Classical Solo Recital & Nataraja pose photo
│       ├── bharatanatyam-2.jpg    # Aramandi & Mudra precision photo
│       ├── bharatanatyam-3.jpg    # Abhinaya & expressive storytelling photo
│       └── bharatanatyam-4.jpg    # Cultural competition trophy & honor photo
└── README.md                      # Documentation & deployment guide
```

---

## 💻 How to Preview Locally

No build tools or installation needed! Simply:

1. Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Mozilla Firefox, or Safari.
2. Alternatively, if using VS Code, right-click `index.html` and select **"Open with Live Server"**.
3. Or run a simple Python local server from the terminal:
   ```bash
   python -m http.server 8000
   ```
   Then open `http://localhost:8000` in your web browser.

---

## ✏️ How to Customize & Update Content

### 1. Replacing Profile Photo
- Place your new portrait photo in `assets/profile.jpg`.
- For best results, use a square image (e.g. `500x500px` or `800x800px`) with your face centered.
- The CSS handles circular masking, border gradients, and responsive scaling automatically.

### 2. Updating Your CV / Resume
- Place your updated resume file in `assets/cv/Shruti-Raj-CV.pdf`.
- If you use a different filename, update the `href` in `index.html`:
  ```html
  <a href="assets/cv/Your-New-CV.pdf" download="Your-New-CV.pdf" class="btn btn-primary">
  ```

### 3. Replacing Gallery Images
- To use your actual Bharatanatyam photos, place your images in `assets/images/` (e.g. `dance-1.jpg`, `dance-2.jpg`, etc.).
- Update the `src` attributes in the `#bharatanatyam` section of `index.html` as well as the `galleryData` array in `js/script.js` (around line 250):
  ```javascript
  const galleryData = [
    {
      src: 'assets/images/your-photo-1.jpg',
      title: 'Solo Recital at Cultural Fest',
      desc: 'Performing varnam under Guru Shivkumar Pillai'
    },
    // ...
  ];
  ```

### 4. Setting up the Working Contact Form (Formspree)
The contact form is pre-configured for **[Formspree](https://formspree.io/)** (free static form service):
1. Create a free account at [formspree.io](https://formspree.io/).
2. Create a new form and copy your form ID (e.g. `f/mzbnwqkd`).
3. In `index.html`, replace the form's `action` URL:
   ```html
   <form id="contact-form" action="https://formspree.io/f/YOUR_FORM_ID" method="POST">
   ```
4. In `js/script.js`, verify the endpoint fallback around line 395 matches your Formspree URL.
5. All submissions will be sent directly to `rajshruti.813@gmail.com` with spam filtering and notification emails.

### 5. Connecting Your Real Social Profiles
Search for the placeholder links in `index.html` and replace them with your actual profiles:
- LinkedIn: Replace `https://linkedin.com/in/shruti-raj-placeholder` with your profile URL.
- GitHub: Replace `https://github.com/shruti-raj-placeholder` with your GitHub username.

---

## 🌐 Free Hosting & Deployment

### Option A: GitHub Pages
1. Push this folder to a GitHub repository (e.g., `github.com/your-username/portfolio`).
2. Go to **Settings** > **Pages** in your repository.
3. Under **Branch**, select `main` (or `master`) and folder `/ (root)`.
4. Click **Save**. Your website will be live in 1–2 minutes at `https://your-username.github.io/portfolio/`.

### Option B: Netlify (Drag & Drop)
1. Go to [netlify.com](https://www.netlify.com/) and sign in.
2. Go to the **Sites** dashboard.
3. Drag and drop the `S_CV` folder directly onto the Netlify dashboard.
4. Your site will instantly be deployed with a live HTTPS URL (e.g., `https://shruti-raj.netlify.app`).

### Option C: Vercel
1. Go to [vercel.com](https://vercel.com/) and import the Git repository.
2. Leave build command empty and output directory as `.`.
3. Click **Deploy**.

---

## ♿ Accessibility & Quality Standards

- **Semantic HTML5**: Native `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<figure>`, `<footer>`.
- **Keyboard Friendly**: Tab order preserved, interactive elements have visible `:focus-visible` indicators, Lightbox supports `Esc`, `ArrowLeft`, and `ArrowRight`.
- **Color Contrast**: Complies with WCAG 2.1 AA standards in both Light and Dark themes.
- **Prefers Reduced Motion**: Animations automatically scale down or disable for users with vestibular sensitivities or reduced-motion OS settings.
- **Fast Performance**: Pure static delivery without bloated JavaScript bundles, fast initial render, zero render-blocking third-party scripts.

---

## 📄 License & Credits
- **Owner**: Shruti Raj
- **Copyright**: © 2026 Shruti Raj. All rights reserved.
