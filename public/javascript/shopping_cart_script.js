//localStorage.removeItem('checkoutcart');

var checkoutcart = new Array();

if (JSON.parse(localStorage.getItem('checkoutcart')) != null) {
    var i;
    var item = JSON.parse(localStorage.getItem('checkoutcart'))
    for (i = 0; i < item.length; i++) {
        checkoutcart.push({isbn: item[i].isbn, name: item[i].name, quantity: item[i].quantity, price: item[i].price, og_quantity:item[i].og_quantity});
    }

    localStorage.setItem('checkoutcart', JSON.stringify(checkoutcart));
}

function checkoutcheckbox(index, booknumber, book) {
    var x = document.getElementById(booknumber).checked;
    if (x == true) {
        checkoutcart.push({isbn: book.isbn, name: book.name, quantity: book.quantity, price: book.price, og_quantity:book.og_quantity });
        localStorage.setItem('checkoutcart', JSON.stringify(checkoutcart));
    } else {
        var checkoutItem = JSON.parse(localStorage.getItem('checkoutcart'));

        if (checkoutItem != null) {
            for (var a = 0; a < checkoutItem.length; a++) {

                if (book.name == checkoutItem[a].name)
                    checkoutcart.splice(a, 1);

            }
        }

        localStorage.setItem('checkoutcart', JSON.stringify(checkoutcart));
    }
}

function update_quantity(quantity_select, isbn, i) {
    var item_update = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));
    console.log(quantity_select);

    if (quantity_select == 0) {
        cart.splice(i, 1);
        totalincart = totalincart - 1;
        localStorage.setItem('totalincart', totalincart.toString());
        localStorage.setItem('cart', JSON.stringify(cart));
        update_to_database();
    } else {
        for (i = 0; i < item_update.length; i++) {
            if (isbn == item_update[i].isbn) {
                item_update[i].quantity = quantity_select;
                cart[i] = {isbn: isbn, name: item_update[i].name, image: item_update[i].image, quantity: item_update[i].quantity, price: item_update[i].price, og_quantity: item_update[i].og_quantity};
            }
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        update_to_database();
    }
    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    display_cart();
}

function remove_item(i) {
    totalincart = parseInt(localStorage.getItem('totalincart'));

    cart.splice(i, 1);
    totalincart = totalincart - 1;
    localStorage.setItem('totalincart', totalincart.toString());
    localStorage.setItem('cart', JSON.stringify(cart));
    update_to_database();

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    display_cart();
}

function display_cart() {
    $("#cart").html('');

    item = JSON.parse(localStorage.getItem('cart'));
    console.log("test");
    console.log(JSON.parse(localStorage.getItem('cart')));

    var html = '';
    var i;
    var max;
    var totalPrice = 0;
    if (item.length > 0)
    {
        for (i = 0; i < item.length; i++) {
            max = item[i].og_quantity;

            html += '<div class="card-group">' +
                    '<div class="card h-100 mb-3">' +
                    '<div class="row" style="padding:10px 5px 10px 5px;">' +
                    '<div class="col-sm-1" style="margin: auto; display:flex; justify-content: center; align-items: center;">';

            if (checkCheckboxValue(item[i].name) != true) {
                html += '<input class="form-check-input" type="checkbox" onchange =\'checkoutcheckbox(' + i + ',this.value,' + JSON.stringify(item[i]) + ')\' id="' + item[i].isbn + '" style="height:auto; width: 20px; height: 20px;"/ value="' + item[i].isbn + '">';
            } else {
                html += '<input class="form-check-input" type="checkbox" onchange =\'checkoutcheckbox(' + i + ',this.value,' + JSON.stringify(item[i]) + ')\' id="' + item[i].isbn + '" style="height:auto; width: 20px; height: 20px;"/ value="' + item[i].isbn + '" checked >';
            }

            html += '</div>' +
                    '<div class="col-sm-4">' +
                    '<img class = "img-detail" id="details-img" src="' + item[i].image + '" alt="..." style="width: 250px; margin-left: 10px; border-radius: 2%" onerror="this.src=\'../resources/images/default_book.png\'">' +
                    '</div>' +
                    '<div class = "col-sm-7 mt-3">' +
                    '<div>' +
                    '<h2 class="card-title">' + item[i].name + '</h2>' +
                    '<p class="card-text">ISBN: ' + item[i].isbn + '</p>' +
                    '<p class="card-text">Unit Price: RM' + item[i].price + '</p>' +
                    '<p class="card-text">Total Price: RM' + item[i].price * item[i].quantity + '</p>';
            //                '<hr><p>ISBN:' + item[i].isbn + '</p><p>Price: RM' + item[i].price + '<br>';
            //html += '<input type="number" id="quantity" min="0" max="'+item[i].og_quantity+'" placeholder="'+ item[i].quantity +'">';
            html += '<div class="input-group mb-3">' +
                    '<label class="input-group-text" style="width: 100px !important;" for="quantity_select">Quantity</label>' +
                    '<select class="form-select" style="width: 130px;" id="quantity_select" onchange="update_quantity(this.value,\'' + item[i].isbn + '\', \'' + i + '\')">';

            for (var j = 0; j <= item[i].og_quantity; j++) {
                if (j == item[i].quantity) {
                    totalPrice += j * item[i].price;
                    html += '<option selected="selected" value="' + j + '">' + j + '</option>';
                } else {
                    html += '<option value="' + j + '">' + j + '</option>';
                }
            }
            html += '</select><br>' +
                    '</div>' +
                    '<button type="button" class="btn btn-danger" onclick="remove_item(\'' + i + '\')">Remove</button>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
        }
        $("#checkout_btn").removeClass("d-none");
    } else
    {
        $("#cart_item_none_title").removeClass("d-none");
        $("#checkout_btn").addClass("d-none");
    }

    //html +='<br><br><button type=button value="Update Cart" >Update cart</button>';
    html += //'<br><br><p>Total Price: RM' + totalPrice + '</p><br>' + 

            $("#cart").append(html);
}

function redirectHomepage() {
    window.location = "../php/homepage.php";
}

function redirectCheckout() {
    if (JSON.parse(localStorage.getItem('checkoutcart')) != null && JSON.parse(localStorage.getItem('checkoutcart')) != 0) {
        window.location = "/302cem-group7-project/public/php/checkout_page.php";
    } else {
        caution("Checkout Empty!", "No item is selected to be checked out.");
    }
}

//function update_to_database() {
//    var total_in_cart = parseInt(localStorage.getItem('totalincart'));
//    var cart_item = localStorage.getItem('cart');
//    $.ajax({
//        type: 'post',
//        data: {'product': cart_item, 'totalincart': total_in_cart},
//        url: '/302cem-group7-project/public/php/update_cart.php',
//        success: function (result) {
//            alert(result);
//        }
//    });
//
//}

function checkCheckboxValue(name) {

    var checkoutItem = JSON.parse(localStorage.getItem('checkoutcart'));

    if (checkoutItem != null) {
        for (var a = 0; a < checkoutItem.length; a++) {

            if (name == checkoutItem[a].name)
                return true;
            //            html += '<input class="form-check-input" type="checkbox" onchange =\'checkoutcheckbox('+ i +',this.value,'+ JSON.stringify(item[i]) +')\' id="' + item[i].isbn + '" style="height:auto; width: 20px; height: 20px;"/ value="' + item[i].isbn + '" checked >';
            //    console.log(checkoutItem[a]);

        }
    }
}

display_cart();
