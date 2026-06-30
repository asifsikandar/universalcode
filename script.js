const products = [
  { id: 1, name: 'Urban Explorer Case', price: 89, category: 'tech', emoji: '🎒', description: 'Weather-ready carryall for every commute.' },
  { id: 2, name: 'Lumen Headphones', price: 129, category: 'tech', emoji: '🎧', description: 'Immersive audio with soft-touch finish.' },
  { id: 3, name: 'Aero Knit Jacket', price: 114, category: 'fashion', emoji: '🧥', description: 'Stretch comfort with polished detailing.' },
  { id: 4, name: 'Halo Ceramic Lamp', price: 79, category: 'home', emoji: '💡', description: 'Warm ambient lighting for cozy evenings.' },
  { id: 5, name: 'Studio Tote', price: 69, category: 'fashion', emoji: '👜', description: 'Thoughtfully designed for daily essentials.' },
  { id: 6, name: 'Nova Desk Set', price: 54, category: 'home', emoji: '🖊️', description: 'A refined setup for focused workdays.' },
];

const state = {
  activeFilter: 'all',
  cart: JSON.parse(localStorage.getItem('northstar-cart') || '[]'),
};

const productGrid = document.getElementById('productGrid');
const cartItems = document.getElementById('cartItems');
const cartCount = document.getElementById('cartCount');
const cartTotal = document.getElementById('cartTotal');
const cartDrawer = document.getElementById('cartDrawer');
const overlay = document.getElementById('overlay');
const cartToggle = document.getElementById('cartToggle');
const closeCart = document.getElementById('closeCart');
const filters = document.querySelectorAll('.filter');

function renderProducts() {
  const visibleProducts = products.filter((product) => {
    return state.activeFilter === 'all' ? true : product.category === state.activeFilter;
  });

  productGrid.innerHTML = visibleProducts
    .map(
      (product) => `
        <article class="product-card">
          <div class="product-emoji">${product.emoji}</div>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
          <div class="product-meta">
            <span class="product-price">$${product.price}</span>
            <button class="btn btn-primary add-to-cart" data-id="${product.id}">Add</button>
          </div>
        </article>
      `
    )
    .join('');
}

function saveCart() {
  localStorage.setItem('northstar-cart', JSON.stringify(state.cart));
}

function updateCart() {
  const itemCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
  const total = state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  cartCount.textContent = itemCount;
  cartTotal.textContent = `$${total}`;

  if (state.cart.length === 0) {
    cartItems.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  cartItems.innerHTML = state.cart
    .map(
      (item) => `
        <div class="cart-item">
          <div>
            <strong>${item.name}</strong>
            <div>$${item.price}</div>
            <div class="cart-qty">
              <button data-action="decrease" data-id="${item.id}">−</button>
              <span>${item.quantity}</span>
              <button data-action="increase" data-id="${item.id}">+</button>
            </div>
          </div>
          <strong>$${item.price * item.quantity}</strong>
        </div>
      `
    )
    .join('');
}

function addToCart(id) {
  const product = products.find((item) => item.id === Number(id));
  if (!product) return;

  const existingItem = state.cart.find((item) => item.id === product.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    state.cart.push({ ...product, quantity: 1 });
  }

  saveCart();
  updateCart();
  openCart();
}

function changeQuantity(id, action) {
  const item = state.cart.find((entry) => entry.id === Number(id));
  if (!item) return;

  if (action === 'increase') item.quantity += 1;
  if (action === 'decrease') item.quantity -= 1;

  if (item.quantity <= 0) {
    state.cart = state.cart.filter((entry) => entry.id !== Number(id));
  }

  saveCart();
  updateCart();
}

function openCart() {
  cartDrawer.classList.add('open');
  overlay.classList.add('show');
  cartDrawer.setAttribute('aria-hidden', 'false');
}

function closeDrawer() {
  cartDrawer.classList.remove('open');
  overlay.classList.remove('show');
  cartDrawer.setAttribute('aria-hidden', 'true');
}

filters.forEach((filterButton) => {
  filterButton.addEventListener('click', () => {
    filters.forEach((button) => button.classList.remove('active'));
    filterButton.classList.add('active');
    state.activeFilter = filterButton.dataset.filter;
    renderProducts();
  });
});

document.addEventListener('click', (event) => {
  const addButton = event.target.closest('.add-to-cart');
  if (addButton) {
    addToCart(addButton.dataset.id);
    return;
  }

  const qtyButton = event.target.closest('[data-action]');
  if (qtyButton) {
    changeQuantity(qtyButton.dataset.id, qtyButton.dataset.action);
  }
});

cartToggle.addEventListener('click', openCart);
closeCart.addEventListener('click', closeDrawer);
overlay.addEventListener('click', closeDrawer);

document.querySelector('.newsletter form').addEventListener('submit', (event) => {
  event.preventDefault();
  alert('Thanks for subscribing!');
});

renderProducts();
updateCart();
