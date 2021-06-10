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
                '<img class="card-img-top" style="height: 400px; width: 100%; margin: auto; border-radius: 2%" src="' + image + '" alt="' + image + '">' +
                '<div class="card-body" style = "text-align:center;">' +
                '<h5 class="card-title">' + item.name + '</h5>' +
                '<p>' + item.isbn + '</p>' +
                '<p>' + item.publication_date + '</p>' +
                '</div>' +
                '<button type="button" style="height: 50px; width: 85%; margin:auto; font-size:115%; margin-bottom:20px;" class="btn btn-primary" value="' + item.isbn + '" onclick ="load_detail_page(this.value)">Details</button>' +
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

function load_detail_page(isbn) {

    $.when($('#layoutSidenav_content').fadeOut('fast')).done(function () {
        $('#layoutSidenav_content').load('/302cem-group7-project/views/stock_detail.html', function () {
            load_book_detail(isbn);
        }).fadeIn();
    });
}

$('#stock_search_form').submit(function (event) {
    event.preventDefault();
    request_book_data(new FormData($("#stock_search_form")[0]))
})

request_book_data();
