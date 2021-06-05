function login(event){
    event.preventDefault();
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/login_process.php',
        data: new FormData($("#login_form")[0]),
        contentType: false,
        cache: false,
        processData: false,
        success: function (result) {
            result = JSON.parse(result);

            if (result.status == 0) {
                error("Login Failed!", "Username or password is incorrect!");
            } else {
               if (result.message == "admin") {
                   
                   window.location.replace("../php/admin.php");
               } else {
                   window.location.replace("../php/homepage.php");
               }
            }
        }
    });
}

