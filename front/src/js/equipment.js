// html список товаров
function renderOuterInterTable(data, keywords) {

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
                <th class='w-15-pct'>Редактирование</th>
            </tr>`;

    // перебор возвращаемого списка данных
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
            <td class = "equip_info">    
                <div class="equip_info-inner">
                    <button class='btn btn-primary read-equip-properties' data-idType='` + equipmentId.idType + `' data-idNumb='` + equipmentId.idNumb + `'>
                       <img src="src/icon/arrow-return-left.svg"> 
                    </button>
                </div>
<!--                <button type="button" className="" data-id='` + val.id + `'>Просмотр</button>-->
            </td>
        </tr>`;
    });

    // конец таблицы
    read_products_html += `</table>`;

    // добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
    $(".outer").css({'font-weight': 'bold', 'background-color': '#d8f0ef'});

    $(document).on('click', '.read-equip-properties', function () {
        let equipmentId = {
            idType: "",
            idNumb: ""
        }
        equipmentId.idType = $(this).attr('data-idType')
        equipmentId.idNumb = $(this).attr('data-idNumb')
        console.log(equipmentId)
        // getEquipmentByFirstLevelName($(this).text())
    });

}

function createListOfObjects(data, keywords) {
    var listOfObjectsHtml = '';

    $.each(data, function (key, val) {
        var id_build = "";

        id_build = val.place_first_lev

        listOfObjectsHtml += `<li>
                                <a class="read-one-equipment-button" href="#">` + val.place_first_lev + `</a>
                             </li>`;
    });

    $(".list_of_objects").html(listOfObjectsHtml);

    $(document).on('click', '.read-one-equipment-button', function () {
        var placeFirstLevel = $(this).text();
        if (placeFirstLevel !== "") getEquipmentByFirstLevelName(placeFirstLevel);

    });
}

// function outerEquipToBold() {
//     $('.table').
// }