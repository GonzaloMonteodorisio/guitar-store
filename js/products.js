function renderProductsInit(products) {
    results =[];
    $('#product-list-row').empty();
    products.forEach(product => {        
        var htmlTemplate = getProductsHTML(product);  
        $('#product-list-row').append(htmlTemplate);  
        results.push(product); 
    })

};

function getProductsHTML(product) {
    return `
                <div class="search-item col-xl-3 col-lg-4 col-md-10 m-3 product-description" id="${product.id}">
                    <div class="modal-container">
                        <img src="images/${product.thumbnail}">
                    </div>
                    <p><strong>${product.title}</strong></p>
                    <p>Price: $${product.price}</p>
                    <a href="#" class="btn btn-primary" value="add-cart" onclick="addToCart('${product.id}')">Add to shopping cart</a>
                    <a href="#" type="button" class="btn btn-secondary" id="enlarge-image">
                    Enlarge image</a>                  
                </div>
            `
};

function getSearchBoxValue(event) {
    event.preventDefault();
    var searchBoxInputValue = searchBoxInput.val();
    searchProducts(searchBoxInputValue);
};

function searchProducts(key) {
    urlLocal = 'json/data.json';
    ajaxdata = $.ajax({
            method: "GET", 
            url: urlLocal
        }).done(function(data) {
            renderProducts(data, key);
        }).fail(function(error) {
        })
};

function renderProducts(products, keyWord) {
    $('#product-list-row').empty();
    results =[];
    images = [];
    products.forEach(product => {
        if (product.title.toLowerCase().includes(keyWord.trim().toLowerCase())){
            var htmlTemplate = getProductsHTML(product);
            $('#product-list-row').append(htmlTemplate);
            results.push(product);
        }  
    })
    setSearchKeyRender(keyWord, results.length);   
};


function setSearchKeyRender(key, resultLength) {
    if (resultLength === 0) {
        searchResultLength.text(`Sorry, there is no coincidence for your search.`);
        searchResume.fadeIn('slow');
    }
    else if (resultLength === 1) {
        searchResultLength.text(`There is ${resultLength} result for ${key}`);
        searchResume.fadeIn('slow');
    }
    else {
        searchResultLength.text(`There are ${resultLength} results for ${key}`);
        searchResume.fadeIn('slow');
    }       
};

function renderProductsRestore() {
    results = [];
    urlLocal = 'json/data.json';
    initData();
    $('#search-resume').hide('slow');
};