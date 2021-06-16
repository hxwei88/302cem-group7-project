//if (JSON.parse(localStorage.getItem('checkoutcart')) != null && JSON.parse(localStorage.getItem('checkoutcart')) != 0) {
//    localStorage.removeItem('checkoutcart');
//}
var checkoutcart = new Array();

function checkoutcheckbox(index, booknumber, book) {  
  var x = document.getElementById(booknumber).checked;
    if (x == true){
        checkoutcart.push({name: book.name, quantity: book.quantity, price: book.price,});
        localStorage.setItem('checkoutcart', JSON.stringify(checkoutcart));
    }else{
        checkoutcart.splice(index, 1);
        localStorage.setItem('checkoutcart', JSON.stringify(checkoutcart));
   }
}

function displayCheckoutList(){
    $("#checkoutbookdiv").html('');
    item = JSON.parse(localStorage.getItem('checkoutcart'));
    var totalprice = 0;
    var html = '';
    for (i = 0; i < item.length; i++) {
        //html += '<div class="d-flex justify-content-between"><span class="item" id="bookname" style="display:inline-block; width:200px; white-space:nowrap; overflow: hidden !important; text-overflow: ellipsis;">' + item[i].name + '</span><span class="price" id="bookprice">' + item[i].price + '</span></div>';
        html += '<div class="row d-flex justify-content-between mb-2"><div class="col-8"><span class="item" id="bookname">' + item[i].name + '</span></div><div class="col-4" style="text-align:right;"><span class="price" id="bookprice">' + "RM " + item[i].price*item[i].quantity + '</span></div></div>';
        totalprice += item[i].price*item[i].quantity;
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

displayCheckoutList();