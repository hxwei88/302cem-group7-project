
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
} else {
    $("#cart_item_none_title").removeClass("d-none");
    $("#checkout_btn").addClass("d-none");
}

//add to cart button from book details page
function add_to_cart_detail(book) {
    
    var get_select_quantity=document.getElementById("select_quantity").value;  
    var select_quantity = Number(get_select_quantity);
    
    //set total product number in cart
    localStorage.setItem('totalincart', totalincart.toString());
    item = JSON.parse(localStorage.getItem('cart'));
    totalincart = parseInt(localStorage.getItem('totalincart'));

    if (item != null) {
        
        //if cart is not empty, and if book doesnt exist in cart
        if (check_cart_item(book.isbn, item) != true) {
            cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: select_quantity , price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());
            localStorage.setItem('cart', JSON.stringify(cart));
        }else{
            //same book already exists in cart
            update_from_detail(book.isbn, item, select_quantity )
            localStorage.setItem('cart', JSON.stringify(cart));
        }
    } else {
        //no book in cart, added new book
        cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: select_quantity, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
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
            cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1 , price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());
            
        }
        //same book already exists in cart
        localStorage.setItem('cart', JSON.stringify(cart));
        
    } else {
        //no book in cart, added new book
        cart.push({isbn: book.isbn, name: book.name, image: book.image, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
        
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
        } else {
            return true;
        }
    }
}

function update_from_detail(isbn, item, get_quantity){
    var i;
    for (i = 0; i < item.length; i++) {
        //if isbn is same, update with the quantity from parameter
        if(item[i].isbn == isbn){
            cart[i] = {isbn: isbn, name: item[i].name, image: item[i].image, quantity: get_quantity, price: item[i].price, og_quantity: item[i].og_quantity};
        }
    }
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
        window.location = "../php/login.php";
    }else{
        window.location = "../php/cart_page.php";
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
    window.location = "../php/login.php";
}


