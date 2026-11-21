// Product details and cart state shared by the catalog, drawer and order form.
const products = [
  { id: "ajwa", name: "Ajwa Dates", nameBn: "আজওয়া খেজুর", english: "Premium Saudi", englishBn: "প্রিমিয়াম সৌদি", price: 1250, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "4.9", ratingBn: "৪.৯", image: "images/images (8).jpg", badge: "Premium", badgeBn: "প্রিমিয়াম", origin: "Madinah, Saudi Arabia", originBn: "মদিনা, সৌদি আরব", tags: ["premium", "saudi"] },
  { id: "medjool", name: "Medjool Dates", nameBn: "মেডজুল খেজুর", english: "Customer favorite", englishBn: "ক্রেতাদের পছন্দ", price: 1450, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "5.0", ratingBn: "৫.০", image: "images/images (6).jpg", badge: "Best seller", badgeBn: "বেস্ট সেলার", origin: "Jordan", originBn: "জর্ডান", tags: ["premium"] },
  { id: "safawi", name: "Safawi Dates", nameBn: "সাফাওয়ি খেজুর", english: "Premium Saudi", englishBn: "প্রিমিয়াম সৌদি", price: 850, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "4.8", ratingBn: "৪.৮", image: "images/images (9).jpg", badge: "Popular", badgeBn: "জনপ্রিয়", origin: "Madinah, Saudi Arabia", originBn: "মদিনা, সৌদি আরব", tags: ["saudi", "value"] },
  { id: "mabroom", name: "Mabroom Dates", nameBn: "মাবরুম খেজুর", english: "Premium Saudi", englishBn: "প্রিমিয়াম সৌদি", price: 1150, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "4.9", ratingBn: "৪.৯", image: "images/images.jpg", badge: "Premium", badgeBn: "প্রিমিয়াম", origin: "Madinah, Saudi Arabia", originBn: "মদিনা, সৌদি আরব", tags: ["premium", "saudi"] },
  { id: "mariami", name: "Mariami Dates", nameBn: "মারিয়ামি খেজুর", english: "Everyday value", englishBn: "সাশ্রয়ী পছন্দ", price: 650, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "4.7", ratingBn: "৪.৭", image: "images/images (2).jpg", badge: "Great value", badgeBn: "সাশ্রয়ী", origin: "Iran", originBn: "ইরান", tags: ["value"] },
  { id: "kalmi", name: "Kalmi Dates", nameBn: "কালমি খেজুর", english: "Popular Saudi", englishBn: "জনপ্রিয় সৌদি", price: 750, weight: "500 g", weightBn: "৫০০ গ্রাম", rating: "4.8", ratingBn: "৪.৮", image: "images/images (5).jpg", badge: "Popular", badgeBn: "জনপ্রিয়", origin: "Madinah, Saudi Arabia", originBn: "মদিনা, সৌদি আরব", tags: ["saudi", "value"] }
];

const STORAGE_KEY = "premium-dates-house-cart";
const LANGUAGE_KEY = "premium-dates-house-language";
const cart = loadCart();
let activeFilter = "all";
let searchTerm = "";
let toastTimer;
let language = loadLanguage();

const productGrid = document.querySelector("#product-grid");
const cartDrawer = document.querySelector("#cart-drawer");
const drawerBackdrop = document.querySelector("#drawer-backdrop");
const cartItems = document.querySelector("#cart-items");
const cartEmpty = document.querySelector("#cart-empty");
const cartCheckout = document.querySelector("#cart-checkout");
const toast = document.querySelector("#toast");
const languageSwitch = document.querySelector(".language-switch");

const bengaliText = new Map([
  ["Home delivery across Bangladesh", "সারা বাংলাদেশে হোম ডেলিভারি"],
  ["Free delivery on orders over ৳1,500", "৳১,৫০০ টাকার বেশি অর্ডারে বিনামূল্যে ডেলিভারি"],
  ["01 — 06", "০১ — ০৬"], ["100%", "১০০%"], ["2018", "২০১৮"], ["4.9", "৪.৯"], ["N", "ন"], ["A", "আ"], ["F", "ফ"],
  ["EST. 2018", "প্রতিষ্ঠিত ২০১৮"], ["© 2026 Al Madina Dates. All rights reserved.", "© ২০২৬ Al Madina Dates. সর্বস্বত্ব সংরক্ষিত।"],
  ["BUY", "কিনুন"], ["MORE", "আরও"], ["SAVE", "সাশ্রয়"],
  ["Home", "হোম"], ["Products", "পণ্যসমূহ"], ["About Us", "আমাদের কথা"], ["Reviews", "রিভিউ"], ["Contact", "যোগাযোগ"],
  ["Order Now", "অর্ডার করুন"], ["Nature's sweetness, thoughtfully selected", "প্রকৃতির মিষ্টি, যত্নে বাছাই"],
  ["Nature's sweetest gift,", "প্রাকৃতিক মিষ্টিতে"], ["with", "ভরপুর"], ["dates worth", "সেরা মানের"], ["savoring.", "খেজুর"],
  ["Carefully selected for quality and freshness, delivered straight to your door.", "বিশুদ্ধতা ও গুণগত মানের নিশ্চয়তায় পৌঁছে যাবে আপনার ঘরে।"],
  ["Shop Now", "এখনই কিনুন"], ["Explore Products", "পণ্য দেখুন"], ["1,200+ happy customers", "১,২০০+ সন্তুষ্ট ক্রেতা"],
  ["Chosen with confidence", "বিশ্বাসের সাথে বেছে নিন"], ["Natural", "প্রাকৃতিক"], ["& fresh", "ও তাজা"],
  ["Thoughtfully selected", "যত্নে বাছাই করা"], ["Sourced from trusted growers", "বিশ্বস্ত উৎস থেকে সংগ্রহ"], ["Our collection", "আমাদের সংগ্রহ"],
  ["Pure & natural", "বিশুদ্ধ ও প্রাকৃতিক"], ["No artificial ingredients", "কোনো কৃত্রিম উপাদান নয়"],
  ["Freshness guaranteed", "সতেজতার নিশ্চয়তা"], ["Sourced with care", "সেরা উৎস থেকে সংগ্রহ"],
  ["Nationwide delivery", "সারা দেশে ডেলিভারি"], ["Safely to your doorstep", "নিরাপদে আপনার দোরগোড়ায়"],
  ["The date collection", "আমাদের বাছাই"], ["Find your", "পছন্দের"], ["favorites", "খেজুর"],
  ["Naturally sweet, carefully selected, and always fresh.", "প্রতিটি দানায় প্রাকৃতিক স্বাদ আর সতেজতার ছোঁয়া।"],
  ["Choose a favorite for your home.", "আপনার পছন্দেরটি বেছে নিন।"],
  ["All products", "সব পণ্য"], ["Premium", "প্রিমিয়াম"], ["Saudi", "সৌদি"], ["Great value", "সাশ্রয়ী"],
  ["Something for every occasion", "আপনার পছন্দমতো"], ["Explore the", "খুঁজে নিন"], ["collection", "আপনারটি"],
  ["From thoughtful gifts to everyday goodness, discover", "উপহার থেকে প্রতিদিনের পুষ্টি—সব উপলক্ষের জন্য আছে"],
  ["dates carefully selected for every occasion.", "যত্নে বাছাই করা আমাদের বিশেষ সংগ্রহ।"],
  ["Our finest selection", "বিশেষ সংগ্রহ"], ["Premium Dates", "প্রিমিয়াম খেজুর"], ["Explore collection", "সবগুলো দেখুন"],
  ["Explore collection ↗", "সবগুলো দেখুন ↗"], ["Explore offers ↗", "অফার দেখুন ↗"],
  ["Desert-grown favorites", "মরুভূমির সেরা"], ["Saudi Dates", "সৌদি খেজুর"], ["A treat for every day", "প্রতিদিনের সঙ্গী"],
  ["Iranian Dates", "ইরানি খেজুর"], ["For your iftar table", "ইফতারের আয়োজন"], ["Ramadan Specials", "রমজান স্পেশাল"],
  ["Explore offers", "অফার দেখুন"], ["A thoughtful way to share", "ভালোবাসার উপহার"], ["Gift Boxes", "গিফট বক্স"],
  ["A little something extra", "আপনার জন্য বিশেষ"], ["More to share,", "আরও কিনুন,"], ["more to save", "আরও সাশ্রয়"],
  ["Stock up for the family and enjoy a little extra value.", "পরিবারের জন্য নিন বেশি, উপভোগ করুন বিশেষ ছাড়ে।"],
  ["Shop the offer", "অফারটি নিন"], ["A customer favorite", "সবার প্রিয় অফার"], ["Buy 2 and enjoy", "২টি নিলে"],
  ["a special offer", "বিশেষ ছাড়"], ["Pick up more of your favorites and save.", "একসাথে কিনলে থাকছে বাড়তি সাশ্রয়।"],
  ["Shop now", "এখনই দেখুন"], ["For a limited time", "সীমিত সময়ের জন্য"], ["Ramadan", "রমজান"],
  ["special deals", "স্পেশাল ডিল"], ["Make every iftar a little sweeter.", "ইফতারের আয়োজনে থাকুক সেরা খেজুর।"],
  ["Order now", "অর্ডার করুন"], ["The difference", "কেন আমরা"], ["More than", "স্বাদের চেয়েও"],
  ["just great taste", "বেশি কিছু"], ["Every order comes with our promise of honest service,", "প্রতিটি অর্ডারে আমরা রাখি সততা, যত্ন"],
  ["thoughtful care, and your satisfaction.", "ও আপনার সন্তুষ্টির প্রতিশ্রুতি।"],
  ["Premium quality", "প্রিমিয়াম মান"], ["Every date is carefully selected, with quality never compromised.", "প্রতিটি খেজুর হাতে বেছে নেওয়া, মানের সাথে কোনো আপস নেই।"],
  ["Always fresh", "সবসময় সতেজ"], ["Sourced from trusted growers and stored with care.", "বিশ্বস্ত উৎস থেকে সংগ্রহ করে যত্নে সংরক্ষণ করি।"],
  ["Fair prices", "ন্যায্য দাম"], ["Excellent dates at honest prices that make sense.", "সেরা পণ্য, সবার সাধ্যের মধ্যে—মূল্যে স্বচ্ছতা।"],
  ["Careful packaging", "নিরাপদ প্যাকেজিং"], ["Delivered cleanly and securely to preserve freshness.", "সতেজতা ও পরিচ্ছন্নতা বজায় রেখে পৌঁছাই আপনার কাছে।"],
  ["Fast home delivery", "দ্রুত হোম ডেলিভারি"], ["Reliable delivery to homes across Bangladesh.", "বাংলাদেশের যেকোনো প্রান্তে নির্ভরযোগ্য ডেলিভারি।"],
  ["Serving you", "আপনাদের সাথে"], ["since", "থেকে"], ["Our story", "আমাদের গল্প"], ["Your trusted source", "ভালো খেজুরের"],
  ["for exceptional dates", "বিশ্বাসের ঠিকানা"],
  ["At Al Madina Dates, we believe good food makes everyday life better. That is why we select every date for its flavor, freshness, and quality.", "Al Madina Dates-এ আমরা বিশ্বাস করি, ভালো খাবার মানে ভালো থাকা। তাই প্রতিটি খেজুর বেছে নিই স্বাদ, সতেজতা ও মানের নিশ্চয়তা দিয়ে।"],
  ["Our greatest reward is earning your trust and welcoming you back. Share nature's sweetest gift with your family and the people you love.", "আমাদের ছোট্ট উদ্যোগে সবচেয়ে বড় প্রাপ্তি—আপনাদের সন্তুষ্টি ও বারবার ফিরে আসা। পরিবার ও প্রিয়জনের জন্য বেছে নিন প্রকৃতির এই মিষ্টি উপহার।"],
  ["Visit or write to us", "আমাদের ঠিকানা"], ["Chardulai, Sujanagar, Pabna, Bangladesh", "চরদুলাই, সুজানগর, পাবনা, বাংলাদেশ"],
  ["Get in touch", "আমাদের সাথে কথা বলুন"], ["Kind words from our customers", "ক্রেতাদের ভালোবাসা"],
  ["Our story,", "তাদের কথায়"], ["in their words", "আমাদের গল্প"], ["Rated by happy customers", "সন্তুষ্ট ক্রেতাদের রেটিং"],
  ["“The dates were wonderfully fresh and soft, and the packaging was beautiful. Everyone in the family loved them.”", "“খেজুরগুলো সত্যিই অনেক ফ্রেশ এবং নরম। প্যাকেজিংটাও ছিল খুব সুন্দর। পরিবারের সবাই পছন্দ করেছে।”"],
  ["Nusrat Jahan", "নুসরাত জাহান"], ["Dhaka · Verified customer", "ঢাকা · যাচাইকৃত ক্রেতা"],
  ["“Exceptional quality for the price. My order arrived on time, and I will definitely order again.”", "“দামের তুলনায় মান অসাধারণ। সময়মতো ডেলিভারি পেয়েছি, আবারও অর্ডার করব ইনশাআল্লাহ।”"],
  ["Abdullah Al Mamun", "আবদুল্লাহ আল মামুন"], ["Rajshahi · Verified customer", "রাজশাহী · যাচাইকৃত ক্রেতা"],
  ["“The gift box was lovely. Both the taste and quality of the dates made a wonderful impression.”", "“গিফট বক্সটা খুবই সুন্দর ছিল। খেজুরের স্বাদ ও মান—দুটোই মন ছুঁয়ে গেছে।”"],
  ["Farhana Rahman", "ফারহানা রহমান"], ["Chattogram · Verified customer", "চট্টগ্রাম · যাচাইকৃত ক্রেতা"],
  ["Place your order", "আপনার অর্ডার"], ["Your favorites,", "আপনার পছন্দ"], ["delivered", "পৌঁছে যাক"],
  ["to your door", "ঘরে"], ["Fill in the form to prepare your order in WhatsApp. You can review the message and choose a contact before sending it.", "ফর্মটি পূরণ করুন—আপনার অর্ডার WhatsApp-এ প্রস্তুত হবে। পাঠানোর আগে আপনার পছন্দের নম্বর বা যোগাযোগ নির্বাচন করতে পারবেন।"],
  ["Our location", "আমাদের ঠিকানা"], ["Order assistance", "অর্ডার সহায়তা"], ["Daily · 9:00 AM – 10:00 PM", "প্রতিদিন · সকাল ৯টা – রাত ১০টা"],
  ["No payment is needed before your order is confirmed", "অর্ডার নিশ্চিত করার আগে কোনো পেমেন্ট প্রয়োজন নেই"],
  ["01 / ORDER FORM", "০১ / অর্ডার ফর্ম"], ["Your details, delivered with care", "তথ্য দিন, আমরা পৌঁছে দেব"],
  ["Your name", "আপনার নাম"], ["Full name", "সম্পূর্ণ নাম"], ["Phone number", "ফোন নম্বর"],
  ["Delivery address", "ডেলিভারির ঠিকানা"], ["House/road, area, district", "বাসা/রোড, এলাকা, জেলা"],
  ["Product", "পণ্য"], ["Quantity", "পরিমাণ"], ["Order via WhatsApp", "WhatsApp-এ অর্ডার করুন"],
  ["WhatsApp will open with your order. Send the message there to confirm.", "WhatsApp খুলবে—সেখানে বার্তাটি পাঠিয়ে অর্ডার নিশ্চিত করুন।"],
  ["Nature's sweetness, thoughtfully selected.", "প্রকৃতির মিষ্টি, যত্নে বাছাই।"],
  ["Bringing the finest dates to every home.", "সেরা খেজুর পৌঁছে যাক প্রতিটি ঘরে।"],
  ["Find us on Facebook ↗", "Facebook-এ আমাদের খুঁজুন ↗"], ["Quick links", "দ্রুত লিংক"], ["About us", "আমাদের কথা"],
  ["Customer reviews", "ক্রেতাদের রিভিউ"], ["Customer care", "গ্রাহক সেবা"], ["Place an order", "অর্ডার করুন"],
  ["Special offers", "বিশেষ অফার"], ["Delivery information", "ডেলিভারি তথ্য"], ["Contact us", "যোগাযোগ"],
  ["Chardulai, Sujanagar,", "চরদুলাই, সুজানগর,"], ["Pabna, Bangladesh", "পাবনা, বাংলাদেশ"],
  ["Daily · 9:00 AM – 10:00 PM", "প্রতিদিন · সকাল ৯টা – রাত ১০টা"],
  ["Use the order form ↗", "অর্ডারের জন্য ফর্ম পূরণ করুন ↗"], ["9:00 AM – 10:00 PM", "সকাল ৯টা – রাত ১০টা"],
  ["All rights reserved.", "সর্বস্বত্ব সংরক্ষিত।"], ["Made with care in Bangladesh", "ভালোবাসা ও যত্নে, বাংলাদেশে তৈরি"],
  ["Your selection", "আপনার নির্বাচন"], ["Shopping bag", "শপিং ব্যাগ"], ["Your bag is waiting for something sweet", "আপনার ব্যাগ এখনো খালি"],
  ["Choose your favorite dates and we will deliver them to your door.", "পছন্দের খেজুর বেছে নিন, আমরা পৌঁছে দেব আপনার ঘরে।"],
  ["Explore products", "পণ্য দেখুন"], ["Subtotal", "সাবটোটাল"],
  ["Delivery charges are confirmed based on your address.", "ডেলিভারি চার্জ ঠিকানা অনুযায়ী নিশ্চিত করা হবে।"],
  ["Confirm order via WhatsApp", "WhatsApp-এ অর্ডার নিশ্চিত করুন"]
]);

const localizedAttributes = [
  ["#product-search", "placeholder", "Search dates...", "খুঁজুন..."],
  [".menu-toggle", "aria-label", "Open menu", "মেনু খুলুন"],
  ["#primary-nav", "aria-label", "Main navigation", "প্রধান নেভিগেশন"],
  [".cart-trigger", "aria-label", "Open shopping cart", "কার্ট খুলুন"],
  [".trust-strip", "aria-label", "Our promises", "আমাদের সুবিধা"],
  [".product-tabs", "aria-label", "Filter products", "পণ্য ফিল্টার"],
  [".language-switch", "aria-label", "Choose language", "ভাষা নির্বাচন করুন"],
  [".offer-card-main a", "aria-label", "Explore products", "পণ্য দেখুন"],
  [".offer-card-light a", "aria-label", "Explore Ramadan specials", "রমজান স্পেশাল পণ্য দেখুন"],
  [".drawer-close", "aria-label", "Close cart", "কার্ট বন্ধ করুন"],
  [".hero-image-frame img", "alt", "Fresh dates arranged beside a wooden bowl", "কাঠের বাটিতে সাজানো তাজা খেজুর"],
  [".category-card:nth-child(1) img", "alt", "A bowl of premium dates", "সাজানো প্রিমিয়াম খেজুর"],
  [".category-card:nth-child(2) img", "alt", "Saudi dates served in a bowl", "সৌদি খেজুরের বাটি"],
  [".category-card:nth-child(3) img", "alt", "A fresh selection of dates", "সতেজ খেজুরের সংগ্রহ"],
  [".category-card:nth-child(4) img", "alt", "Dates for your Ramadan table", "রমজানের ইফতারের খেজুর"],
  [".category-card:nth-child(5) img", "alt", "Dates ready to be gifted", "উপহারের জন্য সুন্দর খেজুর"],
  [".about-image-main", "alt", "A bowl of naturally sweet dates", "প্রাকৃতিক খেজুরের বাটি"],
  [".about-image-small", "alt", "Dates selected with care", "যত্নে বাছাই করা খেজুর"],
  [".cart-drawer", "aria-label", "Your shopping cart", "আপনার শপিং কার্ট"]
];

function loadCart() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    if (!Array.isArray(saved)) return [];
    return saved.filter((item) =>
      products.some((product) => product.id === item.id) &&
      Number.isInteger(item.quantity) && item.quantity > 0
    );
  } catch (error) {
    console.warn("Could not restore the saved cart.", error);
    return [];
  }
}

function loadLanguage() {
  try {
    return localStorage.getItem(LANGUAGE_KEY) === "bn" ? "bn" : "en";
  } catch (error) {
    console.warn("Could not restore the language preference.", error);
    return "en";
  }
}

function formatNumber(amount) {
  return new Intl.NumberFormat(language === "bn" ? "bn-BD" : "en-BD").format(amount);
}

function formatPrice(amount) {
  return `৳${formatNumber(amount)}`;
}

function productText(product, field) {
  return language === "bn" ? product[`${field}Bn`] : product[field];
}

const staticTextNodes = [];
const textWalker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
let textNode;
while ((textNode = textWalker.nextNode())) {
  if (textNode.nodeValue.trim()) staticTextNodes.push({ node: textNode, english: textNode.nodeValue });
}

function applyLanguage() {
  document.documentElement.lang = language;
  document.title = language === "bn"
    ? "Al Madina Dates — প্রাকৃতিক মিষ্টির ঠিকানা"
    : "Al Madina Dates — Nature's Sweetest Gift";
  document.querySelector('meta[name="description"]').content = language === "bn"
    ? "Al Madina Dates থেকে সেরা মানের খেজুর কিনুন। সারা বাংলাদেশে হোম ডেলিভারি।"
    : "Shop premium quality dates from Al Madina Dates, carefully selected and delivered across Bangladesh.";

  staticTextNodes.forEach(({ node, english }) => {
    const trimmed = english.trim();
    const translated = language === "bn" ? bengaliText.get(trimmed) : trimmed;
    if (!translated) return;
    const start = english.indexOf(trimmed);
    node.nodeValue = `${english.slice(0, start)}${translated}${english.slice(start + trimmed.length)}`;
  });

  localizedAttributes.forEach(([selector, attribute, english, bengali]) => {
    const element = document.querySelector(selector);
    if (element) element.setAttribute(attribute, language === "bn" ? bengali : english);
  });
  document.querySelectorAll(".review-stars").forEach((element) => {
    element.setAttribute("aria-label", language === "bn" ? "পাঁচ তারকা" : "Five stars");
  });
  document.querySelector(".menu-toggle").setAttribute(
    "aria-label",
    language === "bn"
      ? (document.querySelector("#primary-nav").classList.contains("is-open") ? "মেনু বন্ধ করুন" : "মেনু খুলুন")
      : (document.querySelector("#primary-nav").classList.contains("is-open") ? "Close menu" : "Open menu")
  );
  languageSwitch.querySelectorAll("[data-language]").forEach((button) => {
    const isActive = button.dataset.language === language;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });
  toast.classList.remove("is-visible");

  renderProducts();
  populateOrderProducts();
  updateCart();
}

function renderProducts() {
  const filtered = products.filter((product) => {
    const matchesFilter = activeFilter === "all" || product.tags.includes(activeFilter);
    const searchable = `${product.name} ${product.nameBn} ${product.english} ${product.englishBn} ${product.origin} ${product.originBn}`.toLocaleLowerCase();
    return matchesFilter && searchable.includes(searchTerm.toLocaleLowerCase());
  });

  document.querySelector(".product-count").textContent = `${formatNumber(filtered.length)} ${language === "bn" ? "টি পণ্য" : "products"}`;

  if (!filtered.length) {
    productGrid.innerHTML = `<p class="no-results">${language === "bn" ? "দুঃখিত, এই নামে কোনো খেজুর পাওয়া যায়নি। অন্য নামে খুঁজে দেখুন।" : "No dates found. Try another name or search term."}</p>`;
    return;
  }

  productGrid.innerHTML = filtered.map((product, index) => `
    <article class="product-card" style="animation-delay:${index * 55}ms">
      <div class="product-photo">
        <img src="${product.image}" alt="${productText(product, "name")}" loading="lazy">
        <span class="product-badge">${productText(product, "badge")}</span>
      </div>
      <div class="product-info">
        <div class="product-meta"><span>${productText(product, "english")}</span><span class="product-rating">★ ${productText(product, "rating")} <span>(${language === "bn" ? "ক্রেতা রেটিং" : "customer rating"})</span></span></div>
        <h3>${productText(product, "name")}</h3>
        <p class="product-origin">${productText(product, "origin")}</p>
        <div class="product-bottom">
          <span class="product-price">${formatPrice(product.price)}<small>${productText(product, "weight")} · ${language === "bn" ? "প্রতি প্যাকেট" : "per pack"}</small></span>
          <button class="add-cart" type="button" data-add="${product.id}" aria-label="${language === "bn" ? `${productText(product, "name")} কার্টে যোগ করুন` : `Add ${productText(product, "name")} to cart`}">+</button>
        </div>
      </div>
    </article>
  `).join("");
}

function saveCart() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.warn("Could not save the cart on this device.", error);
  }
}

function addToCart(productId) {
  const product = products.find((item) => item.id === productId);
  if (!product) return;
  const existing = cart.find((item) => item.id === productId);
  if (existing) existing.quantity += 1;
  else cart.push({ id: productId, quantity: 1 });
  updateCart();
  showToast(language === "bn"
    ? `${productText(product, "name")} আপনার কার্টে যোগ হয়েছে`
    : `${productText(product, "name")} added to your cart`);
}

function updateCart() {
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  document.querySelector(".cart-count").textContent = formatNumber(count);
  document.querySelector(".drawer-count").textContent = `(${formatNumber(count)})`;
  cartEmpty.classList.toggle("is-visible", cart.length === 0);
  cartCheckout.hidden = cart.length === 0;

  cartItems.innerHTML = cart.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `
      <article class="cart-row">
        <img src="${product.image}" alt="">
        <div>
          <h3>${productText(product, "name")}</h3>
          <span class="cart-unit-price">${formatPrice(product.price)} · ${productText(product, "weight")}</span>
          <div class="quantity-control" aria-label="${language === "bn" ? `${productText(product, "name")} পরিমাণ` : `${productText(product, "name")} quantity`}">
            <button type="button" data-quantity="${product.id}" data-change="-1" aria-label="${language === "bn" ? "একটি কমান" : "Decrease quantity"}">−</button>
            <span>${formatNumber(item.quantity)}</span>
            <button type="button" data-quantity="${product.id}" data-change="1" aria-label="${language === "bn" ? "একটি বাড়ান" : "Increase quantity"}">+</button>
          </div>
        </div>
        <div class="cart-row-end">
          <span class="cart-line-total">${formatPrice(product.price * item.quantity)}</span>
          <button class="remove-item" type="button" data-remove="${product.id}">${language === "bn" ? "সরান" : "Remove"}</button>
        </div>
      </article>
    `;
  }).join("");

  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  document.querySelector("#cart-total").textContent = formatPrice(total);
  saveCart();
}

function changeQuantity(productId, amount) {
  const item = cart.find((entry) => entry.id === productId);
  if (!item) return;
  item.quantity += amount;
  if (item.quantity <= 0) removeFromCart(productId);
  else updateCart();
}

function removeFromCart(productId) {
  const index = cart.findIndex((item) => item.id === productId);
  if (index !== -1) cart.splice(index, 1);
  updateCart();
  const product = products.find((item) => item.id === productId);
  if (product) showToast(language === "bn"
    ? `${productText(product, "name")} কার্ট থেকে সরানো হয়েছে`
    : `${productText(product, "name")} removed from your cart`);
}

function openCart() {
  drawerBackdrop.hidden = false;
  requestAnimationFrame(() => {
    drawerBackdrop.classList.add("is-open");
    cartDrawer.classList.add("is-open");
    cartDrawer.setAttribute("aria-hidden", "false");
    document.body.classList.add("drawer-open");
    document.querySelector(".drawer-close").focus();
  });
}

function closeCart() {
  drawerBackdrop.classList.remove("is-open");
  cartDrawer.classList.remove("is-open");
  cartDrawer.setAttribute("aria-hidden", "true");
  document.body.classList.remove("drawer-open");
  window.setTimeout(() => { drawerBackdrop.hidden = true; }, 260);
  document.querySelector(".cart-trigger").focus();
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("is-visible"), 2600);
}

function openWhatsApp(message) {
  const url = `https://wa.me/?text=${encodeURIComponent(message)}`;
  const openedWindow = window.open(url, "_blank");
  if (openedWindow) openedWindow.opener = null;
  if (!openedWindow) window.location.href = url;
}

function orderMessage({ name, phone, address, items, total }) {
  const itemLines = items.map((item) => {
    const product = products.find((entry) => entry.id === item.id);
    return `• ${productText(product, "name")} (${productText(product, "weight")}) × ${formatNumber(item.quantity)} = ${formatPrice(product.price * item.quantity)}`;
  });
  return [
    language === "bn"
      ? "আসসালামু আলাইকুম, Al Madina Dates থেকে অর্ডার করতে চাই।"
        : "Hello Al Madina Dates, I would like to place an order.",
    "",
    ...itemLines,
    ...(total === null ? [] : ["", `${language === "bn" ? "পণ্যের মোট" : "Subtotal"}: ${formatPrice(total)}`]),
    "",
    `${language === "bn" ? "নাম" : "Name"}: ${name}`,
    `${language === "bn" ? "ফোন" : "Phone"}: ${phone}`,
    `${language === "bn" ? "ডেলিভারি ঠিকানা" : "Delivery address"}: ${address}`
  ].join("\n");
}

document.querySelector("#product-search").addEventListener("input", (event) => {
  searchTerm = event.target.value.trim();
  renderProducts();
});

document.querySelector(".product-tabs").addEventListener("click", (event) => {
  const button = event.target.closest("[data-filter]");
  if (!button) return;
  activeFilter = button.dataset.filter;
  document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip === button));
  renderProducts();
});

productGrid.addEventListener("click", (event) => {
  const button = event.target.closest("[data-add]");
  if (button) addToCart(button.dataset.add);
});

cartItems.addEventListener("click", (event) => {
  const quantityButton = event.target.closest("[data-quantity]");
  const removeButton = event.target.closest("[data-remove]");
  if (quantityButton) changeQuantity(quantityButton.dataset.quantity, Number(quantityButton.dataset.change));
  if (removeButton) removeFromCart(removeButton.dataset.remove);
});

document.querySelector(".cart-trigger").addEventListener("click", openCart);
document.querySelector(".drawer-close").addEventListener("click", closeCart);
drawerBackdrop.addEventListener("click", closeCart);
document.querySelector(".continue-shopping").addEventListener("click", () => {
  closeCart();
  document.querySelector("#products").scrollIntoView({ behavior: "smooth" });
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && cartDrawer.classList.contains("is-open")) closeCart();
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const button = event.currentTarget;
  const nav = document.querySelector("#primary-nav");
  const isOpen = nav.classList.toggle("is-open");
  button.setAttribute("aria-expanded", String(isOpen));
  button.setAttribute("aria-label", language === "bn"
    ? (isOpen ? "মেনু বন্ধ করুন" : "মেনু খুলুন")
    : (isOpen ? "Close menu" : "Open menu"));
});
document.querySelectorAll("#primary-nav a").forEach((link) => {
  link.addEventListener("click", () => {
    document.querySelector("#primary-nav").classList.remove("is-open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
    document.querySelector(".menu-toggle").setAttribute("aria-label", language === "bn" ? "মেনু খুলুন" : "Open menu");
  });
});

document.querySelectorAll("[data-category-search]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.categorySearch;
    if (filter === "premium" || filter === "saudi" || filter === "value") {
      activeFilter = filter;
      document.querySelectorAll(".filter-chip").forEach((chip) => chip.classList.toggle("is-active", chip.dataset.filter === filter));
    }
    searchTerm = "";
    document.querySelector("#product-search").value = "";
    renderProducts();
  });
});

const orderProductSelect = document.querySelector("#order-product");
function populateOrderProducts() {
  const selectedProduct = orderProductSelect.value;
  orderProductSelect.innerHTML = `<option value="" selected disabled>${language === "bn" ? "পণ্য বেছে নিন" : "Select a product"}</option>` +
    products.map((product) => `<option value="${product.id}">${productText(product, "name")} — ${formatPrice(product.price)} / ${productText(product, "weight")}</option>`).join("");
  if (selectedProduct) orderProductSelect.value = selectedProduct;
}

languageSwitch.addEventListener("click", (event) => {
  const selectedButton = event.target.closest("[data-language]");
  if (!selectedButton || selectedButton.dataset.language === language) return;
  language = selectedButton.dataset.language;
  try {
    localStorage.setItem(LANGUAGE_KEY, language);
  } catch (error) {
    console.warn("Could not save the language preference.", error);
  }
  applyLanguage();
});

document.querySelector("#contact-order-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity()) return;
  const data = new FormData(form);
  const message = orderMessage({
    name: data.get("name").trim(),
    phone: data.get("phone").trim(),
    address: data.get("address").trim(),
    items: [{ id: data.get("product"), quantity: Number(data.get("quantity")) }],
    total: null
  });
  openWhatsApp(message);
});

document.querySelector("#checkout-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const form = event.currentTarget;
  if (!form.reportValidity() || cart.length === 0) return;
  const data = new FormData(form);
  const total = cart.reduce((sum, item) => {
    const product = products.find((entry) => entry.id === item.id);
    return sum + product.price * item.quantity;
  }, 0);
  const message = orderMessage({
    name: data.get("name").trim(),
    phone: data.get("phone").trim(),
    address: data.get("address").trim(),
    items: cart.map((item) => ({ ...item })),
    total
  });
  openWhatsApp(message);
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll(".trust-inner, .category-card, .offer-card, .benefit-card, .about-images, .review-card").forEach((element) => {
  element.classList.add("reveal");
  revealObserver.observe(element);
});

applyLanguage();
