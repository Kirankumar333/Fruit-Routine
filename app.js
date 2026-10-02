/* ==========================================================================
   FRUIT ROUTINE — JAVASCRIPT CONTROLLER & INTERACTIVE LOGIC
   Brand: Fruit Routine (Bangalore)
   Contact: 9480020516 | info.fruitroutine@gmail.com
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
  initNavbarScroll();
  initMobileDrawer();
  initReviewCarousel();
  setDefaultDates();
});

/* ==========================================================================
   1. NAVBAR & MOBILE DRAWER
   ========================================================================== */
function initNavbarScroll() {
  const header = document.getElementById('siteHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 30) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });
}

function initMobileDrawer() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const links = document.querySelectorAll('.mobile-link');

  if (menuBtn && drawer) {
    menuBtn.addEventListener('click', () => {
      drawer.classList.toggle('active');
      const icon = menuBtn.querySelector('i');
      if (drawer.classList.contains('active')) {
        icon.classList.remove('fa-bars');
        icon.classList.add('fa-xmark');
      } else {
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      }
    });

    links.forEach(link => {
      link.addEventListener('click', () => {
        drawer.classList.remove('active');
        const icon = menuBtn.querySelector('i');
        icon.classList.remove('fa-xmark');
        icon.classList.add('fa-bars');
      });
    });
  }
}

/* ==========================================================================
   2. PINCODE AVAILABILITY CHECKER (ALL OVER BANGALORE)
   ========================================================================== */
const bangaloreHubs = {
  '560038': 'Indiranagar & HAL',
  '560008': 'Ulsoor & Old Airport Road',
  '560034': 'Koramangala 1st-8th Block',
  '560102': 'HSR Layout Sectors 1-7',
  '560066': 'Whitefield & ITPL',
  '560103': 'Bellandur & Outer Ring Road',
  '560078': 'JP Nagar Phase 1-8',
  '560041': 'Jayanagar 1st-9th Block',
  '560100': 'Electronic City Phase 1 & 2',
  '560037': 'Marathahalli & AECS Layout',
  '560095': 'Koramangala Sony World',
  '560001': 'MG Road, Richmond Town & CBD',
  '560024': 'Hebbal & RT Nagar',
  '560076': 'Bannerghatta Road & Arekere'
};

function handlePincodeCheck(e) {
  e.preventDefault();
  const input = document.getElementById('pincodeInput');
  const result = document.getElementById('pincodeResult');
  const pin = input.value.trim();

  if (pin.length !== 6 || !/^\d{6}$/.test(pin)) {
    result.className = 'pincode-result active error';
    result.innerHTML = '<i class="fa-solid fa-circle-exclamation"></i> Please enter a valid 6-digit Bangalore Pincode.';
    return;
  }

  if (bangaloreHubs[pin]) {
    result.className = 'pincode-result active success';
    result.innerHTML = `<i class="fa-solid fa-circle-check"></i> Morning delivery active in <strong>${bangaloreHubs[pin]} (${pin})</strong> by 7:15 AM!`;
  } else if (pin.startsWith('560') || pin.startsWith('56')) {
    result.className = 'pincode-result active success';
    result.innerHTML = `<i class="fa-solid fa-circle-check"></i> Morning delivery route active for Bangalore Pincode <strong>${pin}</strong> (Drop by 7:30 AM).`;
  } else {
    result.className = 'pincode-result active success';
    result.innerHTML = `<i class="fa-solid fa-circle-check"></i> Fruit Routine delivers all over Bangalore! Pincode <strong>${pin}</strong> is supported.`;
  }
}

/* ==========================================================================
   3. CUSTOMER REVIEWS CAROUSEL
   ========================================================================== */
let currentReviewIndex = 0;
let carouselAutoPlayTimer = null;

function initReviewCarousel() {
  startCarouselAutoPlay();

  const viewport = document.querySelector('.carousel-viewport');
  if (viewport) {
    viewport.addEventListener('mouseenter', () => clearInterval(carouselAutoPlayTimer));
    viewport.addEventListener('mouseleave', () => startCarouselAutoPlay());
  }
}

function startCarouselAutoPlay() {
  clearInterval(carouselAutoPlayTimer);
  carouselAutoPlayTimer = setInterval(() => {
    nextReview();
  }, 5000);
}

function updateCarouselView() {
  const track = document.getElementById('reviewTrack');
  const dots = document.querySelectorAll('.carousel-dot');
  
  if (track) {
    track.style.transform = `translateX(-${currentReviewIndex * 100}%)`;
  }

  dots.forEach((dot, idx) => {
    if (idx === currentReviewIndex) {
      dot.classList.add('active');
    } else {
      dot.classList.remove('active');
    }
  });
}

function nextReview() {
  const totalSlides = 3;
  currentReviewIndex = (currentReviewIndex + 1) % totalSlides;
  updateCarouselView();
}

function prevReview() {
  const totalSlides = 3;
  currentReviewIndex = (currentReviewIndex - 1 + totalSlides) % totalSlides;
  updateCarouselView();
}

function goToReview(index) {
  currentReviewIndex = index;
  updateCarouselView();
  startCarouselAutoPlay();
}

/* ==========================================================================
   4. FAQ ACCORDION
   ========================================================================== */
function toggleFaq(buttonElement) {
  const item = buttonElement.parentElement;
  const isActive = item.classList.contains('active');

  document.querySelectorAll('.faq-item').forEach(el => el.classList.remove('active'));

  if (!isActive) {
    item.classList.add('active');
  }
}

/* ==========================================================================
   5. SUBSCRIPTION SIGNUP 3-STEP FLOW
   ========================================================================== */
let currentWizardStep = 1;
let selectedPlanTitle = '3-Day Trial';
let currentPlanCost = 199;

function openSubscriptionModal(planName = '3-Day Trial') {
  currentWizardStep = 1;
  selectedPlanTitle = planName;

  if (planName === '3-Day Trial') {
    currentPlanCost = 199;
  } else if (planName === '30-Day Plan' || planName === 'Monthly Plan' || planName === '30 Days') {
    currentPlanCost = 2699;
  } else {
    currentPlanCost = 649;
  }

  const radios = document.getElementsByName('selectedPlan');
  radios.forEach(radio => {
    if (radio.value === planName) {
      radio.checked = true;
      radio.closest('.plan-radio-card').classList.add('selected');
    } else {
      radio.closest('.plan-radio-card').classList.remove('selected');
    }
  });

  goToWizardStep(1);
  document.getElementById('subscriptionModal').classList.add('active');
}

function closeSubscriptionModal() {
  document.getElementById('subscriptionModal').classList.remove('active');
}

function updateSelectedPlanDetails(name, price) {
  selectedPlanTitle = name;
  currentPlanCost = price;

  document.querySelectorAll('.plan-radio-card').forEach(c => c.classList.remove('selected'));
  const checked = document.querySelector('input[name="selectedPlan"]:checked');
  if (checked) {
    checked.closest('.plan-radio-card').classList.add('selected');
  }
}

function goToWizardStep(step) {
  currentWizardStep = step;

  document.getElementById('wizardStep1').classList.remove('active');
  document.getElementById('wizardStep2').classList.remove('active');
  document.getElementById('wizardStep3').classList.remove('active');
  document.getElementById('wizardStepSuccess').classList.remove('active');

  const n1 = document.getElementById('stepNode1');
  const n2 = document.getElementById('stepNode2');
  const n3 = document.getElementById('stepNode3');

  n1.className = 'wizard-step-node';
  n2.className = 'wizard-step-node';
  n3.className = 'wizard-step-node';

  if (step === 1) {
    document.getElementById('wizardStep1').classList.add('active');
    n1.classList.add('active');
  } else if (step === 2) {
    document.getElementById('wizardStep2').classList.add('active');
    n1.classList.add('completed');
    n2.classList.add('active');
  } else if (step === 3) {
    document.getElementById('wizardStep3').classList.add('active');
    n1.classList.add('completed');
    n2.classList.add('completed');
    n3.classList.add('active');

    const durationLabel = selectedPlanTitle === '3-Day Trial' ? '3 Days' : (selectedPlanTitle === '7-Day Plan' || selectedPlanTitle === 'Weekly Plan' ? '7 Days' : '30 Days');
    document.getElementById('sumPlanName').innerText = `${selectedPlanTitle} (${durationLabel})`;
    document.getElementById('sumPlanPrice').innerText = `₹${currentPlanCost}`;
    document.getElementById('sumTotalAmount').innerText = `₹${currentPlanCost}`;
    
    // Update Dynamic QR Code and Mobile Pay Deep Link
    const upiUri = `upi://pay?pa=9980350691@ptyes&pn=Fruit%20Routine&am=${currentPlanCost}&cu=INR`;
    const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=220x220&margin=8&data=${encodeURIComponent(upiUri)}`;
    
    const qrImg = document.getElementById('upiQrCodeImg');
    if (qrImg) qrImg.src = qrUrl;

    const qrTag = document.getElementById('qrAmountTag');
    if (qrTag) qrTag.innerText = `₹${currentPlanCost}`;

    const deepLink = document.getElementById('directUpiDeepLink');
    if (deepLink) deepLink.href = upiUri;

  } else if (step === 4) {
    document.getElementById('wizardStepSuccess').classList.add('active');
    n1.classList.add('completed');
    n2.classList.add('completed');
    n3.classList.add('completed');
  }
}

function validateStep2AndProceed() {
  const name = document.getElementById('custName').value.trim();
  const phone = document.getElementById('custPhone').value.trim();
  const address = document.getElementById('custAddress').value.trim();
  const pincode = document.getElementById('custPincode').value.trim();
  const date = document.getElementById('custStartDate').value;

  if (!name || !phone || !address || !pincode || !date) {
    alert('Please complete all delivery fields to ensure punctual morning drop.');
    return;
  }

  goToWizardStep(3);
}

/* Copy UPI ID Function */
function copyUpiIdToClipboard() {
  const upiInput = document.getElementById('upiIdValue');
  const btn = document.getElementById('copyUpiBtn');
  const icon = document.getElementById('copyIcon');
  const text = document.getElementById('copyBtnText');

  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(upiInput.value).then(onCopiedSuccess).catch(fallbackCopy);
  } else {
    fallbackCopy();
  }

  function onCopiedSuccess() {
    btn.classList.add('copied');
    icon.className = 'fa-solid fa-check';
    text.innerText = 'Copied! ✓';
    setTimeout(() => {
      btn.classList.remove('copied');
      icon.className = 'fa-regular fa-copy';
      text.innerText = 'Copy';
    }, 2000);
  }

  function fallbackCopy() {
    upiInput.select();
    upiInput.setSelectionRange(0, 99999);
    try {
      document.execCommand('copy');
      onCopiedSuccess();
    } catch (err) {
      alert('UPI ID: ' + upiInput.value);
    }
  }
}

/* Screenshot Upload Handler */
let attachedScreenshotDataUrl = null;
let attachedScreenshotFileName = null;

function handleScreenshotUpload(event) {
  const file = event.target.files && event.target.files[0];
  if (!file) return;

  attachedScreenshotFileName = file.name;
  const reader = new FileReader();
  reader.onload = function(e) {
    attachedScreenshotDataUrl = e.target.result;
    document.getElementById('dropzoneEmptyState').style.display = 'none';
    const previewState = document.getElementById('dropzonePreviewState');
    previewState.style.display = 'flex';
    document.getElementById('screenshotThumbnail').src = e.target.result;
    document.getElementById('uploadedFileName').innerText = file.name;
  };
  reader.readAsDataURL(file);
}

function removeScreenshotUpload() {
  attachedScreenshotDataUrl = null;
  attachedScreenshotFileName = null;
  const input = document.getElementById('paymentScreenshotInput');
  if (input) input.value = '';
  document.getElementById('dropzoneEmptyState').style.display = 'block';
  document.getElementById('dropzonePreviewState').style.display = 'none';
}

function executeMockPayment() {
  const name = document.getElementById('custName').value.trim() || 'Valued Customer';
  const phone = document.getElementById('custPhone').value.trim() || '9480020516';
  const address = document.getElementById('custAddress').value.trim() || 'Bangalore';
  const pincode = document.getElementById('custPincode').value.trim() || '560100';
  const startDate = document.getElementById('custStartDate').value || 'Tomorrow';
  const utr = document.getElementById('upiUtrNumber') ? document.getElementById('upiUtrNumber').value.trim() : '';

  // Validate screenshot attachment or UTR number
  if (!attachedScreenshotDataUrl && !utr) {
    alert('Please attach your payment screenshot or enter your UPI Ref / UTR number to verify your order.');
    return;
  }

  const randomId = 'FR-' + Math.floor(10000 + Math.random() * 90000);
  document.getElementById('confirmedOrderId').innerText = randomId;
  document.getElementById('confirmedPlanName').innerText = `${selectedPlanTitle} (₹${currentPlanCost})`;
  document.getElementById('confirmedStartDate').innerText = `${startDate} between 7:00 AM – 9:00 AM`;
  document.getElementById('confirmedAddress').innerText = `${address} (PIN: ${pincode})`;

  // Construct WhatsApp link
  const waMessage = encodeURIComponent(
    `*FRUIT ROUTINE — NEW SUBSCRIPTION ORDER*\n\n` +
    `Hello Fruit Routine! I have completed UPI payment of *₹${currentPlanCost}* for my subscription.\n\n` +
    `*Order Details:*\n` +
    `• Order ID: *${randomId}*\n` +
    `• Plan: *${selectedPlanTitle} (₹${currentPlanCost})*\n` +
    `• Customer Name: *${name}*\n` +
    `• Phone: *${phone}*\n` +
    `• Delivery Address: *${address}, ${pincode}*\n` +
    `• First Delivery Date: *${startDate} (7:00 AM - 9:00 AM)*\n` +
    `• Paid to UPI ID: *9980350691@ptyes*\n` +
    (utr ? `• UPI Ref / UTR: *${utr}*\n` : '') +
    `\nI have attached my payment screenshot for confirmation. Please activate my morning delivery!`
  );

  const waBtn = document.getElementById('whatsappConfirmBtn');
  if (waBtn) {
    waBtn.href = `https://wa.me/919480020516?text=${waMessage}`;
  }

  const orderPayload = {
    orderId: randomId,
    name: name,
    phone: phone,
    address: address,
    pincode: pincode,
    plan: selectedPlanTitle,
    amount: currentPlanCost,
    startDate: startDate,
    utr: utr,
    screenshot: attachedScreenshotDataUrl || 'assets/fruit-bowl-fresh.jpg',
    status: 'New Order',
    timestamp: new Date().toLocaleString('en-IN')
  };

  // Save Order to LocalStorage for Admin Operations Portal
  try {
    const existingOrders = JSON.parse(localStorage.getItem('fruit_routine_orders') || '[]');
    existingOrders.unshift(orderPayload);
    localStorage.setItem('fruit_routine_orders', JSON.stringify(existingOrders));
  } catch (err) {
    console.log('Order saved to memory');
  }

  // Trigger Automated Cloud Integrations (Google Sheets, Telegram, Email)
  dispatchAutomatedIntegrations(orderPayload);

  goToWizardStep(4);
}

/* Automated Cloud Webhook Dispatcher */
function dispatchAutomatedIntegrations(order) {
  // 1. Google Sheets Sync
  const defaultSheetsWebhook = 'https://script.google.com/macros/s/AKfycbwx5dwP7mI57PeyrubJlmlYe8WnDKOLy0ntOslaIdET-5Q0SR7N9sP576_D2lq-UpSt/exec';
  const sheetsWebhook = localStorage.getItem('fruit_routine_sheets_webhook') || defaultSheetsWebhook;
  if (sheetsWebhook && sheetsWebhook.startsWith('http')) {
    fetch(sheetsWebhook, {
      method: 'POST',
      mode: 'no-cors',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(order)
    }).catch(e => console.log('Google Sheets sync dispatched'));
  }

  // 2. Telegram Bot Instant Notification
  const tgToken = localStorage.getItem('fruit_routine_tg_token');
  const tgChatId = localStorage.getItem('fruit_routine_tg_chat');
  if (tgToken && tgChatId) {
    const tgText = encodeURIComponent(
      `🍓 *NEW FRUIT ROUTINE ORDER!*\n\n` +
      `🆔 *Order:* \`${order.orderId}\`\n` +
      `👤 *Customer:* ${order.name}\n` +
      `📞 *Phone:* ${order.phone}\n` +
      `📦 *Plan:* ${order.plan} (₹${order.amount})\n` +
      `📍 *Address:* ${order.address} (${order.pincode})\n` +
      `🗓 *Start Date:* ${order.startDate}\n` +
      `💳 *Paid To:* 9980350691@ptyes\n` +
      `🔢 *UTR:* ${order.utr || 'Pending Screenshot'}`
    );
    fetch(`https://api.telegram.org/bot${tgToken}/sendMessage?chat_id=${tgChatId}&text=${tgText}&parse_mode=Markdown`)
      .catch(e => console.log('Telegram dispatch attempted'));
  }
}

/* ==========================================================================
   6. BULK ORDERS MODAL & INQUIRY
   ========================================================================== */
function openBulkOrderModal() {
  document.getElementById('bulkOrderModal').classList.add('active');
}

function closeBulkOrderModal() {
  document.getElementById('bulkOrderModal').classList.remove('active');
}

function handleBulkInquirySubmit(e) {
  e.preventDefault();
  const name = document.getElementById('bulkName').value.trim();
  const phone = document.getElementById('bulkPhone').value.trim();
  const occasion = document.getElementById('bulkOccasion').value;
  const quantity = document.getElementById('bulkQuantity').value;
  const date = document.getElementById('bulkDate').value;
  const location = document.getElementById('bulkLocation').value.trim();
  const notes = document.getElementById('bulkNotes').value.trim();

  // Save Bulk Inquiry to Admin Portal
  try {
    const existingOrders = JSON.parse(localStorage.getItem('fruit_routine_orders') || '[]');
    existingOrders.unshift({
      orderId: 'BULK-' + Math.floor(1000 + Math.random() * 9000),
      name: name,
      phone: phone,
      address: `${location} (Occasion: ${occasion}, Qty: ${quantity} bowls, Notes: ${notes || 'None'})`,
      pincode: 'Bangalore',
      plan: `Bulk Catering (${quantity} Bowls)`,
      amount: 'Quotation',
      startDate: date,
      utr: 'Inquiry',
      screenshot: 'assets/bulk-orders-banner.jpg',
      status: 'New Order',
      timestamp: new Date().toLocaleString('en-IN')
    });
    localStorage.setItem('fruit_routine_orders', JSON.stringify(existingOrders));
  } catch(err) {}

  // Create WhatsApp prefilled message
  const waText = encodeURIComponent(
    `Hi Fruit Routine! I would like to place a Bulk Order.\n\n` +
    `*Name:* ${name}\n` +
    `*Phone:* ${phone}\n` +
    `*Occasion:* ${occasion}\n` +
    `*Quantity:* ${quantity} Fruit Bowls (400ml)\n` +
    `*Date:* ${date}\n` +
    `*Location:* ${location}\n` +
    `*Notes:* ${notes || 'Standard fresh mix'}`
  );

  closeBulkOrderModal();
  alert(`Thank you ${name}! Opening WhatsApp to connect directly with Fruit Routine team (+91 9480020516) for instant quote confirmation.`);
  window.open(`https://wa.me/919480020516?text=${waText}`, '_blank');
}

/* ==========================================================================
   7. CUSTOMER DASHBOARD DEMO SIMULATOR
   ========================================================================== */
function handleDashboardAction(action) {
  const toast = document.getElementById('dashToast');
  const msg = document.getElementById('dashToastMsg');

  if (action === 'skip') {
    msg.innerHTML = '<i class="fa-solid fa-circle-check"></i> Tomorrow’s Fruit Routine bowl skipped! Balance extended to next week.';
  } else if (action === 'pause') {
    msg.innerHTML = '<i class="fa-solid fa-circle-pause"></i> Fruit Routine subscription paused for requested dates. Auto-resumes Monday.';
  } else if (action === 'address') {
    msg.innerHTML = '<i class="fa-solid fa-location-dot"></i> Delivery notes updated: "Leave on doorstep bag hook".';
  }

  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 6000);
}

function showDashboardToast(customMsg) {
  const toast = document.getElementById('dashToast');
  const msg = document.getElementById('dashToastMsg');
  msg.innerHTML = `<i class="fa-solid fa-circle-check"></i> ${customMsg}`;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 5000);
}

function setDefaultDates() {
  const dateInput = document.getElementById('custStartDate');
  const bulkDateInput = document.getElementById('bulkDate');

  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const yyyy = tomorrow.getFullYear();
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const formatted = `${yyyy}-${mm}-${dd}`;

  if (dateInput) {
    dateInput.min = formatted;
    dateInput.value = formatted;
  }
  if (bulkDateInput) {
    bulkDateInput.min = formatted;
    bulkDateInput.value = formatted;
  }
}

// Close modals when clicking outside
window.addEventListener('click', (e) => {
  const subModal = document.getElementById('subscriptionModal');
  const bulkModal = document.getElementById('bulkOrderModal');

  if (e.target === subModal) closeSubscriptionModal();
  if (e.target === bulkModal) closeBulkOrderModal();
});
