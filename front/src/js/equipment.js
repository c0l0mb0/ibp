// html список товаров
function readProductsTemplate(data, keywords){

    var read_products_html=`
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

    // перебор возвращаемого списка данных
    $.each(data, function(key, val) {

        // создание новой строки таблицы для каждой записи
        read_products_html+=`<tr>
            <td>` + val.place_first_lev + `</td>
            <td>` + val.place_third_lev + `</td>
            <td>` + val.affiliate + `</td>
            <td>` + val.equip_name  + `</td>
            <td>` + val.inner_name  + `</td>
            <td>` + val.factory_number  + `</td>
            <td>` + val.quant  + `</td>
            <td>` + val.year_issue + `</td>
            <td>` + val.state_tech_condition  + `</td>
        </tr>`;
    });

    // конец таблицы
    read_products_html+=`</table>`;

    // добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
}