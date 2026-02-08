import {useState} from 'react';
import toast from 'react-hot-toast';
import {useTheme} from '../contexts/ThemeContext';
import {useAPI} from '../contexts/APIContext';
import {useDeposit} from '../contexts/DepositContext';
import {FlexH,GapV,TextField,ThemeButton,ErrorText,TinyIcon} from './styled';
import UserPIN from './UserPIN';
import BalanceBeforeAfter from './BalanceBeforeAfter' ;

export default ({mbankType/*,handler*/}) =>{
  const {themeData,modeData} = useTheme();
  const {balance} = useDeposit();
  const {mbanks,addMbankTransaction,errors,loading} = useAPI();
  const [transactionType,setTransactionType] = useState('')
  const [next,setNext] = useState(false);
  let formData={}
  
  const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  
  const handleForm = (e) =>{
    e.preventDefault();
    formData={mbankType,transactionType,recipient:e.target.recipient.value.trim(),amount:Number(e.target.amount.value.trim())}
    if(formData.amount>balance?.bank){toast.error('Insufficient Balance');return}
    setNext(true)
  }
  
  const requestMbank = (e) =>{
    UserPIN({cb:addMbankTransaction,data:formData},'SEND')
    setNext(false)
  }
  
  const activeColor = t => transactionType==t ? themeData?.themeText : modeData.textPrimary  
                /*<FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>Current Balance</h4><h3>&#2547;{balance?.bank}</h3></FlexV>
                <FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>New Balance</h4><h3>&#2547;{balance?.bank-formData.amount}</h3></FlexV>*/
  return <div>
    {!next?<form onSubmit={handleForm}>
      <FlexH x='space-evenly'>
        <div onClick={e=>setTransactionType('send-money')} style={{color:activeColor('send-money')}}><h5>SEND MONEY</h5></div>
        <div onClick={e=>setTransactionType('cash-in')} style={{color:activeColor('cash-in')}}><h5>CASH IN</h5></div>
      </FlexH><GapV x='8'/>
      {transactionType&&<><div>
        <TextField /*theme={themeData} mode={modeData}*/ name='recipient' placeholder='Recipient'/>
        <ErrorText>{errors?.recipient}</ErrorText>
      </div><GapV x='6'/>
      <div>
        <TextField /*theme={themeData} mode={modeData}*/ name='amount' placeholder='Amount'/>
        <ErrorText>{errors?.amount}</ErrorText>
      </div><GapV x='8'/>
      <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH></>}
    </form>:
    <div >
          <BalanceBeforeAfter before={balance?.bank} after={balance?.bank-formData.amount}/><GapV x='4'/>
            <FlexH x='space-between'><div><TinyIcon src={mbankIcons[mbankType]}/>{formData.recipient}</div><div>&#2547;{formData.amount}</div></FlexH><GapV x='6'/>
            <FlexH x='center'><ThemeButton disabled={loading} onClick={requestMbank}>NEXT</ThemeButton></FlexH>
        </div>}
  </div>
}