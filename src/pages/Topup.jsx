import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import {FlexH,FlexV,GapH,GapV,TinyIcon,TextField,ThemeButton,ErrorText} from '../components/styled';
import {useAuth} from './/../contexts/AuthContext';
import {useDeposit} from './/../contexts/DepositContext';
import {useTelecom} from './/../contexts/TelecomContext';
import {useTheme} from './/../contexts/ThemeContext';
import Dropdown from '../components/Dropdown';
import UserPIN from '../components/UserPIN';
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';

export default ()=>{
    const {fetchBalance,balance} = useDeposit();
    const {user,} = useAuth();
    const {thememode,} = useTheme();
    const {fetchTelecoms,telecoms,fetchTopupTelecoms,topupTelecoms,topup,errors,loading} = useTelecom();
    const [formData,setFormData] =useState({})
    const [next,setNext] = useState(false)
    const [drop,setDrop] = useState(false)
    const [topupOpts,setTopupOpts] = useState([])
    
    useEffect(()=>{
        fetchTelecoms()
        fetchTopupTelecoms()
        fetchBalance()
    }, [])
    useEffect(()=>{
        if(topupTelecoms?.length>0&&telecoms?.length>0) setTopupOpts(telecoms.filter(t => topupTelecoms.includes(t.name)))
    },[topupTelecoms,telecoms])
    
    useEffect(()=>{
        if(topupOpts?.length>0) setFormData({operator:topupOpts[0]}) 
    }, [topupOpts])
    
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
    
    const handleForm = e=>{
        e.preventDefault();
        setFormData(prev=>({...prev,recipient:e.target.recipient.value.trim(),amount:Number(e.target.amount.value.trim())}));
        if(Number(e.target.amount.value.trim())>balance?.topup) {toast.error('Insufficient Balance');return}
        setNext(true)
    }
    const requestTopup = () =>{
        //setFormData(prev=>({...prev,operator:prev.operator?.name}));
        UserPIN(thememode,{cb:topup,data:formData},'TOPUP')
        setNext(false)
    }
    const getTopupOpt = (opt,icon) => setFormData(prev=>({...prev,operator:{name:opt,icon}}));
    const toggler = (bool) => setDrop(bool)
    
    return !user?.accesses?.includes('topup')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Topup permission at this time</p></FlexH>:<div onClick={e=>setDrop(false)}><GapV x='6'/>
        {!next?<form onSubmit={handleForm}>
            <Dropdown items={topupOpts} toggleState={{toggler,drop}} handler={getTopupOpt}/><GapV x='3'/>
            <div>
                 <TextField placeholder='Recipient' name='recipient'/>
                <ErrorText>{errors?.recipient}</ErrorText>
            </div><GapV x='3'/>
            <div>
                <TextField   placeholder='Amount' name='amount'/>
                <ErrorText>{errors?.amount}</ErrorText>
            </div><GapV x='5'/>
            <FlexH x='center'><ThemeButton type='submit' >NEXT</ThemeButton></FlexH>
        </form>:
        <FlexV x='center'>
            <BalanceBeforeAfter before={balance?.topup} after={Number(balance?.topup)-formData.amount}/><GapV x='4'/>
            <FlexH x='space-between' style={{width:'100%'}}><FlexH x='flex-start' y='center'><TinyIcon src={formData.operator?.icon}/><GapH x='0.5'/><h4>{formData.recipient}</h4></FlexH><h4>&#2547;{formData.amount}</h4></FlexH><GapV x='6'/>
            <FlexH x='center'><ThemeButton disabled={loading} onClick={requestTopup}>NEXT</ThemeButton></FlexH>
        </FlexV>}
        <GapV x='6'/>
    </div>
}
