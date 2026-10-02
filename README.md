# 🥗 DailyBloom Bowls — Fresh Morning Fruit Bowl Delivery Website

A modern, responsive, mobile-first website for a fresh gourmet fruit bowl morning delivery business.

---

## 🎨 Design System & Palette
- **Background**: `#FFFFFF`
- **Light Green Sections**: `#E8F5E9`
- **Subtle Surface Tint**: `#F6FBF7`
- **Accent Green**: `#A5D6A7` & `#C8E6C9`
- **Primary Action Green**: `#2E7D32` (Darker hover: `#1B5E20`)
- **Text Primary**: `#1F2937`
- **Warm CTA Highlight**: `#FF9F43` (Mango Sunset)
- **Typography**: Google Fonts `Poppins` (Headings) & `Plus Jakarta Sans` (Body)

---

## 🚀 Key Features & Sections
1. **Sticky Header**: Glassmorphic frosted blur, dynamic city badge, mobile navigation drawer, and instant trial CTA.
2. **Hero Section**:
   - Headline: *"Fresh fruit bowls at your doorstep, every morning"*
   - Live interactive **Pincode Delivery Availability Checker** with instant feedback.
   - Dual CTAs (*Start 3-Day Trial* & *View Plans*).
   - Multi-layered card with floating ozone sanitized and 7:30 AM morning drop badges.
3. **How It Works**: 3-step guide (Choose Plan → We Cut Fresh at 5 AM → Delivered Chilled before 7:30 AM).
4. **Interactive Bowl Menu & Gallery**:
   - Macro/Dietary filter pills (*All*, *Energy & Gym*, *Detox & Glow*, *Low GI/Keto*, *Immunity Boost*).
   - Nutrient specs modal (Calories, Protein, Carbs, Fiber, Portion size in grams).
5. **Subscription Plans & Pricing**:
   - **3-Day Taste Trial** (₹399 • ₹133/day)
   - **Weekly 6-Day Plan** (₹749 • ₹124/day • Most Popular)
   - **Monthly 24-Day Habit Plan** (₹2,699 • ₹112/day • Best Value)
   - Eco-Return Husk Bowl 10% discount toggle & Feature Comparison modal.
6. **Why Choose Us**: 6 USPs including daily harvest sourcing, 3-stage ozone wash, silent morning drops, zero added sugars, flexible pause/skip, and plastic-free sugarcane husk packaging.
7. **Customer Reviews Carousel**: Auto-advancing review slider with manual touch/arrow controls, ratings, and verified subscriber badges.
8. **Interactive FAQ Accordion**: 6 collapsible FAQs covering delivery windows, pause/skip cutoff rules, hygiene, allergies, payments, and refunds.
9. **Customer Self-Serve Dashboard Simulator**:
   - Live morning drop progress tracker (Harvested → Ozone Wash → 5 AM Cut → 7:30 AM Drop).
   - Interactive buttons to *Skip Tomorrow*, *Pause Vacation*, *Change Address*, and *Swap Bowl* with instant feedback toast notifications.
10. **3-Step Subscription Signup Modal**:
    - Step 1: Select Plan Tier & Dietary Focus
    - Step 2: Name, Phone, Address, Slot & Start Date picker
    - Step 3: Instant UPI QR / Card / NetBanking simulation with instant confirmation receipt and order ID.
11. **Footer & Global CTAs**: Floating WhatsApp concierge button, mobile sticky bottom order bar, contact details, FSSAI certification badge, and social links.

---

## 💻 How to Run Locally

You can preview the website by running any local HTTP server in this directory:

```bash
# Using Python
python -m http.server 8080

# Or with Node.js npx
npx serve .
```

Then visit [http://localhost:8080](http://localhost:8080) in your browser.

---

## 🛠️ Customization Guide
- **Business Name**: Replace `DailyBloom` in `index.html` with your brand name.
- **City / Serviced Neighborhoods**: Update `#currentCityLabel` in `index.html` and `supportedPincodes` in `app.js`.
- **Pricing & Currency**: Adjust pricing values directly in `index.html` and `app.js`.
- **Images**: High-resolution Unsplash fresh fruit bowl photos are pre-linked and can be replaced with your local food photography assets.
