
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
        cart.push({isbn: item[i].isbn, quantity: item[i].quantity, price :item[i].price, og_quantity:item[i].og_quantity});
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
            cart.push({isbn: book.isbn, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
            totalincart = totalincart + 1;
            localStorage.setItem('totalincart', totalincart.toString());
        }

        localStorage.setItem('cart', JSON.stringify(cart));

    } else {
        cart.push({isbn: book.isbn, quantity: 1, price: book.retail_price, og_quantity: book.quantity});
        localStorage.setItem('cart', JSON.stringify(cart));
        totalincart = totalincart + 1;
        localStorage.setItem('totalincart', totalincart.toString());
    }
//    totalincart = totalincart + 1;
//    localStorage.setItem('totalincart', totalincart.toString());

    document.getElementById("totalincart").innerHTML = parseInt(localStorage.getItem('totalincart'));

}

function check_cart_item(isbn, item) {
    var i;
    for (i = 0; i < item.length; i++) {
        if (isbn == item[i].isbn) {
            item[i].quantity = item[i].quantity + 1;
            cart[i] = {isbn: isbn, quantity: item[i].quantity, price: item[i].price, og_quantity: item[i].og_quantity};
            return true;
        }
    }
}

function update_quantity(quantity_select, isbn){
    var item_update = JSON.parse(localStorage.getItem('cart'));
    var i;
    for (i = 0; i < item_update.length; i++) {
        if (isbn == item_update[i].isbn) {
            item_update[i].quantity = quantity_select;
            cart[i] = {isbn: isbn, quantity: item_update[i].quantity, price: item_update[i].price, og_quantity: item_update[i].og_quantity};
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
}

function display_test() {
    $("#testcart").html('');

    item = JSON.parse(localStorage.getItem('cart'));
    
    var html = '';
    var i;
    for (i = 0; i < item.length; i++) {
        
        html += '<hr><p>ISBN:' + item[i].isbn +'</p><p>Price: RM'+ item[i].price + '<br>';
        //html += '<input type="number" id="quantity" min="0" max="'+item[i].og_quantity+'" placeholder="'+ item[i].quantity +'">';
        html += '<div class="form-group">'+
                '<label for="quantity">Select Quantity</label>'+
                '<select class="form-control" id="quantity_select" onchange="update_quantity(this.value, '+item[i].isbn+')">';
                for(var j = 1; j <= item[i].og_quantity; j++){
                    html+='<option value="'+ j +'">'+ j +'</option>';
                }
        html+= '</select>'+
            '</div>';
                
    }
    //html +='<br><br><button type=button value="Update Cart" >Update cart</button>';
    html +='<br><br><input type=button value="Checkout"></button>';
    $("#testcart").append(html);
}


  display_test();