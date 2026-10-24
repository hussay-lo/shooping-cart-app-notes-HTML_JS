function loadData(key, fallback) {
  try {
    const raw = localStorage.getItem(key);
    if (raw) {
      return JSON.parse(raw);
    } else {
      return fallback;
    }
  } catch (error) {
    return fallback;
  }
}

function saveData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('ERROR', error);
  }
}

const CART_KEY = 'cart';

let cart = loadData(CART_KEY, []);

function addToCart(product) {
  const existing = cart.find((item) => item.id === product.id);

  if (existing) {
    existing.qty += 1;
  } else {
    cart.push({ ...product, qty: 1 });
  }

  saveData(CART_KEY, cart);
}

function removeFromCart(id) {
  cart = cart.filter((item) => item.id !== id);
  saveData(CART_KEY, cart);
}
function increaseQty(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    existing.qty += 1;
    saveData(CART_KEY, cart);
  }
}
function decreaseQty(id) {
  const existing = cart.find((item) => item.id === id);
  if (existing) {
    if (existing.qty > 1) {
      existing.qty -= 1;
      saveData(CART_KEY, cart);
    } else {
      cart = cart.filter((item) => item.id !== id);
      saveData(CART_KEY, cart);
    }
  }
}
function getTotal() {
  return cart.reduce((total, item) => total + item.price * item.qty, 0)
}


