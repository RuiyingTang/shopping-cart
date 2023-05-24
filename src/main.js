let basket = JSON.parse(localStorage.getItem("data")) || [];

let shop = document.getElementById("shop");

let generateShop = () => {
  return (shop.innerHTML = shopItemsData
    .map((item) => {
      let { id, name, price, desc, img } = item;
      let search = basket.find((i) => i.id === id);
      return `
        <div id=product-id-${id} class="item">
    <img width="220" src=${img} alt="" />
    <div class="details">
      <h3>${name}</h3>
      <p>${desc}</p>
      <div class="price-quantity">
        <h2>$ ${price}</h2>
        <div class="buttons">
          <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
          <div id=${id} class="quantity">${search ? search.item : 0}</div>
          <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
        </div>
      </div>
    </div>
  </div>
        `;
    })
    .join(""));
};
generateShop();

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
  update(selectedItem.id);
  localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
  let search = basket.find((i) => i.id === id);
  document.getElementById(id).innerText = search.item;
  calculation();
};

let calculation = () => {
  let amount = basket.reduce((acc, i) => acc + i.item, 0);
  document.getElementById("cart-amount").innerText = amount;
};
calculation();
