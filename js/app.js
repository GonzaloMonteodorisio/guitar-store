//definición de variables con scope global
var searchBoxInput;
var searchKey;
var searchResultLength;
var searchButton;
var formSearch;
var searchResume;
var products; 
var elementsToRemove = [];
var productID;
var removeButtonsList = [];
var dataJSON;
var results = [];
var shoppingCart = [];
var urlLocal;
var url;
var ajaxdata;
var totalPrice = 0;
var confirmButton;
var pay;
var cancelButton;
var hideByOrder;
var showByOrder;
var images = [];
var imagesContainer = [];

/////////////////////////////////////////////////////////////////////////////////////////////////////
$(document).ready(function(e) {

    loadShoppingCart();

    confirmeOrder();

    urlLocal = 'json/data.json';
    initData();

////////////////////////////////////////////////////////////////////////////////////////////////////////
    searchKey = $('#search-key');
    searchResultLength = $('#search-result-length');

    searchButton = $('#search-button');
    searchButton.attr('disabled', true);
    searchButton.click(function(event) {
        getSearchBoxValue(event);
    });

    searchBoxInput = $("#search-box-input");

    searchBoxInput.on('input', function (event) {
        searchButton.attr('disabled', (event.target.value.length <= 3));
    });

    formSearch = $("#form-search");
    formSearch.submit(function (event) {
        event.preventDefault();
        if (!searchButton.disabled) {
            getSearchBoxValue();
        };
    });

    searchResume = $("#search-resume");
    searchResume.css('display', 'none'); 

    $('body').on('click', '#enlarge-image', function(){
        $($(event.target).parent()).children(('.modal-container')).addClass('active');
    });

    $('body').on('click', '.modal-container', function(){
        $(event.target).removeClass('active');
    });

});

/////////////////////////////////////////////////////////////////////////////////////////////////////
function initData() {
    $.ajax({
        method: "GET", 
        url: urlLocal
    }).done(function(data) {
        console.log(data);
        renderProductsInit(data);
    }).fail(function(error) {
        console.log(error);
    });
};



