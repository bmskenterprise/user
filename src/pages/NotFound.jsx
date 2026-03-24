import {useTheme} from '../contexts/ThemeContext';
import {FullScreen,Center} from '../components/styled'

export default () =>{
  const {modeData} = useTheme()
  
  return <FullScreen>
    <Center><h2 style={{color:modeData.textPrimary}}>404 Not Found</h2></Center>
  </FullScreen>
}