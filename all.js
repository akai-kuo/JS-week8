// 產品區塊
// [  ] 瀏覽產品列表
// [  ] 篩選產品
// [  ] 加入購物車：將事件綁定在整個產品列表上，提升效能

// 購物車區塊
//  確認購物車列表
//   [  ] 瀏覽購物車內容
//  編輯 / 刪除購物車
//   [  ] 刪除單一商品
//   [  ] 刪除所有品項

// 訂單區塊
//  驗證內容：先在前端進行驗證，通過後再送出訂單，減少資源耗費
//   [  ] 檢查購物車有無商品
//   [  ] 檢查表單欄位是否有填寫
//   [  ] 送出訂單
//   [  ] 送出後清空表單

// 請代入自己的網址路徑
const baseUrl = "https://livejs-api.hexschool.io/api/livejs/v1/customer/";
const apiPath = "billkuo";
const productsApiUrl = `${baseUrl}${apiPath}/products`;
const cartsApiUrl = `${baseUrl}${apiPath}/carts`;

let products = [];
let carts = [];

const productWrap = document.querySelector(".productWrap");
const productSelect = document.querySelector(".productSelect");
const shoppingCartTableBody = document.querySelector(
  ".shoppingCart-table tbody"
);

// 篩選產品
productSelect.addEventListener("change", function () {
  if (productSelect.value === "全部") {
    renderProducts(products);
  } else {
    let filterProducts = [];
    products.forEach(function (product) {
      if (product.category === productSelect.value) {
        filterProducts.push(product);
      }
    });
    renderProducts(filterProducts);
  }
});

// 渲染產品列表
function renderProducts(data) {
  let productList = "";
  data.forEach(function (product) {
    productList += `<li class="productCard">
    <h4 class="productType">新品</h4>
    <img src="${product.images}" alt=""/>
    <a href="#" class="addCardBtn">加入購物車</a>
    <h3>${product.title}</h3>
    <del class="originPrice">NT$${product.origin_price}</del>
    <p class="nowPrice">NT$${product.price}</p>
    </li>`;
  });
  productWrap.innerHTML = productList;
}

// 渲染購物車列表
function renderCarts(carts) {
  let cartList = "";
  carts.forEach(function (item) {
    cartList += `<tr>
              <td>
                <div class="cardItem-title">
                  <img src="${item.product.images}" alt="" />
                  <p>${item.product.title}</p>
                </div>
              </td>
              <td>NT$${item.product.origin_price}</td>
              <td>${item.quantity}</td>
              <td>NT$${item.product.price}</td>
              <td class="discardBtn">
                <a href="#" class="material-icons"> clear </a>
              </td>
            </tr>`;
  });
  shoppingCartTableBody.innerHTML = cartList;
}

// 取得產品列表
function getProducts() {
  axios
    .get(productsApiUrl)
    .then(function (response) {
      products = response.data.products;
      renderProducts(products);
      console.log(products);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

// 取得購物車列表
function getCarts() {
  axios
    .get(cartsApiUrl)
    .then(function (response) {
      carts = response.data.carts;
      console.log(response.carts);
      renderCarts(carts);
    })
    .catch(function (error) {
      console.log(error.response.data.message);
    });
}

function init() {
  getProducts();
  getCarts();
}

init();

// 加入購物車
function addCartItem() {
  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`,
      {
        data: {
          productId: "FaShP00eCGy5cuNQfxX0",
          quantity: 8,
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
    });
}

// 編輯購物車產品數量

// 清除購物車內全部產品
function deleteAllCartList() {
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts`
    )
    .then(function (response) {
      console.log(response.data);
    });
}

// 刪除購物車內特定產品
function deleteCartItem(cartId) {
  axios
    .delete(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/carts/${cartId}`
    )
    .then(function (response) {
      console.log(response.data);
    });
}

// 送出購買訂單
function createOrder() {
  axios
    .post(
      `https://livejs-api.hexschool.io/api/livejs/v1/customer/${api_path}/orders`,
      {
        data: {
          user: {
            name: "六角學院",
            tel: "07-5313506",
            email: "hexschool@hexschool.com",
            address: "高雄市六角學院路",
            payment: "Apple Pay",
          },
        },
      }
    )
    .then(function (response) {
      console.log(response.data);
    })
    .catch(function (error) {
      console.log(error.response.data);
    });
}
