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

function cookieexist(){
    //get cookie
    var cookie = getcookie()
    
    if(cookie === undefined){
        return false;
    }else{
        return true;
    }
}

function check_cookie_exist(){
    
    if (cookieexist() == false){
        $("#dropdown_menu").hide();
        
    }
    
}


 check_cookie_exist();

function display(data) {
    $("#display_books").html('');
    var html = '<div class="row">';
    data.forEach(function (item, index, arr) {

        if (item.image.substring(item.image.lastIndexOf('/') + 1) == "")
        {
            var image = "../resources/images/default_book.png";
        } else
        {
            var image = item.image;
        }
        console.log(JSON.stringify(item))
        var x = JSON.stringify(item);
        html += '<div class="col-3 py-2 mb-3">' +
                '<div class="card h-100">' +
                '<img class="card-img-top" style="height: 400px; width: 100%; margin: auto; border-radius: 2%" src=" ' + 
                item.image + 
                '" alt="..." />' +
                '<div class="card-body p-4">' +
                '<div class="text-center">' +
                item.author +
                '<h5 class="fw-bolder">' + 
                item.name + 
                '</h5>' +
                'RM' +
                item.retail_price + 
                '</div>' +
                '</div>' +
                '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">' +
                '<form action="cart.php" method="post" id ="test">'+
                '<input id = "quantity" type="hidden" name="quantity" value="1">'+
                '<input id = "isbn" type="hidden" name="product_isbn" value="' + item.isbn + '">'+
                '</form>';
                //if cookie exists then enable button
                if(cookieexist()== true){
                    html+='<button type="button" class="btn btn-primary" value=' + item.isbn + ' onclick =\'add_to_cart('+ JSON.stringify(item) +')\'>Add to Cart</button>' ;
                }
                
                //if cookie doesnt exist, disable button
                if(cookieexist()== false){
                    html+='<button type="button" class="btn btn-primary" onclick="cookieredirect()">Add to Cart</button>' ;
                }
          html+='</div>' +
                '</div>' +
                '</div>';
    })

    html += '</div>'
    $("#display_books").append(html);
}

function request_book_data(data) {

    $("#stock_spinner_home").show();

    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/stock.php',
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            result = JSON.parse(result);
            console.log(result);
                $("#stock_spinner_home").hide();

            display(result.result);
        }
    });
}
request_book_data();

function add_to_cart_ajax(isbn){
   var swal = loading("Cart", "Adding in to cart...");

    console.log(isbn);
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/cart.php',
        data: {'product_isbn' : isbn, 'quantity' : document.getElementById('quantity').value},
        success: function (result) {
            loadingsuccess("Success!", "Book added into Cart!", true);
        }
    });
}


function check_login_cookie(){
    if (cookieexist() == false){
        cookieredirect();
    }
}

function logout(){
      document.cookie = 'user' +'=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
      window.location.replace("../php/homepage.php");

}

