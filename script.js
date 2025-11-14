/* E-commerce frontend script
   - Renders product grids (featured & all)
   - Renders product detail page
   - Implements cart using localStorage with add/update/remove
*/

const products = [
  // Hardware (15)
  { id: 1, name: "Cordless Drill", category: "Hardware", price: 2499, image: "https://picsum.photos/seed/cordless-drill/600/400", description: "Compact cordless drill with two-speed gearbox and two batteries." },
  { id: 2, name: "Claw Hammer", category: "Hardware", price: 499, image: "https://picsum.photos/seed/claw-hammer/600/400", description: "Steel head claw hammer with ergonomic non-slip handle." },
  { id: 3, name: "Wrench Set (10pc)", category: "Hardware", price: 899, image: "https://picsum.photos/seed/wrench-set/600/400", description: "Chrome vanadium wrench set in a compact roll-up pouch." },
  { id: 4, name: "Screwdriver Set (10pc)", category: "Hardware", price: 699, image: "https://picsum.photos/seed/screwdriver-set/600/400", description: "Magnetic tips and comfortable handles for precision work." },
  { id: 5, name: "Pliers Set", category: "Hardware", price: 599, image: "https://picsum.photos/seed/pliers/600/400", description: "Includes needle-nose, cutting and slip-joint pliers." },
  { id: 6, name: "Tape Measure 8m", category: "Hardware", price: 249, image: "https://picsum.photos/seed/tape-measure/600/400", description: "Durable tape measure with easy-lock and belt clip." },
  { id: 7, name: "Utility Knife", category: "Hardware", price: 199, image: "https://picsum.photos/seed/utility-knife/600/400", description: "Retractable blade with quick-change mechanism." },
  { id: 8, name: "Toolbox (Steel)", category: "Hardware", price: 1999, image: "https://picsum.photos/seed/toolbox/600/400", description: "Heavy-duty steel toolbox with removable tray and lockable latch." },
  { id: 9, name: "Socket Set (24pc)", category: "Hardware", price: 2199, image: "https://picsum.photos/seed/socket-set/600/400", description: "Full metric socket set with ratchet and extensions." },
  { id: 10, name: "Adjustable Spanner", category: "Hardware", price: 349, image: "https://picsum.photos/seed/spanner/600/400", description: "Adjustable spanner with precision jaws and chrome finish." },
  { id: 11, name: "Box of Nails (1kg)", category: "Hardware", price: 149, image: "https://picsum.photos/seed/nails/600/400", description: "High-quality steel nails for general construction." },
  { id: 12, name: "Bolts & Nuts Kit", category: "Hardware", price: 299, image: "https://picsum.photos/seed/bolts/600/400", description: "Mixed sizes of bolts, nuts and washers in a sturdy box." },
  { id: 13, name: "6ft Aluminum Ladder", category: "Hardware", price: 2599, image: "https://picsum.photos/seed/aluminum-ladder/600/400", description: "Lightweight, foldable ladder with anti-slip feet." },
  { id: 14, name: "Hand Saw", category: "Hardware", price: 399, image: "https://picsum.photos/seed/hand-saw/600/400", description: "Durable hand saw for wood cutting with comfortable grip." },
  { id: 15, name: "Chisel Set", category: "Hardware", price: 549, image: "https://picsum.photos/seed/chisel/600/400", description: "Set of hardened steel chisels for woodworking and masonry." },

  // Paints (15)
  { id: 16, name: "Interior Paint 5L", category: "Paints", price: 1199, image: "https://picsum.photos/seed/interior-paint/600/400", description: "Premium washable interior emulsion with low VOC." },
  { id: 17, name: "Floor Paint 10L", category: "Paints", price: 3599, image: "https://picsum.photos/seed/floor-paint/600/400", description: "Durable floor paint suitable for garage and workshop floors." },
  { id: 18, name: "Brush Set (3pc)", category: "Paints", price: 249, image: "https://picsum.photos/seed/brush-set/600/400", description: "Quality nylon and natural bristle brushes for smooth finishes." },
  { id: 19, name: "Roller Kit", category: "Paints", price: 349, image: "https://picsum.photos/seed/roller/600/400", description: "Roller set with tray and extension handle for ceilings and walls." },
  { id: 20, name: "Primer 5L", category: "Paints", price: 899, image: "https://picsum.photos/seed/primer/600/400", description: "Universal primer for better adhesion and longer-lasting finish." },
  { id: 21, name: "Exterior Paint 10L", category: "Paints", price: 3999, image: "https://picsum.photos/seed/exterior-paint/600/400", description: "Weather-resistant exterior paint with UV protection." },
  { id: 22, name: "Wood Stain 2L", category: "Paints", price: 799, image: "https://picsum.photos/seed/wood-stain/600/400", description: "Penetrating wood stain that enhances grain and durability." },
  { id: 23, name: "Spray Paint (Assorted)", category: "Paints", price: 299, image: "https://picsum.photos/seed/spray-paint/600/400", description: "High-coverage spray paint for metal and plastic surfaces." },
  { id: 24, name: "Paint Thinner 1L", category: "Paints", price: 199, image: "https://picsum.photos/seed/thinner/600/400", description: "Solvent for cleaning brushes and thinning oil-based paints." },
  { id: 25, name: "Painter's Tape", category: "Paints", price: 149, image: "https://picsum.photos/seed/tape/600/400", description: "Low-residue tape for crisp paint lines and masking." },
  { id: 26, name: "Putty 1kg", category: "Paints", price: 199, image: "https://picsum.photos/seed/putty/600/400", description: "Ready-mix putty for surface repairs and smoothing walls." },
  { id: 27, name: "Sandpaper Pack", category: "Paints", price: 129, image: "https://picsum.photos/seed/sandpaper/600/400", description: "Assorted grit sandpaper set for preparation and finishing." },
  { id: 28, name: "Gloss Paint 1L", category: "Paints", price: 549, image: "https://picsum.photos/seed/gloss-paint/600/400", description: "High-gloss enamel for trims and cabinets." },
  { id: 29, name: "Emulsion 10L", category: "Paints", price: 2999, image: "https://picsum.photos/seed/emulsion/600/400", description: "Matte emulsion for large interior surfaces; easy to apply." },
  { id: 30, name: "Paint Tray Set", category: "Paints", price: 199, image: "https://picsum.photos/seed/paint-tray/600/400", description: "Reusable paint tray with liner for easy cleanup." },

  // Electricals (15)
  { id: 31, name: "LED Bulb 9W", category: "Electricals", price: 299, image: "https://picsum.photos/seed/led-bulb/600/400", description: "Energy-efficient LED bulb, warm white, long life." },
  { id: 32, name: "Extension Cord 5m", category: "Electricals", price: 899, image: "https://picsum.photos/seed/extension-cord/600/400", description: "Heavy-duty extension cord with grounded plug and surge protection." },
  { id: 33, name: "Wall Socket Outlet", category: "Electricals", price: 249, image: "https://picsum.photos/seed/socket/600/400", description: "Standard 3-pin wall socket outlet with safety shutter." },
  { id: 34, name: "Ceiling Fan 48in", category: "Electricals", price: 3499, image: "https://picsum.photos/seed/ceiling-fan/600/400", description: "Quiet, energy-efficient ceiling fan with remote control." },
  { id: 35, name: "Table Fan 16in", category: "Electricals", price: 1299, image: "https://picsum.photos/seed/table-fan/600/400", description: "Adjustable table fan with multiple speed settings." },
  { id: 36, name: "Rechargeable Lantern", category: "Electricals", price: 799, image: "https://picsum.photos/seed/lantern/600/400", description: "Portable LED lantern with USB charging and long battery life." },
  { id: 37, name: "Circuit Breaker 20A", category: "Electricals", price: 499, image: "https://picsum.photos/seed/circuit-breaker/600/400", description: "Miniature circuit breaker for household electrical panels." },
  { id: 38, name: "Copper Wire 50m", category: "Electricals", price: 1599, image: "https://picsum.photos/seed/copper-wire/600/400", description: "High-quality insulated copper wire for electrical installations." },
  { id: 39, name: "Smart Bulb (WiFi)", category: "Electricals", price: 899, image: "https://picsum.photos/seed/smart-bulb/600/400", description: "Color-changing smart bulb controlled via app or voice assistant." },
  { id: 40, name: "Dimmer Switch", category: "Electricals", price: 599, image: "https://picsum.photos/seed/dimmer/600/400", description: "Wall-mounted dimmer switch compatible with LED lights." },
  { id: 41, name: "Power Strip (6-way)", category: "Electricals", price: 449, image: "https://picsum.photos/seed/power-strip/600/400", description: "Surge-protected power strip with individual switches." },
  { id: 42, name: "Fuse Pack (assorted)", category: "Electricals", price: 179, image: "https://picsum.photos/seed/fuse/600/400", description: "Assorted automotive and mains fuses in a handy pack." },
  { id: 43, name: "LED Downlight 6W", category: "Electricals", price: 349, image: "https://picsum.photos/seed/downlight/600/400", description: "Recessed LED downlight with cool white output." },
  { id: 44, name: "Light Fixture - Pendant", category: "Electricals", price: 1299, image: "https://picsum.photos/seed/pendant/600/400", description: "Stylish pendant light suitable for dining and kitchen islands." },
  { id: 45, name: "Inverter Battery 12V", category: "Electricals", price: 5999, image: "https://picsum.photos/seed/inverter-battery/600/400", description: "Maintenance-free inverter battery for backup power." }
];

// Formatting utility
function formatPrice(value) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value);
}

// Cart storage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem('cart') || '[]');
  } catch (e) {
    return [];
  }
}

function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  const countEl = document.getElementById('cart-count');
  if (!countEl) return;
  const total = getCart().reduce((s, it) => s + it.qty, 0);
  countEl.textContent = total;
}

// Add item to cart (or increase qty)
function addToCart(productId, qty = 1) {
  const prod = products.find(p => p.id === Number(productId));
  if (!prod) return;
  const cart = getCart();
  const existing = cart.find(i => i.id === prod.id);
  if (existing) existing.qty += qty;
  else cart.push({ id: prod.id, name: prod.name, price: prod.price, image: prod.image, qty });
  saveCart(cart);
  showToast(`${prod.name} added to cart`);
}

function updateCartItem(id, qty) {
  const cart = getCart();
  const idx = cart.findIndex(i => i.id === Number(id));
  if (idx > -1) {
    if (qty <= 0) cart.splice(idx, 1);
    else cart[idx].qty = qty;
    saveCart(cart);
    renderCart();
  }
}

function removeFromCart(id) {
  const cart = getCart().filter(i => i.id !== Number(id));
  saveCart(cart);
  renderCart();
}

// Small transient toast
function showToast(message) {
  const t = document.createElement('div');
  t.className = 'fixed bottom-6 right-6 bg-indigo-600 text-white px-4 py-2 rounded shadow';
  t.textContent = message;
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 2000);
}

// Render grids
function renderProductsGrid(containerId = 'product-container', list = products) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = '';
  list.forEach(p => {
    const card = document.createElement('article');
    card.className = 'bg-white rounded-lg shadow overflow-hidden';

    card.innerHTML = `
      <a href="product.html?id=${p.id}" class="block">
        <img src="${p.image}" alt="${p.name}" loading="lazy" class="w-full h-44 object-cover">
      </a>
        <div class="p-4">
          <a href="product.html?id=${p.id}" class="text-lg font-semibold text-gray-900 hover:underline">${p.name}</a>
          <p class="text-sm text-gray-500">${p.category}</p>
          <div class="mt-3 flex flex-col sm:flex-row items-center sm:justify-between gap-2">
            <div class="font-bold text-indigo-700">${formatPrice(p.price)}</div>
            <button onclick="addToCart(${p.id},1)" class="bg-indigo-600 text-white px-3 py-1 rounded w-full sm:w-auto">Add</button>
          </div>
        </div>
    `;

    container.appendChild(card);
  });
}

function renderFeatured() {
  const featured = products.slice(0, 4);
  renderProductsGrid('featured-container', featured);
}

// --- Categories page support ---
function getCategories() {
  const cats = {};
  products.forEach(p => {
    cats[p.category] = (cats[p.category] || 0) + 1;
  });
  return cats;
}

function renderCategoriesList() {
  const el = document.getElementById('categories-list');
  if (!el) return;
  const cats = getCategories();
  el.innerHTML = '';
  Object.keys(cats).forEach(cat => {
    const card = document.createElement('div');
    card.className = 'bg-white rounded-lg shadow p-4 flex flex-col items-center text-center';
    card.innerHTML = `
      <div class="text-4xl">📦</div>
      <h3 class="font-semibold mt-2">${cat}</h3>
      <div class="text-sm text-gray-600 mt-1">${cats[cat]} products</div>
      <button class="mt-3 bg-indigo-600 text-white px-3 py-1 rounded" data-cat="${cat}">View</button>
    `;
    el.appendChild(card);
    const btn = card.querySelector('button');
    btn.addEventListener('click', () => {
      selectCategory(cat);
      // update URL param
      history.replaceState(null, '', `categories.html?category=${encodeURIComponent(cat)}`);
    });
  });
}

function selectCategory(cat) {
  const heading = document.getElementById('category-heading');
  if (heading) heading.textContent = `${cat} Products`;
  const filtered = products.filter(p => p.category === cat);
  renderProductsGrid('category-products', filtered);
}

function initCategoriesPage() {
  renderCategoriesList();
  // if URL has category param, preselect
  const params = new URLSearchParams(window.location.search);
  const cat = params.get('category');
  if (cat) selectCategory(cat);
  // show all
  const showAll = document.getElementById('show-all-btn');
  if (showAll) {
    showAll.addEventListener('click', () => {
      document.getElementById('category-heading').textContent = 'All Products';
      renderProductsGrid('category-products', products);
      history.replaceState(null, '', 'categories.html');
    });
  }
  // initial default: show all
  renderProductsGrid('category-products', products);
}

// Product details page rendering
function renderProductDetail() {
  const el = document.getElementById('product-detail');
  if (!el) return;
  const params = new URLSearchParams(window.location.search);
  const id = Number(params.get('id'));
  const p = products.find(x => x.id === id);
  if (!p) {
    el.innerHTML = '<p>Product not found.</p>';
    return;
  }
  el.innerHTML = `
    <div class="md:col-span-1">
      <img src="${p.image}" alt="${p.name}" class="w-full h-auto rounded">
    </div>
    <div class="md:col-span-1">
      <h2 class="text-2xl font-bold">${p.name}</h2>
      <p class="text-sm text-gray-500 mb-4">Category: ${p.category}</p>
      <div class="text-2xl font-extrabold text-indigo-700 mb-4">${formatPrice(p.price)}</div>
      <p class="text-gray-700 mb-4">${p.description}</p>
      <div class="flex flex-col sm:flex-row gap-2 items-center">
        <label for="qty" class="sr-only">Quantity</label>
        <input id="qty" type="number" value="1" min="1" class="w-20 px-2 py-1 border rounded" />
        <button id="add-to-cart-btn" class="bg-indigo-600 text-white px-4 py-2 rounded w-full sm:w-auto">Add to cart</button>
      </div>
    </div>
  `;

  document.getElementById('add-to-cart-btn').addEventListener('click', () => {
    const qty = Number(document.getElementById('qty').value) || 1;
    addToCart(p.id, qty);
  });
}

// Render cart page
function renderCart() {
  const el = document.getElementById('cart-container');
  if (!el) return;
  const cart = getCart();
  if (cart.length === 0) {
    el.innerHTML = '<p>Your cart is empty. <a href="products.html" class="text-indigo-600 hover:underline">Shop now</a></p>';
    updateCartCount();
    return;
  }
  let total = 0;
  el.innerHTML = '';
  cart.forEach(item => {
    total += item.price * item.qty;
  const row = document.createElement('div');
  row.className = 'flex flex-col sm:flex-row items-center gap-4 border-b py-4';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-24 h-24 object-cover rounded">
      <div class="flex-1">
        <a href="product.html?id=${item.id}" class="font-semibold text-gray-900 hover:underline">${item.name}</a>
        <div class="text-sm text-gray-600">${formatPrice(item.price)}</div>
      </div>
      <div class="flex items-center gap-2">
        <button class="px-2 py-1 border rounded" onclick="updateCartItem(${item.id}, ${item.qty - 1})">-</button>
        <input type="number" value="${item.qty}" min="1" onchange="updateCartItem(${item.id}, this.value)" class="w-16 text-center border rounded px-1 py-1" />
        <button class="px-2 py-1 border rounded" onclick="updateCartItem(${item.id}, ${item.qty + 1})">+</button>
      </div>
      <div class="w-28 text-right font-semibold">${formatPrice(item.price * item.qty)}</div>
      <div>
        <button class="text-red-600" onclick="removeFromCart(${item.id})">Remove</button>
      </div>
    `;
    el.appendChild(row);
  });

  const footer = document.createElement('div');
  footer.className = 'mt-6 text-right';
  footer.innerHTML = `<div class="text-xl font-bold">Total: ${formatPrice(total)}</div>`;
  el.appendChild(footer);
  updateCartCount();
}

// Create order from current cart and form data
function createOrder(details) {
  const cart = getCart();
  if (cart.length === 0) return { success: false, message: 'Cart empty' };
  const id = 'ORD' + Date.now();
  const total = cart.reduce((s, it) => s + it.price * it.qty, 0);
  const order = {
    id,
    items: cart,
    total,
    customer: {
      name: details.name,
      email: details.email,
      phone: details.phone,
      address: details.address,
      payment: details.payment
    },
    createdAt: new Date().toISOString()
  };
  try {
    const orders = JSON.parse(localStorage.getItem('orders') || '[]');
    orders.push(order);
    localStorage.setItem('orders', JSON.stringify(orders));
    // clear cart
    localStorage.removeItem('cart');
    updateCartCount();
    return { success: true, order };
  } catch (e) {
    return { success: false, message: e.message };
  }
}

// Render checkout summary on checkout page
function renderCheckoutSummary() {
  const el = document.getElementById('checkout-summary');
  if (!el) return;
  const cart = getCart();
  if (cart.length === 0) {
    el.innerHTML = '<p>Your cart is empty. <a href="products.html" class="text-indigo-600 hover:underline">Shop now</a></p>';
    return;
  }
  el.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price * item.qty;
    const row = document.createElement('div');
    row.className = 'flex items-center gap-3';
    row.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="w-16 h-16 object-cover rounded">
      <div class="flex-1">
        <div class="font-semibold">${item.name}</div>
        <div class="text-sm text-gray-600">${item.qty} × ${formatPrice(item.price)}</div>
      </div>
      <div class="font-semibold">${formatPrice(item.price * item.qty)}</div>
    `;
    el.appendChild(row);
  });
  const hr = document.createElement('hr');
  hr.className = 'my-3';
  el.appendChild(hr);
  const totalDiv = document.createElement('div');
  totalDiv.className = 'text-right font-bold';
  totalDiv.textContent = `Total: ${formatPrice(total)}`;
  el.appendChild(totalDiv);
}

// Render order success page
function renderOrderSuccess() {
  const el = document.getElementById('order-success');
  if (!el) return;
  const params = new URLSearchParams(window.location.search);
  const id = params.get('orderId');
  if (!id) {
    el.innerHTML = '<p>Order not found.</p>';
    return;
  }
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const order = orders.find(o => o.id === id);
  if (!order) {
    el.innerHTML = '<p>Order not found.</p>';
    return;
  }
  el.innerHTML = `
    <h2 class="text-2xl font-bold text-green-600">Thank you — your order is confirmed!</h2>
    <p class="mt-2">Order ID: <strong>${order.id}</strong></p>
    <p class="mt-2">Placed on: ${new Date(order.createdAt).toLocaleString()}</p>
    <div class="mt-4 text-left">
      <h3 class="font-semibold">Shipping to</h3>
      <div>${order.customer.name}</div>
      <div>${order.customer.address}</div>
      <div>${order.customer.phone} • ${order.customer.email}</div>
    </div>
    <div class="mt-4">
      <h3 class="font-semibold">Items</h3>
      <ul class="mt-2 space-y-2">
        ${order.items.map(i => `<li class="flex items-center justify-between"><span>${i.qty} × ${i.name}</span><span>${formatPrice(i.price * i.qty)}</span></li>`).join('')}
      </ul>
    </div>
    <div class="mt-4 text-right font-bold">Total: ${formatPrice(order.total)}</div>
  `;
}

// Initialize page-specific renderers
function init() {
  updateCartCount();
  // products grid
  if (document.getElementById('product-container')) {
    renderProductsGrid('product-container', products);
  }
  if (document.getElementById('featured-container')) {
    renderFeatured();
  }
  if (document.getElementById('product-detail')) {
    renderProductDetail();
  }
  if (document.getElementById('cart-container')) {
    renderCart();
    const checkoutBtn = document.getElementById('checkout-btn');
    if (checkoutBtn) checkoutBtn.addEventListener('click', () => { window.location.href = 'checkout.html'; });
  }
  // checkout form page
  if (document.getElementById('checkout-form')) {
    renderCheckoutSummary();
    const form = document.getElementById('checkout-form');
    form.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const fd = new FormData(form);
      const details = {
        name: fd.get('name'),
        email: fd.get('email'),
        phone: fd.get('phone'),
        address: fd.get('address'),
        payment: fd.get('payment')
      };
      // basic validation
      if (!details.name || !details.email || !details.address) {
        showToast('Please fill required fields');
        return;
      }
      const res = createOrder(details);
      if (res.success) {
        // redirect to success page
        window.location.href = `order-success.html?orderId=${res.order.id}`;
      } else {
        showToast('Could not create order');
      }
    });
  }

  // order success page
  if (document.getElementById('order-success')) {
    renderOrderSuccess();
  }

  // categories page
  if (document.getElementById('categories-list') || document.getElementById('category-products')) {
    initCategoriesPage();
  }


  // Newsletter forms handling (homepage and footer)
  if (document.getElementById('newsletter-form')) {
    const nform = document.getElementById('newsletter-form');
    nform.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = new FormData(nform).get('email');
      if (!email) { showToast('Please enter an email'); return; }
      const subs = JSON.parse(localStorage.getItem('subscribers') || '[]');
      if (!subs.includes(email)) subs.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subs));
      showToast('Thanks for subscribing!');
      nform.reset();
    });
  }
  if (document.getElementById('footer-newsletter-form')) {
    const fform = document.getElementById('footer-newsletter-form');
    fform.addEventListener('submit', (ev) => {
      ev.preventDefault();
      const email = new FormData(fform).get('email');
      if (!email) { showToast('Please enter an email'); return; }
      const subs = JSON.parse(localStorage.getItem('subscribers') || '[]');
      if (!subs.includes(email)) subs.push(email);
      localStorage.setItem('subscribers', JSON.stringify(subs));
      showToast('Subscribed — check your inbox');
      fform.reset();
    });
  }
}

// Run init on DOM ready
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
else init();
