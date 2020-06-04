
const containerAllProducts = document.querySelector('.containerProducts');
const infoApp = document.querySelector('.infoApp');
const infoTitle = document.querySelector('.infoTitle');
const infoContent = document.querySelector('.infoContent');
let idUser;
async function getIdUser() {
  const response = await fetch('http://localhost:3000/actions').then(res=>res.json());
  infoTitle.textContent = `Здравствуйте,${response[0].lastName} ${response[0].firsName}!`;
  infoApp.appendChild(infoTitle);
  infoApp.appendChild(infoContent);
  console.log(infoApp);
  containerAllProducts.appendChild(infoApp);
  idUser = response[0];
}


async function getData() {
  try {
    const response = await fetch('http://localhost:3000/products').then(res=>res.json());
    return response;
  } catch (err) {
    console.log(err);
  }
}

const allData = getData();


const liDecoration = document.querySelector('#decoration');


let arrWithAmount = [];
const btnBuy = document.createElement('button');

function createElements(allData) {
    const filterArr = allData.filter(item => item);

    containerAllProducts.innerHTML = '';
    filterArr.forEach(item => {
      const containerOneProduct = document.createElement('div');
      const nameProduct = document.createElement('p');
      const priceProduct = document.createElement('p');
      const imgProduct = document.createElement('img'); 
      const btnBuy = document.createElement('button');
      const inputAmount = document.createElement('input');

      nameProduct.textContent = item.name;
      priceProduct.textContent = item.price;
      imgProduct.src = `img/${item.img}`;
      btnBuy.textContent = 'Добавить';
      btnBuy.classList.add('btnAdd');
      inputAmount.type = 'number';
      inputAmount.classList.add('inputAmount');
      inputAmount.min = 1;
      inputAmount.max = 100;
      inputAmount.value = 1;
      inputAmount.step = 1;

      containerOneProduct.classList.add('oneProduct');
      imgProduct.classList.add('imgProduct');

      containerOneProduct.appendChild(imgProduct);
      containerOneProduct.appendChild(priceProduct);
      containerOneProduct.appendChild(nameProduct);
      containerOneProduct.appendChild(inputAmount);
      containerOneProduct.appendChild(btnBuy);
      
      btnBuy.addEventListener('click', e => {
        let arrDataSelected = btnBuy.parentElement.children;
        console.log(arrDataSelected);
        let objProd = {
          img: arrDataSelected[0].src, 
          price: arrDataSelected[1].textContent, 
          name: arrDataSelected[2].textContent, 
          amount: arrDataSelected[3].value,
        }
        arrWithAmount.push(objProd);
        createBasket( 'block', arrWithAmount);
      });
      containerAllProducts.appendChild(containerOneProduct);
    });
}


const modal = document.getElementById('modal');
const imgBasket = document.querySelector('.imgBasket');

function createBasket(state, arrChoosedData) { 
  modal.innerHTML = ''; 
  const blackout = document.getElementById('blackout');
  modal.style.display = state;
  blackout.style.display = state;
  arrChoosedData.map((item, index) => {
    const rowProduct = document.createElement('div');
    rowProduct.classList.add('rowProduct');
    const img = document.createElement('img');
    const name = document.createElement('span');
    const amount = document.createElement('span');
    const price = document.createElement('span');
    const cross = document.createElement('img');
  

    img.src = `${item.img}`;
    img.classList.add('imgBasket');
    name.textContent = item.name;
    amount.textContent = item.amount; 
    price.textContent = item.price;
    cross.src = `img/cross.png`;
    cross.classList.add('crossDel');

    cross.addEventListener('click', e => {
      arrChoosedData.splice(index, 1);
      console.log(arrChoosedData);
    });

    rowProduct.appendChild(img);
    rowProduct.appendChild(name);
    rowProduct.appendChild(amount);
    rowProduct.appendChild(price);
    rowProduct.appendChild(cross);
    modal.appendChild(rowProduct);
    
  });
  const inputDelivery = document.createElement('input');
  const btnSendForm = document.createElement('input');
  const totalPrice = document.createElement('input');
  const productChoiced = document.createElement('input');
  const inputIdUser = document.createElement('input');
  const labelTotal = document.createElement('label');
  const labelDelivery = document.createElement('label');

  labelTotal.id = 'totalPrice';
  labelTotal.textContent = 'Общая сумма:'
  labelDelivery.id = 'inputDelivery';
  labelDelivery.textContent = 'Адрес доставки:'
  labelDelivery.classList.add('labelDelivery');
 

  let totalPriceProduct = 1;
  let count = [];
  let sum = 0;
  arrChoosedData.map((item, index) => {
     totalPriceProduct = item.price * item.amount;
     count.push(totalPriceProduct);
  });
  count.map((item, index) => sum += item);

  totalPrice.value = `${sum}`;
  totalPrice.id = 'totalPrice';
  totalPrice.name = 'totalPrice';
  inputDelivery.id = 'inputDelivery';
  inputDelivery.name = 'inputDelivery';
  btnSendForm.type = 'submit';
  btnSendForm.classList.add('btnSendForm');
  btnSendForm.value = 'Купить';
  productChoiced.value = JSON.stringify(arrChoosedData);
  productChoiced.name = 'productChoiced';
  productChoiced.id = 'productChoiced';
  inputIdUser.name = 'inputIdUser';
  inputIdUser.id = 'inputIdUser';
  inputIdUser.value = idUser.idusers;

  modal.appendChild(labelTotal);
  modal.appendChild(totalPrice);
  modal.appendChild(labelDelivery)
  modal.appendChild(inputDelivery);
  modal.appendChild(btnSendForm);
  console.dir(productChoiced);
  modal.appendChild(productChoiced);
  modal.appendChild(inputIdUser);

  btnSendForm.addEventListener('click', e => {
    modal.method = 'POST';
    modal.action = '/orders';
  });

};

function separateArr(min, max) {
  let arrDecor = [];
  allData.then(arrProducts => {
    arrChanged = arrProducts.map((item, index) => {
      if(item.idproducts>min && item.idproducts<max) {
        return item;
      }
    });
    createElements(arrChanged);
  });
}

liDecoration.addEventListener('click', e => {
  e.preventDefault;
  separateArr(0, 13);
});

const liMetal = document.querySelector('#metal');

liMetal.addEventListener('click', e => {
  e.preventDefault;
  separateArr(12, 25);
});

const liFerro = document.querySelector('#ferroconcrete');

liFerro.addEventListener('click', e => {
  e.preventDefault;
  separateArr(24, 37);
});

const liConcrete= document.querySelector('#concrete');

liConcrete.addEventListener('click', e => {
  e.preventDefault;
  separateArr(36, 49);
}); 

const liDoor= document.querySelector('#door');

liDoor.addEventListener('click', e => {
  e.preventDefault;
  separateArr(48, 61);
}); 

const liWindow= document.querySelector('#window');

liWindow.addEventListener('click', e => {
  e.preventDefault;
  separateArr(60, 73);
}); 

const liHeatPoint= document.querySelector('#heatPoint');

liHeatPoint.addEventListener('click', e => {
  e.preventDefault;
  separateArr(72, 77);
}); 

async function getDataOrders() {
  const contentOrders = document.querySelector('.contentOrders');
  const response = await fetch('http://localhost:3000/dataOrders').then(res=>res.json());
  const table = document.querySelector('#mainTab');

  response.map(item => {
    if(item.totalPrice && item.email!='admin@1.com') {
      const tr = document.createElement('tr');
      const tdName = document.createElement('td');
      tdName.textContent = item.firsName;
      tr.appendChild(tdName);

      const tdLname = document.createElement('td');
      tdLname.textContent = item.lastName;
      tr.appendChild(tdLname);

      const tdPhone = document.createElement('td');
      tdPhone.textContent = item.phone;
      tr.appendChild(tdPhone);

      const tdEmail = document.createElement('td');
      tdEmail.textContent = item.email;
      tr.appendChild(tdEmail);

      const tdAdressDelivery = document.createElement('td');
      tdAdressDelivery.textContent = item.adressDelivery;
      tr.appendChild(tdAdressDelivery);

      const tdTotalPrice = document.createElement('td');
      tdTotalPrice.textContent = item.totalPrice;
      tr.appendChild(tdTotalPrice);

      const tdBtn = document.createElement('button');
      tdBtn.classList.add('btnMore');
      tdBtn.textContent = 'Подробнее';
      tr.appendChild(tdBtn);
      table.appendChild(tr);

      tdBtn.addEventListener('click', e => {
        const tabMore = document.querySelector('#moreTab');
        tabMore.style.display = 'inline-block';

        const responseMore = fetch('http://localhost:3000/dataMore')
        .then(res=> {
          return res.json()
        })
        .then(dataMore=> {

          dataMore.map((item, index) => {
            console.log(item);
            const trMoreInfo = document.createElement('tr');

            const tdNameProduct = document.createElement('td');
            tdNameProduct.textContent = item.name;

            trMoreInfo.appendChild(tdNameProduct);
            tabMore.appendChild(trMoreInfo);

            const tdPriceProduct = document.createElement('td');
            tdPriceProduct.textContent = item.price;

            trMoreInfo.appendChild(tdPriceProduct);
            tabMore.appendChild(trMoreInfo);

            const tdAmountProduct = document.createElement('td');
            tdAmountProduct.textContent = item.amount;

            trMoreInfo.appendChild(tdAmountProduct);
            tabMore.appendChild(trMoreInfo);

          });

          console.log(dataMore);
        });
        
      });
    }
  });
}

