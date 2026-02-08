import {useEffect,useState} from 'react';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {useDeposit} from '../contexts/DepositContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV,TextField,ThemeButton,ErrorText} from '../components/styled';
import copyToClipboard from '../utils/copyToClipboard';
import DepositLimit from '../components/DepositLimit';
import Dropdown from '../components/Dropdown';

export default () =>{
  const {modeData,themeData} = useTheme()
  const {fetchDepositRange,depositRange,depositByTXN,errors,loading} = useDeposit();
  const {user,} = useAuth();
  const {mbanks,fetchMbanks} = useAPI();
  const [balanceType,setBalanceType] = useState('');
  const [gateway,setGateway] = useState(mbanks[0])
  
  useEffect(()=>{
    fetchDepositRange()
    fetchMbanks()
  },[])  
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    depositByTXN({txn:e.target.txn.value.trim(),amount:e.target.amount.value.trim(),ref:e.target.ref.value.trim()})
  }
  const getGateway = e => setGateway(mbanks.find(m=>m.name==e))   
  
  return !user?.accesses?.includes('deposit')?<FlexH x='center' y='center' style={{width:'100%',height:'100%'}}><p>Dont have Deposit permission at this time</p></FlexH>:<div>
    <div /*style={{background:'lightgreen',borderRadius:'1rem',padding:'1rem'}}*/>
        {/*<div>Minimum {depositRange?.topup?.min?.toString()} to Maximun {depositRange?.topup?.max?.toString()}</div><GapV x='3'/>
        <div>Minimum ${depositRange?.bank?.min?.toString()} to Maximum ${depositRange?.bank?.max?.toString()}</div>*/}
      <DepositLimit/> 
      <div style={{background:'rgba(136,231,136,0.4)',borderRadius:'1rem',padding:'1rem',width:'100%'}}>
        {gateway?.account?.split('\n')?.map(({account},i)=> <div key={i}><FlexH x='flex-start'><h4 style={{textTransform:'uppercase'}}>{gateway?.name}:</h4><GapH x='2'/><h4 onClick={e=>copyToClipboard(account)} style={{color:'blue'}}>{account}</h4></FlexH><GapV x='1'/></div>)}
      </div>
    </div><GapV x='8'/>
    <form onSubmit={handleSubmit}>
      <Dropdown items={mbanks.map(m=> ({name:m.name,icon:m.icon}))} handler={getGateway}/>
      {/*<FlexH x='space-evenly'>
        <div onClick={e=>setBalanceType('topup')} style={{color:balanceType=='topup'?themeData.themeBackground:''}}><h5>Topup</h5></div>
        <div onClick={e=>setBalanceType('bank')} style={{color:balanceType=='bank'?themeData.themeBackground:''}}><h5>Bank</h5></div>
      </FlexH><GapV x='6'/>*/}
      <div>
        <TextField placeholder='Transaction ID' name='txn'/>
        <ErrorText>{errors?.txn}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField placeholder='Amount' name='amount'/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField placeholder='Reference' name='ref'/>
        <ErrorText>{errors?.ref}</ErrorText>
      </div><GapV x='5'/>
      <FlexH x='center'><ThemeButton disabled={loading} type='submit'>DEPOSIT</ThemeButton></FlexH>
    </form>
  </div>
}