import {createContext,useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {useAuth} from './AuthContext';
import {validateDeposit,validatePayment,validateWithdraw} from '../utils/validate';
import url from '../config/url';

const DepositContext = createContext();

export const DepositProvider = ({children}) =>{
  const navigate = useNavigate;
  const {user} = useAuth();
  const [balance,setBalance] = useState({});
  const [depositRange,setDepositRange] = useState(null);
  const [pgws,setPGW] = useState(null);
  const [errors,setErrors] = useState({})
  const [loading,setLoading] = useState(false);
  
  const getToken = () => JSON.parse(localStorage.getItem('auth')).user[0]
  
  const fetchBalance = async () =>{
    try{
      let res = await fetch(url.urlBalance,{credentials:'include'}); //
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error)
      setBalance(data['balances']);
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
      setPGW(data['pgws']);
    }catch(e) {toast.error(e.message)}
  }
  
  const depositByTXN = async (depositData) => {
    const validationResult = validateDeposit(depositData)
    if(Object.keys(validationResult).length) {setErrors(validationResult);return} 
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
    const validationResult = validatePayment(paymentData)
    if(Object.keys(validationResult).length) {setErrors(validationResult);return}
    setLoading(true);
    try{
      let res = await fetch(`${url.urlDepositPayment}/${gateway}`, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json',},
        body: JSON.stringify(paymentData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.error || 'failed to deposit ');}
      toast.success(data.message);navigate('/deposit/payment')
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  
  const balanceRefill = async (depositData,pin) =>{
    setLoading(true);
    try{
      let res = await fetch(url.urlBalance, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json','x-user-pin':pin},
        body: JSON.stringify(depositData)
      });
      let data = await res.json();
      if(!res.ok){throw new Error(data.message || 'failed to refill balance');}
      toast.success(data.message);
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  
  const balanceWithdraw = async (withdrawData,pin) =>{
    const validationErrors = validateWithdraw(withdrawData);
    if(Object.keys(validationErrors).length) {setErrors(validationErrors);return}
    setLoading(true);
    try{
      let res = await fetch(`${url.urlDeposit}/transfer`, {
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