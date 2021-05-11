/*!
* Start Bootstrap - SB Admin v6.0.3 (https://startbootstrap.com/template/sb-admin)
* Copyright 2013-2021 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-sb-admin/blob/master/LICENSE)
*/
(function($) {
    "use strict";

    // Add active state to sidbar nav links
    var path = window.location.href; // because the 'href' property of the DOM element is the absolute path
    $("#layoutSidenav_nav .sb-sidenav a.nav-link").each(function() {
        if (this.href === path) {
            $(this).addClass("active");
        }
    });

    // Toggle the side navigation
    $("#sidebarToggle").on("click", function(e) {
        e.preventDefault();
        $("body").toggleClass("sb-sidenav-toggled");
    });
})(jQuery);

function dashboard_switch(html_script)
{
    document.getElementById("layoutSidenav_content").innerHTML = html_script;
}

//trade price slider
var trade_slider = document.getElementById("trade_id");
var trade_output = document.getElementById("trade_value");
trade_output.innerHTML = trade_slider.trade_value;

trade_slider.oninput = function() {
  trade_output.innerHTML = this.value;
}

//retail price slider
var retail_slider = document.getElementById("retail_id");
var retail_output = document.getElementById("retail_value");
retail_output.innerHTML = retail_slider.trade_value;

retail_slider.oninput = function() {
  retail_output.innerHTML = this.value;
}

//quantity slider
var quantity_slider = document.getElementById("quantity_id");
var quantity_output = document.getElementById("quantity_value");
quantity_output.innerHTML = quantity_slider.trade_value;

quantity_slider.oninput = function() {
  quantity_output.innerHTML = this.value;
}
