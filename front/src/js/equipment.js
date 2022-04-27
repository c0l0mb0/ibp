function renderOuterInterTableStatement(data, keywords) {

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

function renderOuterTableStatement(data, keywords) {
    const columnDefs = [
        {headerName: "Имя", field: "equip_name", minWidth: 250, tooltipField: 'equip_name'},
        {headerName: "Номер", field: "factory_number", tooltipField: 'factory_number'},
        {headerName: "Производитель", field: "factory_name", tooltipField: 'factory_name'},
        {headerName: "ИнвНом", field: "inventory_number", tooltipField: 'inventory_number'},
        {headerName: "НомВвода", field: "numb_vvod"},
        {headerName: "Назначение", field: "purpose", tooltipField: 'purpose'},
        {headerName: "Выпуск", field: "year_issue", tooltipField: 'year_issue'},
        {headerName: "Эксплуатация", field: "year_exploitation", tooltipField: 'year_exploitation'},
        {headerName: "Мощность", field: "power", tooltipField: 'power'},
        {headerName: "Ток", field: "current"},
        {headerName: "Состояние", field: "state_tech_condition", tooltipField: 'state_tech_condition'}
    ];


// let the grid know which columns and what data to use
    const gridOptions = {
        domLayout: 'autoHeight',
        columnDefs: columnDefs,
        rowSelection: 'single',
        defaultColDef: {
            resizable: true,
            editable: true,
        },
        enableBrowserTooltips: true,
        onCellValueChanged: function (event) {
            // console.log(event.data);
            setOuterEquipmentRowById(event.data.id_outer_equip, event.data);
        },
        onRowSelected: function (event) {
            $('.delete-table-row').show();
            $('.show-inner').show();
        },
        onFirstDataRendered: onFirstDataRendered
    };

    function onFirstDataRendered(params) {
        params.api.sizeColumnsToFit();
    }


    $("#page-content").html("");
    $("#page-content").css({'width': '100%'}).addClass('ag-theme-alpine');
    const gridDiv = document.querySelector('#page-content');
    new agGrid.Grid(gridDiv, gridOptions);

    arr = Object.values(data);
    gridOptions.api.setRowData(arr);

    //observer of close data editor
    const observer = new MutationObserver(function (mutations_list) {

        //another one mutation observer has been started

        if (mutations_list.length > 1) {
            observer.disconnect();
            return;
        }
        // if (!(mutations_list[0].removedNodes === undefined) && (mutations_list[0].removedNodes.length > 0)) {
        mutations_list.forEach(node => {
            console.log(node);
            // if (!(mutations_list.removedNodes === undefined)) {
            if (node.removedNodes.length > 0) {
                // console.log(node);
                // console.log('mutations_list');
                $('.new-table-row').hide();
                $('.delete-table-row').hide();
                $('.show-inner').hide();
                observer.disconnect();
            }

        })
        // }
    });
    observer.observe(document.querySelector("#page-content"), {subtree: false, childList: true});


    $('.new-table-row').show();
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
        if (placeFirstLevel !== "") getEquipmentByFirstLevelName(placeFirstLevel);

    });
}

function createNewEquipSelectOptions(data) {
    let selectHtml = '';
    let counter = 0;

    $.each(data, function (key, val) {
        selectHtml += `<option value="` + counter + `">` + val.place_first_lev + `</option>`
        counter++;
    });

    $(".modal__place_first_lev-select").append(selectHtml);
}
