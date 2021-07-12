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

function cookieexist() {
    //get cookie
    var cookie = getcookie()

    if (cookie === undefined) {
        return false;
    } else {
        return true;
    }
}

function check_cookie_exist() {

    if (cookieexist() == false) {
        $("#dropdown_menu").hide();

    }

}


check_cookie_exist();

function display(data) {
    $("#display_books").html('');
    var html = '<div class="row justify-content-start mb-2">' +
            '<h1>Books</h1>   ' +
            '</div>';

    html += '<div class="row mb-4">' +
            '<form class="d-none d-md-inline-block form-inline ml-auto mr-0 mr-md-3 my-2 my-md-0" id="homepage_stock_search_form">' +
            '<div class="input-group">' +
            '<input id="stock_search" style="width:20%" name="stock_search" class="form-control" type="text" placeholder="Search for books..." aria-label="Search" aria-describedby="basic-addon2"/>' +
            '<div class="input-group-append">' +
            '<button class="btn btn-primary" type="submit"><i class="fas fa-search"></i></button>' +
            '</div>' +
            '</div>' +
            '</form>' +
            '</div>';

    html += '<div class="row">';
    
    if (data.length > 0)
    {
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
            var n = 1;
            var pass_this = item.isbn.toString();
            html += '<div class="col-3 py-2 mb-3">' +
                    '<div class="card h-100">' +
                    '<img class="card-img-top" style="height: 400px; width: 100%; margin: auto; border-radius: 2%" src=" ' +
                    item.image +
                    '" alt="..." onerror="this.src=\'../resources/images/default_book.png\'"/>' +
                    '<div class="card-body p-4">' +
                    '<div class="text-center">' +
                    item.author +
                    '<h5 class="fw-bolder">' +
                    item.name +
                    '</h5>' +
                    'RM' +
                    item.retail_price + "<br>" +
                    'Quantity: ' +
                    item.quantity + '<br>' +
                    '</div>' +
                    '</div>' +
                    '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">' +
                    '<button type="button" style="margin-right:5px" class="btn btn-primary" value="' + pass_this + '"onclick="redirect_bookdetail(this.value)"><i class="fas fa-search me-2"></i>View Details</button>';

            //if cookie exists then enable button
            if (cookieexist() == true) {
                if (item.quantity > 0) {
                    html += '<button type="button" class="btn btn-primary" value=' + item.isbn + ' onclick =\'add_to_cart(' + JSON.stringify(item) + ')\'><i class="fas fa-cart-plus me-2"></i>Add to Cart</button>';
                } else {
                    html += '<button type="button" class="btn btn-primary" value=' + item.isbn + ' onclick =\'add_to_cart(' + JSON.stringify(item) + ')\' disabled><i class="fas fa-cart-plus me-2"></i>Add to Cart</button>';
                }
            }


            //if cookie doesnt exist, disable button
            if (cookieexist() == false) {
                html += '<button type="button" class="btn btn-primary" onclick="cookieredirect()"><i class="fas fa-cart-plus me-2"></i>Add to Cart</button>';
            }
            html += '</div>' +
                    '</div>' +
                    '</div>';
        })
    }
    else {
        html += '<div class="mt-4"><h1>No result displayed.</h1></div>';
    }

    html += '</div>'
    $("#display_books").append(html);

    //need to be inside
    $('#homepage_stock_search_form').submit(function (event) {
        event.preventDefault();
        request_book_data(new FormData($("#homepage_stock_search_form")[0]))
    })
}

function request_book_data(data) {
    $.when($('#display_books').fadeOut('fast')).done(function () {
        $("#stock_spinner_home").fadeIn('fast');
    })

    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/stock.php',
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            console.log(result);
            result = JSON.parse(result);
            console.log(result);
            $.when($('#stock_spinner_home').fadeOut('fast')).done(function () {
                $("#display_books").fadeIn('slow');
            });

            display(result.result);
        }
    });
}
request_book_data();

//unused
function add_to_cart_ajax(isbn) {
    var swal = loading("Cart", "Adding in to cart...");

    console.log(isbn);
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/cart.php',
        data: {'product_isbn': isbn, 'quantity': document.getElementById('quantity').value},
        success: function (result) {
            loadingsuccess("Success!", "Book added into Cart!", true);
        }
    });
}

function redirect_bookdetail(isbn) {
    //redirect and put isbn value in url
    window.location = '../php/book_detail_page.php?isbn=' + isbn;
}

