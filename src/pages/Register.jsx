import {useEffect,useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import {Stack,FlexH,GapV,TextField,Select,ThemeButton,ErrorText,Loader,Spinner} from '../components/styled';

export default () =>{
  const navigate = useNavigate()
  const [step,setStep] = useState('REGISTER');
  const [currentLevel,setCurrentLevel] = useState({});
  const {themeData,} = useTheme()
  const {levels,cacheRegData,errors,loading} = useAuth()
  
  useEffect(()=> {
    if(levels?.length==0) navigate('/login')
    onLevelChange(levels[0]?.level)
  })
  
  const handleForm = e=>{
    e.preventDefault()
    cacheRegData({level:e.target.level.value,username:e.target.username.value.trim(),fullname:e.target.fullname.value.trim(),nid:e.target.nid.value.trim(),password:e.target.password.value.trim(),pin:e.target.pin.value.trim()})
    if(currentLevel?.regFee>0) navigate('/regfee-txn')
    if(currentLevel?.otp) navigate('/otp-verification')
  }
  const onLevelChange = l =>{
      setCurrentLevel(levels.find(l=> l.level==l))
      setStep((currentLevel?.regFee>0||currentLevel?.otp)? 'NEXT': 'REGISTER')
       
  }
  
  return <Stack style={{maxWidth:'48rem',margin:'auto'}}><GapV x='3'/>
    <div>
      <FlexH x='center'><h3>Register</h3></FlexH><GapV x='10'/>
      <form onSubmit={handleForm}>
        <div>
          <Select name='level' onChange={onLevelChange}>{levels.map(l=><option value={l.name}>{l.name}</option>)}</Select>
          <p style={{color:themeData.themeBackground}}>Registration Fee &#2547;{currentLevel.regFee}</p><GapV x='1'/>
    
        </div>
        <p></p>
        <GapV x='4'/>
        <div>
          <TextField name='username' placeholder='username'/>
          <ErrorText>{errors?.username}</ErrorText>
        </div><GapV x='4'/>
        <div>
          <TextField name='fullname' placeholder='fullname'/>
          <ErrorText>{errors?.fullname}</ErrorText>
        </div><GapV x='4'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='nid' placeholder='NID Number'/>
          <ErrorText>{errors?.nid}</ErrorText>
        </div><GapV x='4'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='password' placeholder='password'/>
          <ErrorText>{errors?.password}</ErrorText>
        </div><GapV x='4'/>
        <div>
          <TextField /*theme={themeData} mode={modeData}*/ name='pin' placeholder='pin'/>
          <ErrorText>{errors?.pin}</ErrorText>
        </div><GapV x='6'/>
        <FlexH x='space-between'><ThemeButton /*theme={themeData}*/>{step}</ThemeButton></FlexH>
      </form>
    </div>
    {loading&&<Loader><Spinner/></Loader>}
  </Stack>
}