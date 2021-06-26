function login(event){
    event.preventDefault();
    $.ajax({
        type: 'post',
        url: '/302cem-group7-project/public/php/login.php',
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
                   
                   window.location = "../php/admin_page.php";
               } else {
                   window.location = "../php/homepage.php";
               }
            }
        }
    });
}

document.title = "Login";
