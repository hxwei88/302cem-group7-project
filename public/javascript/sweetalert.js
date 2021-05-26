/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

//error alert
function error(title, message) {
    Swal.fire({
     icon: 'error',
     title: title,
     text: message
   })   
}

//success alert
function success(title, message) {
    Swal.fire({
     icon: 'success',
     title: title,
     text: message
   })   
}

//info alert
function info(title, message) {
    Swal.fire({
     icon: 'info',
     title: title,
     text: message
   })   
}

//loading alert
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

function loadingsuccess(title, message, escape) {
    Swal.fire({
        icon: 'success',
        title: title,
        text: message,
        showConfirmButton: false,
        allowOutsideClick: escape,
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