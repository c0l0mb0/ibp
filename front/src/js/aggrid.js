function renderOuterTableAgGrid(data) {
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

        //if another one mutation observer has been started
        if (mutations_list.length > 1) {
            observer.disconnect();
            return;
        }

        mutations_list.forEach(node => {
            console.log(node);
            if (node.removedNodes.length > 0) {
                actionMenu.hideALl();
                observer.disconnect();
            }
        })

    });
    observer.observe(document.querySelector("#page-content"), {subtree: false, childList: true});

    // delete item button
    $('.delete-table-row').on('click', function () {
        let selectedRows = gridOptions.api.getSelectedRows()
        if (selectedNodes.length>0) {
            let selectedRowId = selectedNodes[0].id_outer_equip;
            $.ajax({
                url: config.api.deleteOuterEquipAndItsLocation,
                method: 'DELETE',
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
        } else {
            return false;
        }

    });

    $('.new-table-row').show();
}