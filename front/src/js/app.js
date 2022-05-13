jQuery(function ($) {
    actionMenu.hideALl();
    addApplicationConteinerHTML();
    var data = getData('http://ibp/api/public/index.php/api/v1/outerinnerequip');
    renderOuterInterTableStatement(data);
    changePageTitle("Все оборудовние и компоненты");
});

var ui = {
    modalOuterEquip: {
        formAddOuterEquip: $('#form_outer-equipment-and-location'),
        error: $('#form_outer-equipment-and-location__error')
    }
};

var config = {
    api: {
        postOuterEquipAndLocation: 'http://ibp/api/public/index.php/api/v1/outerequipwithlocation',
        deleteOuterEquipAndItsLocation: 'http://ibp/api/public/index.php/api/v1/outerequipwithlocation'
    }
};

function addApplicationConteinerHTML() {
    var app_html = `
        <div class='app-container'>

            <div class='page-header'>
                <h1 id='page-title'>Оборудование</h1>
            </div>

            <div id='page-content'></div>

        </div>`;

    $("#app").html(app_html);
}

function changePageTitle(page_title) {

    $('#page-title').text(page_title);

    document.title = page_title;
}

function renderOuterInterTableStatement(data) {

    var read_products_html = `
    <!-- начало таблицы -->
        <table class='table table-bordered table-hover'>

            <!-- создание заголовков таблицы -->
            <tr>
                <th class='w-25-pct'>Объект</th>
                <th class='w-10-pct'>Место</th>
                <th class='w-10-pct'>Филиал</th>
                <th class='w-15-pct'>Прибор</th>
                <th class='w-15-pct'>Элемент</th>
                <th class='w-15-pct'>Номер</th>
                <th class='w-15-pct'>Количество</th>
                <th class='w-15-pct'>Выпуск</th>
                <th class='w-15-pct'>Состояние</th>
            </tr>`;

    $.each(data, function (key, val) {
        let equipmentId = {
            idType: "",
            idNumb: ""
        }

        if (val.equip_name !== "") {
            equipmentId.idType = "outer";
            equipmentId.idNumb = val.id_outer_equip;
        }

        if (val.inner_name !== "") {
            equipmentId.idType = "inner";
            equipmentId.idNumb = val.id_inner_equip;
        }
        var outerClass = (equipmentId.idType == "outer") ? "class = \"" + equipmentId.idType + "\"" : "";
        // создание новой строки таблицы для каждой записи
        read_products_html += `<tr ` + outerClass + `>
            <td>` + val.place_first_lev + `</td>
            <td>` + val.place_third_lev + `</td>
            <td>` + val.affiliate + `</td>
            <td>` + val.equip_name + `</td>
            <td>` + val.inner_name + `</td>
            <td>` + val.factory_number + `</td>
            <td>` + val.quant + `</td>
            <td>` + val.year_issue + `</td>
            <td>` + val.state_tech_condition + `</td>            
        </tr>`;
    });

    // конец таблицы
    read_products_html += `</table>`;

    // добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
    $(".outer").css({'font-weight': 'bold', 'background-color': '#d8f0ef'});

}

function createListOfObjects(data) {
    var listOfObjectsHtml = '';

    $.each(data, function (key, val) {
        var id_build = "";

        id_build = val.place_first_lev

        listOfObjectsHtml += `<li>
                                <a class="first_lev_build_filter" href="#">` + val.place_first_lev + `</a>
                             </li>`;
    });

    $(".list_of_objects").html(listOfObjectsHtml);

    $(document).off('click', '.first_lev_build_filter').on('click', '.first_lev_build_filter', function () {
        var placeFirstLevel = $(this).text();
        if (placeFirstLevel !== "") {
            getEquipmentByFirstLevelName(placeFirstLevel);
            changePageTitle("Оборудовние и компоненты " + placeFirstLevel);
        }
    });
}



