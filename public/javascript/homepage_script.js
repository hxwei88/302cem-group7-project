function display(){
    $("#display_books").html('');
    var html = '<div class="row">';
    
    for (i = 0; i < 5; i++) {
        html+=  '<div class="col-3 py-2 mb-3">' +
                '<div class="card h-100">'+            
                            '<img class="card-img-top" src="https://dummyimage.com/450x300/dee2e6/6c757d.jpg" alt="..." />'+
                            '<div class="card-body p-4">'+
                               '<div class="text-center">'+
                                     'Product name'+
                                    '<h5 class="fw-bolder">Fancy Product</h5>'+
                                    '$40.00 - $80.00'+
                                '</div>'+
                            '</div>'+
                            '<div class="card-footer p-4 pt-0 border-top-0 bg-transparent">'+
                                '<div class="text-center"><a class="btn btn-outline-dark mt-auto" href="#">View options</a></div>'+
                            '</div>'+
                            '</div>'+
                    '</div>';
                }
   html += '</div>'
    $("#display_books").append(html);
}

display();