import {useEffect} from 'react';
import {useNotification} from '../contexts/NotificationContext';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import useArrayFetch from '../hooks/useArrayFetch';
import {FlexH,GapV} from '../components/styled';
import {getLocalDateFromUTC} from '../utils/date'
import url from '../config/url';

export default  () =>{
    const {modeData:{backPrimary,backSecondary,textSecondary}} = useTheme();
    const {socket,seenInbox} = useNotification()
    const {user} = useAuth()
    const {data,loading} = useArrayFetch(url.urlNotice)
    useEffect(()=> {
        seenInbox()
        if(user) socket.emit('user:seen-inbox',user?.username)
    },[user])
    
    return <div style={{background:backSecondary,padding:'1rem'}}><GapV x='6'/>
        <div>
            {data?.map(({_id,notice,updatedAt})=> <div key={_id} style={{/*background:backPrimary,*/color:textSecondary,marginBottom:'3rem'}}>
         
                <FlexH x='space-between'><h3>{notice.title}</h3><h4>{getLocalDateFromUTC(updatedAt)}</h4></FlexH><GapV x='0.5'/>
                <p>{notice.description}</p>
         
            </div>)}
        </div>
        <GapV x='6'/>
    </div>
}