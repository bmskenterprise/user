import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import {useAuth} from '../contexts/AuthContext';
import {Stack,FlexH,GapV,ThemeButton,Loader,Spinner} from "../components/styled";
import url from '../config/url';


export default ()=>{
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false)
    const [otp,setOtp] = useState()
    const {levels,regData} = useAuth();
    const {statusRegFeePaid,} = useLocation().state;
    
    useEffect(()=> {
        if(!regData?.username) navigate('/register')
        if(levels?.find(l=>l.level==regData?.level).regFee>0&&!statusRegFeePaid) navigate('/register/regfee')
        requestOTP()
    },[])
    
    const requestOTP = async () =>{
        setLoading(true)
        try{
            let res = await fetch(url.urlRegisterOTP,{
                method:'POST',
                headers:{'Contenr-Type':'application/json'},
                body:JSON.stringify({username:regData?.username})
            })
            if(!res.ok) throw new Error("something went wrong")
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
    
    const verifyOTP = async ()=>{
        setLoading(true)
        try{
            let res = await fetch(url.urlOTP,{
                method:'POST',
                headers:{'Contenr-Type':'application/json'},
                body:JSON.stringify({otp})
            })
            if(!res.ok) throw new Error("something went wrong")
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
    return <Stack style={{maxWidth:'48rem',margin:'auto'}}><GapV x='3'/>
        <div>
            <FlexH y='center'><h5>verification code sent to your mobile number</h5><h4>{regData?.username}</h4></FlexH><GapV x='6'/>
            <form onSubmit={verifyOTP}>
                <FlexH y='center'>
                    <OtpInput value={otp} onChange={setOtp} numInputs={6}/><GapV x='4'/>
                    <ThemeButton type='submit'>VERIFY</ThemeButton>
                </FlexH>
            </form>
        </div>
        {loading&&<Loader><Spinner/></Loader>}
    </Stack>
}
