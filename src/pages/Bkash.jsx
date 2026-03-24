import {useEffect, useState} from 'react';
import {useAuth} from '../contexts/AuthContext';
import {useAPI} from '../contexts/APIContext';
import {FlexH,GapV,Image} from '../components/styled';
import MbankForm from "../components/Mbank"

export default () =>{
  const {user} = useAuth()
  const {fetchMbanks,mbanks} = useAPI()
  const [bkashIcon,setBkashIcon] = useState('') //? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  useEffect(()=>{fetchMbanks()}, [])
  useEffect(()=>{
  if(mbanks?.length>0) {setBkashIcon(mbanks.find(item=>item.name=='bkash').icon)}
  }, [mbanks])
  
  return !user?.accesses?.includes('bkash')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Dont have Bkash permission at this time</p></FlexH>:<div>
    <FlexH x='center'><Image x='3' src={bkashIcon}/></FlexH><GapV x='6'/>
    <MbankForm mbankType='bkash'></MbankForm>
  </div>
}