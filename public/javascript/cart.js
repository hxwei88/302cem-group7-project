
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
        cart.push({isbn: item[i].isbn, name: item[i].name, image: item[i].image, quantity: item[i].quantity, price: item[i].price, og_quantity: item[i].og_quantity});
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}
function add_to_cart(book) {

    //set total product number in cart
    localStorage.setItem('totalincart', totalincart.toString());
    item = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));


    if (item != null) {


        if (check_cart_item(book.isbn, item) != true) {
            cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    } else {
        cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
    }
//    totalincart = totalincart + 1;
//    localStorage.setItem('totalincart', totalincart.toString());

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    
    window.location.replace("../php/cart_page.php");
}

function check_cart_item(isbn, item) {
    var i;
    for (i = 0; i < item.length; i++) {
        if (item[i].quantity < item[i].og_quantity) {
            if (isbn == item[i].isbn) {
                item[i].quantity = item[i].quantity + 1;
                cart[i] = {isbn: isbn, name: item[i].name, image: item[i].image, quantity: item[i].quantity, price: item[i].price, og_quantity: item[i].og_quantity};
                return true;
            }
        } else {
            return true;
        }
    }
}

function update_quantity(quantity_select, isbn) {
    var item_update = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));
    var i;
    console.log(item_update);

    if (quantity_select == 0) {
        cart.splice(i, 1);
        totalincart = totalincart - 1;
        localStorage.setItem('totalincart', totalincart.toString());
    } else {
        for (i = 0; i < item_update.length; i++) {
            if (isbn == item_update[i].isbn) {
                item_update[i].quantity = quantity_select;
                cart[i] = {isbn: isbn, name: item[i].name, image: item[i].image, quantity: item_update[i].quantity, price: item_update[i].price, og_quantity: item_update[i].og_quantity};
            }
        }
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));
    display_test();
}

function display_test() {
    $("#testcart").html('');

    item = JSON.parse(localStorage.getItem('cart'));
    console.log("test");
    console.log(JSON.parse(localStorage.getItem('cart')));

    var html = '';
    var i;
    var max;
    var totalPrice = 0;
    for (i = 0; i < item.length; i++) {
        max = item[i].og_quantity;

        html += '<div style="padding-top:20px;">' + 
                '<div class="card">' +
                '<div class="row" style="padding:10px 5px 10px 5px;">' +
                '<div class="col-sm-1" style="margin: auto; display:flex; justify-content: center; align-items: center;">' +
                '<input class="form-check-input" type="checkbox" id="' + item[i].isbn + '" style="width: 20px; height: 20px;"/>' +
                '</div>' +
                '<div class="col-sm-6">' +
                '<img class = "img-detail" id="details-img" src="' + item[i].image + '" alt="..." style="; height: 200px; width: 600px; margin-left: 10px; border-radius: 2%">' +
                '</div>' +
                '<div class = "col-sm-5" style="padding-top: 30px;">' +
                '<div>' +
                '<h5 class="card-title">' + item[i].name + '</h5>' +
                '<p class="card-text">ISBN: ' + item[i].isbn + '</p>' +
                '<p class="card-text">Price: RM' + item[i].price + '</p>';
//                '<hr><p>ISBN:' + item[i].isbn + '</p><p>Price: RM' + item[i].price + '<br>';
        //html += '<input type="number" id="quantity" min="0" max="'+item[i].og_quantity+'" placeholder="'+ item[i].quantity +'">';
        html += '<div class="input-group mb-3">' +
                '<label class="input-group-text" style="width: 130px;" for="quantity_select">Select Quantity</label>' +
                '<select class="custom-select-lg" style="width: 130px;" id="quantity_select" onchange="update_quantity(this.value,\'' + item[i].isbn + '\')">';

        for (var j = 0; j <= item[i].og_quantity; j++) {
            if (j == item[i].quantity) {
                totalPrice += j * item[i].price;
                html += '<option selected="selected" value="' + j + '">' + j + '</option>';
            } else{
                html += '<option value="' + j + '">' + j + '</option>';
            }
        }
        html += '</select><br>' +
                '</div>' +
                '</div>' + 
                '</div>' + 
                '</div>' + 
                '</div>' + 
                '</div>';

    }
    //html +='<br><br><button type=button value="Update Cart" >Update cart</button>';
    html += '<br><br><p>Total Price: RM' + totalPrice + '</p><br>' + 
            '<div style="display:flex; justify-content:flex-end; width:100%; padding:0;">' + 
            '<p><button class="btn btn-primary" type="button" value="Continue Shopping" onclick="redirectHomepage()">Continue Shopping</button><input class="btn btn-primary" type=button value="Checkout"></button></p>' + 
            '</div>';
    $("#testcart").append(html);
}

function redirectHomepage(){
    window.location.replace("../php/homepage.php");
}

function getcookie(){
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

function checkcookie(){
    //get cookie
    var cookie = getcookie()
    
    if(cookie === undefined){
        window.location.replace("../php/login.php");
    }else{
        window.location.replace("../php/cart_page.php");
    }
}

function cookieexist(){
    //get cookie
    var cookie = getcookie()
    
    if(cookie === undefined){
        return false;
    }else{
        return true;
    }
}

function cookieredirect(){
    window.location.replace("../php/login.php");
}

display_test();
