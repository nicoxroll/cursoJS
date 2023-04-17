$(document).ready(function () {
  $.ajax({
    method: "GET",
    url: "https://fakestoreapi.com/products",
    contentType: "application/json",
    async: true,
    success: function (data) {
      data.forEach((product) => {
        $(".products").append(
          '<section class="product"> <div class="product__image" style="background-image: url(' +
            product.image +
            ')"></div><div class="product__content"><h3 class="product__title">' +
            product.title +
            '</h3><p class="product__description"> <span class="show-description">Mostrar descripción </span ><span class="hide-description">' +
            product.description +
            '</span></p><div class="product__details"><p class="product__count-info">Cantidad: <span class="prices__count">' +
            product.rating.count +
            '</span></p><p class="product__price-info">Precio: <span class="product__price">' +
            product.price +
            '</span></p></div><div class="product__amount-container"><img src="./images/icon-minus.svg" alt="icon minus"><input type="number" name="amount" id="amount"/><img src="./images/icon-plus.svg" alt="icon plus"></div><button class="product__btn">comprar</button></div> <section>'
        );
      });
    },
  });
});
