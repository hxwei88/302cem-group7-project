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
                '<img class="card-img-top" src=" ' + 
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
                '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>' +
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
