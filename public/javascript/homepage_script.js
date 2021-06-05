function display(){
    $("#display_books").html('');
    var html = '<div class="card h-100">';
    
    html+= 'Product image'+
                        '<img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />'+
                         'Product details'+
                        '<div class="card-body p-4">'+
                           '<div class="text-center">'+
                                 'Product name'+
                                '<h5 class="fw-bolder">Fancy Product</h5>'+
                                 'Product price'+
                                '$40.00 - $80.00'+
                            '</div>'+
                        '</div>'+
                         'Product actions'+
                        '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">'+
                            '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>'+
                        '</div>';
    html += '</div>'    
    $("#display_books").append(html);
}
//
//function request_book_data(data) {
//
//
//    $.ajax({
//        type: 'post',
//        url: '/302cem-group7-project/public/php/homepage.php',
//        data: data,
//        contentType: false,
//        cache: false,
//        processData: false,
//        success: function (result) {
////            console.log(result)
//           
//        }
//    });
//}
//request_book_data();