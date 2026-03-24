import {useEffect,useState} from 'react';
import {FaCreditCard,FaTint,FaTv} from 'react-icons/fa'
import {MdElectricBolt} from 'react-icons/md'
import {CiGlobe} from 'react-icons/ci'
import toast from 'react-hot-toast'
import {FlexH,GapV,Icon,TextField,Select,DatePicker,ThemeButton,ErrorText} from '../components/styled';
import {useTheme} from '../contexts/ThemeContext' /*mode={modeData} theme={themeData}*/
import {useAuth} from '../contexts/AuthContext'
import {useDeposit} from '../contexts/DepositContext'
import {useAPI} from '../contexts/APIContext'
import UserPIN from '../components/UserPIN';
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';

export default () =>{
    const {user,} = useAuth();
    const {fetchBalance,balance} = useDeposit();
    const {thememode} = useTheme() 
    const {addBillRequest,errors,loading} = useAPI();
    const [next,setNext] = useState(false);
    let [formData,setFormData] = useState({})
    
    useEffect(()=>{fetchBalance()}, [])
    
    
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
    
    
    const getMainBalance = () => Object.values(balance?.main|| {}).reduce((sum,val)=>sum+val,0)
    
    const handleForm = (e) =>{
      e.preventDefault();
      setFormData({billType:e.target.type.value,acNumber:e.target.ac.value.trim(),amount:Number(e.target.amount.value.trim()),expire:e.target.expire.value,acName:e.target['ac-name'].value.trim()});
      if(getMainBalance()<parseInt(e.target.amount.value.trim())) {toast.error('insufficient balance');return}
      setNext(true)
    }
  
    const requestBill = e =>{
      UserPIN(thememode,{cb:addBillRequest,data:formData},'ADD BILL');
      setNext(false)
    }
    const bills ={
        electricity: <MdElectricBolt/>,
        water: <FaTint/>,
        internet: <CiGlobe/>,
        gas: <CiGlobe/>,
        tv: <FaTv/>,
        card: <FaCreditCard/>,
        phone: <FaCreditCard/>
    }
    return !user?.accesses?.includes('bill')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Bill permission at this time</p></FlexH>:<div><GapV x='10'/>
    {!next?<form onSubmit={handleForm}>
      <div style={{height:'2rem'}}>
        <Select name='type' style={{width:'100%',}}>
        {Object.keys(bills).map((b,i)=><option key={i} style={{textTransform:'capitalize'}} value={b}>{b}</option>)}
      </Select>
      </div><GapV x='3'/>
      <div>
        <TextField name='ac' placeholder='AC Number'/>
        <ErrorText>{errors?.acNumber}</ErrorText>
      </div><GapV x='3'/>
      <FlexH x='space-between'>
        <div style={{width:'70%'}}>
          <TextField  name='amount' placeholder='Amount'/>
          <ErrorText>{errors?.amount}</ErrorText>
        </div>
        <div style={{width:'25%',marginLeft:'auto'}}>
          <DatePicker type='date' name='expire' style={{width:'100%'}}/>
          <ErrorText>{errors?.expire}</ErrorText>
        </div>
      </FlexH><GapV x='3'/>
      <div>
        <TextField name='ac-name' placeholder='AC Name'/>
        <ErrorText>{errors?.name}</ErrorText>
      </div><GapV x='6'/>
      <FlexH x='center'><ThemeButton  type='submit'>NEXT</ThemeButton></FlexH>
    </form>:
    <div>
        <BalanceBeforeAfter before={getMainBalance()} after={getMainBalance()-formData.amount}/><GapV x='2'/>
        <FlexH x='space-between'><Icon x='2'>{bills[formData.billType]}</Icon>&nbsp;<h4>{formData.acNumber}</h4><h4>&#2547;{formData.amount}</h4></FlexH><GapV x='6'/>
        <FlexH x='center'><ThemeButton onClick={requestBill} disabled={loading}>NEXT</ThemeButton></FlexH>
    </div>}
    <GapV x='6'/>
  </div>
}