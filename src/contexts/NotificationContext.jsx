import {createContext,useContext,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import {useAuth} from './AuthContext';
import url from '../config/url';

const socket = io(url.server,{
  transports:['websocket','polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
socket.on('connect',reason=>console.log(reason))
socket.on('connect_error',error=>console.log(error))
socket.on('reconnect',attemp=>console.log(attemp))
const NotificationContext = createContext(socket);

export const NotificationProvider = ({children}) =>{
  const navigate = useNavigate();
  const {user} = useAuth();
  const [countFailedOrCancel,setCountFailedOrCancel] = useState({deposit:0,topup:0,drive:0,bill:0,bank:0,bkash:0})
  const [inboxCount,setInboxCount] = useState(0)
  
  const seenInbox = () =>{
    socket.emit('seen-inbox',user?.username)
    setInboxCount(0)
  }
  
  useEffect(()=>{
    if(!socket) return;
    const notify = (title,body,url) =>{
      let notification = new Notification(title,{
        body:body,
        icon:'https://res.cloudinary.com/dnyyugfjv/image/upload/v1752837562/bitmap_q4lnon.svg',
      })
      notification.addEventListener('click',()=>navigate(url))
      setTimeout(()=>{notification.close()},5000)
    }
    const onRequestStatusChange = (title,body,url) =>{
      if(Notification.permission=='granted') notify(title,body,url)
    }
    
    const onFailedOrCancel = ({type,count}) =>{
      setCountFailedOrCancel(prev=>({...prev,[type]:prev[type]+count}))
    }
    
    const onInbox = ({count})=>{setInboxCount(prev=>prev+count)}
    const resetTopupCache = e=>{localStorage.removeItem('topup-opts');}
    const resetRegularCache = e=>{localStorage.removeItem('regular-opts');}
    const resetDriveCache = e=>{localStorage.removeItem('drive-opts');}
    
    socket.on('status-changed',onRequestStatusChange)
    socket.on('failed',onFailedOrCancel)
    socket.on('inbox',onInbox)
    socket.on('topup-opts',resetTopupCache)
    socket.on('regular-opts',resetRegularCache)
    socket.on('drive-opts',resetDriveCache)
    
    return ()=> {
      socket.off('status-changed',onRequestStatusChange)
      socket.off('failed',onFailedOrCancel)
      socket.off('inbox',onInbox)
      socket.off('topup-opts',resetTopupCache)
      socket.off('regular-opts',resetRegularCache)
      socket.off('drive-opts',resetDriveCache)
    }
  },[])
  
  return <NotificationContext.Provider value={{socket,countFailedOrCancel,seenInbox,inboxCount}}>{children}</NotificationContext.Provider>;
}

export const useNotification = () => useContext(NotificationContext);