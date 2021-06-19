function redirect_bookdetail(isbn){
    //redirect and put isbn value in url
    window.location = '../php/book_detail.php?isbn=' + isbn;
}

function redirect_to_homepage(){
    //redirect and put isbn value in url
    window.location = '../php/homepage.php';
}

//function to retrieve the isbn value from url
var urlParam = function(name, w){
    w = w || window;
    var rx = new RegExp('[\&|\?]'+name+'=([^\&\#]+)'),
        val = w.location.search.match(rx);
    return !val ? '':val[1];
}

//call retrieve data from url function
var g_isbn = urlParam('isbn');

//replace all white space(%20) with whitespace
g_isbn = g_isbn.replace(/%20/g,' ');

console.log("isbn from url: "+g_isbn);

//display book details, isbn, description, price, and available quantity
function display_book_details(result) {
    $("#stock_display").html('');
    var html = '';

    result.forEach(function (item, index, arr) {
        //if the retrieved isbn from books table matches the url isbn value
        if(item.isbn == g_isbn){
            html += '<p><span class="bookDetail-text">Item Name: </span> '+item.name+'<br>'+
                    '<span class="bookDetail-text">Item isbn: </span> '+item.isbn+'<br>'+                   
                    '<span class="bookDetail-text">Item Quantity: </span> '+item.quantity+' available<br>'+
                    '<span class="bookDetail-text">Item Price: RM </span> '+item.retail_price+'<br>'+
                    '<span class="bookDetail-text">Author Name</span> '+item.author+'<br>'+
                    '<span class="bookDetail-text">Publication Date</span> '+item.publication_date+'<br>'+
                    '<span class="bookDetail-text">Item Description: </span> '+item.description+'</p>';

        }
    });

    html += '';
    $("#stock_display").append(html);
}

//display the add to cart button
function display_book_btn(result) {
    $("#display_books_btn").html('');
    var html = '';

    result.forEach(function (item, index, arr) {
        if(item.isbn == g_isbn){
                    //if cookie exists then enable button
                    if (cookieexist() == true) {
                        html += '<button type="button" class="btn btn-primary btn-md" value=' + item.isbn + ' onclick =\'add_to_cart(' + JSON.stringify(item) + ')\'>Add to Cart</button>';
                    }

                    //if cookie doesnt exist, disable button
                    if (cookieexist() == false) {
                        html += '<button type="button" class="btn btn-primary btn-md" onclick="cookieredirect()">Add to Cart</button>';
                    }
        }
    });

    html += '';
    $("#display_books_btn").append(html);
}

//display image 
function display_book_img(result) {

    $("#display_books_img").html('');
    var html = '';

    result.forEach(function (item, index, arr) {
        
        if (item.image.substring(item.image.lastIndexOf('/') + 1) == "")
        {
            var image = "../resources/images/default_book.png";
        } else
        {
            var image = item.image;
        }
        
        if(item.isbn == g_isbn){
              html+='<img class="card-img-top" style="height: 500px; width: 65%; margin: auto; border-radius: 2%" src=" ' +
                item.image +
                '" alt="..." onerror="this.src=\'../resources/images/default_book.png\'"/>' ;

html+="";
        }
    });

    html += '';
    $("#display_books_img").append(html);
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
            display_book_details(result.result);
            display_book_btn(result.result);
            display_book_img(result.result);
        }
    });
}
request_book_data();