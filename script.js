const products = [
  { name: "Drill Machine", category: "Hardware", price: "₹2,499", image: "https://picsum.photos/400/400?drill" },
  { name: "Hammer", category: "Hardware", price: "₹499", image: "https://picsum.photos/400/400?hammer" },
  { name: "Paint Bucket 5L", category: "Paints", price: "₹1,199", image: "https://picsum.photos/400/400?paint" },
  { name: "LED Bulb", category: "Electricals", price: "₹299", image: "https://picsum.photos/400/400?bulb" },
  { name: "Wrench Set", category: "Hardware", price: "₹899", image: "https://picsum.photos/400/400?wrench" },
];

const container = document.getElementById('product-container');
if (container) {
  products.forEach(p => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `<img src="${p.image}" alt="${p.name}">
                      <h3>${p.name}</h3>
                      <p>${p.category}</p>
                      <p><strong>${p.price}</strong></p>`;
    container.appendChild(card);
  });
}