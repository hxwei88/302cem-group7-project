
var cart = new Array();
var totalincart = 0;
document.getElementById("totalincart").innerHTML = parseInt(sessionStorage.getItem('totalincart'));

function add_to_cart(isbn) {
    sessionStorage.setItem('totalincart', totalincart.toString());
    var item = JSON.parse(sessionStorage.getItem(isbn));
    totalincart = parseInt(sessionStorage.getItem('totalincart'));
    console.log(totalincart);


    if (item != null) {
        if (isbn == item['isbn']) {

            var x = item['quantity'] + 1;
            cart[isbn] = {isbn: isbn, quantity: x};
            totalincart = totalincart +1;
            sessionStorage.setItem(isbn, JSON.stringify(cart[isbn]));
            sessionStorage.setItem('totalincart', totalincart.toString());

        } else {
            cart[isbn] = {isbn: isbn, quantity: 1};
            totalincart = totalincart +1;
            sessionStorage.setItem(isbn, JSON.stringify(cart[isbn]));
            sessionStorage.setItem('totalincart', totalincart.toString());
        }
    } else {
        cart[isbn] = {isbn: isbn, quantity: 1};


        totalincart = totalincart +1;
            sessionStorage.setItem(isbn, JSON.stringify(cart[isbn]));
            sessionStorage.setItem('totalincart', totalincart.toString());
    }
    
    
    document.getElementById("totalincart").innerHTML = parseInt(sessionStorage.getItem('totalincart'));
    //sessionStorage.setItem('cart', JSON.stringify(cart['hello']) );
    
    //console.log(JSON.parse(JSON.stringify(sessionStorage)));
     
     var items = JSON.parse(JSON.stringify(sessionStorage));
     var v = JSON.parse(items[isbn]);
     console.log(items)
}
