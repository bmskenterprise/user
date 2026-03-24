import {useEffect} from 'react';
import MbankHistory from './MbankHistory';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';

export default () => {
  const {socket} = useNotification()
  const {user} = useAuth();
  useEffect(()=>{socket.emit('seen-failed-bkash',user?.username)},[])
  
  return <MbankHistory mbankType='bkash'/>
}