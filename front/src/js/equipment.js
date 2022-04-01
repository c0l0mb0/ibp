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
                <th class='w-15-pct'>Редактирование</th>
            </tr>`;

    // перебор возвращаемого списка данных
    $.each(data, function(key, val) {

        // создание новой строки таблицы для каждой записи
        read_products_html+=`<tr class="id outer`+ val.key+`">
            <td>` + val.place_first_lev + `</td>
            <td>` + val.place_third_lev + `</td>
            <td>` + val.affiliate + `</td>
            <td>` + val.equip_name  + `</td>
            <td>` + val.inner_name  + `</td>
            <td>` + val.factory_number  + `</td>
            <td>` + val.quant  + `</td>
            <td>` + val.year_issue + `</td>
            <td>` + val.state_tech_condition  + `</td>
            <td class = "equip_info">    
                <div class="equip_info-inner">
                    <button class='btn btn-primary read-one-equip-button' data-id='\` + val.id + \`'>
                       <img src="src/icon/arrow-return-left.svg"> 
                    </button>
                </div>
<!--                <button type="button" className="" data-id='` + val.id + `'>Просмотр</button>-->
            </td>
        </tr>`;
    });

    // конец таблицы
    read_products_html+=`</table>`;

    // добавим в «page-content» нашего приложения
    $("#page-content").html(read_products_html);
}
function createListOfObjects (data, keywords){
    var listOfObjectsHtml='';

    $.each(data, function(key, val) {
        listOfObjectsHtml +=`<li>
                                <a href="#">`+val.place_first_lev+`</a>
                             </li>`
    });

    $(".list_of_objects").html(listOfObjectsHtml);

}