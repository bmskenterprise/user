import {useTheme} from '../contexts/ThemeContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapH,ImageIcon} from '../components/styled';

export default ()=>{
  const {modeData:{backSecondary,textSecondary}} = useTheme();
  const {contacts} = useAPI();
  
  return <div>
    {contacts?.map(({media,icon,contactURL},i)=><FlexH x='flex-start' style={{background:backSecondary,color:textSecondary,cursor:'pointer',marginBottom:'2rem'}} key={i} onClick={e=>window.open(contactURL)}>
      <ImageIcon src={icon} x='2'/><GapH x='2'/>
      <h4>{media}</h4>
    </FlexH>)}
  </div>
}