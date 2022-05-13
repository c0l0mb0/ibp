jQuery(function ($) {
    var data = getData('http://ibp/api/public/index.php/api/v1/listofobjects');
    createListOfObjects(data);

});

$('#sidebarCollapse').on('click', function () {
    $('#sidebar').toggleClass('active');
});

$('.all-equip').on('click', function () {
    var data = getData('http://ibp/api/public/index.php/api/v1/outerinnerequip');
    renderOuterInterTableStatement(data);
    changePageTitle("Все оборудовние и компоненты");
});

$('.edit_equip').on('click', function () {
    data = getData('http://ibp/api/public/index.php/api/v1/outerequipall');
    renderOuterTableAgGrid(data);
    changePageTitle("Приборы");
});
