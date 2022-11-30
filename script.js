let menus = [
  'Pizza Margarita',

  'Pizza Salami',

  'Pizza Funghi',

  'Pizza Prosciuto',

  'Pizza Tonno',

  'Pizza Regina',

  'Pizza Diavolo',
];
let prices = [8.5, 10.5, 10.5, 11, 12.5, 12.5, 11];

let shoppingBasket = [];
let priceShoppingBasket = [];
let amounts = [];
let delivery = 5;

function onload() {
  render();
  renderShopping();
}

function render() {
  let content = document.getElementById('menuPizza');
  content.innerHTML = '';

  for (let i = 0; i < menus.length; i++) {
    const name = menus[i];
    const price = prices[i];
    const formattedPrice = price.toFixed(2).replace('.', ',');

    content.innerHTML += templateDisches(name, formattedPrice, i);
  }
}

function addToBasket(i) {
  const name = menus[i];
  const price = prices[i];
  let index = shoppingBasket.indexOf(name);
  if (index == -1) {
    shoppingBasket.push(name);
    priceShoppingBasket.push(price);
    amounts.push(1);
  } else {
    amounts[index]++;
  }

  render();
  calculateSum();
  renderShopping();
}

function renderShopping() {
  let menuFromBasket = document.getElementById('menu');
  menuFromBasket.innerText = '';
  if (shoppingBasket.length == 0) {
    menuFromBasket.innerHTML += templateEmptyBasket();
  } else if (shoppingBasket.length > 0) {
    for (let i = 0; i < shoppingBasket.length; i++) {
      menuFromBasket.innerHTML += generateBaketItemHTML(i);
    }
  }
}

function generateBaketItemHTML(i) {
  const amount = amounts[i];
  const food = shoppingBasket[i];
  const price = priceShoppingBasket[i];
  return /*html*/ `
<div class="shoppingBasket">
    <p>${amount} ${food}</p> 
    <p> ${(price * amount).toFixed(2).replace('.', ',')} € </p>
</div>
<div class="optionAddFood">
    <a>Anmerkung hinzufügen</a>
    <div>
      <img class="minusIcon" onclick="minusFood(${i})" src="icons/minus-2-48.png">
      <img class="plusIcon" onclick="addMoreFood(${i})" src="icons/plus-8-24.png">
     </div>
  </div>
 </div> `;
}

function calculateSum() {
  let sum = 0;

  for (let i = 0; i < priceShoppingBasket.length; i++) {
    sum += priceShoppingBasket[i] * amounts[i];

    if (calculatePrice(sum, delivery) < 15) {
      document.getElementById(
        'price'
      ).innerHTML = `<div class="textMinPrice">Leider kannst du noch nicht bestellen. La cucina Pizza liefert erst ab einem Mindestbestellwert von 15,00 € (exkl. Lieferkosten).</div>`;
    } else {
      document.getElementById('price').innerHTML = templateFullBaktet(sum);
    }

    document.getElementById(
      'buttonMobilePreise'
    ).innerHTML = `Warenkorb (${calculatePrice(sum, delivery)} €) 
    `;
  }
}

function calculatePrice(a, b) {
  let finalPrice = a + b;
  return finalPrice.toFixed(2);
}

function minusFood(i) {
  let newAmount = amounts[i]--;
  if (newAmount == 1) {
    amounts.splice(i, 1);
    shoppingBasket.splice(i, 1);
    priceShoppingBasket.splice(i, 1);
  }

  renderShopping();
  calculateSum();
}

function addMoreFood(i) {
  amounts[i]++;
  renderShopping();
  calculateSum();
}

function calcPrice(a, b) {
  let price = a * b;
  return price.toFixed(2);
}

function templateDisches(name, formattedPrice, i) {
  return /*html*/ `
  <div class='menu-Pizza'>
      <div class="dish-container">
         <div class="dishName">${name}</div> 
         <div class="pricing"> Preis:${formattedPrice} € </div> 
       </div>
  
        <div class="checkboxDishes">
          <img  onclick="addToBasket(${i})" src="icons/plus-8-24.png">
        </div>
   </div>`;
}

function templateEmptyBasket() {
  return /*html*/ `
      <div class="shoppingBg">
        <img class="bag" src="icons/bag1.png">
        <h2>Fülle deinen Warenkorb</h2>
      </div>`;
}

function templateFullBaktet(sum) {
  return /*html*/ `
  <div class="payBg">
     <div class="totalPrice">
      <span>Zwischensumme</span>
      <span>${sum.toFixed(2)} €</span>
</div>
<div class="totalPrice">
      <span>Lieferkosten</span>
      <span>${delivery.toFixed(2)} €</span>
</div>
  <div class="totalPrice">
      <span>Gesamt</span>
      <span>${calculatePrice(sum, delivery)} €</span>
    </div>
   
    </div>
    <div class="buttonPay">Bezahlen     (${calculatePrice(
      sum,
      delivery
    )} €)</div>

   `;
}

function hideScrollableContainer() {
  document.getElementById('shoppingCart').style.display = 'none';
}

function showScrollableContainer() {
  document.getElementById('shoppingCart').style.display = 'block';
}

window.onscroll = function () {
  let shopingCart = document.getElementById('shoppingCart');

  if (window.scrollY > 0) {
    shopingCart.style.top = '0';
  } else {
    shopingCart.style.top = '69.6px';
  }

  if (window.scrollY > '580') {
    shopingCart.style.bottom = '26.5px';
  } else {
    shopingCart.style.bottom = '0';
  }
};
