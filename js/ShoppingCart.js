function ShoppingCart() {
    //array donde se van a almacenar los productos que agreguemos a nuestro carrito.
    this.cart = [];
    //método que llena this.cart con lo que haya en localStorage o lo inicializa con un objeto vacío.
    this.populate = function() {
        this.cart = (localStorage.getItem('cart')) ? JSON.parse(localStorage.getItem('cart')) : [];
    };
    //hace un push de un nuevo elemento a this.cart y también lo mete en el localStorage. Además, llama a buildCart que renderiza el carrito de compras. 
    this.add = function(item) {
        this.cart.push(item);
        localStorage.setItem('cart', JSON.stringify(this.cart));
        this.buildCart('shopping-cart-row');
    };

    this.get = function() {
        return this.cart;
    };
    //prepara el html con los nombres de los títulos de cada array que haya en el carrito. 
    this.buildList = function() {
        var html = '';
        this.cart.forEach(product => {
            html = html + `<li class="list-item list-group-item"><strong>${product.title}: $ ${product.price}</strong>  <input type="button" value="Remove" class="remove-button" id="${product.id}" onclick="removeProductByCart()"></li>`;
        });
        return html;
    };

    //arma todo el esqueleto del carrito de compras. Recibe por parámetro el id del contenedor donde se va a renderizar el carrito de compras. Dentro llama al método buildList.*/
    this.buildCart = function(containerId) {
        var container = $('#' + containerId);
        container.html("");
        var html = `
                    <div class="col-12 shopping-cart-description">
                        <h2>Shopping cart (${this.cart.length})</h2>
                        <ul id="list" class='list-group'>
                        ${ this.buildList() }               
                        </ul>
                        <div id="total-price-container">
                            <h3>Total price: <span id="total-price"></span></h3>
                        </div>
                        <fieldset>
                            <input type="radio" name="pay" value="credit"> Credit
                            <input type="radio" name="pay" value="debit"> Debit
                            <input type="radio" name="pay" value="cash"> Cash
                        </fieldset> 
                        <div class="alert alert-danger" role="alert">
                          <strong>Wait!</strong> First select a payment method.
                        </div>                        
                        <input type="button" class="btn btn-primary" value="Buy" id="confirm-button">
                        <input type="button" class="btn btn-secondary" value="Cancel" id="cancel-button" onclick="cancelOrder()"> 
                    </div>     
                 `

        container.html(html);

        if(shoppingCart.cart.length != 0) {
            $('.shopping-cart-container').slideDown('slow');
        };
    };


};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////ShoppingCart functions
////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function loadShoppingCart() {
    shoppingCart = new ShoppingCart();
    shoppingCart.populate();
    shoppingCart.buildCart('shopping-cart-row');
};

//addToCart es llamado por el botón con un onclick; recibe por parámetro un id, y éste id lo busca en el array products. Si el id está en el array de products lo va a insertar con el método add en shoppingCart. Además acciona products.getById. 
function addToCart(id) {
    shoppingCart.populate(); //checkea en el localStorage si hay algo y lo almacena en this.cart.
    var productAdded = results.filter((result)=> result.id === id)[0];
    shoppingCart.add(productAdded);
    removeButtonsList = $('.remove-button');
    shoppingCart.buildCart('shopping-cart-row'); //renderiza todo lo que haya en this.cart.*///////////////////
    confirmeOrder();
    calculateTotalPrice(shoppingCart.cart);
};

function calculateTotalPrice(productsCart) {
    totalPrice = 0;
    productsCart.forEach(product => {
        totalPrice = totalPrice + product.price;
            renderTotalPrice(totalPrice);
    })
};

function renderTotalPrice(price) {
    var totalPriceContainer =  $("#total-price");
    totalPriceContainer.text(price);
};

function confirmeOrder() {
    confirmButton = $('#confirm-button');
    confirmButton.click(function() {

        hideByOrder = $('.hide-by-order');
        showByOrder = $('#show-by-order');
        console.log(hideByOrder);
        pay = $('input[name="pay"]:checked');

        if (pay.val() === undefined) {
             $('.alert-danger').css('display', 'block');
        } else {
            hideByOrder.hide();
            showByOrder.html(`<p class="h2">Congratulations!!!</p><p class="h2">Your purchase has been successful.</p><p class="h2">Your payment method is ${pay.val()}.</p>`);            
            showByOrder.show();
        };
    });
};

function removeProductByCart() {
    let product, productID;
    event.target.parentNode.remove();
    product = event.target.parentNode;
    productID = product.querySelector('input').getAttribute('id');

    for (i=0; i<shoppingCart.cart.length; i++) {
        if (shoppingCart.cart[i].id == productID) {
            shoppingCart.cart.splice(i, 1);
        break;
        }
    }
    if (shoppingCart.cart.length == 0) {
        $('.shopping-cart-container').slideUp('slow');
    }

    localStorage['cart'] = JSON.stringify(shoppingCart.cart);

    shoppingCart.buildCart('shopping-cart-row'); 
    calculateTotalPrice(shoppingCart.cart);   
};

function cancelOrder() {
    cancelButton = $('#cancel-button');
    shoppingCart.cart = [];
    localStorage['cart'] = JSON.stringify(shoppingCart.cart);
    shoppingCart.buildCart('shopping-cart-row'); 
    calculateTotalPrice(shoppingCart.cart);
    $('.shopping-cart-container').slideUp('slow')   
};


