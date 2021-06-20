function request_user_data() {
    $.when($('#stock').fadeOut('fast')).done(function () { 
        $("#stock_spinner").fadeIn('fast');
    })
    
    //if user has address it will auto input else will prompt modal
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/checkout_user_profile.php',
        success: function (result) {
            result = JSON.parse(result)
            if (result.status == 1) {
                document.getElementById("adr").value = result.result[0].address;
            } else {
                $("#addressModal").modal('show');
            }
        }
    });
}

request_user_data();