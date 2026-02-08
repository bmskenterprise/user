import {useEffect,useState} from 'react';
import {useDeposit} from '../contexts/DepositContext';
import {FlexH} from '../components/styled';

export default ()=>{
  const {fetchBalance,balance} = useDeposit();
  const [visible,setVisible] = useState(false);
  
  useEffect(()=>{fetchBalance()},[])
  
  const balanceVisibility = e=>{
    setVisible(prev=>!prev)
    setTimeout(()=>setVisible(false),3000)
  }
  const getMainBalance = ()=>{
    let b=0;
    for(let t in balance?.main){
      b+=t;
    }
    return b
  }
  return <div style={{width:'50%'}} onClick={balanceVisibility}>
    {visible&&<><FlexH x='space-between'><h4>Main</h4><h5>&#2547;{getMainBalance()}</h5></FlexH>
    <FlexH x='space-between'><h4>Topup</h4><h5>&#2547;{balance?.topup}</h5></FlexH>
    <FlexH x='space-between'><h4>Drive</h4><h5>&#2547;{balance?.drive}</h5></FlexH>
    <FlexH x='space-between'><h4>MBank</h4><h5>&#2547;{balance?.mbank}</h5></FlexH></>}
  </div>
}