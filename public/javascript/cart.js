
var cart = new Array();
var totalincart = 0;
if (localStorage.getItem('totalincart') != null) {
    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));
}

var item = JSON.parse(localStorage.getItem('cart'));
if (JSON.parse(localStorage.getItem('cart')) != null) {
    var i;
    for (i = 0; i < item.length; i++) {
        cart.push({isbn: item[i].isbn, quantity: item[i].quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
function add_to_cart(isbn) {
    // set total product number in cart
    localStorage.setItem('totalincart', totalincart.toString());
    item = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));


    if (item != null) {


        if (check_cart_item(isbn, item) != true) {
            cart.push({isbn: isbn, quantity: 1});
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    } else {
        cart.push({isbn: isbn, quantity: 1});
        localStorage.setItem('cart', JSON.stringify(cart));

    }
    totalincart = totalincart + 1;
    localStorage.setItem('totalincart', totalincart.toString());

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));

}

function check_cart_item(isbn, item) {
    var i;
    for (i = 0; i < item.length; i++) {
        if (isbn == item[i].isbn) {
            item[i].quantity = item[i].quantity + 1;
            cart[i] = {isbn: isbn, quantity: item[i].quantity};
            return true;
        }
    }
}

function display_test() {
    $("#testcart").html('');

    item = JSON.parse(localStorage.getItem('cart'));
    
        var html = '';
    var i;
    for (i = 0; i < item.length; i++) {
        
             html += '<p>' + item[i].isbn +'</p><br><p>'+ item[i].quantity  ;
        
    }
    
    $("#testcart").append(html);
}


display_test();