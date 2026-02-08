import {createContext,useContext,useState} from 'react';
import toast from 'react-hot-toast';
import url from '../config/url';

const HistoryContext = createContext();

export const HistoryProvider = ({children}) =>{
  const [history,setHistory] = useState({});
  const [loading,setLoading] = useState(false);

  const getToken = () => JSON.parse(localStorage.getItem('auth')).user[0]
  
  const fetchDepositHistory = async (search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlDepositHistory}?search=${search}&page=${page}`,{credentials:'include'});      //
      let data = await res.json();
      if(!res.ok) throw new Error(data.error);
      setHistory(data);
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchTopupHistory = async (search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlTopupHistory}?search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setHistory(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchDriveHistory = async (search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlDriveHistory}?search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setHistory(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchBillHistory = async (search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlBillHistory}?search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setHistory(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchMbankTransactionHistory = async (type,search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlMBankTransactionHistory}/${type}?search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setHistory(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchBankHistory = async (search,page) =>{
    setLoading(true)
    try{
      let res = await fetch(`${url.urlBankHistory}?search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setHistory(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  return <HistoryContext.Provider value={{fetchDepositHistory,fetchTopupHistory,fetchDriveHistory,fetchBillHistory,fetchMbankTransactionHistory,fetchBankHistory,history,loading}}>{children}</HistoryContext.Provider>;
}

export const useHistory = () => useContext(HistoryContext);