const products = [
  { id: 1, name: 'Urban Explorer Case', price: 89, category: 'tech', emoji: '🎒', description: 'Weather-ready carryall for every commute.' },
  { id: 2, name: 'Lumen Headphones', price: 129, category: 'tech', emoji: '🎧', description: 'Immersive audio with soft-touch finish.' },
  { id: 3, name: 'Aero Knit Jacket', price: 114, category: 'fashion', emoji: '🧥', description: 'Stretch comfort with polished detailing.' },
  { id: 4, name: 'Halo Ceramic Lamp', price: 79, category: 'home', emoji: '💡', description: 'Warm ambient lighting for cozy evenings.' },
  { id: 5, name: 'Studio Tote', price: 69, category: 'fashion', emoji: '👜', description: 'Thoughtfully designed for daily essentials.' },
  { id: 6, name: 'Nova Desk Set', price: 54, category: 'home', emoji: '🖊️', description: 'A refined setup for focused workdays.' },
];

const grid = document.getElementById('shopProductGrid');

if (grid) {
  grid.innerHTML = products
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-emoji">${product.emoji}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <span class="product-price">$${product.price}</span>
            <a class="btn btn-primary" href="checkout.html">Buy now</a>
          </div>
        </article>
      `
    )
    .join('');
}
