import {useEffect,useState} from 'react';
import ReactDOMServer from 'react-dom/server'
import {useNavigate} from 'react-router-dom';
import {useTheme} from '../contexts/ThemeContext'
import {useAuth} from '../contexts/AuthContext';
import {useTelecom} from '../contexts/TelecomContext';
import {useAPI} from '../contexts/APIContext'
import {useDeposit} from '../contexts/DepositContext';
import {FlexH,GapV,ActionBtn,Center,BalanceButton,Image} from '../components/styled'
import useArrayFetch from '../hooks/useArrayFetch';
import Slider from '../components/Slider';
import list from './Action.jsx'
import Swal from 'sweetalert2';
import url from '../config/url'

export default ()=>{
  const navigate = useNavigate();
  const {user} = useAuth();
  const {fetchTelecoms,fetchRegularTelecoms} = useTelecom();
  const {fetchBalance,balance} = useDeposit();
  const {seenModalNotices,modalSession,stopModalSession} = useAPI()
  const {themeData:{themeBackground,themeText},modeData:{backPrimary,backSecondary,textSecondary,}} = useTheme();
  const {data} = useArrayFetch(url.urlMBank)
  const {data:modalNotices} = useArrayFetch(url.urlModalNotice)
  const [mainBalance,setMainBalance] = useState(0)
  
  useEffect(()=>{
    if(Notification&&Notification.permission!=='granted'){
      Notification.requestPermission().then(res=>console.log(res))
    }
    fetchTelecoms()
        fetchRegularTelecoms();
  },[])
  
  useEffect(()=>{
    if(balance?.main) setMainBalance(Object.values(balance?.main||{}).reduce((sum,val)=>sum+val,0))
  }, [balance])
  
  useEffect(()=>{
    if(modalSession&&modalNotices?.length>0) {
      Swal.fire({
        html:ReactDOMServer.renderToStaticMarkup(<div style={{background:backPrimary,padding:'0.5rem',textAlign:'left'}}>{modalNotices?.map(({_id,notice})=> <div key={_id}><h5>#. {notice.title}</h5><h6>{notice.description}</h6><GapV x='2'/></div>)}</div>),
        background:backSecondary,
        color:textSecondary,
        confirmButtonColor:themeBackground,
      }).then(res=>{
        if(res.isConfirmed) seenModalNotices()
      })
      stopModalSession()
    }
  }, [modalNotices])
  
  const showBalanceModal = async e =>{
    await fetchBalance()
    Swal.fire({
      html: ReactDOMServer.renderToStaticMarkup(<div style={{background:backPrimary,padding:'0.5rem'}}>
      <FlexH x='space-between'><h4>Main</h4><h4>&#2547;{mainBalance}</h4></FlexH><GapV x='2'/>
      <FlexH x='space-between'><h4>Topup</h4><h4>&#2547;{balance?.topup}</h4></FlexH><GapV x='2'/>
      <FlexH x='space-between'><h4>Drive</h4><h4>&#2547;{balance?.drive}</h4></FlexH>
      <GapV x='2'/><FlexH x='space-between'><h4>MBank</h4><h4>&#2547;{balance?.mbank}</h4></FlexH><GapV x='2'/>
    </div>),
      background: backSecondary,color: textSecondary
    })
  }
  
  return <div><GapV x='6'/>
    <FlexH x='space-between' style={{background:themeBackground,borderRadius:'1rem',color:themeText,height:'8rem'}}>
      <div style={{padding:'2.5rem'}}>
        <h3>{user?.username}</h3><GapV x='1.3'/>
        <h4 style={{textTransform:'uppercase'}}>{user?.level}</h4>
      </div>
      <div style={{aspectRatio:'1',height:'100%'}}><Center><BalanceButton onClick={showBalanceModal}>Balance</BalanceButton></Center></div>
    </FlexH><GapV x='5'/>
    <FlexH x='space-between' style={{width:'100%',gap:'2rem'}}>
      {list?.map(({icon,text,url},i)=> <ActionBtn key={i} onClick={e=>navigate(url)}><i>{icon}</i><span>{text}</span></ActionBtn>)}
      {data?.map(({name,icon})=> <ActionBtn key={name} onClick={e=>navigate(`/mbank/${name}`)}><Image x='2' src={icon}/><span style={{textTransform:'capitalize'}}>{name}</span></ActionBtn>)}
    </FlexH><GapV x='8'/>
    <Slider/><GapV x='5'/>
    {/*<FlexH x='center'>
      <div style={{width:'40rem'}}>{socialLinks?.map(({media,icon})=> <ActionBtn key={media} onClick={e=>navigate(`/${media}`)}><Image x='2' src={icon}/><span style={{textTransform:'capitalize'}}>{media}</span></ActionBtn>)}</div>
    </FlexH>*/}
  </div>
}