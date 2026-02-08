const validationErrors = {};
let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/;

export const validateUserLogin =({username,password})=> {
    if(!username) validationErrors.username = 'enter your username';
    if(!/^01[3-9]\d{8}$/.test(username)) validationErrors.username = 'invalid username';
    if(!password) validationErrors.password = 'enter your password';
    if(!(/^[^\s]{4,32}$/.test(password))) validationErrors.password= "invalid password";
    return validationErrors
}

export const validateUserRegister= (data)=>{
    if(!data.level) validationErrors.level = 'level is required';
    if(!(/^01[3-9]\d{8}$/.test(data.username))){validationErrors.username='invalid username';}
    if(!data.username) validationErrors.username = 'username is required'
    if(!/^[A-Za-z. ]{2,32}$/.test(data.fullname)) validationErrors.fullname = 'invalid fullname'
    if(!data.fullname) validationErrors.fullname = 'fullname is required'
    if(!(/^(?:\d{10}|\d{13}|\d{17})$/.test(data.nid))) validationErrors.nid = 'invalid nid';
    if(!data.nid) validationErrors.nid = 'nid is required';
    if(!(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{6,16}$/.test(data.password))){validationErrors.password='invalid password';}
    if(!data.password) validationErrors.password = 'password is required'
    if(!(/^\d{4,6}$/.test(data.pin))){validationErrors.pin='invalid pin';}
    if(!data.pin) validationErrors.pin = 'pin is required'
    //if(!/^\d{4,6}$/.test(data.adminPIN)) validationErrors.adminPIN = "invalid admin pin";
    return validationErrors;
}

export const validateDeposit = (data) =>{
    if(!data.txn) validationErrors.txn = 'txn is required'
    if(data.ref&&!/^01[3-9]\d{8}$/.test(data.ref)) validationErrors.ref = 'ref must be a mobile number'
    return validationErrors
}

export const validateWithdraw = (data) =>{
    if(!data.amount) validationErrors.amount = 'amount is required'
    if(10>data.amount) validationErrors.amount = 'invalid amount'
    if(data.ref&&!/^01[3-9]\d{8}$/.test(data.ref)) validationErrors.ref = 'ref must be a mobile number'
    return validationErrors
}

export const validatePayment = (data) =>{
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(!data.amount) validationErrors.amount = 'amount is required'
    return validationErrors
}

export const validateTopup = (data) =>{
    if(!['airtel','banglalink','grameenphone','robi','teletalk'].includes(data.operator)) validationErrors.operator='invalid operator'
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(10>data.amount||2000<data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    return validationErrors
}

export const validateDriveHit = (data) =>{
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    return validationErrors
}

export const validatePayBill = (data) =>{
    if(data.ac.length>80) validationErrors.ac='ac Number is too long'
    if(!data.ac) validationErrors.ac='ac Number is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    if(!data.expire) validationErrors.expire='expire date is required'
    if(data.name&&data.name.length>80) validationErrors.name='too many characters'
    return validationErrors
}

export const validateMbank = (data) =>{
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    return validationErrors
}

export const validateBank = (data) =>{
    if(data.ac.length>80) validationErrors.ac='AC Number is too long'
    if(!data.ac) validationErrors.ac='ac number is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    if(data.name&&data.name.length>80) validationErrors.name='too many characters'
    return validationErrors
}

export const validateFeedback = (data) =>{
    if(data.feedback.length<4) validationErrors.feedback='feedback is too short'
    if(data.feedback.length>100) validationErrors.feedback='feedback is too long'
    if(!data.feedback) validationErrors.feedback='feedback is required'
    return validationErrors
}