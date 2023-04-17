
// smooth scroll
$(document).ready(function(){
    $(".navbar .nav-link").on('click', function(event) {

        if (this.hash !== "") {

            event.preventDefault();

            var hash = this.hash;

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
  const portfolioContainer = document.querySelector(".portfolio-container");
  const itemsContainer = portfolioContainer;
  fetch("https://fakestoreapi.com/products")
    .then(response => response.json())
    .then(products => {
      
      products.forEach(product => {
        let descrip = product.description;
        if (descrip.length > 80) {
          descrip = descrip.substring(0, 150) + "...";
        }
        const div = document.createElement("div");
        div.classList.add("col-md-6", "col-lg-4", "new" , product.category.toLowerCase().substr(0, 3));
        div.innerHTML = `
          <div class="portfolio-item">
            <img src="${product.image}" class="img-fluid" alt="${product.title}">
            <div class="content-holder">
              <a class="img-popup" href="${product.image}"></a>
              <div class="text-holder">
                <h6 class="title">${product.title}</h6>
                <p class="subtitle">${descrip}</p>
              </div>
            </div> 
          </div>
        `;
        
        itemsContainer.appendChild(div);
      });
      console.log(products);

      // Agregar evento de filtrado
      
    var t = $(".portfolio-container");
    t.isotope({
        filter: ".new",
        animationOptions: {
            duration: 750,
            easing: "linear",
            queue: !1
        }
    }), $(".filters a").click(function() {
        $(".filters .active").removeClass("active"), $(this).addClass("active");
        var i = $(this).attr("data-filter");
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
  )}