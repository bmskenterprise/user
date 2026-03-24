import {useEffect,useState} from 'react';
import {useAuth} from '../contexts/AuthContext'
import {useAPI} from '../contexts/APIContext'
import {FullScreen,Center,FlexH,GapV,Image} from '../components/styled';
import MbankForm from '../components/Mbank'


export default () =>{
    const {user} = useAuth()
    const {fetchMbanks,mbanks} = useAPI()
    const [nagadIcon,setNagadIcon] = useState('')
    
    useEffect(()=>{fetchMbanks()}, [])
    useEffect(()=>{
    if(mbanks?.length>0) {setNagadIcon(mbanks.find(item=>item.name=='nagad').icon)}
    }, [mbanks])
      
    return !user?.accesses?.includes('nagad')?<FullScreen><Center><p>You dont have Nagad permission at this time</p></Center></FullScreen>:<div>
        <FlexH x='center'><Image x='3' src={nagadIcon}/></FlexH><GapV x='6'/>
        <MbankForm mbankType='nagad'></MbankForm>
      </div>
}
