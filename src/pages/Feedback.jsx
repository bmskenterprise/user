import {useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV,ThemeButton,ErrorText} from '../components/styled';
import UserPIN from '../components/UserPIN'   //

export default ()=>{
  const [feedbackInit,setFeedbackInit] = useState(false);
  const {user} = useAuth();
  const {fetchFeedbacks,addFeedback,feedbacks,errors,loading} = useAPI();
  useEffect(()=>{fetchFeedbacks()},[])
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    setFeedbackInit(false)
    UserPIN({cb:addFeedback,data:{description:e.target.description.value}},'SEND')
  }
  
  return !user?.accesses?.includes('feedback')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Feedback permission at this time</p></FlexH>:<div>
    {feedbackInit?<form onSubmit={handleSubmit}>
      <div>
        <textarea name="description" style={{width:'100%',minHeight:'10rem'}}></textarea>
        <ErrorText>{errors?.feedback}</ErrorText>
      </div><GapV x='2'/>
      <FlexH x='center'><ThemeButton /*theme={themeData}*/>NEXT</ThemeButton></FlexH>
    </form>:
    <div>
      <FlexH x='flex-end'><ThemeButton disabled={loading} onClick={()=>setFeedbackInit(true)}>Feedback</ThemeButton></FlexH><GapV x='2'/>
      <div>{feedbacks?.map(({_id,description})=><p key={_id} style={{marginBottom:'1rem'}}>{description}</p>)}</div>
    </div>}
  </div>
}