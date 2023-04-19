window.onload = function () {
  const portfolioContainer = document.querySelector(".portfolio-container");
  const itemsContainer = portfolioContainer;
  let prices = []; //array de objetos para los precios
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((products) => {
      products.forEach((product) => {
        let descrip = product.description;
        if (descrip.length > 80) {
          descrip = descrip.substring(0, 150) + "...";
        }
        const div = document.createElement("div");
        div.classList.add(
          "col-md-6",
          "col-lg-4",
          "new",
          product.category.toLowerCase().substr(0, 3)
        );
        div.innerHTML = `
            <div class="portfolio-item" id="${product.id}"}>
              <img src="${product.image}" class="img-fluid" alt="${product.title}">
              <div class="content-holder">
                <a class="img-popup" href="${product.image}"></a>
                <div class="text-holder">
                  <h6 class="title">${product.title}</h6>
                  <p class="subtitle">${descrip}</p>
                  <button class="btn" data-id=${product.id}>$${product.price}</button>
                </div>
              </div> 
            </div>
          `;

        itemsContainer.appendChild(div);

        prices.push({
          id: product.id,
          price: product.price,
          img: product.image,
        }); //agregar el objeto con el id, imagen y el precio del producto actual
      });

      //------ carrito de compras -----///
      let cart = document.querySelector(".cart-container__icon");
      let modelCart = document.querySelector(".model-cart");
      const selectedProducts = document.querySelector(".model-cart__products");
      const modelCartText = document.querySelector(".model-cart__text");
      let btns = document.querySelectorAll(".btn");
      let cartProducts = []; //VARIABLE PARA ALMACENAR LOS PRODUCTOS QUE ESTAN EN EL CARRITO

      btns = [...btns];

      //AGREGAR AL CARRITO LOS PRODUCTOS QUE SE SELECCIONARON
      btns.forEach((button) => {
        button.addEventListener("click", () => {
          addToCart(parseInt(button.dataset.id));
        });
      });

      //MOSTRAT Y OCULTAR EL MODEL CART
      cart.addEventListener("click", () => {
        if (modelCart.style.display == "none") {
          modelCart.style.display = "flex";
        } else {
          modelCart.style.display = "none";
        }
      });

      //----- FUNCIONES -------/////
      const addToCart = (id) => {
        if (findProduct(cartProducts, id)) {
          updateProduct(id);
        } else {
          addProduct(id);
        }
      };

      //OBTENER EL OBJETO CON EL ID DADO
      const findProduct = (arr, id) => arr.find((elem) => elem.id === id);

      //ACTUALIZAR EL PRODUCTO DEL CARRITO
      const updateProduct = (id) => {
        let productsInCart = document.querySelectorAll(".new-product");
        productsInCart = [...productsInCart];

        productsInCart.forEach((product) => {
          if (parseInt(product.id) === id) {
            let price = product.children[1];
            let amount = price.children[0];
            let toltalPrice = price.lastChild;
            let newPrice =
              parseFloat(toltalPrice.textContent.slice(1)) +
              findProduct(prices, id).price;

            amount.textContent = `x${
              parseInt(amount.textContent.slice(1)) + 1
            }`;
            toltalPrice.textContent = `$${newPrice.toFixed(2)}`;
          }
        });
      };

      //AGREGAR EL PRODUCTO CON EL ID DADO AL CARRITO
      const addProduct = (id) => {
        const product = findProduct(prices, id);
        const newProduct = document.createElement("DIV");

        modelCartText.style.display = "none";
        selectedProducts.style.display = "flex";
        newProduct.classList.add("new-product");
        newProduct.setAttribute("id", `${product.id}`);
        newProduct.innerHTML = `<img src=${product.img} alt="image product" class="new-product__image"/> <p class="new-product__precio">$${product.price} <span class="new-product__amount">x1</span> <span class="new-product__total">$${product.price}</span></p> <img src="./images/icon-delete.svg" alt="icon delete" class="new-product__delete"/>`;

        selectedProducts.appendChild(newProduct);
        cartProducts.push(product);
        deleteProducts();
      };

      // ELIMINAR LOS PRODUCTOS DEL CARRITO
      const deleteProducts = () => {
        let deleteBtns = document.querySelectorAll(".new-product__delete");
        deleteBtns = [...deleteBtns];

        deleteBtns.forEach((btn) => {
          btn.addEventListener("click", (e) => {
            const parent = e.target.parentElement;
            selectedProducts.removeChild(parent);
            cartProducts = cartProducts.filter(
              (product) => product.id !== parseInt(parent.id)
            );

            if (!selectedProducts.hasChildNodes()) {
              modelCartText.style.display = "block";
              selectedProducts.style.display = "none";
            }
          });
        });
      };
    });
};
