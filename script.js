/* E-commerce frontend script
   - Renders product grids (featured & all)
   - Renders product detail page
   - Implements cart using localStorage with add/update/remove
*/

const products = [
  { id: 1, name: "Drill Machine", category: "Hardware", price: 2499, image: "https://picsum.photos/seed/drill/600/400", description: "Powerful cordless drill for all household tasks. Includes 2 batteries and charger." },
  { id: 2, name: "Hammer", category: "Hardware", price: 499, image: "https://picsum.photos/seed/hammer/600/400", description: "Durable claw hammer with shock-absorbing grip." },
  { id: 3, name: "Paint Bucket 5L", category: "Paints", price: 1199, image: "https://picsum.photos/seed/paint/600/400", description: "Premium interior paint, washable and low VOC. Covers approx. 40-50 sqm." },
  { id: 4, name: "LED Bulb", category: "Electricals", price: 299, image: "https://picsum.photos/seed/bulb/600/400", description: "Energy-efficient LED bulb, 9W equivalent, warm white." },
  { id: 5, name: "Wrench Set", category: "Hardware", price: 899, image: "https://picsum.photos/seed/wrench/600/400", description: "Metric wrench set in sturdy carrying case." },
  { id: 6, name: "Screwdriver Set", category: "Hardware", price: 699, image: "https://picsum.photos/seed/screwdriver/600/400", description: "10-piece screwdriver set for precision and power tasks." },
  { id: 7, name: "Floor Paint 10L", category: "Paints", price: 3599, image: "https://picsum.photos/seed/floorpaint/600/400", description: "High-durability floor paint for garages and workshops." },
  { id: 8, name: "Extension Cord 5m", category: "Electricals", price: 899, image: "https://picsum.photos/seed/cord/600/400", description: "Safe, heavy-duty extension cord with grounding." },
  { id: 9, name: "Ladder 6ft", category: "Hardware", price: 2599, image: "https://picsum.photos/seed/ladder/600/400", description: "Lightweight aluminum ladder with anti-slip feet." },
  { id: 10, name: "Brush Set", category: "Paints", price: 249, image: "https://picsum.photos/seed/brush/600/400", description: "Set of 3 brushes for trims and corners." }
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
        <div class="mt-3 flex items-center justify-between">
          <div class="font-bold text-indigo-700">${formatPrice(p.price)}</div>
          <button onclick="addToCart(${p.id},1)" class="bg-indigo-600 text-white px-3 py-1 rounded">Add</button>
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
      <div class="flex gap-2 items-center">
        <label for="qty" class="sr-only">Quantity</label>
        <input id="qty" type="number" value="1" min="1" class="w-20 px-2 py-1 border rounded" />
        <button id="add-to-cart-btn" class="bg-indigo-600 text-white px-4 py-2 rounded">Add to cart</button>
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
    row.className = 'flex items-center gap-4 border-b py-4';
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
