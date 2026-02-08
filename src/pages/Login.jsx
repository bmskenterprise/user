import {useEffect,useState} from 'react';
import {Link,Navigate} from 'react-router-dom';
import {FaEye,FaEyeSlash} from 'react-icons/fa';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {FullScreen,Stack,CenterCard,FlexH,GapV,TextField,ThemeButton,ErrorText,Loader,Spinner} from '../components/styled';

export default () =>{
  const {themeData,modeData:{textPrimary}} = useTheme()
  const [show,setShow] = useState(false)
  const {fetchUserLevels,levels,user,login,errors,loading} = useAuth()
  
  if(user) return <Navigate to='/index'/>
  
  useEffect(()=> {fetchUserLevels()},[])
  
  const handleSubmit = e=>{
    e.preventDefault()
    login({username:e.target.username.value,password:e.target.password.value})
  }
  return <FullScreen /*style={{position:'relative'}}*/>
    <Stack style={{width:'100%',height:'100%'}}>
      <div>
        <h1>Login</h1><GapV x='8'/>
        <CenterCard>
          <form onSubmit={handleSubmit}>
            <div>
              <TextField  placeholder='Username' name='username'/>
              <ErrorText>{errors?.username}</ErrorText>
            </div><GapV x='4'/>
            <div>
              <div style={{position:'relative',width:'100%'}}><TextField type={show?'text':'password'} placeholder='Password' name='password'/><span style={{color:textPrimary,position:'absolute',top:'10%',right:'0%',zIndex:10}} onClick={e=>setShow(prev=>!prev)}>{show?<FaEyeSlash/>:<FaEye/>}</span></div>
              <ErrorText>{errors?.password}</ErrorText>
            </div><GapV x='6'/>
            <FlexH x='center'><ThemeButton type='submit'>LOGIN</ThemeButton></FlexH>
          </form><GapV x='6'/>
          <FlexH x='flex-end'>{levels?.length>0&&<span>Dont have account? <Link to='/register'>Register</Link></span>}</FlexH>
        </CenterCard>
      </div>
      {loading&&<Loader><Spinner/></Loader>}
    </Stack>
  </FullScreen>
}