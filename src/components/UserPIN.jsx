import Swal from 'sweetalert2';

export default (callback,cbt) =>{
  Swal.fire({
    title: "Enter Super Admin PIN",
    input: "text",
    inputAttributes: {
      autocapitalize: "off"
    },
    showCancelButton: true,
    confirmButtonText: cbt,
    //showLoaderOnConfirm: true,
    preConfirm:  (pin) => {
      try {callback.cb(callback.data,pin)} catch (error) {
        Swal.showValidationMessage(`
          Request failed: ${error}
        `);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {}
  });
}