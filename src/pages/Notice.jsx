import {useEffect} from 'react';
import {useNotification} from '../contexts/NotificationContext';
import {useTheme} from '../contexts/ThemeContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV} from '../components/styled';

export default  () =>{
    const {modeData:{backSecondary,textSecondary}} = useTheme();
    const {seenInbox,} = useNotification()
    const {fetchNotices,notices} = useAPI()
    useEffect(()=> {
        seenInbox()
        fetchNotices()
    },[])
    
    return <div>
        {notices?.map(({_id,title,description,updatedAt})=> <div key={_id}>
        <div style={{background:backSecondary,color:textSecondary}}>
                <FlexH x='space-between'><h5>{title}</h5><h6>{updatedAt}</h6></FlexH>
                <p>{description}</p>
        </div><GapV x='3'/>
        </div>)}
    </div>
}
