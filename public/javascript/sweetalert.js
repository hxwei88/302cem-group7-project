/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


function loading(title, message) {
    var swal = Swal.fire({
        title: title,
        html: message,
        timerProgressBar: true,
        allowOutsideClick: false,
        didOpen: () => {
            Swal.showLoading()
        }
    });

    return swal;
}

function loadingcomplete(swal) {
    swal.close();
}

function loadingsuccess(swal, title) {
    loadingcomplete(swal);
    Swal.fire({
        icon: 'success',
        title: title,
        showConfirmButton: false,
        timer: 1500
    });
}

function loadingfailure(title, message, escape) {
    var swal = Swal.fire({
        icon: 'error',
        title: title,
        text: message,
        allowOutsideClick: escape
    });

    return swal;
}