jQuery(function ($) {
    actionMenu.hideALl();
    addApplicationConteinerHTML();
    changePageTitle("Все оборудовние и компоненты");
});

var ui = {
    modalOuterEquip: {
        formAddOuterEquip: $('#form_outer-equipment-and-location'),
        error: $('#form_outer-equipment-and-location__error')
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







