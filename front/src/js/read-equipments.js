jQuery(function ($) {
    showEquipment();
});

function showEquipment() {
    // получаем список товаров из API
    $.getJSON("http://ibp/api/public/index.php/api/v1/outerinnerequip", function(data){

        // HTML для перечисления товаров
        readProductsTemplate(data, "");

        // изменяем заголовок страницы
        changePageTitle("Оборудовние и компоненты");

    });
    $.getJSON("http://ibp/api/public/index.php/api/v1/listofobjects", function(data){

        // HTML для перечисления товаров
        createListOfObjects(data, "");


    });
}

