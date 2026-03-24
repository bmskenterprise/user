import Swal from 'sweetalert2';
//import {useTheme} from '../contexts/ThemeContext'         

export default (themeData,callback,cbt) =>{
    //const {thememode} = useTheme() 
  Swal.fire({
    title: "Enter Your PIN",
    theme: themeData,
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off'
    },
    showCancelButton: true,
    confirmButtonText: cbt,
    //showLoaderOnConfirm: true,
    preConfirm:  (pin) => {
      try {callback.cb(callback.data,pin)} catch (error) {
        Swal.showValidationMessage(`Request failed:${error}`);
      }
    },
    allowOutsideClick: () => !Swal.isLoading()
  }).then((result) => {
    if (result.isConfirmed) {}
  });
}