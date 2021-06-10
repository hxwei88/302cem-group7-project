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

        html += '<div class="col-3 py-2 mb-3">' +
                '<div class="card h-100">' +
                '<img class="card-img-top" style="height: 325px; width: 85%; margin: auto; border-radius: 2%" src=" ' + 
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
                '<input type="submit" value="Add To Cart">' +
                '<button type="button" class="btn btn-primary" value=' + item.isbn + ' onclick ="add_to_cart_ajax(this.value)">Add to Cart AJAX</button>' +
                '</form>'+
                '<button type="button" class="btn btn-primary" value=' + item.isbn + ' onclick ="add_to_cart(this.value)">Add to Cart</button>' +
                '</div>' +
                '</div>' +
                '</div>';
    })

    html += '</div>'
    $("#display_books").append(html);
}

function request_book_data(data) {


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