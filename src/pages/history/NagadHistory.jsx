import {useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext'
import {useNotification} from '../../contexts/NotificationContext'
import MbankHistory from './MbankHistory'

export default () =>{
  const {user} = useAuth()
  const {socket} = useNotification()
  useEffect(()=>{socket.emit('seen-failed-nagad',user?.username)},[])

  return <MbankHistory mbankType='nagad'/>
}