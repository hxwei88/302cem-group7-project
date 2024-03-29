function upload_validation(file) {
    var ext = file.value.split(".");
    ext = ext[ext.length - 1].toLowerCase();
    var arrayExtensions = ["jpg", "jpeg", "png"];
    var path = "Path = " + file.value.toString();
    var img = path.replace(/^.*[\\\/]/, '');

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        alert("Sorry, only JPG, JPEG and PNG files are allowed.");
        $("#image").val("");
        return;
    }

    //file size is in mb
    if (file.files[0].size > (10 * Math.pow(1000, 2))) {
        alert("File is too big!");
        file.value = "";
    } else {
        document.getElementById('imageID').textContent = img;
    }
}

function initialize_slider_value()
{
    document.getElementById('tPrice').innerHTML = document.getElementById("tradePrice").value;
    document.getElementById('rPrice').innerHTML = document.getElementById("retailPrice").value;
    document.getElementById('qNum').innerHTML = document.getElementById("quantity").value;
    document.getElementById('datepicker').setAttribute('min', "2021");
}

$("#datepicker").datepicker({
    format: " yyyy",
    viewMode: "years",
    minViewMode: "years",
});

function submit_add_stock(event) {
    event.preventDefault();
    var swal = loading("Checking ISBN...", "This will take a moment...");

    $.ajax({
        type: 'post',
        cache: false,
        url: '/302cem-group7-project/public/php/add_stock_check.php',
        data: {
            isbn: $("#isbn_input").val()
        },
        success: function (result) {
            result = JSON.parse(result);
            if (result.status == '1') {
                caution('Update Stock', 'Do you want to update this stock?').then((result) => {
                    if (result.isConfirmed) {
                        console.log("add book")
                        var swal = loading("Updating Book...", "This will take a moment...");
                        $.ajax({
                            type: 'post',
                            url: '/302cem-group7-project/public/php/add_stock.php',
                            data: new FormData($("#insertStockForm")[0]),
                            contentType: false,
                            cache: false,
                            processData: false,
                            success: function (result) {
                                result = JSON.parse(result);

                                if (result.status == 1) {
                                    loadingsuccess("Success!", "Book updated successfully!", true);
                                } else {
                                    loadingfailure("Error", result.message, true)
                                }
                            }
                        });
                    }
                })
            } else {
                $.ajax({
                    type: 'post',
                    url: '/302cem-group7-project/public/php/add_stock.php',
                    data: new FormData($("#insertStockForm")[0]),
                    contentType: false,
                    cache: false,
                    processData: false,
                    success: function (result) {
                        result = JSON.parse(result);

                        console.log("add book")
                        if (result.status == 1) {
                            loadingsuccess("Success!", "Book added successfully!", true);
                        } else {
                            loadingfailure("Error", result.message, true)
                        }
                    }
                });
            }
        }
    });
//    var submit_data = { isbn_input: isbn, name_input: name, author_input: author, date_input: date,
//        description_input: desc, image: img, tradePrice: tradePrice, retailPrice: retailPrice, quantity: quantity };
//    
//     $.post( "/302cem-group7-project/public/php/add_stock.php", submit_data, function( data ) {
//         console.log(submit_data);
//          console.log(data);
//          if ( data != null ){
//             alert("hi"); 
//          }
//     });
}

