const label = document.getElementById("label");
const shoppingCart = document.getElementById("shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];
let calculation = () => {
  let amount = basket.reduce((acc, i) => acc + i.item, 0);
  document.getElementById("cart-amount").innerText = amount;
};
calculation();

const generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((x) => {
        const { id, item } = x;
        let search = shopItemsData.find((i) => i.id === id);
        let pricePerItem = search.price * item;
        return `
        <div class="cart-item">
          <img width="100" src=${search.img} alt="" />
          <div class="details">
            <div class="title-price-x">
                <h4><span>${search.name}<span class="cart-item-price">$ ${search.price}</span></h4>
                <i class="bi bi-x-lg" onclick="removeItem(${id})"></i>
            </div>
          <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${item}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
          </div>
          <h3>$ ${pricePerItem}</h3>
         </div>
        </div>
           `;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
      <h2>Cart is Empty</h2>
      <a href="index.html"><button class="HomeBtn"> Back to Home</button></a>
      `;
  }
};
generateCartItems();

let decrement = (id) => {
  let selectedItem = id;
  let search = basket.find((i) => i.id === selectedItem.id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }

  update(selectedItem.id);
  basket = basket.filter((i) => i.item !== 0);
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};

let increment = (id) => {
  let selectedItem = id;
  let search = basket.find((i) => i.id === selectedItem.id);
  if (search === undefined) {
    basket.push({
      id: selectedItem.id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((i) => i.id === id);
  document.getElementById(id).innerText = search.item;
  calculation();
  totalAmount();
};

const removeItem = (id) => {
  let selectedItem = id;
  basket = basket.filter((i) => i.id !== selectedItem.id);
  generateCartItems();
  calculation();
  totalAmount();
  localStorage.setItem("data", JSON.stringify(basket));
};

const clearCart = () => {
  basket = [];
  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
  calculation();
};

const totalAmount = () => {
  if (basket.length !== 0) {
    let total = basket.reduce(
      (acc, i) => acc + i.item * shopItemsData.find((x) => x.id === i.id).price,
      0
    );
    label.innerHTML = `
    <h2>Total Bill : $ ${total}</h2>
    <button class="checkout">Checkout</button>
    <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
  } else return;
};
totalAmount();
