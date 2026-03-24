import {createContext,useContext,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import toast from 'react-hot-toast';
import {validateUserLogin,validateUserRegister} from '../utils/validate';
import url from '../config/url'

const AuthContext = createContext();

export const AuthProvider = ({children}) =>{
  const navigate = useNavigate();
  const [errors,setErrors] = useState(null);
  const [user,setUser] = useState(null);
  const [levels,setLevels] = useState(null);
  const [regData,setRegData] = useState({})
  const [bio,setBio] = useState({});
  const [loading,setLoading] = useState(false);
  
  const fetchUserAuth = async () =>{
    try{
      let res = await fetch(url.urlUserAuth,{
        credentials:'include',
        headers:{'Accept':'application/json','Content-Type':'application/json'}
      });
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setUser(data);
    }catch(e) {toast.error(e.message);navigate('/login')}
  }
  
  const fetchUserLevels = async () =>{
    if(levels) return
    setLoading(true)
    try{
      let res = await fetch(url.urlRegister);
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setLevels(data)
    }catch(e) {}
    finally{setLoading(false)}
  }
  
  const login = async (loginData) => {
      const validations = validateUserLogin(loginData);
      if(Object.keys(validations).length) {setErrors(validations);return}
      setLoading(true);
      try{
          let res=await fetch(url.urlUserLogin,
          {
            method:'POST',
            credentials: 'include',
            headers: {'Content-Type':'application/json'},   
            body: JSON.stringify(loginData)
          })
          let data = await res.json();
          if(res.status===400) return setErrors(data.error);
          if(!res.ok) {throw new Error(data.error || 'Login failed');}
          fetchUserAuth();
          //localStorage.setItem('auth',JSON.stringify({user:[data.token,data.user,data.level],accesses:data.accesses}));
      }catch(err){toast.error(`58.${err.status} ${err.message}`);}
      finally{setLoading(false);}
  }
  const cacheRegData = rd=> {console.log(rd);setRegData(rd);console.log(regData);}
  
  const register = async (regData) => {
    const validations = validateUserRegister(regData);
    if(Object.keys(validations).length) {setErrors(validations);return}
    setLoading(true);
    try {
      let res = await fetch(url.urlRegister, {
        method: 'POST',
        headers: {'Content-Type':'application/json'},
        body: JSON.stringify(regData)
      });
      let data = await res.json();
      if(!res.ok){throw new Error(data.message || 'failed to register');}
      navigate('/login');
    }catch(err) {toast.error(err.message);}
    finally{setLoading(false)}
  }
  
  const fetchBio = async () =>{
    setLoading(true)
    try{
      let res = await fetch(url.urlProfile,{credentials:'include'}); 
      let data = await res.json()
      if(!res.ok) throw new Error(data.error)
      setBio(data)
    }catch(e) {toast.error(e.message)}
    finally{setLoading(false)}
  }
  
  const logout = async () =>{
    try{
      let res = await fetch(url.urlLogout,{method:'POST',credentials:'include'});
      let data = await res.json();
      if(!res.ok) throw new Error(data.error)
      setUser(null);//navigate('/login')
    }catch(e) {toast.error(e.message)}
  }
  
  return <AuthContext.Provider value={{user,fetchUserLevels,levels,fetchUserAuth,fetchBio,login,cacheRegData,register,regData,bio,logout,errors,loading}}>{children}</AuthContext.Provider>;
}

export const useAuth = () => useContext(AuthContext);