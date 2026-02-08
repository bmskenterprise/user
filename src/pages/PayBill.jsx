import {useState} from 'react';
import {FaCreditCard,FaTint,FaTv} from 'react-icons/fa'
import {MdElectricBolt} from 'react-icons/md'
import {CiGlobe} from 'react-icons/ci'
import toast from 'react-hot-toast'    /*mode={modeData} theme={themeData}*/
import {FlexH,GapV,TextField,Select,DatePicker,ThemeButton,ErrorText} from '../components/styled';
import UserPIN from '../components/UserPIN';
import {useAuth} from '../contexts/AuthContext'
import {useDeposit} from '../contexts/DepositContext'
import {useAPI} from '../contexts/APIContext'
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';

export default () =>{
  const {user,} = useAuth();
  const {balance} = useDeposit();
  const {addBillRequest,errors,loading} = useAPI();
  const [next,setNext] = useState(false);
  let formData={}
  const handleForm = (e) =>{
    e.preventDefault();
    formData = {billType:e.target.type.value,acNumber:e.target.ac.value.trim(),amount:Number(e.target.amount.value.trim()),expire:e.target.expire.value,acName:e.target['ac-name'].value.trim()};
    if(balance?.bank<formData.amount) {toast.error('insufficiennt balance');return}
    setNext(true)
  }
  const requestBill = e =>{
    UserPIN({cb:addBillRequest,data:formData},'ADD BILL');
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
  return !user?.accesses?.includes('bill')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Bill permission at this time</p></FlexH>:<div>
    {!next?<form onSubmit={handleForm}>
      <Select name='type'>
        {Object.keys(bills).map(b=><option style={{textTransform:'capitalize'}} value={b}>{b}</option>)}
      </Select>
      <GapV x='4'/>
      <div>
        <TextField name='ac' placeholder='AC Number'/>
        <ErrorText>{errors?.ac}</ErrorText>
      </div><GapV x='4'/>
      <FlexH x='space-between'>
        <div style={{width:'50%'}}>
          <TextField type='number' name='amount' placeholder='Amount'/>
          <ErrorText>{errors?.amount}</ErrorText>
        </div>
        <div style={{width:'50%'}}>
          <DatePicker type="date" name='expire'/> 
          <ErrorText>{errors?.expire}</ErrorText>
        </div>
      </FlexH><GapV x='4'/>
      <div>
        <TextField name='ac-name' placeholder='AC Name'/>
        <ErrorText>{errors?.name}</ErrorText>
      </div><GapV x='6'/>
      <FlexH x='center'><ThemeButton  type='submit'>NEXT</ThemeButton></FlexH>
    </form>:
    <div>
        <BalanceBeforeAfter before={balance?.bank} after={balance?.bank-formData.amount}/><GapV x='2'/>
        <FlexH x='space-between'><h4>{bills[formData.billType]}&nbsp;{formData.ac}</h4><h4>&#2547;{formData.amount}</h4></FlexH><GapV x='4'/>
        <FlexH x='center'><ThemeButton onClick={requestBill} disabled={loading}>NEXT</ThemeButton></FlexH>
    </div>}
  </div>
}