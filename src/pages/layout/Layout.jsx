import {useEffect} from 'react';
import toast from 'react-hot-toast';
import {useAuth} from '../../contexts/AuthContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useDeposit} from '../../contexts/DepositContext';
import {useAPI} from '../../contexts/APIContext';
import {useTelecom} from '../../contexts/TelecomContext';
import {useHistory} from '../../contexts/HistoryContext';
import {GapV,Loader,Spinner} from '../../components/styled';
import NavBar from './NavBar'

export default ({children}) =>{
  const {socket} = useNotification();
  const {modeData} = useTheme()
  const deposit = useDeposit();
  const api = useAPI();
  const telecom = useTelecom();
  const history = useHistory();
  const {fetchUserAuth,user} = useAuth();
  useEffect(()=>{socket.emit('user:join',{username:user?.username,level:user?.level})},[socket])
  
  useEffect(()=>{
    if(!(!!user)) fetchUserAuth()
    const handleOnline = () => toast.success('Internet Connected')
    const handleOffline = () => toast.error('Internet Disconnected')
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)
    return e =>{
        window.removeEventListener('online', handleOnline)
        window.removeEventListener('offline', handleOffline)
    }
  },[])
  
  return <div style={{background:modeData?.backPrimary,color:modeData?.textPrimary,minWidth:'100vw',minHeight:'100vh'}}>
    <NavBar/><GapV x='3'/>
    <div style={{minHeight:'100vh',maxWidth:'48rem',margin:'auto'}}>{children}</div>
  </div>
}