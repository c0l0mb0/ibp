jQuery(function ($) {
    getAllEquipment();
    getBuildingsFirstLevel();
});

function getAllEquipment() {
    $.getJSON("http://ibp/api/public/index.php/api/v1/outerinnerequip", function (data) {

        renderOuterInterTable(data, "");

        changePageTitle("Все оборудовние и компоненты");

    });

}

function getBuildingsFirstLevel() {
    $.getJSON("http://ibp/api/public/index.php/api/v1/listofobjects", function (data) {

        createListOfObjects(data, "");

    });
}

function getEquipmentByFirstLevelName(FirstLevelName) {


    $.ajax({
        url: "http://ibp/api/public/index.php/api/v1/indexouterandinnerbyfirstlevvalue",
        type: "POST",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify({"place_first_lev": FirstLevelName}),
        success: function (data) {
            renderOuterInterTable(data);
        }, error: function (xhr, resp, text) {
            // console.log(xhr, resp, text);
        }
    });

    changePageTitle("Оборудовние и компоненты " + FirstLevelName);

}

