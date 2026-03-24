import {createContext,useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import url from '../config/url';
import {validateMBankTransaction,validatePayBill,validateBank,validateFeedback} from '../utils/validate';

const APIContext = createContext();

export const APIProvider = ({children}) =>{
  const navigate = useNavigate();
  const [slideImages,setSlideImages] = useState([]);
  const [mbanks,setMbanks] = useState([]);
  const [contacts,setContacts] = useState([]);
  const [socialLinks,setSocialLinks] = useState([]);
  const [feedbacks,setFeedbacks] = useState([]);
  const [bankNames,setBankNames] = useState([]);
  const [notices,setNotices] = useState([])
  const [modalSession,setModalSession] = useState(true)
  const [errors,setErrors] = useState({})
  const [loading,setLoading] = useState(false);
  
  const stopModalSession = () => setModalSession(false);
  const fetchSlideImages = async () =>{
      //if(slideImages.length) return
      try{
        let res = await fetch(url.urlImageSlider,{credentials:'include'});
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setSlideImages(data);
      }catch(e) {toast.error(e.message)}
  }
    const fetchMbanks = async () =>{
      //if(mbanks.length) return
      try{
        let res = await fetch(url.urlMBank,{credentials:'include'}); //
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setMbanks(data);
      }catch(e) {toast.error(e.message)}
    }
    
  const fetchContacts = async () =>{
      //if(contacts.length) return
      setLoading(true)
      try{
        let res = await fetch(url.urlContacts,{credentials:'include'});
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setContacts(data);
      }catch(e) {toast.error(e.message)}
      finally{setLoading(false)}
  }
    
  const fetchSocialLinks = async () =>{
      //if(socialLinks.length) return
      setLoading(true)
      try{
        let res = await fetch(url.urlSocialLinks,{credentials:'include'});
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setSocialLinks(data);
      }catch(e) {toast.error(e.message)}
      finally{setLoading(false)}
  }
  const fetchBankNames = async () =>{
      if(bankNames.length) return  //
      setLoading(true)
      try{
        let res = await fetch(url.urlBank,{credentials:'include'}); //
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setBankNames(data);
      }catch(e) {toast.error(e.message)}
      finally{setLoading(false)}
  }
    
  const addBillRequest = async (billData,pin) => {
    const validationResult = validatePayBill(billData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlBill, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(billData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to add bill');}
      toast.success(data.message);
    }catch(err) {toast.error(err.message);}
    finally{setLoading(false)}
  }
  
  const addBankRequest = async (bankData,pin) => {
    const validationResult = validateBank(bankData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlBank, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(bankData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to add bank');}
      toast.success(data.message);
    }catch(err) {toast.error(err.message);}
    finally{setLoading(false)}
  }
  
  const addMbankTransaction = async (mbankData,pin) => {
    const validationResult = validateMBankTransaction(mbankData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlMBank, {
        method: 'POST',
        credentials:'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(mbankData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to mbank request');}
      toast.success(data.message);
    }catch(err) {toast.error(err.message);}
    finally{setLoading(false)}
  }
  
  
    const fetchNotices = async () =>{
        setLoading(true)
        try{
            let res = await fetch(url.urlNotice,{credentials:'include'})
            let data = await res.json();
            setNotices(data)
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
  
  const seenModalNotices = async () =>{
    try{
      let res = await fetch(url.urlModalNoticeSeen,{
        method: 'PATCH',
        credentials:'include'
      });
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
    }catch(e) {toast.error(e.message)}
  }
  
  /*const fetchFeedbacks = async () =>{
      setLoading(true)
      try{
        let res = await fetch(url.urlFeedback,{credentials:'include'});
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setFeedbacks(data);
      }catch(e) {toast.error(e.message)}
      finally{setLoading(false)}
  }*/
  const addFeedback = async (feedbackData,pin) => {
    const validationResult = validateFeedback(feedbackData)
    setErrors(validationResult);
    if(Object.keys(validationResult).length) return
    setLoading(true);
    try{
      let res = await fetch(url.urlFeedback, {
        method: 'POST',
        credentials: 'include',
        headers: {'Content-Type':'application/json', 'x-user-pin':pin},
        body: JSON.stringify(feedbackData)
      });
      let data = await res.json();
      if(res.status==401) navigate('/login')
      if(!res.ok){throw new Error(data.message || 'failed to mbank request');}
      toast.success(data.message);
    }catch(err) {toast.error(err.message);}
    finally{setLoading(false)}
  }
  
  return <APIContext.Provider value={{fetchSlideImages,slideImages,fetchMbanks,mbanks,fetchContacts,fetchSocialLinks,socialLinks,contacts,fetchBankNames,bankNames,addBillRequest,addBankRequest,addMbankTransaction,seenModalNotices,fetchNotices,modalSession,stopModalSession,notices,addFeedback,feedbacks,errors,loading}}>{children}</APIContext.Provider>;
  }

export const useAPI = () => useContext(APIContext);