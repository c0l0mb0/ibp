const ibpAgGrid = {
    columnDefs: [
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
    ],
    gridOptions: {
        domLayout: 'autoHeight',
        columnDefs: undefined,
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
            actionMenu.showOneRowAction();
        },
        onFirstDataRendered: (params) => {
            params.api.sizeColumnsToFit();
        }
    },
    setGridDiv: function () {
        this.gridDiv = document.querySelector('#page-content')
    },
    setGridData: function (data) {
        arr = Object.values(data);
        this.gridOptions.api.setRowData(arr);
    },
    setDeleteButtonAction: function () {
        function successDelete() {
            console.log('success');
            $.getJSON("http://ibp/api/public/index.php/api/v1/outerequipall", function (data) {
                ibpAgGrid.setGridData(data);
            })
        }

        actionMenu.deleteTableRow.on('click', function () {
            let selectedRows = ibpAgGrid.gridOptions.api.getSelectedRows()
            if (selectedRows.length > 0) {
                let selectedRowId = selectedRows[0].id_outer_equip;
                deleteOuterEquipAndLocation(selectedRowId, successDelete);
            } else {
                return false;
            }

        });
    },
    gridDiv: undefined,
    setAgGridOptions: function () {
        this.gridOptions.columnDefs = this.columnDefs;
    },
    setGridCloseObserver: function () {
        //close data editor observer
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
        observer.observe(this.gridDiv, {subtree: false, childList: true});
    },
    constructOuterTableAgGrid: function (data) {
        this.setAgGridOptions();
        this.prepareHtml();
        this.setGridDiv();

        new agGrid.Grid(this.gridDiv, this.gridOptions);

        this.setGridData(data);

        this.setGridCloseObserver();

        this.setDeleteButtonAction();

        actionMenu.showNewRowAction();
    },
    prepareHtml: function () {
        $("#page-content").html("");
        $("#page-content").css({'width': '100%'}).addClass('ag-theme-alpine');
    }
}

