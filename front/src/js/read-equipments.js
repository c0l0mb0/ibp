jQuery(function ($) {
    getAllEquipment();
    getBuildingsFirstLevel();
});

function getAllEquipment() {
    $.getJSON("http://ibp/api/public/index.php/api/v1/outerinnerequip", function (data) {

        renderOuterInterTableStatement(data, "");

        changePageTitle("Все оборудовние и компоненты");

    });

}

function getAllOuterEquipmentAndParameters() {
    $.getJSON("http://ibp/api/public/index.php/api/v1/outerequipall", function (data) {

        renderOuterTableStatement(data, "");

        changePageTitle("Приборы");

    });

}


function getBuildingsFirstLevel() {
    $.getJSON("http://ibp/api/public/index.php/api/v1/listofobjects", function (data) {

        createListOfObjects(data, "");

    });
}

function setOuterEquipmentRowById(idRow, data) {

    $.ajax({
        url: "http://ibp/api/public/index.php/api/v1/outerequip/" + idRow,
        type: "PUT",
        dataType: 'json',
        contentType: 'application/json',
        data: JSON.stringify(data),
        success: function (data) {
        },
        error: function (xhr, resp, text) {
            // console.log(xhr, resp, text);
        }
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
            renderOuterInterTableStatement(data);
        }, error: function (xhr, resp, text) {
            // console.log(xhr, resp, text);
        }
    });

    changePageTitle("Оборудовние и компоненты " + FirstLevelName);

}

