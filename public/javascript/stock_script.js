function append_stock_display(result) {
    $("#stock_display").html('');
    var html = '<div class="row">';
    
    result.forEach(function (item, index, arr) {
        if(item.image.substring(item.image.lastIndexOf('/') + 1) == "")
        {
            var image = "../resources/images/default_book.png";
        }
        else
        {
            var image = item.image;
        }
        
        html += '<div class="col-3 py-2 mb-3">' +
                    '<div class="card h-100">' +
                        '<img class="card-img-top" style="height: 200px; width: 100%;" src="' + image + '" alt="' + image + '">' +
                        '<div class="card-body">' +
                            '<h5 class="card-title">' + item.name + '</h5>' +
                        '</div>' +
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
        processData:false,
        success: function(result) {
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


