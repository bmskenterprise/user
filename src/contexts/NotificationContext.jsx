import {createContext,useContext,useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import io from 'socket.io-client';
import {useAuth} from './AuthContext';
import url from '../config/url';

const socket = io(url.urlRoot,{
  transports:['websocket','polling'],
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});
socket.on('connect',()=>console.log('connected'))
socket.on('connect_error',error=>console.log(error))
socket.on('reconnect',attemp=>console.log(attemp))
const NotificationContext = createContext(socket);

export const NotificationProvider = ({children}) =>{
  const navigate = useNavigate();
  const {user} = useAuth();
  const [countFailedOrCancel,setCountFailedOrCancel] = useState({deposit:0,withdraw:0,topup:0,drive:0,bill:0,bkash:0,dbbl:0,nagad:0})
  const [inboxCount,setInboxCount] = useState(0)
  const [isFailed,setIsFailed] = useState(false)
  
  const seenInbox = () =>{
    //socket.emit('user:seen-inbox',user?.username)
    setInboxCount(0)
  }
  
  useEffect(()=>{
    let onImmediateInbox
    if(user) {
      onImmediateInbox = (recipients)=>{if(recipients.includes(user?.level)) setInboxCount(prev=>prev+1)}
      socket.on('user:inbox-immediate',onImmediateInbox)
    }
    return ()=> socket.off('user:inbox-immediate',onImmediateInbox)
  }, [user])
  
  
  useEffect(()=>{
    if(!socket) return;
    const notify = (title,body,url) =>{
      let notification = new Notification(title,{
        body:body,
        icon:'https://res.cloudinary.com/dnyyugfjv/image/upload/v1752837562/bitmap_q4lnon.svg',
      })
      notification.addEventListener('click',()=>window.open(url))
      setTimeout(()=>{notification.close()},10000)
    }
    const onStatusChange = ({title,body,url}) =>{
      if(Notification.permission=='granted') notify(title,body,url)
    }
    
    const onFailedOrCancel = (failed) =>{
      setCountFailedOrCancel(failed)
    }
    
    const onImmediateFailedOrCancel = (type) =>{
      setCountFailedOrCancel(prev=>({...prev,[type]:prev[type]+1}));setIsFailed(true)
    }
    
    const once = setTimeout(()=>{setIsFailed(false)},500);
    const onInbox = (count) => setInboxCount(prev=>prev+count)
    const resetTopupCache = e=>{localStorage.removeItem('topup-opts');}
    const resetRegularCache = e=>{localStorage.removeItem('regular-opts');}
    const resetDriveCache = e=>{localStorage.removeItem('drive-opts');}
    
    socket.on('user:status-changed',onStatusChange)
    socket.on('user:failed',onFailedOrCancel)
    socket.on('user:status-failed',onImmediateFailedOrCancel)
    socket.on('user:inbox',onInbox)
    socket.on('user:topup-opts',resetTopupCache)
    socket.on('user:regular-opts',resetRegularCache)
    socket.on('user:drive-opts',resetDriveCache)
    
    return ()=> {
      socket.off('user:status-changed',onStatusChange)
      socket.off('user:status-failed',onImmediateFailedOrCancel)
      socket.off('user:failed',onFailedOrCancel)
      socket.off('user:inbox',onInbox)
      socket.off('user:topup-opts',resetTopupCache)
      socket.off('user:regular-opts',resetRegularCache)
      socket.off('user:drive-opts',resetDriveCache);clearTimeout(once)
    }
  },[])
  const reduceFailedCount = (type) => setCountFailedOrCancel(prev=> ({...prev,[type]:0}));
  return <NotificationContext.Provider value={{socket,countFailedOrCancel,seenInbox,inboxCount,isFailed,reduceFailedCount}}>{children}</NotificationContext.Provider>;
}

export const useNotification = () => useContext(NotificationContext);