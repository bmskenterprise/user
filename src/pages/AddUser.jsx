import {useEffect} from 'react';
import {Stack,FlexH,GapV,TextField,Select,ThemeButton,ErrorText,Loader,Spinner} from '../components/styled';
import {useAuth} from '../contexts/AuthContext';
import UserPIN from '../components/UserPIN';

export default () =>{
  const {levels,fetchUserLevels,addUser,errors,loading} = useAuth();
  
  useEffect(()=> {fetchUserLevels()},[])
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    let formData={level:e.target.level.value,username:e.target.username.value.trim(),fullname:e.target.fullname.value.trim(),nid:e.target.nid.value.trim(),password:e.target.password.value.trim(),pin:e.target.pin.value.trim()}
    UserPIN({cb:addUser,data:formData},'ADD')
  }
  
  return <Stack>
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <Select name='level'>
            <option value=''>Select User Level</option>{levels?.map(({name},i)=><option key={i} value={name}>{name}</option>)}
          </Select>
          <ErrorText>{errors?.level}</ErrorText>
        </div><GapV x='2'/>
        <div>
          <TextField placeholder='Username' name='username'/>
          <ErrorText>{errors?.username}</ErrorText>
        </div><GapV x='2'/>
        <div>
          <TextField placeholder='Fullname' name='fullname'/>
          <ErrorText>{errors?.fullname}</ErrorText>
        </div><GapV x='2'/>
        <div>
          <TextField placeholder='NID' name='nid'/>
          <ErrorText>{errors?.nid}</ErrorText>
        </div><GapV x='2'/>
        <div>
          <TextField type='password' placeholder='Password' name='password'/>
          <ErrorText>{errors?.password}</ErrorText>
        </div><GapV x='2'/>
        <div>
          <TextField placeholder='' name='pin'/>
          <ErrorText>{errors?.pin}</ErrorText>
        </div><GapV x='4'/>
        <FlexH x='center'><ThemeButton type='submit'>NEXT</ThemeButton></FlexH>
      </form>
    </div>
    {loading&&<Loader><Spinner/></Loader>}
  </Stack>
}