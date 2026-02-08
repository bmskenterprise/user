import { useNavigate } from 'react-router-dom';
import {FlexH,ActionBtn,Icon} from './styled';

export default ({list})=>{
        const navigate = useNavigate()     
        return <FlexH x='space-between'>
            {list && list.map(({icon,text,url},i) => <ActionBtn key={i} onClick={e=>navigate(url)}>
                     <Icon className={icon}></Icon><span>{text}</span>
                </ActionBtn>)}
            </FlexH>
}
