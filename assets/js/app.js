const header = document.querySelector("#site-header");
const footer = document.querySelector("#site-footer");
const page = document.body.dataset.page || "home";
const whatsapp = "2349025644471";
const navItems = [["Home","index.html","home"],["Cakes","cakes.html","cakes"],["Pastries & drinks","pastries.html","pastries"],["Our story","about.html","about"],["Contact","contact.html","contact"]];

if (header) {
  header.innerHTML = `<div class="topbar"><div class="container topbar-inner"><span>KADUNA, NIGERIA</span><span>FRESHLY BAKE, WITH LOVE <i>✳</i></span><a href="https://wa.me/${whatsapp}" target="_blank" rel="noopener">ORDER ON WHATSAPP ↗</a></div></div><header class="site-header"><div class="container nav-wrap"><a class="brand" href="index.html" aria-label="Mimi Pastry home"><img src="assets/img/mimi-mark.svg" alt=""><span><b>MIMI</b><small>PASTRY</small></span></a><button class="menu-toggle" type="button" aria-label="Open navigation" aria-expanded="false" aria-controls="main-navigation"><span></span><span></span></button><nav class="main-nav" id="main-navigation" aria-label="Main navigation">${navItems.map(([label,url,key])=>`<a href="${url}" ${page===key?'aria-current="page"':''}>${label}</a>`).join("")}<a class="nav-order" href="https://wa.me/${whatsapp}?text=Hello%20Mimi%20Pastry%2C%20I%27d%20like%20to%20place%20an%20order." target="_blank" rel="noopener">Order now ↗</a></nav></div></header>`;
}
if (footer) {
  footer.innerHTML = `<footer class="site-footer"><div class="container footer-main"><div class="footer-brand"><a class="brand brand-light" href="index.html"><img src="assets/img/mimi-mark.svg" alt=""><span><b>MIMI</b><small>PASTRY</small></span></a><p>Beautiful bakes, delicious treats<br>and a little sweetness in every moment.</p><span class="footer-slogan">FRESHLY BAKE, WITH LOVE ✳</span></div><div class="footer-col"><span>EXPLORE</span><a href="cakes.html">Wedding & birthday cakes</a><a href="pastries.html">Pastries & drinks</a><a href="about.html">Our story</a><a href="contact.html">Contact us</a></div><div class="footer-col"><span>COME SAY HELLO</span><a href="tel:+2349025644471">0902 564 4471</a><a href="mailto:goodnessbeauty@gmail.com">goodnessbeauty@gmail.com</a><p>Kaduna, Nigeria</p><a href="https://wa.me/${whatsapp}" target="_blank" rel="noopener">WhatsApp ↗</a></div></div><div class="container footer-bottom"><span>© <span id="year"></span> Mimi Pastry. All rights reserved.</span><span>Designed and developed by <a class="credit-link" href="#" aria-label="Miracode portfolio — portfolio URL to be added">Miracode</a></span><a href="#top" class="back-top">BACK TO TOP ↑</a></div></footer>`;
}
const year = document.querySelector("#year");
if (year) year.textContent = String(new Date().getFullYear());

const toggle = document.querySelector(".menu-toggle");
const nav = document.querySelector(".main-nav");
function closeMenu() {
  toggle?.setAttribute("aria-expanded","false");
  toggle?.setAttribute("aria-label","Open navigation");
  nav?.classList.remove("is-open");
  document.body.classList.remove("nav-open");
}
toggle?.addEventListener("click", () => {
  const open = toggle.getAttribute("aria-expanded") === "true";
  toggle.setAttribute("aria-expanded", String(!open));
  toggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  nav?.classList.toggle("is-open", !open);
  document.body.classList.toggle("nav-open", !open);
  if (!open) nav?.querySelector("a")?.focus();
});
nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", event => { if (event.key === "Escape") closeMenu(); });
window.addEventListener("resize", () => { if (window.innerWidth > 700) closeMenu(); });

const orderForm = document.querySelector("#order-form");
orderForm?.addEventListener("submit", event => {
  event.preventDefault();
  if (!orderForm.reportValidity()) return;
  const data = new FormData(orderForm);
  const fields = [
    "Hello Mimi Pastry! I'd like to make an order enquiry.",
    "Name: " + data.get("name"),
    "Interested in: " + data.get("item"),
    data.get("date") ? "Needed by: " + data.get("date") : "",
    data.get("details") ? "Details: " + data.get("details") : ""
  ].filter(Boolean);
  window.open("https://wa.me/" + whatsapp + "?text=" + encodeURIComponent(fields.join("\n")), "_blank", "noopener,noreferrer");
});

const revealTargets = document.querySelectorAll(".feature-card,.gallery-card,.menu-card,.steps>div,.values-grid>div,.story-image,.order-photo,.contact-details>div");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(entries => entries.forEach(entry => {
    if (entry.isIntersecting) { entry.target.classList.add("is-visible"); observer.unobserve(entry.target); }
  }), { threshold: .12 });
  revealTargets.forEach(element => { element.classList.add("reveal"); observer.observe(element); });
} else revealTargets.forEach(element => element.classList.add("is-visible"));
