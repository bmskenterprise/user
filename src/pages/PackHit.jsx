import {useLocation} from 'react-router-dom';
import {FlexH,GapV,TextField,ThemeButton} from '../components/styled';
import {useTheme} from '../contexts/ThemeContext';
import {useTelecom} from '../contexts/TelecomContext';
import UserPIN from '../components/UserPIN';

export default () =>{
  const location = useLocation()
  const {title,price} = location.state;
  const {themeData,modeData} = useTheme()
  const {topup,} = useTelecom()
  
  const handleSubmit = (e) =>{
    e.preventDefault()
    UserPIN({cb:topup,data:{title,price}},'SEND')
  }
  
  return <div>
    <div>
      <h4>{title}</h4>
      <h4>{price}</h4>
    </div><GapV x='8'/>
    <div>
      <form onSubmit={handleSubmit}>
        <TextField /*theme={themeData} mode={modeData}*/ placeholder='Recipient'/><GapV x='4'/>
        <FlexH x='center'><ThemeButton /*theme={themeData}*/>NEXT</ThemeButton></FlexH>
      </form>
    </div>
  </div>
}