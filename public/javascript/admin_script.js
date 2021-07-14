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
    
    $('#layoutSidenav_content').load('/302cem-group7-project/views/stock.html');
})(jQuery);

function dashboard_switch(html_script)
{
    $.when($('#layoutSidenav_content').fadeOut('fast')).done(function () {
        $('#layoutSidenav_content').load('/302cem-group7-project/views/' + html_script, function () {
            if(html_script == "add_stock.html")
            {
                initialize_slider_value();
            }
        }).fadeIn();
    });
}

function logout() {
    localStorage.removeItem('checkoutcart');
    localStorage.removeItem('cart');
    localStorage.removeItem('totalincart');
    document.cookie = 'user' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'role' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    document.cookie = 'userid' + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    window.location.replace("../php/homepage.php");
}
