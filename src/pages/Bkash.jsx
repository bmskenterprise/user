import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV,Icon} from '../components/styled';
import MbankForm from "../components/Mbank"

export default () =>{
  const {user} = useAuth()
  const {mbanks} = useAPI()
  const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  
  return !user?.accesses?.includes('bkash')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Bkash permission at this time</p></FlexH>:<div>
    <FlexH x='space-between'><Icon x='5' src={mbankIcons['bkash']}/></FlexH><GapV x='10'/>
    <MbankForm mbankType='bkash'></MbankForm>
  </div>
}