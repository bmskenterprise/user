import {useEffect,useCallback,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';

export default (url) =>{
  const navigate = useNavigate();
  const [data,setData] = useState([])
  const [loading,setLoading] = useState(false)
  
  useEffect(()=>{fetchData(url)}, [url])
  
  const fetchData = useCallback(async (url) =>{ 
      setLoading(true)
      try{
        let res = await fetch(url,{credentials:'include'});
        let data = await res.json();
        if(res.status==401) navigate('/login')
        if(!res.ok) throw new Error(data.error)
        setData(data);
      }catch(e) {toast.error(e.message)}
      finally{setLoading(false)}
  },[])
  
  return {data,loading}
}