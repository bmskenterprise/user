import {useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import {useAPI} from '../contexts/APIContext'
import {FullScreen,Center,FlexH,GapV,Image} from '../components/styled';
import MbankForm from '../components/Mbank'


export default () =>{
    const {user} = useAuth()
    const {fetchMbanks,mbanks} = useAPI()
    const [dbblIcon,setDBBLIcon] = useState('')
    
    useEffect(()=>{fetchMbanks()}, [])
    useEffect(()=>{
    if(mbanks?.length>0) {setDBBLIcon(mbanks.find(item=>item.name=='dbbl').icon)}
    }, [mbanks])
      
    return !user?.accesses?.includes('dbbl')?<FullScreen><Center><p>You dont have DBBL permission at this time</p></Center></FullScreen>:<div>
        <FlexH x='center'><Image x='3' src={dbblIcon}/></FlexH><GapV x='6'/>
        <MbankForm mbankType='dbbl'></MbankForm>
      </div>
}
