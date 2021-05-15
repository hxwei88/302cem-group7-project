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
    document.getElementById("layoutSidenav_content").innerHTML = html_script;
}

//trade price slider
var trade_slider = document.getElementById("trade_id");
var trade_output = document.getElementById("trade_value");
trade_output.innerHTML = trade_slider.trade_value;

trade_slider.oninput = function() {
  trade_output.innerHTML = this.value;
};

//retail price slider
var retail_slider = document.getElementById("retail_id");
var retail_output = document.getElementById("retail_value");
retail_output.innerHTML = retail_slider.trade_value;

retail_slider.oninput = function() {
  retail_output.innerHTML = this.value;
};

//quantity slider
var quantity_slider = document.getElementById("quantity_id");
var quantity_output = document.getElementById("quantity_value");
quantity_output.innerHTML = quantity_slider.trade_value;

quantity_slider.oninput = function() {
  quantity_output.innerHTML = this.value;
};

function upload(file){
    var ext = file.split(".");
    ext = ext[ext.length-1].toLowerCase();
    var arrayExtensions = ["jpg" , "jpeg", "png"];

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        alert("Sorry, only JPG, JPEG and PNG files are allowed.");
        $("#image").val("");
    }
}

$('#submit').click(function() {
    var isbn = $('#isbn_input').val();
    var name = $('#name_input').val();
    var author = $('#author_input').val();
    var date = $('#date_input').val();
    var desc = $('#description_input').val();
    var img = $('#image').val();
    var tradePrice = $('#tradePrice').val();
    var retailPrice = $('#retailPrice').val();
    var quantity = $('#quantity').val();
    
    $.ajax({
        type: 'POST',
        url: 'insert_product.php',
        data: { isbn_input: isbn, name_input: name, author_input: author, date_input: date, description_input: desc, image: img, tradePrice: tradePrice, retailPrice: retailPrice, quantity: quantity },
        succes: function(response) {
            $('#result').html(response);
        }
    });
});