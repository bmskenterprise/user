import {useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useDeposit} from '../contexts/DepositContext';
import {useTheme} from '../contexts/ThemeContext';
import {FlexH,GapV,GapH,TextField,ErrorText,ThemeButton,TinyIcon} from '../components/styled';
import DepositLimit from '../components/DepositLimit';

export default () =>{
  const {user} = useAuth();
  const {fetchPGW,fetchDepositRange,depositByPayment,pgws,errors,loading} = useDeposit();
  const {themeData,modeData} = useTheme();
  const [formData,setFormData] = useState({});
  const [next,setNext] = useState(false);
    const [error,setError] = useState({});
  //let formData
  useEffect(()=>{
    fetchDepositRange()
    fetchPGW()
  },[])
  
  const handleForm = (e) =>{
    e.preventDefault();
    let amountValue = e.target.amount.value.trim()
    if(!amountValue) {setError({amount:'Amount is required'});return}
    if(Number.isNaN(amountValue)) {setError({amount:'Amount should be a positive number '});return}
    setFormData({amount:Number(amountValue)})
    setNext(true);
  }
  const getPGWPage = name =>{
      if(loading) return 
      depositByPayment(name,formData)
  }
  const pgwTile = {background:modeData.backSecondary,cursor:loading?'not-allowed':'pointer',padding:'0.5rem 0.25rem'}  
  return !user?.accesses?.includes('payment')?<FlexH x='center' y='center' style={{width:'100%',height:'100%'}}><p>Dont have Payment permission at this time</p></FlexH>:<div><GapV x='8'/>
    {/*<div style={{background:'lightgreen',borderRadius:'1rem',padding:'1rem'}}>
        <div>Minimum ${depositRange['bank']['min'].toString()} to Maximum ${depositRange['bank']['max'].toString()}</div>
    </div>*/}{!next?<>{/*<DepositLimit/>*/} 
    <form onSubmit={handleForm}>
        {/*<FlexH x='space-evenly'>
          <div onClick={e=>setBalanceType('topup')} style={{color:activeColor('topup')}}><h5>Topup</h5></div>
          <div onClick={e=>setBalanceType('drive')} style={{color:activeColor('drive')}}><h5>Drive</h5></div>
          <div onClick={e=>setBalanceType('bank')} style={{color:activeColor('bank')}}><h5>Bank</h5></div>
        </FlexH><GapV x='4'/>*/}
        <><div>
            <TextField placeholder='Transaction Amount' name='amount'/>
            <ErrorText>{error?.amount}</ErrorText>
        </div><GapV x='6'/>
        <FlexH x='center'><ThemeButton /*theme={themeData}*/ type='submit'>NEXT</ThemeButton></FlexH></>
      </form></>:
      <div>
        {pgws?.map(({name,icon},i)=> <div key={i}><FlexH x='flex-start' style={pgwTile} onClick={e=>getPGWPage(name)}><TinyIcon src={icon}/><GapH x='2'/><h3 style={{textTransform:'uppercase'}}>{name}</h3></FlexH><GapV x='2'/></div>)}
      </div>}
      <GapV x='8'/>
  </div>
}