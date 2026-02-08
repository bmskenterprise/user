import {useEffect} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV,ActionBtn,ImageIcon} from '../components/styled'
import Slider from '../components/Slider';
import list from './Action.jsx'
import {useAuth} from '../contexts/AuthContext';
import Balance from '../components/Balance';
import Swal from 'sweetalert2';

export default ()=>{
  const navigate = useNavigate();
  const {user} = useAuth();
  const {fetchModalNotices,modalNotices,fetchMbanks,fetchSocialLinks,mbanks,socialLinks} = useAPI();
  const SweetModal = e => <div style={{padding:'3rem'}}>{modalNotices?.map(({title,description})=> <div><h5>#. {title}</h5><h6>{description}</h6><GapV x='2'/></div>)}</div>
  const getModalNotice = async ()=>{
    await fetchModalNotices()
    if(modalNotices?.length>0) Swal.fire({html:<SweetModal/>})
  }
  useEffect(()=>{
    fetchMbanks()
    fetchSocialLinks()
    if(Notification&&Notification.permission!=='granted'){
      Notification.requestPermission().then(res=>console.log(res))
    }
    //getModalNotice()
  },[])
  
  return <div>
    <FlexH x='space-between' style={{height:'8rem'}}>
      <div style={{width:'50%'}}>
        <h3>{user?.username}</h3><GapV x='2'/>
        <h5>{user?.level}</h5>
      </div>
      <Balance/>
    </FlexH><GapV x='5'/>
    <FlexH x='space-between' style={{width:'100%',gap:'2rem'}}>
      {list?.map(({icon,text,url},i)=> <ActionBtn key={i} onClick={e=>navigate(url)}><i>{icon}</i><span>{text}</span></ActionBtn>)}
      {mbanks?.map(({name,icon})=> <ActionBtn key={name} onClick={e=>navigate(`/${name}`)}><ImageIcon x='2' src={icon}/><span style={{textTransform:'capitalize'}}>{name}</span></ActionBtn>)}
    </FlexH><GapV x='8'/>
    <Slider/><GapV x='5'/>
    <FlexH x='center'>
      <div style={{width:'40rem'}}>{socialLinks?.map(({media,icon})=> <ActionBtn key={media} onClick={e=>navigate(`/${media}`)}><ImageIcon x='2' src={icon}/><span style={{textTransform:'capitalize'}}>{media}</span></ActionBtn>)}</div>
    </FlexH>
  </div>
}