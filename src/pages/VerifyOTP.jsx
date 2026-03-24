import {useEffect,useState} from 'react';
import {useLocation,useNavigate} from 'react-router-dom'
import OtpInput from 'react-otp-input';
import toast from 'react-hot-toast';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {Stack,FlexH,GapV,ThemeButton,Loader,Spinner} from '../components/styled';
import url from '../config/url';


export default ()=>{
    const navigate = useNavigate();
    const {modedata:{backPrimary,textPrimary}} = useTheme();
    const {levels,regData} = useAuth();
    const [loading,setLoading] = useState(false)
    const [otp,setOtp] = useState()
    //const {statusRegFeePaid,} = useLocation().state;
    
    useEffect(()=> {
        if(!regData?.username) navigate('/register')
        //if(levels?.find(l=>l.level==regData?.level).regFee>0&&!statusRegFeePaid) navigate('/register/regfee')
        if(regData?.username) requestOTP()
    },[])
    
    const requestOTP = async () =>{
        setLoading(true)
        try{
            let res = await fetch(url.urlRegisterOTP,{
                method:'PATCH',
                headers:{'Contenr-Type':'application/json'},
                body:JSON.stringify({username:regData?.username})
            })
            if(!res.ok) throw new Error("something went wrong")
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
    
    const verifyOTP = async (e)=>{e.preventDefault()
        setLoading(true)
        try{
            let res = await fetch(url.urlRegisterOTP,{
                method:'POST',
                headers:{'Contenr-Type':'application/json'},
                body:JSON.stringify({username:regData?.username,otp})
            })
            if(!res.ok) throw new Error("something went wrong")
            navigate('/login')
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
    return <Stack style={{background:backPrimary,color:textPrimary}}>
        <div style={{maxWidth:'48rem',margin:'auto',padding:' 1rem'}}><GapV x='3'/>
            <div>
                <h5 style={{textAlign:'center'}}>verification code sent to your mobile number</h5><h4 style={{textAlign:'center'}}>{regData?.username}</h4><GapV x='6'/>
                <form onSubmit={verifyOTP}>
                    <div >
                        <OtpInput value={otp} onChange={setOtp} numInputs={6} renderInput={props=><input {...props}/>} containerStyle={{display:'flex',justifyContent:'center'}} inputStyle={{padding:'0.5rem'}}/><GapV x='4'/>
                        <FlexH x='center'><ThemeButton type='submit'>VERIFY</ThemeButton></FlexH>
                    </div>
                </form>
            </div>
        </div>
        {loading&&<Loader><Spinner/></Loader>}
    </Stack>
}
