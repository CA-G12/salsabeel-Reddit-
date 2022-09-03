
const trending = document.getElementById('trending');
const products = document.getElementById('products');

createCard();
createCard();
createCard();

function createCard() {
  const card = document.createElement('div');
  card.setAttribute('class', 'card');

  const imgProd = document.createElement('img');
  imgProd.src = './assets/header.jpg';
  imgProd.setAttribute('class', 'imgProduct');

  const product = document.createElement('div');
  product.setAttribute('class', 'productinfo');

  const productName = document.createElement('h3');
  productName.setAttribute('class', 'productName');
  productName.textContent = 'Rose';

  const productPrice = document.createElement('span');
  productPrice.setAttribute('class', 'productPrice');
  productPrice.textContent = '25$';

  const shopNow = document.createElement('button');
  shopNow.setAttribute('class', 'shopNow');
  shopNow.textContent = 'Buy';

  product.append(productName, productPrice);
  card.append(imgProd, product, shopNow);
  products.appendChild(card);
}
