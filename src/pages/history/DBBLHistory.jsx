import {useEffect} from 'react';
import {useAuth} from '../../contexts/AuthContext'
import {useNotification} from '../../contexts/NotificationContext'
import MbankHistory from './MbankHistory'

export default () =>{
    const {socket} = useNotification()
    const {user} = useAuth()
    useEffect(()=>{socket.emit('seen-failed-dbbl',user?.username)},[])
    
    return <MbankHistory mbankType='dbbl'/>
}
