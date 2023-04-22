
// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            let hash = this.hash;

            $('html, body').animate({
                scrollTop: $(hash).offset().top
            }, 700, function(){
                window.location.hash = hash;
            });
        } 
    });


  })






//api
window.onload = function() {
  mostrarIcono(0)
  const portfolioContainer = document.querySelector(".portfolio-container");
  const itemsContainer = portfolioContainer;
  
  $.ajax({
    url: "https://fakestoreapi.com/products",
    method: "GET",
    success: function(products) {
      products.forEach(product => {
        //para no tener una descripcion muy larga
        let descrip = product.description;
        if (descrip.length > 140) {
          descrip = descrip.substring(0, 140) + "...";
        }
        let titulo = product.title.replace("'", " ");
        let titu = titulo.substring(0, 20)
        //crear mi html
        const div = document.createElement("div");
        div.classList.add("col-md-6", "col-lg-4", "new" , product.category.toLowerCase().substr(0, 3));
        div.innerHTML = `
          <div class="portfolio-item">
            <img src="${product.image}" class="img-fluid" alt="${titulo}">
            <div class="content-holder">
              <a class="img-popup" href="${product.image}"></a>
              <div class="text-holder">
                <h6 class="title">${product.title}</h6>
                <p class="subtitle">${descrip}</p>
                <button class="btn btn-primary" onclick="addToCart('${product.id}','${titu}','${product.price}', '${product.image}' )"> $ ${product.price}
                </button>
              </div>
            </div> 
          </div>
        `;
        
        itemsContainer.appendChild(div);

      });
      console.log(products);


      // Agregar evento de filtrado
      
    let t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        let i = $(this).attr("data-filter");
        return t.isotope({
            filter: i,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        }), !1
    }); 
    },
    error: function(jqXHR, textStatus, errorThrown) {
      console.log(textStatus, errorThrown);
    }
  });
}
let carrito = [];
let total = 0;
let cart = document.querySelector(".cart-container");
let modelCart = document.querySelector(".modal-carrito");
const closeModalBtn = document.getElementById("close-btn");

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    modelCart.style.display = "none";
  }
});

closeModalBtn.addEventListener("click", () => {
  modelCart.style.display = "none";
});

cart.addEventListener("click", () => {
  if (modelCart.style.display == "none") {
    modelCart.style.display = "flex";
  } else {
    modelCart.style.display = "none";
  }
});


function printContainerContent(containerId) {
  const container = document.getElementById(containerId);
  const content = container.innerHTML;
  const printWindow = window.open("", "PrintWindow", "height=400,width=800");
  printWindow.document.write(content);
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function mostrarIcono(cant) {
  const cartContainer = document.querySelector('.cart-container');
  if (cant > 0) {
  const html = `
    <div class="cart-notification">
      <span class="carrito_number">${cant}</span>
      <img src="assets/imgs/shop.svg" alt="">
    </div>
  `;
  cartContainer.innerHTML = html;
} else {
  cartContainer.innerHTML = '';
}
}



toastr.options = {
  "closeButton": false,
  "debug": false,
  "newestOnTop": true,
  "progressBar": true,
  "positionClass": "toast-bottom-right",
  "preventDuplicates": false,
  "onclick": null,
  "showDuration": "300",
  "hideDuration": "1000",
  "timeOut": "5000",
  "extendedTimeOut": "1000",
  "showEasing": "swing",
  "hideEasing": "linear",
  "showMethod": "fadeIn",
  "hideMethod": "fadeOut",
}



function generar_notificacion_carrito(){
  toastr.success("Revisa el Carrito de Compras", "Producto agregado!")
}

function renderCart(mitotal) {
  const cartItems = document.getElementById('cart-items');
  cartItems.innerHTML = '';
  let carritoHTML = carrito.map(function(item) {
    return `
    <div class="container">
  <div class="row">
    <div class="col-md-8">
      <div class="producto-carrito" data-id="${item.id}" style="border: 1px solid #ccc; padding: 10px;">
        <div class="row justify-content-between align-items-center">
          <div class="col-md-4">
            <img src="${item.image}" alt="${item.title}" class="img-fluid producto-carrito__imagen" style="max-width: 150px; max-height: 150px;">
          </div>
          <div class="col-md-6 align-self-center">
            <h6 class="center producto-carrito__titulo" style="margin-bottom: 0; font-size: 1.2em;">${item.title}</h6>
            <p class="center producto-carrito__precio" style="margin-top: 0; font-weight: bold; font-size: 1.2em;">$${(item.price * item.cantidad)}</p>
          </div>
          <div class="col-md-2">
            <div class="center producto-carrito__cantidad" style="background-color: #f2f2f2; padding: 5px;">
              <span class="producto-carrito__cantidad-num" style="font-size: 1.2em;">${item.cantidad}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr style="margin-top: 10px; margin-bottom: 10px;">
  <style>
    .producto-carrito {
      margin: 0 auto;
      text-align: center;
    }
  </style>
</div>
    `;
  });


  let totalHTML = `
  <div class="row">
    <div class="col-md-8">
      <h4>El monto total a pagar es: $<span id="total">${mitotal}</span></h4>
    </div>
  </div>
`;
  

  
  cartItems.insertAdjacentHTML('beforeend', carritoHTML.join('')+totalHTML);
}

function generatePDF(mitotal) {
  renderCart(mitotal);
  const printWindow = window.open('', 'PrintWindow', 'height=400,width=800');
  printWindow.document.write('<link rel="stylesheet" type="text/css" href="assets/css/estilos.css">');
  printWindow.document.write('</head><body>');
  printWindow.document.write(document.getElementById('cart-items').outerHTML);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function generatePDF2(containerId) {
  const container = document.getElementById(containerId);
  const content = container.innerHTML;
  const printWindow = window.open('', 'PrintWindow', 'height=400,width=800');
  printWindow.document.write('<html><head><title></title>');
  printWindow.document.write('<link rel="stylesheet" type="text/css" href="assets/css/estilos.css" media="print" />');
  printWindow.document.write('</head><body>');
  printWindow.document.write(content);
  printWindow.document.write('</body></html>');
  printWindow.document.close();
  printWindow.focus();
  printWindow.print();
  printWindow.close();
}

function addToCart(pid, title, price, image) {
  const index = carrito.findIndex(item => item.id === pid);
  let priceFloat = parseFloat(price)
  if (index !== -1) {
    // Si el producto ya existe en el carrito, actualizamos su cantidad
    carrito[index].cantidad += 1;
  } else {
    // Si el producto no existe en el carrito, lo agregamos
    let item = {
      id: pid,
      title: title,
      price: priceFloat,
      image: image,
      cantidad: 1
    };
    carrito.push(item);
  }
  total += priceFloat;
  generar_notificacion_carrito()
  actualizarModalCarrito();
  console.log(carrito.length)
  mostrarIcono(carrito.length)
}


function actualizarModalCarrito() {
  let modalCarritoProductos = document.querySelector('.modal-carrito__products');
  modalCarritoProductos.innerHTML = '';
  if (carrito.length === 0){
    modalCarritoProductos.innerHTML = '<p class="modal-carrito__text">Tu carrito está vacío</p>'; 

  }
  
  let carritoHTML = carrito.map(function(item) {
    return `
    <div class="container">
  <div class="row">
    <div class="col-md-8">
      <div class="producto-carrito" data-id="${item.id}">
        <div class="row justify-content-between align-items-center">
          <div class="col-md-4">
            <img src="${item.image}" alt="${item.title}" class="img-fluid producto-carrito__imagen">
          </div>
          <div class="col-md-6 align-self-center">
            <h6 class="center producto-carrito__titulo">${item.title}</h6>
            <p class="center producto-carrito__precio">$${(item.price * item.cantidad).toFixed(2)}</p>
          </div>
          <div class="col-md-2">
            <div class="center producto-carrito__cantidad">
              <button class="btn-cantidad btn btn-sm btn-outline-secondary" data-id="${item.id}" data-action="disminuir">-</button>
              <span class="producto-carrito__cantidad-num">${item.cantidad}</span>
              <button class="btn-cantidad btn btn-sm btn-outline-secondary" data-id="${item.id}" data-action="aumentar">+</button>
              <button class="producto-carrito__eliminar btn btn-sm btn-warning btn-hover-warning p-2" data-id="${item.id}">
                <i class="ti-trash"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <hr>
</div>
  
    `;
  });
  let absTotal = Math.abs(total).toFixed(2)
  let totalHTML = `
  <div class="row">
    <div class="col-md-8">
      <h4>Total: $<span id="total">${absTotal}</span></h4>
    </div>
    <div class="col-md-4">
      <button class="btn btn-primary" id="generar-resumen" onclick="generatePDF('${absTotal}')">Generar resumen</button>
    </div>
  </div>
`;
  if(absTotal>0){
    modalCarritoProductos.insertAdjacentHTML('beforeend', carritoHTML.join('')+totalHTML);
  }else{
    modalCarritoProductos.insertAdjacentHTML('beforeend', carritoHTML.join(''));
  }
}

let modalCarritoProductos = document.querySelector('.modal-carrito__products');

modalCarritoProductos.addEventListener('click', function(event) {
  let target = event.target;
  if (target.classList.contains('btn-cantidad')) {
    let id = target.getAttribute('data-id');
    let action = target.getAttribute('data-action');
    let item = carrito.find(function(element) {
      return element.id == id;
    });
    if (action == 'aumentar') {
      item.cantidad += 1;
      total += item.price
    } else if (action == 'disminuir') {
      item.cantidad -= 1;
      total -= item.price;
      mostrarIcono(carrito.length)
      if (item.cantidad < 1) {
        let index = carrito.indexOf(item);
        if (index > -1) {
          carrito.splice(index, 1);
          mostrarIcono(carrito.length)
        }
      }
    }
    actualizarModalCarrito();
    mostrarIcono(carrito.length)
  } else if (target.classList.contains('producto-carrito__eliminar')) {
    let id = target.getAttribute('data-id');
    let item = carrito.find(function(element) {
      mostrarIcono(carrito.length)
      return element.id == id;
    });
    let index = carrito.indexOf(item);
    if (index > -1) {
      mostrarIcono(carrito.length)
      carrito.splice(index, 1);
      total -= item.price * item.cantidad
}
actualizarModalCarrito();
mostrarIcono(carrito.length)
}
});

function actualizarModalCarrito2() {
  let modalCarritoProductos = document.querySelector('.modal-carrito__products');
  modalCarritoProductos.innerHTML = '';
  carrito.forEach(function(producto) {
    let productoHTML = `
      <div class="producto">
        <p>${producto.title}</p>
        <p>$${producto.price}</p>
      </div>
    `;
    modalCarritoProductos.insertAdjacentHTML('beforeend', productoHTML);
  });
}