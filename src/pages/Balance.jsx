import {useEffect,useState} from 'react';
import {useTheme} from '../contexts/ThemeContext';
import {useDeposit} from '../contexts/DepositContext';
import {useAPI} from '../contexts/APIContext';
import UserPIN from '../components/UserPIN';
import {FlexH,GapV,TextField,ThemeButton,ErrorText} from '../components/styled';
import Dropdown from '../components/Dropdown';

export default () =>{
  const {themeData} = useTheme();
  const {balance,balanceRefill,errors} = useDeposit();
  const {mbanks} = useAPI();
  const [balanceType,setBalanceType] = useState('')
  const [gateway,setGateway] = useState('')
  const [balanceByGateway,setBalanceByGateway] = useState(0)
  const getGateway = e => {setBalanceByGateway(balance?.main[e]);setGateway(e)}
  const getActiveStyle = t=> ({color:balanceType==t?themeData.themeBackground:''});
  
  useEffect(()=>{
  setGateway(mbanks[0].name)
  setBalanceByGateway(balance?.main[gateway])
  }, [])
  
  const handleSubmit= e=>{
    e.preventDefault()
    UserPIN({cb:balanceRefill,data:{balanceType,gateway,amount:e.target.amount.value.trim()}},'REFILL')
  }
  
  return <div>
    <FlexH x='space-evenly'>
        <div onClick={e=>setBalanceType('topup')} style={getActiveStyle('topup')}><h5>Topup</h5></div>
        <div onClick={e=>setBalanceType('drive')} style={getActiveStyle('drive')}><h5>Drive</h5></div>
        <div onClick={e=>setBalanceType('mbank')} style={getActiveStyle('mbank')}><h5>MBank</h5></div>
      </FlexH><GapV x='6'/>
    {balanceType&&<form onSubmit={handleSubmit}>
      <Dropdown items={mbanks.map(m=>({name:m.name,icon:m.icon}))} handler={getGateway}/><GapV x='2'/>
      <div>
        <TextField value={balanceByGateway} onChange={e=>setBalanceByGateway(e.target.value)}/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='3'/>
      <FlexH x='center'><ThemeButton>NEXT</ThemeButton></FlexH>
    </form>}
  </div>
}