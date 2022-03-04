import { navbar } from "../Component/navbar.js";
import { footer } from "../Component/footer.js"
import {ItemtShirts} from '../Component/ProductsList.js'


  let tShirtsData = ItemtShirts()

if (JSON.parse(localStorage.getItem("tShirts")) == null) {
localStorage.setItem('tShirts',JSON.stringify(tShirtsData))
}

let ProductsHeader = document.getElementById('header');
ProductsHeader.innerHTML = navbar()

let ProductsContainer= document.getElementById('ProductsContainer')
let ProductsParent = document.getElementById('ProductsParent')


let productGridItems = document.getElementById('productGridItems')

const displayProducts = (data ) => {
productGridItems.innerHTML=""
// console.log(data)
  data.forEach (function (product) {
    let outer_div = document.createElement ('div');
    let div = document.createElement('div')
    let image_div = document.createElement('div')
    image_div.className = 'img_div';

    outer_div.setAttribute('id','products')

    let img =  document.createElement('img');
    img.src =   product.images.image1;
  
    div.innerHTML = `<a>
    <div>
      <div class="brandname">${product.brand} <span></span></div>
      <div class="title">${product.title}</div>
      <div class="price"> Rs. ${product.price} <span class="line-through">Rs. ${product.off_price}</span> <span class="discount">(${product.discount}% OFF)</span>
      </div>
    </div></a>`

  outer_div.addEventListener ('mouseenter', startInterval);
  outer_div.addEventListener ('mouseleave', stopInterval);

  let interval;
  function startInterval () {
    let i = 1;
    interval = setInterval (function () {
      if (i > 4) {
        i = 1;
      }
      let x = 'image' + i;
      img.src = product.images[x];
      x = '';
      i = i + 1;
    }, 1000);
  }


  function stopInterval () {
    clearInterval (interval);
    img.src = product.images.image1;
  }

  image_div.append(img)
  outer_div.append(image_div,div)

  outer_div.addEventListener('click',()=>{
    localStorage.setItem("PoductDetalisData", JSON.stringify(product));
    window.location.href='../HTML/productDetail.html'
  })

  // let wisListButton = document.createElement('button');
  // wisListButton.setAttribute('id','wishListBtn')
  
    productGridItems.append (outer_div);
  });
  
}

 //----------------------------------------------------------------
 let footerBlock = document.getElementById('footerBlock');

 let footerContainer = document.createElement('div');
 footerContainer.innerHTML = footer()
 footerBlock.append(footerContainer)
 
 //ProductsContainer.append(footerBlock)
 //---------------------------------------------------------------


displayProducts(JSON.parse(localStorage.getItem('tShirts')))
// sort Products
let sortButton = document.getElementById("sortButton");
sortButton.addEventListener("change", sortProducts)

function sortProducts(){
  let sortCriteria = sortButton.value;
  let productList = JSON.parse(localStorage.getItem('tShirts'));

  let updatedProductList = productList.sort((prodA,prodB) => {
    if(sortCriteria === 'asc'){
      return prodA.price - prodB.price;
    }else if(sortCriteria === 'desc'){
      return prodB.price - prodA.price;
    }
    else if(sortCriteria === 'whatsNew'){
      return prodB.id - prodA.id;
    }
    else if(sortCriteria === 'popularity'){
      return prodA.rating - prodB.rating;
    }
    else if(sortCriteria === 'rating'){
      return prodB.rating - prodA.rating;
    }
    else if(sortCriteria === 'discount'){
      return prodB.discount - prodA.discount;
    }else{
      return true
    }
  })
  displayProducts(updatedProductList)
}

// filter Product By Brand

let FilterBrand = document.getElementById('filterButtonBrand')

FilterBrand.addEventListener('click',(event)=>{

  let productList = JSON.parse(localStorage.getItem('tShirts'));
  let filter =  event.target.checked
  if(filter){
    let filterCriteria = event.target.value

    let updatedProductList = productList.filter((prod) => {
      if(filterCriteria === 'Roadster'){
        return prod.brand == "Roadster" 
      }else if(filterCriteria === 'WROGN'){
        return prod.brand == 'WROGN'
      }else if(filterCriteria === 'HRX by Hrithik Roshan'){
        return prod.brand == 'HRX by Hrithik Roshan'
      }else if(filterCriteria === 'Louis Philippe Sport'){
        return prod.brand == 'Louis Philippe Sport';
      }else if(filterCriteria === 'Puma'){
        return prod.brand == 'Puma'
      }else{
        return true;
      }
    })
    displayProducts(updatedProductList)
  
  }
})

//    filter Product By Price

let FilterPrice = document.getElementById('filterButtonPrice')

FilterPrice.addEventListener('click',(event)=>{

  let productList = JSON.parse(localStorage.getItem('tShirts'));
  let filter =  event.target.checked;

  if(filter){
    let filterCriteria = event.target.value;

    let updatedProductList = productList.filter((prod) => {
      if(filterCriteria === '174-1881'){
        return prod.price >= 174 && prod.price <=1881;
      }else if(filterCriteria === '1881-3588'){
        return prod.price > 1881 && prod.price <=3588;
      }else if(filterCriteria === '3588-5295'){
        return prod.price > 3588 && prod.price <=5299;
      }else if(filterCriteria === '5295-7002'){
          return prod.price > 5295 && prod.price <= 7002;
      }else{
        return true;
      }
    })
    displayProducts(updatedProductList)
  }
})