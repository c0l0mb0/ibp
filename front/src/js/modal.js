jQuery(function ($) {
    var data = getData('http://ibp/api/public/index.php/api/v1/listofobjects');
    createModalEquipLoactionList(data);
});

function _showError(message) {
    ui.modalOuterEquip.error.text(message);
    ui.modalOuterEquip.error.removeClass('d-none');
}

function _hideError() {
    ui.modalOuterEquip.error.addClass('d-none');
}

function getInputsArr() {
    let inputValues = ui.modalOuterEquip.formAddOuterEquip.serializeArray();
    for (let i = inputValues.length - 1; i >= 0; i--) {
        if (inputValues[i].value === '') {
            inputValues.splice(i, 1);
        }
    }
    return inputValues;
}

ui.modalOuterEquip.formAddOuterEquip.submit(event => {
    event.preventDefault();
    let inputValues = getInputsArr();
    $.ajax({
        url: config.api.postOuterEquipAndLocation,
        method: 'POST',
        data: inputValues,
        contentType: 'application/x-www-form-urlencoded',
        dataType: 'json',
        success: function () {
            console.log('success')
            _hideError()
            $('#modal-new-equip').modal('hide');
            $("#form_outer-equipment-and-location").trigger("reset");
            $.getJSON("http://ibp/api/public/index.php/api/v1/outerequipall", function (data) {
                arr = Object.values(data);
                gridOptions.api.setRowData(arr);
            });
        },
        error: function (response) {
            console.log(response)
            _showError("Ошибка, попробуйте еще раз");
        }
    });
});

function createModalEquipLoactionList(data) {
    let selectHtml = '';

    $.each(data, function (key, val) {
        selectHtml += `<option>` + val.place_first_lev + `</option>`
    });

    $(".modal__place_first_lev-select").append(selectHtml);
}
