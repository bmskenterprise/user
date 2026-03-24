import {useEffect,useState} from 'react';
import {useTheme} from '../contexts/ThemeContext';
import {useDeposit} from '../contexts/DepositContext';
import {FlexH,GapV} from '../components/styled';

export default ()=>{
  const {modeData:{backPrimary}} = useTheme();
  const {fetchBalance,balance} = useDeposit();
  const [visible,setVisible] = useState(false);
  const [mainBalance,setMainBalance] = useState(0);
      
  useEffect(()=>{fetchBalance()},[])
  useEffect(()=>{getMainBalance()}, [balance])
  
  const toggleBalanceVisibility = e=>{
    setVisible(prev=>!prev)
    setTimeout(()=>setVisible(false),3000)
  }
  const getMainBalance = ()=>{
    /*for(let t in balance?.main){}*/
    setMainBalance(Object.values(balance?.main|| {}).reduce((sum,val)=>sum+val,0))
  }
  return <div style={{background:backPrimary,cursor:'pointer',width:'50%'}} onClick={toggleBalanceVisibility}>
    {visible&&<><FlexH x='space-between'><h5>&#2547;{mainBalance}</h5><h4>Main</h4></FlexH><GapV x='1'/>
    <FlexH x='space-between'><h5>&#2547;{balance?.topup}</h5><h4>Topup</h4></FlexH><GapV x='1'/>
    <FlexH x='space-between'><h5>&#2547;{balance?.drive}</h5><h4>Drive</h4></FlexH><GapV x='1'/>
    <FlexH x='space-between'><h5>&#2547;{balance?.mbank}</h5><h4>Mbank</h4></FlexH></>}
  </div>
}