import {useEffect,useState} from 'react';
import ReactDOMServer from 'react-dom/server';
import toast from 'react-hot-toast';
import {useTheme} from '../contexts/ThemeContext';
import {useDeposit} from '../contexts/DepositContext';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapH,GapV,TextField,ThemeButton,ErrorText} from '../components/styled';
import UserPIN from '../components/UserPIN';
import Dropdown from '../components/Dropdown';
import Swal from 'sweetalert2';
import DepositLimit from '../components/DepositLimit';
import useFetch from '../hooks/useFetch';
import url from '../config/url';

export default () =>{
  const {thememode,themeData,modeData:{backPrimary,textPrimary,backSecondary,textSecondary}} = useTheme();
  const {fetchBalance,balance,balanceRefill,errors} = useDeposit();
  const {user} = useAuth();
  const {fetchMbanks,mbanks} = useAPI();
  const [balanceType,setBalanceType] = useState('')
  const [gateway,setGateway] = useState('')
  const [drop,setDrop] = useState(false)
  const [balanceByGateway,setBalanceByGateway] = useState(0)
  const {data} = useFetch(`${url.urlDepositInfo}/${user?.level}`);
  
  useEffect(()=>{
    fetchBalance()
    fetchMbanks();
  }, [])
  
  useEffect(()=> {
    if(Object.keys(data)?.length>0) {
      Swal.fire({
        html: ReactDOMServer.renderToStaticMarkup(<div style={{background:backPrimary,borderRadius:'1rem',padding:'1rem',width:'100%'}}>
                <FlexH x='flex-start'><h4>Topup:</h4><GapH x='2'/><h5>Minimum &#2547;{data?.topup?.min.toString()} to Maximun &#2547;{data?.topup?.max.toString()}</h5></FlexH><GapV x='2'/>
                <FlexH x='flex-start'><h4>Drive:</h4><GapH x='2'/><h5>Minimum &#2547;{data?.drive?.min.toString()} to Maximum &#2547;{data?.drive?.max.toString()}</h5></FlexH><GapV x='2'/>
                <FlexH x='flex-start'><h4>MBank:</h4><GapH x='2'/><h5>Minimum &#2547;{data?.mbank?.min.toString()} to Maximum &#2547;{data?.mbank?.max.toString()}</h5></FlexH>
              </div>),
        background:backSecondary,
        color:textSecondary,
        confirmButtonColor:themeData.themeBackground
      })
    }
  },[data])
  
  useEffect(()=>{
    if(mbanks?.length>0) setGateway(mbanks[0].name)
    if(mbanks?.length>0&&balance) setBalanceByGateway(balance?.main[mbanks[0].name])
  }, [mbanks,balance])
  
  const handleSubmit= e=>{
    e.preventDefault()
    if(balanceByGateway>balance?.main[gateway]) {toast.error('Insufficient Main Balance');return}
    UserPIN(thememode,{cb:balanceRefill,data:{balanceType,gateway,amount:balanceByGateway}},'REFILL')
  }
  
  const getGateway = (name,icon) => {setBalanceByGateway(balance?.main[name]);setGateway(name)}
  
  const getStyle = t=> ({background:balanceType==t?themeData.themeBackground:backSecondary,borderRadius:'0.25rem',color:balanceType==t?themeData.themeText:textPrimary,cursor:'pointer',padding:'0.5rem 1.5rem'});
  
  const toggler = (bool) => setDrop(bool)
  
  return <div onClick={e=>setDrop(false)}><GapV x='6'/>
    <FlexH x='space-evenly'>
        <div onClick={e=>setBalanceType('topup')} style={getStyle('topup')}><h4>Topup</h4></div>
        <div onClick={e=>setBalanceType('drive')} style={getStyle('drive')}><h4>Drive</h4></div>
        <div onClick={e=>setBalanceType('mbank')} style={getStyle('mbank')}><h4>MBank</h4></div>
      </FlexH><GapV x='6'/>
    {balanceType&&<form onSubmit={handleSubmit}>
      <Dropdown items={mbanks} toggleState={{toggler,drop}} handler={getGateway}/><GapV x='3'/>
      <div>
        <TextField value={balanceByGateway} onChange={e=>setBalanceByGateway(e.target.value.trim())}/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='5'/>
      <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH>
    </form>}
    <GapV x='6'/>
  </div>
}