function append_stock_display(result) {
    $("#stock_display").html('');
    var html = '<div class="row">';

    result.forEach(function (item, index, arr) {
        if (item.image.substring(item.image.lastIndexOf('/') + 1) == "")
        {
            var image = "../resources/images/default_book.png";
        } else
        {
            var image = item.image;
        }

        html += '<div class="col-3 py-2 mb-3">' +
                '<div class="card h-100">' +
                '<img class="card-img-top" style="height: 325px; width: 80%; margin: auto; border-radius: 2%" src="' + image + '" alt="' + image + '">' +
                '<div class="card-body" style = "text-align:center;">' +
                '<h5 class="card-title">' + item.name + '</h5>' +
                '<p> Authors Name </p>' +
                '</div>' +
                '<button type="button" style="height: 50px; width: 80%; margin: auto; font-size:115%" class="btn btn-primary" value = ' + item.isbn + ' onclick ="detailpage(this.value)">Details</button>' +
                '</div>' +
                '</div>';
    })

    html += '</div>'
    $("#stock_display").append(html);
}

function request_book_data(data) {
    $.when($('#stock').fadeOut('fast')).done(function () {
        $("#stock_spinner").fadeIn('fast');
    })

    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/stock.php',
        data: data,
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            result = JSON.parse(result)
            append_stock_display(result.result);
            $.when($('#stock_spinner').fadeOut('fast')).done(function () {
                $("#stock").fadeIn('fast');
            })
        }
    });
}

$('#stock_search_form').submit(function (event) {
    event.preventDefault();
    request_book_data(new FormData($("#stock_search_form")[0]))
})

request_book_data();


function  detailpage(isbn) {
    document.getElementById("stock_display").style.display = "none";  //hide
    document.getElementById("details").style.display = "block";


    
    $.ajax({
        type: 'get',
        url: '/302cem-group7-project/public/php/detail_product.php?isbn='+isbn,
        success: function (result) {
            
                   console.log(result);
               if (result != null){
            
                   document.getElementById("detail-isbn").innerHTML = result.isbn;
                   document.getElementById("detail-name").innerHTML = result.name;
                   document.getElementById("detail-author").innerHTML = result.author;
                   document.getElementById("detail-des").innerHTML = result.description;
                   document.getElementById("detail-tp").innerHTML = result.trade_price;
                   document.getElementById("detail-quantity").innerHTML = result.quantity;
                   document.getElementById("detail-date").innerHTML = result.publication_date;
                   document.getElementById("detail-rp").innerHTML = result.retail_price;
                   document.getElementById("details-img").src = result.image;
               }

        }
    });

}

function  back() {
    document.getElementById("stock_display").style.display = "block";  //hide
    document.getElementById("details").style.display = "none";

}