jQuery(function ($) {
    // side bar
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });

    $('.all-equip').on('click', function () {
        getAllEquipment();

    });

    $('.edit_equip').on('click', function () {
        getAllOuterEquipmentAndParameters();
    });
    $('.new-table-row').hide();
    $('.delete-table-row').hide();
    $('.show-inner').hide();

    var app_html = `
        <div class='app-container'>

            <div class='page-header'>
                <h1 id='page-title'>Оборудование</h1>
            </div>

            <div id='page-content'></div>

        </div>`;

    $("#app").html(app_html);

});

// изменение заголовка страницы
function changePageTitle(page_title) {

    // измение заголовка страницы
    $('#page-title').text(page_title);

    // измение заголовка вкладки браузера
    document.title = page_title;
}



