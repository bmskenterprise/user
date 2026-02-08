import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import {FlexH,FlexV,GapV,TinyIcon,TextField,ThemeButton,ErrorText} from '../components/styled';
import {useAuth} from './/../contexts/AuthContext';
import {useDeposit} from './/../contexts/DepositContext';
import {useTelecom} from './/../contexts/TelecomContext';
import Dropdown from '../components/Dropdown';
import UserPIN from '../components/UserPIN';
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';

export default ()=>{
    let formData={}
    const {balance} = useDeposit();
    const {user,} = useAuth();
    const {fetchTelecoms,telecoms,fetchTopupTelecoms,topupTelecoms,topup,errors,loading} = useTelecom();
    const [next,setNext] = useState(false)
    const topupOpts = telecoms?.filter(t => topupTelecoms.includes(t.name))  //
    
    useEffect(()=>{
        fetchTelecoms()
        fetchTopupTelecoms()
    },[])
    
    const handleForm = e=>{
        e.preventDefault();
        formData={recipient:e.target.recipient.value.trim(),amount:Number(e.target.amount.value.trim())};
        if(formData.amount>balance?.topup) {toast.error('Insufficient Balance');return}
        setNext(true)
    }
    const requestTopup = () =>{
        formData.operator=formData.operator.name;
        UserPIN({cb:topup,data:formData},'TOPUP')
        setNext(false)
    }
    const getTopupOpt = (opt,icon) => formData.operator={name:opt,icon};
    
    return !user?.accesses?.includes('topup')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Topup permission at this time</p></FlexH>:<div>
        {!next?<form onSubmit={handleForm}>
            <Dropdown items={topupOpts} /*selected={topupOpts[0]}*/ handler={getTopupOpt}/><GapV x='4'/>
            <div>
                 <TextField placeholder='Recipient' name='recipient'/>
                <ErrorText>{errors?.recipient}</ErrorText>
            </div><GapV x='4'/>
            <div>
                <TextField type='number'  placeholder='Amount' name='amount'/>
                <ErrorText>{errors?.amount}</ErrorText>
            </div><GapV x='6'/>
            <FlexH x='center'><ThemeButton type='submit' >NEXT</ThemeButton></FlexH>
        </form>:
        <FlexV x='center'>
            <BalanceBeforeAfter before={balance?.topup} after={balance?.topup-formData.amount}/><GapV x='4'/>
            <FlexH x='space-between'><div><TinyIcon src={formData.operator?.icon}/>{formData.recipient}</div><div>{formData.amount}</div></FlexH>
            <FlexH x='center'><ThemeButton disabled={loading} onClick={requestTopup}>NEXT</ThemeButton></FlexH>
        </FlexV>}
    </div>
}
