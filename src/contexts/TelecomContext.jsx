import {createContext,useContext,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {useNotification} from './NotificationContext';
import {validateTopup,validateDriveHit} from '../utils/validate';
import url from '../config/url';

const TelecomContext = createContext();

export const TelecomProvider = ({children}) =>{
  const {socket} = useNotification();
  const [telecoms,setTelecoms] = useState([]);
  const [topupTelecoms,setTopupTelecoms] = useState([]);
  const [driveTelecoms,setDriveTelecoms] = useState([]);
  const [regularTelecoms,setRegularTelecoms] = useState([]);
  const [regularData,setRegularData] = useState({});
  const [driveData,setDriveData] = useState({});
  const [errors,setErrors] = useState({});
  const [loading,setLoading] = useState(false);
  const navigate = useNavigate()
  
  useEffect(()=>{
    socket.on('telecoms',e=>{localStorage.removeItem('telecoms');fetchTelecoms()})
  },[socket])
  
  const fetchTelecoms = async ()=>{
    const icons = localStorage.getItem('telecoms')
    if(icons) {setTelecoms(JSON.parse(icons));return}
    try{
      let res = await fetch(url.urlTelecom,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      setTelecoms(data);
      localStorage.setItem('telecoms', JSON.stringify(data))
    }catch(e) {toast.error(e.message)}
  }
  
  const fetchTopupTelecoms = async ()=>{
    const opts = localStorage.getItem('topup-opts')
    if(opts) {setTopupTelecoms(JSON.parse(opts));return}
    try{
      let res = await fetch(url.urlTopup,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      setTopupTelecoms(data);
      localStorage.setItem('topup-opts', JSON.stringify(data))
    }catch(e) {toast.error(e.message)}
  }
  
  const fetchDriveTelecoms = async ()=>{
    const opts = localStorage.getItem('drive-opts')
    if(opts) {setDriveTelecoms(JSON.parse(opts));return}
    try{
      let res = await fetch(url.urlDrive,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      setDriveTelecoms(data);
      localStorage.setItem('drive-opts', JSON.stringify(data))
    }catch(e) {toast.error(e.message)}
  }
  
  const fetchRegularTelecoms = async ()=>{
    const opts = localStorage.getItem('regular-opts')
    if(opts) {setRegularTelecoms(JSON.parse(opts));return}
    try{
      let res = await fetch(url.urlRegular,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      setRegularTelecoms(data);
      localStorage.setItem('regular-opts', JSON.stringify(data))
    }catch(e) {toast.error(e.message)}
  }
  const topup = async (formData,pin) => {
    const topupData = {operator:formData.operator.name,recipient:formData.recipient,amount:parseInt(formData.amount)}
    const validationErrors = validateTopup(topupData)
    if(Object.keys(validationErrors).length) return
    setErrors(validationErrors);
    setLoading(true);
    try{
      let res = await fetch(url.urlTopup, {
        method: 'POST',credentials:'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(topupData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to topup ');}
      toast.success(data.message);
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  const hitDrive = async (hitData,pin) => {
    const validationErrors = validateDriveHit(hitData)
    setErrors(validationErrors);
    if(Object.keys(validationErrors).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlDrive, {
        method: 'POST',credentials:'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(hitData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to hit drive');}
      toast.success(data.message);
    }catch(e) {toast.error(e.message);}
    finally{setLoading(false)}
  }
  
  const fetchRegularPacks = async (opt,category,search,page)=>{
    //if(!search&&regularData?.[opt]?.[category]) return
       //
    setLoading(true)
    try{
      let res = await fetch(`${url.urlRegular}/${opt}?category=${category}&search=${search}&page=${page}`,{credentials:'include'});
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      search? setRegularData(data) : setRegularData(prev=>({...prev,[opt]:{[category]:data}}));
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const fetchDrivePacks = async (opt,category,search,page)=>{
    if(!search&&driveData?.[opt]?.[category]) return
    setLoading(true)
    try{
      let res = await fetch(`${url.urlDrive}/${opt}?category=${category}&search=${search}&page=${page}`,{credentials:'include'}); //
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok) throw new Error(data.error);
      setDriveData(prev=>({...prev,[opt]:{[category]:data}}));
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  return <TelecomContext.Provider value={{fetchTelecoms,fetchTopupTelecoms,fetchDriveTelecoms,fetchRegularTelecoms,topup,hitDrive,fetchRegularPacks,fetchDrivePacks,telecoms,topupTelecoms,driveTelecoms,regularTelecoms,regularData,driveData,errors,loading}}>{children}</TelecomContext.Provider>;
}

export const useTelecom = () => useContext(TelecomContext);