import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom'
import toast from 'react-hot-toast';
import {MdContentCopy} from 'react-icons/md';
import copyToClipboard from '../utils/copyToClipboard';
import {useAPI} from '../contexts/APIContext';
import {useAuth} from '../contexts/AuthContext';
import {Stack,FlexH,GapV,TextField,ErrorText,IconButton,ThemeButton,Loader,Spinner} from '../components/styled';
import url from '../config/url';

export default  () =>{
    const navigate = useNavigate()
    const {mbanks} = useAPI();
    const {levels,regData,register} = useAuth();
    const [loading,setLoading] = useState(false)
    const [step,setStep] = useState('')
    const [errors,setErrors] = useState({})
    let hasVerification=(levels.find(l=>l.level==regData.level).otp)
    
    useEffect(()=>{setStep(hasVerification?'NEXT':'REGISTER')})
    
    const regFee = async (e) =>{
        e.preventDefault()
        let formData={txn:e.target.txn.value.trim(),ref:(e.target.ref.value.trim()||regData.username),level:regData.level}
        setLoading(true)
        try{
            let res = await fetch(url.urlRegisterRegFee,{
                method: 'POST',
                headers:{'Content-Type':'application/json'},
                body:JSON.stringify(formData)
            })
            let data = await res.json()
            if(!res.ok) throw new Error(data.error)
            if(data.statusRegFeePaid && hasVerification) navigate('/register/otp-verification',{state:{statusRegFeePaid:data.statusRegFeePaid}})
            if(data.statusRegFeePaid) register()
        }catch(e) {toast.error(e.message)}
        finally{setLoading(false)}
    }
    
    return <Stack style={{maxWidth:'48rem',margin:'auto'}}><GapV x='3'/>
            <div>
                <div>
                    {mbanks?.map(({name,account},i)=> <div key={i}><h6>{name.toUpperCase}: {account} <IconButton onClick={e=>copyToClipboard(account)}><MdContentCopy/></IconButton></h6><GapV x='5'/></div>)}
                </div><GapV x='10'/>
                <form onSubmit={regFee}>
                    <div>
                        <TextField name='txn' placeholder='Transaction ID'/>
                        <ErrorText>{errors?.txn}</ErrorText>
                    </div><GapV x='4'/>
                    <div>
                        <TextField name='ref' placeholder='Reference'/>
                        <ErrorText>{errors?.ref}</ErrorText>
                    </div><GapV x='6'/>
                    <FlexH x='center'><ThemeButton>{step}</ThemeButton></FlexH>
                </form>
            </div>
            {loading&&<Loader><Spinner/></Loader>}
    </Stack>
}
