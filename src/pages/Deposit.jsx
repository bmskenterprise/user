import {useEffect,useState} from 'react';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {useDeposit} from '../contexts/DepositContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapH,GapV,TextField,ThemeButton,ErrorText} from '../components/styled';
import copyToClipboard from '../utils/copyToClipboard';
import DepositLimit from '../components/DepositLimit';
import Dropdown from '../components/Dropdown';

export default () =>{
  const {modeData,themeData} = useTheme()
  const {fetchDepositRange,depositRange,depositByTXN,errors,loading} = useDeposit();
  const {user,} = useAuth();
  const {mbanks,fetchMbanks} = useAPI();
  const [drop,setDrop] = useState(false);
  const [gateway,setGateway] = useState('')
  
  useEffect(()=>{
    //fetchDepositRange()
    fetchMbanks()
  },[])  
  
  useEffect(()=>{
    if(mbanks?.length>0) setGateway(mbanks[0])
  },[mbanks])
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    depositByTXN({txn:e.target.txn.value.trim(),gateway:gateway?.name,amount:parseInt(e.target.amount.value.trim()),ref:e.target.ref.value.trim()})
  }
  const getGateway = (name,icon) => setGateway(mbanks?.find(mb=>mb.name==name))   
  const toggler = (bool) => setDrop(bool)
  
  return !user?.accesses?.includes('deposit')?<FlexH x='center' y='center' style={{width:'100%',height:'100%'}}><p>Don't have Deposit permission at this time</p></FlexH>:<div onClick={e=>setDrop(false)}><GapV x='6'/>
    <div /*style={{background:'lightgreen',borderRadius:'1rem',padding:'1rem'}}*/>
        {/*<div>Minimum {depositRange?.topup?.min?.toString()} to Maximun {depositRange?.topup?.max?.toString()}</div><GapV x='3'/>
        <div>Minimum ${depositRange?.bank?.min?.toString()} to Maximum ${depositRange?.bank?.max?.toString()}</div>*/}
       
      <div style={{background:modeData.backSecondary,borderRadius:'0.5rem',padding:'1rem',width:'100%'}}>
        {gateway?.account?.split('\n')?.map((ac,i)=> <div key={i}><FlexH x='flex-start'>{/*<h4 style={{textTransform:'uppercase'}}>{gateway?.name}:</h4><GapH x='2'/>*/}<h4 /*onClick={e=>copyToClipboard(account)} style={{color:'blue'}}*/>{ac}</h4></FlexH><GapV x='1'/></div>)}
      </div>
    </div><GapV x='8'/>
    <form onSubmit={handleSubmit}>
      <Dropdown items={mbanks} toggleState={{toggler,drop}} handler={getGateway}/><GapV x='3'/>
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
    <GapV x='6'/>
  </div>
}