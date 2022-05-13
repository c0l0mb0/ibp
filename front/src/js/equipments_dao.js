function getData (url) {
    var data = {};
    $.ajax({
        url: url,
        type: 'GET',
        async: false,
        dataType: 'json'
    }).done(function (response) {
        data = response;
    }).fail(function (jqXHR, textStatus, errorThrown) {
        data = null;
    });
    return data;
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
}

