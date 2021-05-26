function upload_validation(file){
    var ext = file.value.split(".");
    ext = ext[ext.length-1].toLowerCase();
    var arrayExtensions = ["jpg" , "jpeg", "png"];
    var path = "Path = " + file.value.toString();
    var img = path.replace(/^.*[\\\/]/, '');

    if (arrayExtensions.lastIndexOf(ext) == -1) {
        alert("Sorry, only JPG, JPEG and PNG files are allowed.");
        $("#image").val("");
        return;
    }
    
    //file size is in mb
    if(file.files[0].size > (10 * Math.pow(1000, 2))){
       alert("File is too big!");
       file.value = "";
    }
    else {
        document.getElementById('imageID').textContent = img;
    }
}

function initialize_slider_value()
{
    document.getElementById('tPrice').innerHTML = document.getElementById("tradePrice").value;
    document.getElementById('rPrice').innerHTML = document.getElementById("retailPrice").value;
    document.getElementById('qNum').innerHTML = document.getElementById("quantity").value;
}

function submit_add_stock (event) {
    event.preventDefault();
    var swal = loading("Loading","Loading");
    
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/insert_product.php',
        data: new FormData($("#insertStockForm")[0]),
        contentType: false,
        cache: false,
        processData:false,
        success: function(result) {
            result = JSON.parse(result);
            loadingcomplete(swal)
            
            if (result.status == 1) {
                loadingsuccess(swal,"Success", true);
            } else {
                loadingfailure("fail", result.message, true)
            }
            
        }
    });

//    var submit_data = { isbn_input: isbn, name_input: name, author_input: author, date_input: date,
//        description_input: desc, image: img, tradePrice: tradePrice, retailPrice: retailPrice, quantity: quantity };
//    
//     $.post( "/302cem-group7-project/public/php/insert_product.php", submit_data, function( data ) {
//         console.log(submit_data);
//          console.log(data);
//          if ( data != null ){
//             alert("hi"); 
//          }
//     });
}

