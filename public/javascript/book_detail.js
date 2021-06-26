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
    var i = 1;

    result.forEach(function (item, index, arr) {
        //if the retrieved isbn from books table matches the url isbn value
        if(item.isbn == g_isbn){
            html += '<h2><span class="bookDetail-text"> '+item.name+'</span></h2>'+
                    '<p><span class="bookDetail-text">By '+item.author+'</span></p><br>'+
                    '<hr>'+
                    '<p><span class="bookDetail-text">RM  '+item.retail_price+'</span><br></p>'+
                    '<p>'+item.description+'</p>'+
                    '<button type="button" class="btn btn-primary bookDetail-more-btn" data-toggle="collapse" data-target="#more"><i class="fas fa-search me-3"></i>View more info</button>'+
                    '<div id="more" class="collapse">'+
                        '<p><span class="bookDetail-text">Item isbn: </span> '+item.isbn+'<br>'+                   
                        '<span class="bookDetail-text">Item Quantity: </span> '+item.quantity+' available<br>'+
                        '<span class="bookDetail-text">Publication Date</span> '+item.publication_date+'<br>'+
                    '</div>'+  
                    '<hr>'+
                    '<div class="input-group my-2">'+
                    '<label class="input-group-text" style="width: 100px !important;" for"select_quantity">Quantity</label>'+
                    '<select class="form-select" style="width:130px" id="select_quantity">';
                    for(i = 1; i <= item.quantity; i++){
                        html+='<option value="'+ i +'">'+ i +'</option>';
                    }
                    html+='</select>'+
                          '</div>';
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
                        html += '<button type="button" style="width:200px" class="btn btn-primary btn-md" value=' + item.isbn + ' onclick =\'add_to_cart_detail(' + JSON.stringify(item) + ')\'><i class="fas fa-cart-plus me-3"></i>Add to Cart</button>';
                    }

                    //if cookie doesnt exist, disable button
                    if (cookieexist() == false) {
                        html += '<button type="button" style="width:200px" class="btn btn-primary btn-md" onclick="cookieredirect()"><i class="fas fa-cart-plus me-3"></i>Add to Cart</button>';
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
//        data: data,
//        contentType: false,
//        cache: false,
//        processData: false,
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