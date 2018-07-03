// ==UserScript==
// @id              stylish
// @name            stylish
// @version         1.0
// @description     User CSS
// @include         *
// @grant           GM_addStyle
// ==/UserScript==

(function stylish() {
    var ls = window.localStorage;

    if (ls.getItem('custom_css') === undefined || ls.getItem('custom_css') === null) {
        ls.setItem('custom_css', '');
    }

    if (ls.getItem('use_custom_css') === undefined || ls.getItem('use_custom_css') === null) {
        ls.setItem('use_custom_css', '0');
    }

    var custom_css = ls.getItem('custom_css');
    var use_custom_css = +ls.getItem('use_custom_css');

    var cfg_button = document.createElement('div');

    cfg_button.setAttribute('id', 'cfg_button');
    cfg_button.innerHTML =
        '<div id="cfg_title"><span>CSS</span></div>' +

        '<div id="cfg_holder">' +
        '<div id="cfg_css" class="cfg_tab">' +
        '<div><label><input id="cfg_checkbox" type="checkbox" ' + (use_custom_css ? "checked" : "") + '/><span>Применять CSS</span></label></div>' +
        '<div><a href="#" id="cfg_save_css">Сохранить CSS</a></div>' +
        '<textarea id="cfg_textarea">' + custom_css + '</textarea>' +
        '</div>' +
        '</div>' +
        '';
    document.body.appendChild(cfg_button);

    // Подключаем или отключаем CSS
    var chkbox = document.getElementById('cfg_checkbox');
    chkbox.onchange = function () {
        use_custom_css = this.checked ? 1 : 0;
        ls.setItem('use_custom_css', use_custom_css);
        updateStyle();
    };

    // Сохраняем CSS
    var cfg_save_css = document.getElementById('cfg_save_css');
    cfg_save_css.onclick = function () {
        custom_css = document.getElementById('cfg_textarea').value;
        ls.setItem('custom_css', custom_css);
        updateStyle();
        return false;
    };

    function updateStyle() {
        if (use_custom_css) {
            GM_addStyle(custom_css);
        }
    }

    updateStyle();

    GM_addStyle(
        `        
        #cfg_button:hover{
            right:0px;
            bottom:0px;
            transition:0.5s;
            transition-timing-function:ease-out;
        }

        #cfg_button{
           transition:0.5s;
           transition-timing-function:ease-out;
           border-left: 2px solid #252525;
           border-top: 2px solid #252525;
           border-radius: 10px 0 0 0;
           right:-200px;
           bottom:-220px;
           position:fixed;
           width:250px;
           height:250px;
        }

        #cfg_title{
           border-radius: 10px 0 0 0;
           background: none repeat scroll 0 0 #252525;
           color:#FFD97A;
           padding: 5px 0px 5px 10px;
        }

        #cfg_title img{
           padding-right:8px;
           padding-bottom:3px;
        }

        #cfg_textarea{
           height:190px;
        }
        `
    );
})();