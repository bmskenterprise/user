import {useEffect,useState} from 'react';
import {useParams} from 'react-router-dom'             //<FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>Current Balance</h4><h3>&#2547;{balance?.bank}</h3></FlexV>
import toast from 'react-hot-toast';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {useDeposit} from '../contexts/DepositContext';
import {FlexH,GapV,TextField,ThemeButton,ErrorText,Image,TinyIcon} from './styled';
import UserPIN from './UserPIN';
import BalanceBeforeAfter from './BalanceBeforeAfter'

export default (/*{mbankType,handler}*/) =>{
    const {mbankType} = useParams()
    const {user} = useAuth()
    const {thememode,themeData:{themeBackground,themeText},modeData} = useTheme();
    const {fetchBalance,balance} = useDeposit();
    const {fetchMbanks,mbanks,addMbankTransaction,errors,loading} = useAPI();
    const [transactionType,setTransactionType] = useState('')
    const [next,setNext] = useState(false);
    let [formData,setFormData] = useState({})
    const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  
    useEffect(()=>{fetchBalance();fetchMbanks()}, [])
    
  
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
    
    const handleForm = (e) =>{
      e.preventDefault();
      setFormData({mbankType,transactionType,recipient:e.target.recipient.value.trim(),amount:Number(e.target.amount.value.trim())})
      if(Number(e.target.amount.value.trim())>balance?.mbank){toast.error('Insufficient Balance');return}
      setNext(true)
    }
    const requestMbank = (e) =>{
      UserPIN(thememode,{cb:addMbankTransaction,data:formData},'SEND')
      setNext(false)
    }
  
    const getStyle = t => ({background:transactionType==t?themeBackground:modeData.backSecondary,borderRadius:'0.5rem',color:transactionType==t?themeText:modeData.textPrimary,cursor:'pointer',padding:'0.5rem'})
                /*<FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>New Balance</h4><h3>&#2547;{balance?.bank-formData.amount}</h3></FlexV>*/
    return !user?.accesses?.includes(mbankType)?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have {mbankType} permission at this time</p></FlexH>:<div><GapV x='6'/>
      <FlexH x='center'><Image x='3' src={mbankIcons[mbankType]}/></FlexH><GapV x='6'/>
      {!next?<form onSubmit={handleForm}>
        <FlexH x='space-evenly'>
          <h5 onClick={e=>setTransactionType('send-money')} style={getStyle('send-money')}>SEND MONEY</h5>
          <h5 onClick={e=>setTransactionType('cash-in')} style={getStyle('cash-in')}>CASH IN</h5>
        </FlexH><GapV x='5'/>
        {transactionType&&<><div>
          <TextField /*theme={themeData} mode={modeData}*/ name='recipient' placeholder='Recipient'/>
          <ErrorText>{errors?.recipient}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='amount' placeholder='Amount'/>
          <ErrorText>{errors?.amount}</ErrorText>
        </div><GapV x='6'/>
        <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH></>}
      </form>:
      <div>
          <BalanceBeforeAfter before={balance?.mbank} after={balance?.mbank-Number(formData.amount)}/><GapV x='4'/>
            <FlexH x='space-between'><div><TinyIcon src={mbankIcons[mbankType]}/>{formData.recipient}</div><div>&#2547;{formData.amount}</div></FlexH><GapV x='6'/>
            <FlexH x='center'><ThemeButton disabled={loading} onClick={requestMbank}>NEXT</ThemeButton></FlexH>
        
      </div>}<GapV x='6'/>
  </div>
}