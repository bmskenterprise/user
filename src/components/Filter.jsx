import {CiSearch} from 'react-icons/ci'
import {FlexH,IconButton} from './styled'
import {useTheme} from '../contexts/ThemeContext'
  
export default ({searchValue,setParams,filter}) =>{
    const {themeData,modeData:{backSecondary,textSecondary}} = useTheme()  
    return <form onSubmit={filter}>
          <FlexH x='space-between' y='center' style={{border:`1px solid ${backSecondary}`,width:'100%'}}>
            <input type='search' style={{background:'none',border:'none',color:textSecondary,fontSize:'1.2rem',padding:'0.5rem',outline:'none',width:'85%'}} name='search' placeholder='search' value={searchValue} onChange={setParams}/>
                     <button type='submit' style={{background:backSecondary,border:'none',color:themeData.themeBackground,fontSize:'1.8rem',padding:'0.4rem',outline:'none'}}><CiSearch/></button>
                    </FlexH>
    </form>
}