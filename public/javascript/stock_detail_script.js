function load_book_detail(isbn) {
    $.ajax({
        type: 'get',
        url: '/302cem-group7-project/public/php/detail_product.php?isbn=' + isbn,
        success: function (result) {
            console.log(result);
            if (result != null) {
                document.getElementById("detail-isbn").innerHTML = result.isbn;
                document.getElementById("detail-name").innerHTML = result.name;
                document.getElementById("detail-author").innerHTML = result.author;
                document.getElementById("detail-des").innerHTML = result.description;
                document.getElementById("detail-tp").innerHTML = result.trade_price;
                document.getElementById("detail-quantity").innerHTML = result.quantity;
                document.getElementById("detail-date").innerHTML = result.publication_date;
                document.getElementById("detail-rp").innerHTML = result.retail_price;
                document.getElementById("details-img").src = result.image;
                $.when($('#stock_spinner').fadeOut('fast')).done(function () {
                    $("#stock_detail").fadeIn('fast');
                })
            }
            else
            {
                error('Something Went Wrong.', 'Please Try Again.')
                nav_back();
            }
        }
    });
}

function nav_back() {
    $.when($('#layoutSidenav_content').fadeOut('fast')).done(function () {
        $('#layoutSidenav_content').load('/302cem-group7-project/views/stock.html', function () {
            request_book_data();
        }).fadeIn();
    });
}




