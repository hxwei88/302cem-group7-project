//if (JSON.parse(localStorage.getItem('checkoutcart')) != null && JSON.parse(localStorage.getItem('checkoutcart')) != 0) {
//    localStorage.removeItem('checkoutcart');
//}

function displayCheckoutList() {
    $("#checkoutbookdiv").html('');
    item = JSON.parse(localStorage.getItem('checkoutcart'));
    var totalprice = 0;
    var html = '';
    for (i = 0; i < item.length; i++) {
        //html += '<div class="d-flex justify-content-between"><span class="item" id="bookname" style="display:inline-block; width:200px; white-space:nowrap; overflow: hidden !important; text-overflow: ellipsis;">' + item[i].name + '</span><span class="price" id="bookprice">' + item[i].price + '</span></div>';
        html += '<div class="row d-flex justify-content-between mb-2"><div class="col-8"><span class="item" id="bookname">' + item[i].name + '</span></div><div class="col-4" style="text-align:right;"><span class="price" id="bookprice">' + "RM " + item[i].price * item[i].quantity + '</span></div></div>';
        totalprice += item[i].price * item[i].quantity;
    }
    $("#checkoutbookdiv").append(html);
    document.getElementById("totalpriceincheckout").innerHTML = "RM " + totalprice;

}

//this is temporary
function tempcheckoutsuccess(title, message) {
    localStorage.removeItem('checkoutcart');
    localStorage.removeItem('cart');
    localStorage.removeItem('totalincart');
    tempcheckoutswal(title, message).then((result) => {
        if (result.isConfirmed) {
            window.location = "../php/homepage.php";
        } else
            window.location = "../php/homepage.php";
    });

}

function checkout() {
    var inCart = JSON.parse(localStorage.getItem('cart'));
    var checkoutCart = JSON.parse(localStorage.getItem('checkoutcart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));

    for (var i = 0; i < checkoutCart.length; i++)
    {
        for (var j = 0; j < inCart.length; j++)
        {

            if (inCart[j].name == checkoutCart[i].name) {
                cart.splice(j, 1);
                totalincart = totalincart - 1;
              
            }
        }
    }
    localStorage.setItem('totalincart', totalincart.toString());
    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    update_to_database();
    update_order_history();
    localStorage.removeItem('checkoutcart');
}

function invoiceEmail() {
//    console.log(document.getElementById('email').value)
//    var tempParams = {
//        to_name: document.getElementById('email').value
//    };
//    
//    emailjs.send('service_xj1fdor','template_4u9p29c', tempParams).then(function(res){
//        console.log("success",res.status);
//    })
}

function updateAddress(event) {
    event.preventDefault();
    var swal = loading("Adding Address...", "Please Wait");
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/checkout_add_address.php',
        data: new FormData($("#modalAddress")[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            result = JSON.parse(result)
            loadingcomplete(swal);
            if (result.status == 1) {
                loadingsuccess("Address Added Successfully!", "Thank You For Waiting", true)
            } else {
                loadingfailure("Address Failed To Add!", "Please Try Again", false)
            }
        }
    });
}

function request_user_data() {
    $.when($('#stock').fadeOut('fast')).done(function () {
        $("#stock_spinner").fadeIn('fast');
    })

    //if user has address it will auto input else will prompt modal
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/checkout_user_profile.php',
        success: function (result) {
            console.log("user profile result: " + result);
            result = JSON.parse(result)
            if (result.status == 1) {
                document.getElementById("adr").value = result.result[0].address;
            } else {
                $("#addressModal").modal('show');
            }
        }
    });
}

request_user_data();

displayCheckoutList();

function update_order_history() {
    var checkout_item = localStorage.getItem('checkoutcart');
    $.ajax({
        type: 'post',
        data: {'orderDetail': checkout_item},
        url: '/302cem-group7-project/public/php/add_order_history.php',
        success: function (result) {
            alert(result);
        }
    });

}