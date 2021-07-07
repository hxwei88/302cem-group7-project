function load_book_detail(isbn) {
    $.ajax({
        type: 'get',
        url: '/302cem-group7-project/public/php/detail_product.php?isbn=' + isbn,
        success: function (result) {
            console.log(result);
            if (result != null) {
                document.getElementById("detail-isbn").value = result.isbn;
                document.getElementById("old_isbn").value = result.isbn;
                document.getElementById("detail-name").innerHTML = result.name;
                document.getElementById("detail-author").innerHTML = result.author;
                document.getElementById("detail-author-input").value = result.author;
                document.getElementById("detail-name-input").value = result.name;
                document.getElementById("detail-des").value = result.description;
                document.getElementById("detail-tp").value = parseFloat(result.trade_price).toFixed(2);
                document.getElementById("detail-quantity").value = result.quantity;
                document.getElementById("detail-date").value = result.publication_date;
                document.getElementById("detail-rp").value = parseFloat(result.retail_price).toFixed(2);
                document.getElementById("details-img").src = result.image;
                
                var n = result.image.lastIndexOf('/');
                document.getElementById('detail-imageID').textContent = result.image.substring(n + 1);
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

function update_book(event) {
    event.preventDefault();
    var swal = loading("Updating Book...", "Please wait a moment...");
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/stock_update_book.php',
        data: new FormData($("#stock_detail_form")[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            result = JSON.parse(result)
            
            loadingcomplete(swal);
            if (result.status == 1) {
                loadingsuccess("Book Updated Successfully!", "", true)
            } else {
                loadingfailure("Book Update Failed", "Please Try Again", false)
            }
        }
    });
}

function upload_validation(file) {
    var ext = file.value.split(".");
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ["jpg", "jpeg", "png"];
    var path = "Path = " + file.value.toString();
    var img = path.replace(/^.*[\\\/]/, '');

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        alert("Sorry, only JPG, JPEG and PNG files are allowed.");
        $("#detail-image").val("");
        return;
    }

    //file size is in mb
    if (file.files[0].size > (10 * Math.pow(1000, 2))) {
        alert("File is too big!");
        file.value = "";
    } else {
        document.getElementById('detail-imageID').textContent = img;
    }
}

function validate_number(element, decimal) {
    $(element).val(parseFloat($(element).val()).toFixed(decimal));
    
    if($(element).val() > parseInt($(element).attr('max')))
    {
        $(element).val(9999);
    }
    
    if($(element).val() < parseInt($(element).attr('min')))
    {
        $(element).val(0);
    }
}

function nav_back() {
    $.when($('#layoutSidenav_content').fadeOut('fast')).done(function () {
        $('#layoutSidenav_content').load('/302cem-group7-project/views/stock.html', function () {
            request_book_data();
        }).fadeIn();
    });
}




