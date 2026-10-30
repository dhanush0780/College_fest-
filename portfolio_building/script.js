/**
 * VIVACITY 2026 - College Fest Booking System
 * Dynamic logic for events filtering, schedule tabs, booking calculation,
 * promo codes, digital ticket generation, and localStorage persistence.
 */

// --- 1. Events Database ---
const FEST_EVENTS = [
  {
    id: "evt-1",
    title: "Battle of the Bands (RhythmRiot)",
    category: "music",
    icon: "🎸",
    prize: "₹50,000",
    date: "Day 1 • 5:00 PM",
    venue: "Main Stage Arena",
    teamSize: "4-8 Members",
    desc: "Unleash rock, metal, and fusion music against top university bands from across the nation.",
    recommendedPass: "All-Access Fest Pass"
  },
  {
    id: "evt-2",
    title: "HackVibe 2026 (24-Hr Hackathon)",
    category: "tech",
    icon: "💻",
    prize: "₹75,000",
    date: "Day 1-2 • 10:00 AM",
    venue: "Tech Innovation Hub",
    teamSize: "2-4 Members",
    desc: "Build AI agents, web apps, or IoT hardware solutions in a grueling 24-hour sprint. Mentors & snacks provided.",
    recommendedPass: "Team / Tech Pass (Up to 4)"
  },
  {
    id: "evt-3",
    title: "StepUp: Street Dance Face-Off",
    category: "dance",
    icon: "🔥",
    prize: "₹40,000",
    date: "Day 2 • 3:30 PM",
    venue: "Open Amphitheatre",
    teamSize: "Solo & Crew",
    desc: "Popping, locking, hip-hop, and krump battles judged by celebrity international choreographers.",
    recommendedPass: "Single Day Pass"
  },
  {
    id: "evt-4",
    title: "Valorant & BGMI Esports LAN",
    category: "tech",
    icon: "🎮",
    prize: "₹45,000",
    date: "Day 2 • 11:00 AM",
    venue: "Gaming Arena / Lab 3",
    teamSize: "Squad (4 + 1 Sub)",
    desc: "Compete on low-latency LAN servers with casters, live streaming, and high-stakes tournament brackets.",
    recommendedPass: "Team / Tech Pass (Up to 4)"
  },
  {
    id: "evt-5",
    title: "Nukkad Natak (Street Play)",
    category: "dance",
    icon: "📢",
    prize: "₹30,000",
    date: "Day 1 • 2:00 PM",
    venue: "Central Plaza Circle",
    teamSize: "10-20 Members",
    desc: "Voice socio-cultural issues with raw energy, live percussion, and powerful theatrics on the campus circle.",
    recommendedPass: "Single Day Pass"
  },
  {
    id: "evt-6",
    title: "Star Celebrity Pro-Night (DJ Zaeden & Band)",
    category: "music",
    icon: "🎧",
    prize: "Headliner Show",
    date: "Day 3 • 7:00 PM",
    venue: "Grand Football Ground",
    teamSize: "All Attendees",
    desc: "The grand finale concert featuring top chart-topping electronic DJ & live indie band with laser stage setup.",
    recommendedPass: "All-Access Fest Pass"
  },
  {
    id: "evt-7",
    title: "RoboWars: 15kg & 30kg Combat",
    category: "tech",
    icon: "🤖",
    prize: "₹60,000",
    date: "Day 3 • 1:00 PM",
    venue: "Armored Combat Pit",
    teamSize: "2-5 Members",
    desc: "High-voltage metal clashing arena. Spinners, flippers, and wedge bots fight for survival.",
    recommendedPass: "Team / Tech Pass (Up to 4)"
  },
  {
    id: "evt-8",
    title: "Ha-Ha-Land: Standup Comedy Night",
    category: "arts",
    icon: "🎙️",
    prize: "Special Showcase",
    date: "Day 2 • 6:30 PM",
    venue: "Auditorium Hall A",
    teamSize: "Solo",
    desc: "A laugh riot featuring internet sensations and top campus comics followed by an open-mic shootout.",
    recommendedPass: "Single Day Pass"
  },
  {
    id: "evt-9",
    title: "Vogue: Inter-College Fashion Show",
    category: "arts",
    icon: "✨",
    prize: "₹50,000",
    date: "Day 3 • 4:00 PM",
    venue: "Main Stage Arena",
    teamSize: "8-16 Members",
    desc: "Themes exploring Cyberpunk, Traditional Heritage, and Eco-Couture on the grand ramp.",
    recommendedPass: "All-Access Fest Pass"
  }
];

// --- 2. Schedule Timeline Database ---
const FEST_SCHEDULE = {
  day1: [
    { time: "09:30 AM", title: "Inaugural Ceremony & Lighting of Lamp", venue: "Central Auditorium", cat: "Ceremony" },
    { time: "11:00 AM", title: "HackVibe 2026: 24-Hour Hackathon Kickoff", venue: "Tech Innovation Hub", cat: "Tech" },
    { time: "02:00 PM", title: "Nukkad Natak (Street Play Finals)", venue: "Central Plaza Circle", cat: "Cultural" },
    { time: "05:00 PM", title: "Battle of the Bands: Rock Prelims & Finals", venue: "Main Stage Arena", cat: "Music" },
    { time: "08:30 PM", title: "Campus Carnival & Open DJ Acoustic Jam", venue: "Food Street Lawn", cat: "Entertainment" }
  ],
  day2: [
    { time: "10:30 AM", title: "Valorant & BGMI Esports LAN Tournaments", venue: "Gaming Hub / Lab 3", cat: "Gaming" },
    { time: "12:00 PM", title: "HackVibe Final Demo Pitch & Judging", venue: "Tech Hub Auditorium", cat: "Tech" },
    { time: "03:30 PM", title: "StepUp: Street Dance Face-Off Solo & Crew", venue: "Open Amphitheatre", cat: "Dance" },
    { time: "06:30 PM", title: "Stand-Up Comedy Open Mic & Headliner", venue: "Auditorium Hall A", cat: "Comedy" },
    { time: "08:30 PM", title: "Neon Glow EDM Night with DJ Ray", venue: "Main Arena Ground", cat: "Pro-Night" }
  ],
  day3: [
    { time: "10:00 AM", title: "RoboWars: Combat Robotics Clash", venue: "Armored Combat Pit", cat: "Robotics" },
    { time: "01:30 PM", title: "Literary Debate & Quiz Bowl Championship", venue: "Conference Hall B", cat: "Literary" },
    { time: "04:00 PM", title: "Vogue: Inter-College Fashion Showcase", venue: "Main Stage Arena", cat: "Fashion" },
    { time: "06:00 PM", title: "Grand Awards Ceremony & Cash Prize Distribution", venue: "Main Stage Arena", cat: "Awards" },
    { time: "07:30 PM", title: "Grand Celebrity Pro-Night (Live Concert)", venue: "Football Grounds", cat: "Star Night" }
  ]
};

// --- 3. State Management ---
const TICKET_STORAGE_KEY = "vivacity_2026_tickets";
let currentTicketPrice = 499;
let appliedDiscountPercent = 0;

// Valid Promo Codes
const VALID_PROMOS = {
  "FEST10": 10,
  "CAMPUS10": 10,
  "EARLYBIRD": 15,
  "VIP20": 20
};

// Pass Price Map
const PASS_PRICES = {
  "Single Day Pass": 199,
  "All-Access Fest Pass": 499,
  "Team / Tech Pass (Up to 4)": 899
};

// --- 4. Initialization ---
document.addEventListener("DOMContentLoaded", () => {
  initCountdown();
  renderEvents("all");
  renderSchedule("day1");
  setupEventListeners();
  loadSavedTickets();
});

// --- 5. Countdown Timer ---
function initCountdown() {
  // Set target date: November 14, 2026
  const targetDate = new Date("2026-11-14T09:00:00").getTime();

  function update() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      document.getElementById("countdown").innerHTML = "<div class='countdown-box'><span class='number'>FEST IS LIVE!</span></div>";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    const pad = (n) => String(n).padStart(2, "0");
    const dElem = document.getElementById("days");
    const hElem = document.getElementById("hours");
    const mElem = document.getElementById("minutes");
    const sElem = document.getElementById("seconds");

    if (dElem) dElem.textContent = pad(days);
    if (hElem) hElem.textContent = pad(hours);
    if (mElem) mElem.textContent = pad(minutes);
    if (sElem) sElem.textContent = pad(seconds);
  }

  update();
  setInterval(update, 1000);
}

// --- 6. Render Events ---
function renderEvents(category) {
  const container = document.getElementById("eventsGrid");
  if (!container) return;

  const filtered = category === "all" 
    ? FEST_EVENTS 
    : FEST_EVENTS.filter(evt => evt.category === category);

  container.innerHTML = filtered.map(evt => `
    <div class="event-card">
      <div class="event-banner">
        <span>${evt.icon}</span>
        <span class="event-category-badge">${evt.category.toUpperCase()}</span>
        <span class="event-prize-tag">🏆 ${evt.prize}</span>
      </div>
      <div class="event-content">
        <h3 class="event-title">${evt.title}</h3>
        <p class="event-desc">${evt.desc}</p>
        <div class="event-meta-info">
          <span>📅 ${evt.date}</span>
          <span>📍 ${evt.venue}</span>
          <span>👥 ${evt.teamSize}</span>
        </div>
        <button class="btn btn-outline" onclick="openBookingModal('${evt.recommendedPass}', ${PASS_PRICES[evt.recommendedPass] || 499})">
          Register / Book Pass 🎟️
        </button>
      </div>
    </div>
  `).join("");
}

// --- 7. Render Schedule ---
function renderSchedule(dayKey) {
  const container = document.getElementById("timelineContainer");
  if (!container) return;

  const items = FEST_SCHEDULE[dayKey] || [];
  container.innerHTML = items.map(item => `
    <div class="timeline-item">
      <div class="timeline-box">
        <span class="timeline-time">${item.time} • ${item.cat}</span>
        <h4 class="timeline-title">${item.title}</h4>
        <span class="timeline-venue">📍 ${item.venue}</span>
      </div>
    </div>
  `).join("");
}

// --- 8. Event Listeners Setup ---
function setupEventListeners() {
  // Mobile Nav Toggle
  const menuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  if (menuBtn && navLinks) {
    menuBtn.addEventListener("click", () => {
      navLinks.classList.toggle("active");
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("active");
      });
    });
  }

  // Category Filter Buttons
  const filterBtns = document.querySelectorAll(".filter-btn");
  filterBtns.forEach(btn => {
    btn.addEventListener("click", () => {
      filterBtns.forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      renderEvents(btn.dataset.category);
    });
  });

  // Schedule Day Tabs
  const scheduleTabs = document.querySelectorAll(".tab-btn");
  scheduleTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      scheduleTabs.forEach(t => t.classList.remove("active"));
      tab.classList.add("active");
      renderSchedule(tab.dataset.day);
    });
  });

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll(".faq-question");
  faqQuestions.forEach(q => {
    q.addEventListener("click", () => {
      const parent = q.parentElement;
      const wasActive = parent.classList.contains("active");
      
      // Close all
      document.querySelectorAll(".faq-item").forEach(item => item.classList.remove("active"));
      
      // Toggle clicked
      if (!wasActive) {
        parent.classList.add("active");
      }
    });
  });

  // Modal Close Button & Backdrop Click
  const bookingModal = document.getElementById("bookingModal");
  const closeBtn = document.getElementById("closeModalBtn");
  if (closeBtn && bookingModal) {
    closeBtn.addEventListener("click", closeBookingModal);
    bookingModal.addEventListener("click", (e) => {
      if (e.target === bookingModal) closeBookingModal();
    });
  }

  const successModal = document.getElementById("successModal");
  if (successModal) {
    successModal.addEventListener("click", (e) => {
      if (e.target === successModal) closeSuccessModal();
    });
  }
}

// --- 9. Modal & Price Calculations ---
window.openBookingModal = function(passName = "All-Access Fest Pass", price = 499) {
  const modal = document.getElementById("bookingModal");
  const select = document.getElementById("formPassType");
  const modalTitle = document.getElementById("modalPassTitle");

  if (select) {
    select.value = passName;
    if (!select.value) {
      select.value = "All-Access Fest Pass";
    }
  }

  if (modalTitle) {
    modalTitle.textContent = `Book: ${passName}`;
  }

  // Reset promo & qty
  document.getElementById("ticketQuantity").value = "1";
  document.getElementById("promoCode").value = "";
  const promoMsg = document.getElementById("promoMessage");
  if (promoMsg) {
    promoMsg.textContent = "";
    promoMsg.className = "promo-msg";
  }
  appliedDiscountPercent = 0;

  updateModalPrice();
  if (modal) modal.classList.add("open");
};

window.closeBookingModal = function() {
  const modal = document.getElementById("bookingModal");
  if (modal) modal.classList.remove("open");
};

window.changeQuantity = function(delta) {
  const qtyInput = document.getElementById("ticketQuantity");
  let val = parseInt(qtyInput.value) || 1;
  val = Math.max(1, Math.min(10, val + delta));
  qtyInput.value = val;
  updateModalPrice();
};

window.updateModalPrice = function() {
  const select = document.getElementById("formPassType");
  const passName = select.value;
  const unitPrice = PASS_PRICES[passName] || 499;
  currentTicketPrice = unitPrice;

  const qty = parseInt(document.getElementById("ticketQuantity").value) || 1;
  const subtotal = unitPrice * qty;
  const discountAmount = Math.round(subtotal * (appliedDiscountPercent / 100));
  const finalTotal = subtotal - discountAmount;

  document.getElementById("summaryBasePrice").textContent = `₹${unitPrice}`;
  document.getElementById("summaryQty").textContent = `${qty}`;

  const discountRow = document.getElementById("discountRow");
  if (appliedDiscountPercent > 0) {
    discountRow.style.display = "flex";
    document.getElementById("summaryDiscount").textContent = `- ₹${discountAmount} (${appliedDiscountPercent}% OFF)`;
  } else {
    discountRow.style.display = "none";
  }

  document.getElementById("summaryTotal").textContent = `₹${finalTotal}`;
};

window.applyPromoCode = function() {
  const codeInput = document.getElementById("promoCode");
  const code = (codeInput.value || "").trim().toUpperCase();
  const promoMsg = document.getElementById("promoMessage");

  if (!code) {
    promoMsg.textContent = "Please enter a coupon code.";
    promoMsg.className = "promo-msg error";
    return;
  }

  if (VALID_PROMOS[code]) {
    appliedDiscountPercent = VALID_PROMOS[code];
    promoMsg.textContent = `🎉 Success! Code '${code}' applied: ${appliedDiscountPercent}% discount.`;
    promoMsg.className = "promo-msg success";
    showToast(`Code '${code}' applied successfully!`);
  } else {
    appliedDiscountPercent = 0;
    promoMsg.textContent = "Invalid code. Try 'FEST10' for 10% off.";
    promoMsg.className = "promo-msg error";
  }

  updateModalPrice();
};

// --- 10. Form Submission & Ticket Generation ---
window.handleBookingSubmit = function(e) {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const college = document.getElementById("college").value.trim();
  const studentId = document.getElementById("studentId").value.trim();
  const passType = document.getElementById("formPassType").value;
  const qty = parseInt(document.getElementById("ticketQuantity").value) || 1;

  const unitPrice = PASS_PRICES[passType] || 499;
  const subtotal = unitPrice * qty;
  const discount = Math.round(subtotal * (appliedDiscountPercent / 100));
  const totalPaid = subtotal - discount;

  // Generate Booking Record
  const bookingId = "VIVA-" + Math.floor(10000 + Math.random() * 90000);
  const bookingTime = new Date().toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric"
  });

  const ticketData = {
    id: bookingId,
    fullName,
    email,
    phone,
    college,
    studentId,
    passType,
    qty,
    totalPaid,
    bookingDate: bookingTime,
    status: "CONFIRMED & ACTIVE"
  };

  // Save to LocalStorage
  saveTicket(ticketData);

  // Close Booking Form Modal
  closeBookingModal();

  // Render & Show Success Modal with Digital Pass
  renderDigitalPass(ticketData, document.getElementById("ePassPreview"));
  const successModal = document.getElementById("successModal");
  if (successModal) successModal.classList.add("open");

  // Reset form
  document.getElementById("bookingForm").reset();
  showToast("Pass booked successfully! 🎟️");
};

window.closeSuccessModal = function() {
  const successModal = document.getElementById("successModal");
  if (successModal) successModal.classList.remove("open");
  
  // Smooth scroll to tickets section
  const section = document.getElementById("my-tickets");
  if (section) section.scrollIntoView({ behavior: "smooth" });
};

// --- 11. Digital Pass & QR Code Generator ---
function generateSVGQRCode(dataText) {
  // A clean, stylized authentic QR-code matrix vector SVG
  return `
    <svg viewBox="0 0 100 100" fill="#0f172a" xmlns="http://www.w3.org/2000/svg">
      <!-- Outer Targets -->
      <rect x="5" y="5" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="4"/>
      <rect x="11" y="11" width="14" height="14" fill="#0f172a"/>
      
      <rect x="69" y="5" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="4"/>
      <rect x="75" y="11" width="14" height="14" fill="#0f172a"/>

      <rect x="5" y="69" width="26" height="26" fill="none" stroke="#0f172a" stroke-width="4"/>
      <rect x="11" y="75" width="14" height="14" fill="#0f172a"/>

      <!-- Matrix pattern blocks -->
      <rect x="36" y="8" width="5" height="5"/>
      <rect x="46" y="8" width="6" height="6"/>
      <rect x="56" y="12" width="5" height="5"/>
      <rect x="38" y="22" width="6" height="6"/>
      <rect x="50" y="24" width="8" height="6"/>

      <rect x="10" y="38" width="6" height="6"/>
      <rect x="22" y="42" width="6" height="6"/>
      <rect x="8" y="52" width="6" height="6"/>
      <rect x="24" y="54" width="5" height="5"/>

      <rect x="38" y="38" width="8" height="8"/>
      <rect x="52" y="40" width="6" height="6"/>
      <rect x="64" y="38" width="8" height="6"/>
      <rect x="80" y="40" width="6" height="6"/>
      <rect x="40" y="52" width="6" height="6"/>
      <rect x="54" y="54" width="8" height="8"/>
      <rect x="68" y="52" width="6" height="6"/>

      <rect x="38" y="70" width="6" height="6"/>
      <rect x="48" y="72" width="8" height="6"/>
      <rect x="64" y="70" width="8" height="8"/>
      <rect x="78" y="72" width="6" height="6"/>
      <rect x="40" y="84" width="6" height="6"/>
      <rect x="54" y="86" width="6" height="6"/>
      <rect x="68" y="84" width="6" height="6"/>
      <rect x="82" y="84" width="6" height="6"/>
    </svg>
  `;
}

function renderDigitalPass(ticket, container) {
  if (!container) return;
  const qrSvg = generateSVGQRCode(ticket.id);

  container.innerHTML = `
    <div class="ticket-badge-card" id="printableTicket-${ticket.id}">
      <div class="ticket-left">
        <div class="ticket-header-row">
          <div class="ticket-brand">⚡ VIVACITY '26</div>
          <div class="ticket-id-tag">PASS #${ticket.id}</div>
        </div>

        <div>
          <h4 class="ticket-attendee-name">${escapeHTML(ticket.fullName)}</h4>
          <p class="ticket-college-sub">🏛️ ${escapeHTML(ticket.college)} • ID: ${escapeHTML(ticket.studentId)}</p>
        </div>

        <div class="ticket-meta-grid">
          <div class="ticket-meta-item">
            <small>PASS TIER</small>
            <span>${ticket.passType}</span>
          </div>
          <div class="ticket-meta-item">
            <small>DATES</small>
            <span>Nov 14 - 16, 2026</span>
          </div>
          <div class="ticket-meta-item">
            <small>QTY / PAID</small>
            <span>${ticket.qty} Pass(es) • ₹${ticket.totalPaid}</span>
          </div>
        </div>
      </div>

      <div class="ticket-divider"></div>

      <div class="ticket-right">
        <div class="qr-placeholder" title="Scan at gate entrance">
          ${qrSvg}
        </div>
        <span class="ticket-entry-status">● GATE VERIFIED</span>
        <div class="ticket-actions">
          <button class="ticket-btn-sm" onclick="printPass('${ticket.id}')">Print Pass</button>
          <button class="ticket-btn-sm ticket-btn-delete" onclick="deleteTicket('${ticket.id}')">Cancel</button>
        </div>
      </div>
    </div>
  `;
}

// --- 12. LocalStorage Persistence ---
function getSavedTickets() {
  try {
    const raw = localStorage.getItem(TICKET_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch (e) {
    console.error("Failed to read tickets from storage", e);
    return [];
  }
}

function saveTicket(ticket) {
  const tickets = getSavedTickets();
  tickets.unshift(ticket);
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
  loadSavedTickets();
}

window.deleteTicket = function(ticketId) {
  if (!confirm(`Are you sure you want to cancel pass #${ticketId}?`)) return;
  let tickets = getSavedTickets();
  tickets = tickets.filter(t => t.id !== ticketId);
  localStorage.setItem(TICKET_STORAGE_KEY, JSON.stringify(tickets));
  loadSavedTickets();
  showToast("Pass removed successfully.");
};

function loadSavedTickets() {
  const listContainer = document.getElementById("ticketsList");
  const countBadge = document.getElementById("ticketCountBadge");
  const tickets = getSavedTickets();

  if (countBadge) {
    countBadge.textContent = tickets.length;
  }

  if (!listContainer) return;

  if (tickets.length === 0) {
    listContainer.innerHTML = `
      <div class="no-tickets" id="noTicketsPlaceholder">
        <div class="no-ticket-icon">🎟️</div>
        <h3>No passes booked yet</h3>
        <p>Choose your pass from above and complete the quick registration form. Your official e-pass badge will appear right here!</p>
        <a href="#passes" class="btn btn-primary">Browse Passes</a>
      </div>
    `;
    return;
  }

  listContainer.innerHTML = "";
  tickets.forEach(ticket => {
    const wrapper = document.createElement("div");
    renderDigitalPass(ticket, wrapper);
    listContainer.appendChild(wrapper.firstElementChild);
  });
}

// --- 13. Print Utility ---
window.printPass = function(id) {
  window.print();
};

// --- 14. Toast Notification Utility ---
function showToast(message) {
  const toast = document.getElementById("toast");
  if (!toast) return;
  toast.textContent = message;
  toast.classList.add("show");
  setTimeout(() => {
    toast.classList.remove("show");
  }, 3200);
}

function escapeHTML(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

