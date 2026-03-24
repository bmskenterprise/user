let passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?])[A-Za-z\d!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]{8,32}$/;

export const validateUserLogin =({username,password})=> {
    const validationErrors = {};
    if(!username) validationErrors.username = 'enter your username';
    if(!/^01[3-9]\d{8}$/.test(username)) validationErrors.username = 'invalid username';
    if(!password) validationErrors.password = 'enter your password';
    if(!(/^[^\s]{4,32}$/.test(password))) validationErrors.password= "invalid password";
    return validationErrors
}

export const validateUserRegister= (data)=>{
    const validationErrors = {};
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
    const validationErrors = {};
    if(!data.txn) validationErrors.txn = 'txn is required'
    if(Number.isNaN(data.amount)) validationErrors.amount = 'amount is required'
    if(!data.amount) validationErrors.amount = 'amount is required'
    if(data.ref&&!/^01[3-9]\d{8}$/.test(data.ref)) validationErrors.ref = 'ref must be a mobile number'
    return validationErrors
}
export const validateRefill = (data,depositRange) =>{
    const validationErrors = {};
    let [min,max] = [depositRange?.[data.balanceType]?.min,depositRange?.[data.balanceType]?.max]
    if(Number.isNaN(data.amount)) validationErrors.amount = 'amount is invalid'
    if(min>data.amount||max<data.amount) validationErrors.amount = `Minimum ${min} to Maximun ${max}`
    if(!data.amount) validationErrors.amount = 'amount is required'
    return validationErrors
}
export const validateWithdraw = (data) =>{
    const validationErrors = {};
    if(!data.amount) validationErrors.amount = 'amount is required'
    if(10>data.amount) validationErrors.amount = 'invalid amount'
    if(data.ref&&!/^01[3-9]\d{8}$/.test(data.ref)) validationErrors.ref = 'ref must be a mobile number'
    return validationErrors
}

export const validatePayment = (data) =>{
    const validationErrors = {};
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(!data.amount) validationErrors.amount = 'amount is required'
    return validationErrors
}

export const validateTopup = (data) =>{
    const validationErrors = {};
    if(!['airtel','banglalink','grameenphone','robi','teletalk'].includes(data.operator)) validationErrors.operator='invalid operator'
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(10>data.amount||2000<data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    return validationErrors
}

export const validateDriveHit = (data) =>{
    const validationErrors = {};
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    return validationErrors
}

export const validatePayBill = (data) =>{const validationErrors = {};
    if(data.acNumber?.length>80) validationErrors.ac='ac Number is too long'
    if(!data.acNumber) validationErrors.ac='ac Number is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    if(!data.expire) validationErrors.expire='expire date is required'
    if(data.name&&data.name?.length>80) validationErrors.name='too many characters'
    return validationErrors
}

export const validateMBankTransaction = (data) =>{
    const validationErrors = {};
    if(!/^01[3-9]\d{8}$/.test(data.recipient)) validationErrors.recipient='invalid recipient'
    if(!data.recipient) validationErrors.recipient='recipient is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    return validationErrors
}

export const validateBank = (data) =>{
    const validationErrors = {};
    if(data.bank.length>100) validationErrors.bank='bank name too long'
    if(!data.bank) validationErrors.bank='bank is required'
    if(data.acNumber?.length>80) validationErrors.ac='AC Number is too long'
    if(!data.acNumber) validationErrors.ac='ac number is required'
    if(Number.isNaN(data.amount)) validationErrors.amount='amount must be a positive number'
    if(5>data.amount) validationErrors.amount = 'invalid amount'
    if(!data.amount) validationErrors.amount='amount is required'
    if(data.name&&data.name?.length>80) validationErrors.name='too many characters'
    return validationErrors
}

export const validateFeedback = (data) =>{
    const validationErrors = {};
    if(data?.title?.length<4) validationErrors.title='feedback is too short'
    if(data?.title?.length>32) validationErrors.title='feedback is too long'
    if(data.description?.length<4) validationErrors.description='feedback is too short'
    if(data.description?.length>100) validationErrors.description='feedback is too long'
    if(!data.description) validationErrors.description='feedback is required'
    return validationErrors
}