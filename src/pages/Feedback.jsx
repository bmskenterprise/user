import {useEffect,useState} from 'react';
import {BsPlusLg} from 'react-icons/bs';
import {useTheme} from '../contexts/ThemeContext';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapH,GapV,TA,IconButton,ThemeButton,ErrorText} from '../components/styled';
import useArrayFetch from '../hooks/useArrayFetch'
import UserPIN from '../components/UserPIN'
import url from '../config/url';

export default ()=>{
  const {thememode,modeData} = useTheme();
  const {user} = useAuth();
  const {addFeedback,errors} = useAPI();
  const [feedbackInit,setFeedbackInit] = useState(false);
  //const [loading,setLoading] = useState(false)
  const [feedbacks,setFeedbacks] = useState([]);
  const {data,loading} = useArrayFetch(url.urlFeedback)
  
  
       
    
    
          
          
         
      
  
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    UserPIN(thememode,{cb:addFeedback,data:{description:e.target.description.value.trim()}},'SEND')
    setFeedbackInit(false)
  }
  
  const listTile = {background:modeData.backSecondary/*,textAlign:'left',marginBottom:'1rem'*/,padding:'0.5rem'};
  return !user?.accesses?.includes('feedback')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Feedback permission at this time</p></FlexH>:<div><GapV x='6'/>
    {feedbackInit?<form onSubmit={handleSubmit}>
      <div>
        <TA name='description' style={{width:'100%',minHeight:'10rem'}}></TA>
        <ErrorText>{errors?.description}</ErrorText>
      </div><GapV x='2'/>
      <FlexH x='flex-end'><button onClick={e=>setFeedbackInit(false)}>CANCEL</button><GapH x='2'/><ThemeButton type='submit'>NEXT</ThemeButton></FlexH>
    </form>:
    <div><GapV x='2'/>
      <FlexH x='flex-end'><IconButton size='2' disabled={loading} onClick={()=>setFeedbackInit(true)}><BsPlusLg/></IconButton></FlexH><GapV x='3'/>
      <div>{data?.map(({_id,description})=><p key={_id} style={listTile}>{description}</p>)}</div>
    </div>}
    <GapV x='6'/>
  </div>
}