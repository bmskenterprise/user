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
  const {balance} = useDeposit()
  const {bankNames,addBankRequest,fetchBankNames,errors,loading} = useAPI();
  const [next,setNext] = useState(false);
  let formData={}
  
  useEffect(()=>{fetchBankNames()},[])
  
  const handleForm = (e) =>{
    e.preventDefault();
    formData = {bankName:`${e.target.bankName.value} ${e.target.branch.value.trim()}`,acNumber:e.target.ac.value.trim(),amount:Number(e.target.amount.value.trim()),name:e.target['ac-name'].value.trim()};
    if(balance?.bank<formData.amount) {toast.error('insufficient balance');return} /*mode={modeData} theme={themeData}*/
    setNext(true)
  }
  const requestBill = e => UserPIN({cb:addBankRequest,data:formData},'ADD BANK')
  
  return !user?.accesses?.includes('bank')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Bank permission at this time</p></FlexH>:<div>
    {!next?<form onSubmit={handleForm}>
       <Select name='bankName'>
        {bankNames.map(b=><option value={b}>{b}</option>)}
      </Select><GapV x='4'/>
      <TextField name='branch' placeholder='Bank Branch'/>
      <div>
        <TextField name='ac' placeholder='bank ac number'/>
        <ErrorText>{errors?.ac}</ErrorText>
      </div><GapV x='4'/>
      <div>
        <TextField type='number' name='amount' placeholder='bank transaction amount'/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='4'/>
      <div>
        <TextField name='ac-name' placeholder='bank ac name'/>
        <ErrorText>{errors?.name}</ErrorText>  
      </div><GapV x='6'/>
      <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH>
    </form>:
    <div>
      <BalanceBeforeAfter before={balance?.bank} after={balance?.bank-formData.amount}/><GapV x='3'/>
      <div>
        <h4>{formData.bankName} {formData.branch}</h4><GapV x='2'/>
        <FlexH x='space-between'><h5>{formData.ac}</h5><h5>{formData.amount}</h5></FlexH><GapV x='4'/>
        <FlexH x='center'><ThemeButton disabled={loading} onClick={requestBill}>NEXT</ThemeButton></FlexH>
      </div>
    </div>}
  </div>
}