import {createContext,useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {useAuth} from './AuthContext';
import {validateDeposit,validatePayment,validateRefill,validateWithdraw} from '../utils/validate';
import url from '../config/url';

const DepositContext = createContext();

export const DepositProvider = ({children}) =>{
  const navigate = useNavigate();
  const {user} = useAuth();
  const [balance,setBalance] = useState(null);
  const [depositRange,setDepositRange] = useState(null);
  const [pgws,setPGW] = useState(null);
  const [errors,setErrors] = useState({})
  const [loading,setLoading] = useState(false);
  
  const getToken = () => JSON.parse(localStorage.getItem('auth')).user[0]
  
  const fetchBalance = async () =>{
    //if(balance) return  //
    try{
      let res = await fetch(url.urlBalance,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error)
      setBalance(data);
    }catch(e) {toast.error(e.message)}
  }
  
  const fetchDepositRange = async () =>{
    if(depositRange) return  //
    try{
      let res = await fetch(`${url.urlDepositInfo}/${user?.level}`,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error)
      setDepositRange(data);
    }catch(e) {toast.error(e.message)}
  }
  
  const fetchPGW = async () =>{
    if(pgws) return  //
    try{
      let res = await fetch(url.urlPGW,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error)
      setPGW(data);
    }catch(e) {toast.error(e.message)}
  }
  
  const depositByTXN = async (depositData) => {
    const validationResult = validateDeposit(depositData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return 
    setLoading(true);
    try{
      let res = await fetch(url.urlDepositByTxn, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json' },
        body: JSON.stringify(depositData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.error || 'failed to deposit ');}
      toast.success(data.message);
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  const depositByPayment = async (gateway,paymentData) => {
    /*const validationResult = validatePayment(paymentData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return*/
    setLoading(true);
    try{
      let res = await fetch(`${url.urlDepositPayment}/${gateway}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(paymentData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.error || 'failed to deposit ');}
      window.location.href=data.url;//fetchBalance();navigate('/deposit/payment')
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  
  const balanceRefill = async (refillData,pin) =>{
    const validationResult = validateRefill(refillData,depositRange);
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlBalance, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json','x-user-pin':pin},
        body: JSON.stringify(refillData)
      });
      let data = await res.json();
      if(!res.ok){throw new Error(data.message || 'failed to refill balance');}
      toast.success(data.message);fetchBalance();
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  
  const balanceWithdraw = async (withdrawData,pin) =>{
    const validationResult = validateWithdraw(withdrawData);
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlWithdraw, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json','x-user-pin':pin},
        body: JSON.stringify(withdrawData)
      });
      let data = await res.json();
      if(!res.ok){throw new Error(data.message ||'failed to sent withdraw request');}
      toast.success(data.message);
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  
  return <DepositContext.Provider value={{fetchBalance,balance,fetchPGW,fetchDepositRange,depositRange,depositByTXN,depositByPayment,balanceRefill,balanceWithdraw,pgws,errors,loading}}>{children}</DepositContext.Provider>;
  }

export const useDeposit = () => useContext(DepositContext);
