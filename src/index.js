const $app = document.getElementById('app');
const items = document.querySelector('.Items');
const $observe = document.getElementById('observe');
const API = 'https://api.escuelajs.co/api/v1/products';
let pagination = 5;

const getData = async (api) => {
  fetch(`${api}?offset=${pagination}&limit=${10}`)
    .then(response => response.json())
    .then(response => {
      let products = response;
      console.log(products)
      let output = products.map(product => {
        const itemDiv = document.createElement('div')
        itemDiv.classList.add('Card')

        itemDiv.innerHTML = `
        <img src="${product.images[0]}" >
          <section class="details">
            <div class="details-price">
              <h2>${product.title}</h1>
              <p>$${product.price}</p>
            </div>
            <p>${product.description}</p>
          </section>
        `
        items.appendChild(itemDiv)
      });
      // let newItem = document.createElement('section');
      // newItem.classList.add('Item');
      // newItem.innerHTML = output;
      // $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

async function loadData(){
   getData(API)
}



const intersectionObserver = new IntersectionObserver(entries => {
  entries.forEach((entry) => {
    if (entry.isIntersecting ) {
      console.log('Estás en la parte inferior de la página.');
      pagination++
      loadData()
    }
  });
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);

