# VIVACITY 2026 - College Fest Booking Website 🎟️⚡

A clean, modern, and responsive website built for a college cultural and technical fest pass booking system. It is designed to be lightweight, simple, and self-contained with no complicated setup or build tools required.

---

## 🌟 Key Features

1. **Fest Hero Section & Live Countdown**:
   - Fest branding, dates, venue, prize pool, and key highlights.
   - Live countdown timer running down to the fest opening day (Nov 14, 2026).

2. **Categorized Events Showcase**:
   - Filter events by category: *All Events, Music & Pro-Night, Tech & Gaming, Dance & Drama, Arts & Lifestyle*.
   - Each event card displays venue, team size, prize pool, and a direct registration/booking link.

3. **3-Day Schedule & Itinerary**:
   - Interactive day-by-day tabs: *Day 1 (Ignition), Day 2 (Euphoria), Day 3 (Grand Finale)*.
   - Shows event timings, stage locations, and descriptions.

4. **Transparent Pass Selection (3 Tiers)**:
   - **Single Day Pass (₹199)**: Entry to 1 selected day + food stalls & daytime events.
   - **All-Access Fest Pass (₹499)**: Complete 3-day access + VIP arena for celebrity pro-night concerts.
   - **Team & Tech Combo (₹899)**: Full pass for team of up to 4 for Hackathons, Gaming LAN, or RoboWars.

5. **Interactive Booking Form**:
   - Attendee details: Name, Email, Phone, College Name, Roll No.
   - Quantity selector with dynamic real-time price calculation.
   - Promo discount system (Try code: `FEST10` for 10% off or `EARLYBIRD` for 15% off).

6. **Instant Digital E-Pass & QR Code Generation**:
   - Creates a realistic digital badge ticket with unique Booking ID (`#VIVA-xxxxx`).
   - Generates an inlined vector QR code for gate check-in scanning.
   - Saves tickets to browser `localStorage` so they persist even when the page is refreshed.
   - One-click print/save pass styling (`window.print()`).

7. **My Confirmed Tickets Dashboard**:
   - View, print, or cancel saved passes directly from the website.

8. **FAQs & Contact**:
   - Collapsible accordion for common queries (entry requirements, ID cards, accommodation).

---

## 🚀 How to Run the Website

Because this project uses vanilla HTML5, CSS3, and JavaScript, you can open and run it immediately:

1. **Directly in Browser**:
   - Double-click `index.html` to open it in Google Chrome, Microsoft Edge, Firefox, or Safari.
2. **Via VS Code / IDE Live Server**:
   - Right click `index.html` and choose **"Open with Live Server"**.

---

## 📁 File Structure

```text
portfolio_building/
├── index.html        # Main semantic markup with all fest sections & modals
├── styles.css        # Responsive styling, color variables, dark theme, animations
├── script.js         # Countdown, event filtering, booking logic, and QR pass generation
└── README.md         # Documentation & guide
```

