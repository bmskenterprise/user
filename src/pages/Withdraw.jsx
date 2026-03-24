import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import {FlexH,GapV,TextField,ErrorText,ThemeButton} from '../components/styled';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {useDeposit} from '../contexts/DepositContext';
import UserPIN from '../components/UserPIN';
import Dropdown from '../components/Dropdown';

export default () =>{
  const {thememode,} = useTheme();
  const {user} = useAuth();
  const {fetchMbanks,mbanks} = useAPI();
  const {fetchBalance,balance,balanceWithdraw,errors} = useDeposit();
  const [gateway,setGateway] = useState('')
  const [drop,setDrop] = useState(false)
  const [balanceByGateway,setBalanceByGateway] = useState(0)
  
  useEffect(()=>{
    fetchMbanks()
    fetchBalance()
  }, [])
  
  useEffect(()=>{
    if(mbanks?.length>0) setGateway(mbanks[0].name)
    //if(mbanks?.length>0&&balance) setBalanceByGateway(balance?.main[mbanks[0].name])
  }, [mbanks,balance])
  
  const getMainBalance = () => Object.values(balance?.main|| {}).reduce((sum,val)=>sum+val,0)
  
  const handleSubmit= e=>{
      e.preventDefault()
      if(parseInt(e.target.amount.value.trim())>parseInt(getMainBalance())) {toast.error('Insufficient Main Balance');return}
      UserPIN(thememode,{cb:balanceWithdraw,data:{gateway,amount:e.target.amount.value.trim()/*balanceByGateway*/,ref:e.target.ref.value.trim()}},'WITHDRAW')
    }
  
  const getGateway = (name,icon) => {/*setBalanceByGateway(balance?.main[name]);*/setGateway(name)}
  
  const toggler = (bool) => setDrop(bool)
  
  return !user?.accesses?.includes('withdraw')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Withdraw permission at this time</p></FlexH>:<div onClick={e=>setDrop(false)}><GapV x='6'/>
    <form onSubmit={handleSubmit}>
        <Dropdown items={mbanks} toggleState={{toggler,drop}} handler={getGateway}/><GapV x='3'/>
        <div>
          <TextField name='amount'/*value={balanceByGateway}*/ placeholder='Amount'/*onChange={e=>setBalanceByGateway(e.target.value.trim())}*//>
          <ErrorText>{errors?.amount}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField placeholder={`${gateway.toUpperCase()} Recipient`} name='ref'/>
          <ErrorText>{errors?.ref}</ErrorText>
        </div><GapV x='5'/>
        <FlexH x='center'><ThemeButton>NEXT</ThemeButton></FlexH>
    </form>
    <GapV x='6'/>  
  </div>  
}