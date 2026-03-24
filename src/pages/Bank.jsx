import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import {FlexH,GapV,TextField,Select,ThemeButton,ErrorText} from '../components/styled';
import UserPIN from '../components/UserPIN';
import {useAuth} from '../contexts/AuthContext'
import {useAPI} from '../contexts/APIContext'
import {useDeposit} from '../contexts/DepositContext'
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';

export default () =>{
  const {user,} = useAuth();
  const {fetchBalance,balance} = useDeposit()
  const {bankNames,addBankRequest,fetchBankNames,errors,loading} = useAPI();
  const [next,setNext] = useState(false);
  let [formData,setFormData]= useState({})
  
  useEffect(()=>{fetchBankNames();fetchBalance()},[])
  
  
    useEffect(()=>{
        window.history.pushState(null,'',window.location.href)
        const handlePopState = e =>{
            if(next){
                window.history.pushState(null,'',window.location.href);setNext(false)
            }
        }
        window.addEventListener('popstate',handlePopState)
        return ()=> window.removeEventListener('popstate',handlePopState)
    },[next])
    
  
  const getMainBalance = b => Object.values(balance?.main|| {}).reduce((sum,val)=>sum+val,0)
  const handleForm = (e) =>{
    e.preventDefault();
      setFormData({bank:`${e.target.bankName.value} ${e.target.branch.value.trim()}`,acNumber:e.target.ac.value.trim(),amount:Number(e.target.amount.value.trim()),name:e.target['ac-name'].value.trim()});
    if(getMainBalance()<Number(e.target.amount.value.trim())) {toast.error('insufficient balance');return}
    setNext(true)
  }
  const requestBank = e => UserPIN({cb:addBankRequest,data:formData},'ADD BANK')
  
  return !user?.accesses?.includes('bank')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Bank permission at this time</p></FlexH>:<div><GapV x='10'/>
    {!next?<form onSubmit={handleForm}>
      <div style={{height:'2rem',width:'100%'}}>
       <Select name='bankName' style={{height:'2rem',width:'100%'}}>
        {bankNames.map((b,i)=><option key={i} style={{textTransform:'capitalize'}} value={b}>{b}</option>)}
      </Select>
        <ErrorText>{errors?.bank}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField name='branch' placeholder='Bank Branch'/>
        <ErrorText>{errors?.bank}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField name='ac' placeholder='Bank AC Number'/>
        <ErrorText>{errors?.acNumber}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField  name='amount' placeholder='Bank Transaction Amount'/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='3'/>
      <div>
        <TextField name='ac-name' placeholder='Bank AC Name'/>
        <ErrorText>{errors?.name}</ErrorText>  
      </div><GapV x='6'/>
      <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH>
    </form>:
    <div>
      <BalanceBeforeAfter before={getMainBalance()} after={getMainBalance()-formData.amount}/><GapV x='3'/>
      <div>
        <h4>{formData.bankName} {formData.branch}</h4><GapV x='2'/>
        <FlexH x='space-between'><h5>{formData.ac}</h5><h5>{formData.amount}</h5></FlexH><GapV x='4'/>
        <FlexH x='center'><ThemeButton disabled={loading} onClick={requestBank}>NEXT</ThemeButton></FlexH>
      </div>
    </div>}
    <GapV x='5'/>
  </div>
}