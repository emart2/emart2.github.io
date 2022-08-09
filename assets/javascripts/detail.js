var BASE_URL = "https://electronics-mart-api.herokuapp.com";
var Product_id = localStorage.getItem("p_id");
var product;
console.log(Product_id);
function load_Product() {
  var http = new XMLHttpRequest();
  var url = BASE_URL + "/view_by_product_id?product_id=" + Product_id;
  http.onreadystatechange = function () {
    if (http.readyState == 4 && http.status == 200) {
      var json = JSON.parse(this.responseText);
      product = json.Product;
      console.log(product);
      displayData();
    }
    if (http.readyState == 4 && http.status == 500) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops Something went wrong...",
      });
    }
    if (http.readyState == 4 && http.status == 404) {
      json = JSON.parse(this.responseText);
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        text: "Oops, There's no Product with that Category...",
      });
    }
  };
  http.open("get", url, true);
  http.setRequestHeader("Content-Type", "application/json");
  http.send();
}

load_Product();

function displayData() {
  document.getElementById("product-name").innerText = limiter(product.product_name);
  document.getElementById("product-price").innerText = product.product_price;
  document.getElementById("product-price-d").innerText = product.product_price - (product.discount/100)*product.product_price;
  document.getElementById("available").innerText = "Available: "+ product.product_qty;
  document.getElementById("product-category").innerText =
    "Category: " + product.product_category;
  document.getElementById("product-image").src = product.product_img;

  document.getElementById("product-description").innerText =
    product.product_desc;
    document.getElementById("rating").innerText = "Rating: "+
    product.product_rating;
  
}

function limiter(name){
if(name.length>30){
  name = name.slice(0,30) + "..."
  return name;
}
}

