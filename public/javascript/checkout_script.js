//if (JSON.parse(localStorage.getItem('checkoutcart')) != null && JSON.parse(localStorage.getItem('checkoutcart')) != 0) {
//    localStorage.removeItem('checkoutcart');
//}
validate_checkout();

function validate_checkout() {
    $.when($('#checkout_main_div').fadeOut('fast')).done(function () {
        $("#checkout_spinner").fadeIn('fast');
    })

    var item = JSON.parse(localStorage.getItem('checkoutcart'))

    if (item != null) {
        if (item.length > 0)
        {
            request_user_data();

            displayCheckoutList();
        } else
        {
            window.location = "../php/homepage.php";
        }
    } else
    {
        window.location = "../php/homepage.php";
    }
}

function displayCheckoutList() {
    $("#checkoutbookdiv").html('');
    item = JSON.parse(localStorage.getItem('checkoutcart'));
    var totalprice = 0;
    var html = '';
    for (i = 0; i < item.length; i++) {
        //html += '<div class="d-flex justify-content-between"><span class="item" id="bookname" style="display:inline-block; width:200px; white-space:nowrap; overflow: hidden !important; text-overflow: ellipsis;">' + item[i].name + '</span><span class="price" id="bookprice">' + item[i].price + '</span></div>';
        html += '<div class="row d-flex justify-content-between mb-2"><div class="col-6"><span class="item" id="bookname">' + item[i].name + '</span></div><div class="col-6" style="text-align:right;"><span class="price" id="bookprice">' + "RM " + (item[i].price * item[i].quantity).toFixed(2) + '</span></div></div>';
        totalprice += item[i].price * item[i].quantity;
    }
    $("#checkoutbookdiv").append(html);
    document.getElementById("totalpriceincheckout").innerHTML = "RM " + totalprice.toFixed(2);

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

function checkout(event) {
    event.preventDefault()
    var inCart = JSON.parse(localStorage.getItem('cart'));
    var checkoutCart = JSON.parse(localStorage.getItem('checkoutcart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));



    for (var i = inCart.length - 1; i >= 0; i--)
    {
        for (var j = 0; j < checkoutCart.length; j++)
        {

            if (inCart[i].isbn == checkoutCart[j].isbn) {
                cart.splice(i, 1);
                totalincart = totalincart - 1;

            }
        }
    }


    update_order_history();
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
            //need to close the modal
            //need to autofill the address
        }
    });
}

function request_user_data() {
    //if user has address it will auto input else will prompt modal
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/checkout_user_profile.php',
        success: function (result) {
            $.when($('#checkout_spinner').fadeOut('fast')).done(function () {
                $("#checkout_main_div").fadeIn('fast');
            })
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

function update_order_history() {
    var fname = document.getElementById("fname").value;
    var email = document.getElementById("email").value;
    var address = document.getElementById("adr").value;
    var checkout_item = localStorage.getItem('checkoutcart');

    $swal = loading("Processing Checkout...", "Please wait a moment...")

    $.ajax({
        type: 'post',
        data: {'orderDetail': checkout_item, 'fname': fname, 'email': email, 'address': address},
        url: '/302cem-group7-project/public/php/add_order_history.php',
        success: function (result) {
            result = JSON.parse(result);

            if (result.status == 1)
            {
                localStorage.setItem('totalincart', totalincart.toString());
                localStorage.setItem('cart', JSON.stringify(cart));
                document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
                update_to_database();
                update_book_quantity();
                localStorage.removeItem('checkoutcart');
                loadingcomplete($swal);
                loadingsuccess("Successful Checkout!", "Thank you for buying!", true).then(() => {
                    window.location = '../php/homepage.php';
                });
                ;
            } else
            {
                loadingcomplete($swal);
                loadingfailure("Checkout Failed", "Please try again later.", true).then(() => {
                    window.location = '../php/homepage.php';
                });
            }
        }
    });

}

function update_book_quantity() {
    var checkoutcart_item = localStorage.getItem('checkoutcart');
    $.ajax({
        type: 'post',
        data: {'product': checkoutcart_item},
        url: '/302cem-group7-project/public/php/reduce_book_quantity.php',
        success: function (result) {
            console.log();
        }
    });

}