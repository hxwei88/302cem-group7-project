
var cart = new Array();
var totalincart = 0;

function check_user_database() {
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/check_user_cart.php',
        success: function (result) {

            var data = JSON.parse(result);
            if(data != null)
            {
                var product = JSON.parse(data['product']);

                if (cookieexist() == true) {
                    if (item == null) {
                        var i;
                        for (i = 0; i < product.length; i++) {
                            cart.push({isbn: product[i].isbn, name: product[i].name, image: product[i].image, quantity: product[i].quantity, price: product[i].price, og_quantity: product[i].og_quantity});
                        }

                        localStorage.setItem('cart', JSON.stringify(cart));
                    }

                    if (localStorage.getItem('totalincart') == null) {
                        totalincart = data['totalincart'];
                        localStorage.setItem('totalincart', totalincart.toString());
                        document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
                        totalincart = parseInt(localStorage.getItem('totalincart'));
                    }
                }
            }
        }
    });

}


check_user_database();

if (localStorage.getItem('totalincart') != null) {
    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));
}

var item = JSON.parse(localStorage.getItem('cart'));
if (JSON.parse(localStorage.getItem('cart')) != null) {
    var i;
    for (i = 0; i < item.length; i++) {
        cart.push({isbn: item[i].isbn, name: item[i].name, image: item[i].image, quantity: item[i].quantity, price: item[i].price, og_quantity: item[i].og_quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
} else {
    $("#cart_item_none_title").removeClass("d-none");
    $("#checkout_btn").addClass("d-none");
}

if (cookieexist() == false) {
      document.getElementById("profile").innerHTML = "<i class=\"fas fa-user me-1\"></i>Log In";
  
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

//add to cart button from book details page
function add_to_cart_detail(book) {

    var get_select_quantity = document.getElementById("select_quantity").value;
    var select_quantity = Number(get_select_quantity);

    //set total product number in cart
    localStorage.setItem('totalincart', totalincart.toString());
    item = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));

    if (item != null) {

        //if cart is not empty, and if book doesnt exist in cart
        if (check_cart_item(book.isbn, item) != true) {
            cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: select_quantity, price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());
            localStorage.setItem('cart', JSON.stringify(cart));
            update_to_database();
        } else {
            //same book already exists in cart
            update_from_detail(book.isbn, item, select_quantity)
            localStorage.setItem('cart', JSON.stringify(cart));
            update_to_database();
        }
    } else {
        //no book in cart, added new book
        cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: select_quantity, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
        add_to_database();
    }

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));

    window.location = "../php/cart_page.php";
}

function add_to_cart(book) {
    //set total product number in cart
    localStorage.setItem('totalincart', totalincart.toString());
    item = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));


    if (item != null) {
        
        //if cart is not empty, and if book doesnt exist in cart
        if (check_cart_item(book.isbn, item) != true) {
            cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());

        }
        //same book already exists in cart
        localStorage.setItem('cart', JSON.stringify(cart));
        update_to_database();
    } else {
        //no book in cart, added new book
        cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
        add_to_database();

    }
//    totalincart = totalincart + 1;
//    localStorage.setItem('totalincart', totalincart.toString());

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));

    window.location = "../php/cart_page.php";
}


function check_cart_item(isbn, item) {
    var i;
    for (i = 0; i < item.length; i++) {
        if (item[i].quantity < item[i].og_quantity) {
            if (isbn == item[i].isbn) {
                item[i].quantity = parseInt(item[i].quantity)
                item[i].quantity = item[i].quantity + 1;
                cart[i] = {isbn: isbn, name: item[i].name, image: item[i].image, quantity: item[i].quantity, price: item[i].price, og_quantity: item[i].og_quantity};
                return true;
            }
        }  
    }
}

function update_from_detail(isbn, item, get_quantity) {
    var i;
    for (i = 0; i < item.length; i++) {
        //if isbn is same, update with the quantity from parameter
        if (item[i].isbn == isbn) {
            cart[i] = {isbn: isbn, name: item[i].name, image: item[i].image, quantity: get_quantity, price: item[i].price, og_quantity: item[i].og_quantity};
        }
    }
}


function getcookie() {
    //trim and separate all cookies as js object
    var cookies = document.cookie
            .split(';')
            .map(cookie => cookie.split('='))
            .reduce((accumulator, [key, value]) =>
                ({...accumulator, [key.trim()]: decodeURIComponent(value)}),
                    {});

    //put cookie user into variable and return
    var cookie = cookies.user;
    return cookie;
}

function checkcookie() {
    //get cookie
    var cookie = getcookie()

    console.log(cookie);

    if (cookie === undefined) {
        window.location = "../php/login_page.php";
    } else {
        window.location = "../php/cart_page.php";
    }
}

function cookieexist() {
    //get cookie
    var cookie = getcookie()

    if (cookie === undefined) {
        return false;
    } else {
        return true;
    }
}

function cookieredirect() {
    window.location = "../php/login_page.php";
}

function check_login_cookie() {
    if (cookieexist() == false) {
        cookieredirect();
    }
}

function add_to_database() {
    var total_in_cart = parseInt(localStorage.getItem('totalincart'));
    var cart_item = localStorage.getItem('cart');
    $.ajax({
        type: 'post',
        data: {'product': cart_item, 'totalincart': total_in_cart},
        url: '/302cem-group7-project/public/php/add_to_cart.php',
        success: function (result) {
            alert(result);
        }
    });

}

function update_to_database() {
    var total_in_cart = parseInt(localStorage.getItem('totalincart'));
    var cart_item = localStorage.getItem('cart');
    $.ajax({
        type: 'post',
        data: {'product': cart_item, 'totalincart': total_in_cart},
        url: '/302cem-group7-project/public/php/update_cart.php',
        success: function (result) {
            //alert(result);
        }
    });

}
