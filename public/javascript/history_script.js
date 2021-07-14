$(document).ready( function () {
    $('#exampletable2').DataTable();
} );

function display_history(result) {
    $("#history_display").html('');
    var html = '';
    html += '<div class="row">';
    result.forEach(function (item) {
        var order = JSON.parse(item.orderDetail);
        var cartTotal = 0;
        html += "<div class='col-6 mb-4'>";
        html += '<div class="card history-card">';
        html += '<div class="card-header" id="heading' + item.id + '">';
        html += '<p class="mb-0">';
        html += '<b>Order ID: #' + item.id + '</b>';
        html += '</p>';
        html += '</div>';

        html += '<div class="card-body">';
        html += '<b>User Id</b>: ' + item.userid + "<br>" +
                '<b>Username</b>: ' + item.username + '<br>' +
                '<b>Email Adress</b>: ' + item.email + '<br>' +
                '<b>Adress</b>: ' + item.address + '<br>' +
                '<b>Date & Time</b>: ' + item.date + "<br></p>" +
                '<hr>';

        var i = 0;
        for (i = 0; i < order.length; i++) {
            var totalprice = order[i].price * order[i].quantity;
            html += '<b>' + order[i].name + '</b><br>' +
                    '<b>Quantity</b>: ' + order[i].quantity +
                    '<span style="padding-left:20px"><b>Price Per Book</b>: RM' + order[i].price + '</span>' +
                    '<span style="padding-left:20px"><b>Total Price</b>: RM' + totalprice + '<br><hr>';
            cartTotal = cartTotal + totalprice;
        }

        html += '<b>Cart total price</b>: RM' + cartTotal;
        html += '</div>';
        html += '</div>';
        html += '</div><br>';
    });
    html += '</div>';
    html += '';
    $("#history_display").append(html);
}

function display_history_table(result) {
    $("#history_display").html('');
    var html = '';
    html += '<table id="exampletable2" class="display"  style="width:100%; table-layout:fixed">';
    html += '<thead>' +
            '<tr>' +
            '<th>Order Id</th>' +
            '<th>User Id</th>' +
            '<th>Username</th>' +
            '<th>Email Address</th>' +
            '<th>Address</th>' +
            '<th>Date & Time</th>' +
            '<th>Book Name</th>' +
            '<th>Quantity</th>' +
            '<th>Price Per Book</th>' +
            '<th>Total Price</th>' +
            '<th>Cart total price</th>' +
            '</tr>' +
            '</thead>' +
            '<tbody>';
    result.forEach(function (item) {
        var order = JSON.parse(item.orderDetail);
        var cartTotal = 0;
 
        for (var i = 0; i < order.length; i++) {
            html += '<tr>' +
                    '<td style="word-wrap:break-word;">' + item.id + '</td>' +
                    '<td style="word-wrap:break-word;">' + item.userid + '</td>' +
                    '<td style="word-wrap:break-word;">' + item.username + '</td>' +
                    '<td style="word-wrap:break-word;">' + item.email + '</td>' +
                    '<td style="word-wrap:break-word;">' + item.address + '</td>' +
                    '<td style="word-wrap:break-word;">' + item.date + '</td>';
            html += '<td style="word-wrap:break-word;">' + order[i].name + '</td>' +
                    '<td style="word-wrap:break-word;">' + order[i].quantity + '</td>' +
                    '<td style="word-wrap:break-word;">' + order[i].price + '</td>' +
                    '<td style="word-wrap:break-word;">' + order[i].quantity * order[i].price + '</td>';
            for (var j = 0; j < order.length; j++) {
                cartTotal += order[j].quantity * order[j].price;

            }
            html += '<td style="word-wrap:break-word;">' + cartTotal + '</td>';
            cartTotal = 0;
        }

        html += '</tr>';
    });

    html += '</tbody>';
    html += '</table>';
    $("#history_display").append(html);
    $(document).ready(function () {
        $('#exampletable2').DataTable();
    });
}

function show_table() {
    $('#history_display').html(" ");
    request_history_data("table-view");
}

function show_card() {
    $('#history_display').html(" ");
    request_history_data("card-view");
}

function request_history_data(btn_id) {
    $.when($('#history_display').fadeOut('fast')).done(function () {
        $("#history_spinner").fadeIn('fast');
    })
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/history.php',
        success: function (result) {
            console.log("history result: " + result);
            result = JSON.parse(result);
            console.log(result);
            if (btn_id == "table-view") {
                display_history_table(result.result);
            } else {
                display_history(result.result);
            }
            $.when($('#history_spinner').fadeOut('fast')).done(function () {
                $("#history_display").fadeIn('fast');
            })
        }
    });
}
request_history_data("table-view");


