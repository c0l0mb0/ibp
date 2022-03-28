jQuery(function ($) {
    showProducts();
    $(document).on('click', '.read-products-button', function () {
        showProducts();
    });
});

function showProducts() {
    // получаем список товаров из API
    $.getJSON("http://ibp/api/public/index.php/api/v1/outerinnerequip", function(data){

        // HTML для перечисления товаров
        readProductsTemplate(data, "");

        // изменяем заголовок страницы
        changePageTitle("Оборудовние и компоненты");

    });
}

