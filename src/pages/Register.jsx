import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import {Stack,FlexH,GapV,Image,TextField,Select,ThemeButton,ErrorText,Loader,Spinner} from '../components/styled';
import logo from '../assets/bitmap.svg' ;

export default () =>{
  const navigate = useNavigate()
  const {themeData,modeData:{backPrimary,textPrimary,textSecondary}} = useTheme()
  const {fetchUserLevels,levels,cacheRegData,register,errors,loading} = useAuth()
  const [step,setStep] = useState('REGISTER');
  const [currentLevel,setCurrentLevel] = useState({});
  
  useEffect(()=>{fetchUserLevels()}, [])
  
  useEffect(()=> {
    if(levels&&levels?.length==0) navigate('/login')
    if(levels&&levels?.length>0) onLevelChange(levels[0]?.level)
  },[levels])
  
  const handleForm = e=>{
    e.preventDefault()
    cacheRegData({level:e.target.level.value,username:e.target.username.value.trim(),fullname:e.target.fullname.value.trim(),nid:e.target.nid.value.trim(),password:e.target.password.value.trim(),pin:e.target.pin.value.trim()})
       register({level:e.target.level.value,username:e.target.username.value.trim(),fullname:e.target.fullname.value.trim(),nid:e.target.nid.value.trim(),password:e.target.password.value.trim(),pin:e.target.pin.value.trim()})
    if(currentLevel?.regFee>0) navigate('/register/regfee')
    else if(currentLevel?.otp) navigate('/register/otp-verification')
    else navigate('/login')
  }
  const onLevelChange = selectedLevel =>{
      setCurrentLevel(levels.find(l=> l.level==selectedLevel))
      setStep((currentLevel?.regFee>0||currentLevel?.otp)? 'NEXT': 'REGISTER')
  }
  
  return <Stack style={{background:backPrimary,color:textPrimary,}}><GapV x='3'/>
    <div style={{maxWidth:'48rem',margin:'auto',padding:'0 1.5rem'}}>
      <FlexH x='center'><Image x='4' src={logo}/></FlexH><GapV x='3'/>
      <FlexH x='center'><h3>Register</h3></FlexH><GapV x='8'/>
      <form onSubmit={handleForm}>
        <div>
          <Select name='level' style={{width:'100%',height:'1.5rem'}} onChange={e=>onLevelChange(e.target?.value)}>{levels?.map((l,i)=><option key={i} value={l.level}>{l.level}</option>)}</Select><GapV x='0.5'/>
          <p style={{color:textSecondary}}>Registration Fee &#2547;{(currentLevel?.regFee)||'0'}</p><GapV x='1'/>
        </div>
        <GapV x='3'/>
        <div>
          <TextField name='username' placeholder='Username'/>
          <ErrorText>{errors?.username}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField name='fullname' placeholder='Fullname'/>
          <ErrorText>{errors?.fullname}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='nid' placeholder='NID Number'/>
          <ErrorText>{errors?.nid}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='password' placeholder='Password'/>
          <ErrorText>{errors?.password}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='pin' placeholder='PIN'/>
          <ErrorText>{errors?.pin}</ErrorText>
        </div><GapV x='6'/>
        <FlexH x='center'><ThemeButton /*theme={themeData}*/>{step}</ThemeButton></FlexH>
      </form>
    </div>
    {loading&&<Loader><Spinner/></Loader>}
  </Stack>
}