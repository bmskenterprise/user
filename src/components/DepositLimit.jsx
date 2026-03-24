//import {useDeposit} from '../contexts/DepositContext'
import {FlexH,GapV,GapH} from '../components/styled';

export default ({depositRange}) =>{
  //const {depositRange} = useDeposit();
  
  return <div style={{background:'rgba(136,231,136,0.3)',borderRadius:'1rem',padding:'1rem',width:'100%'}}>
        <FlexH x='flex-start'><h4>Topup:</h4><GapH x='2'/><h5>Minimum {depositRange?.topup?.min.toString()} to Maximun {depositRange?.topup?.max.toString()}</h5></FlexH><GapV x='2'/>
        <FlexH x='flex-start'><h4>Drive:</h4><GapH x='2'/><h5>Minimum {depositRange?.drive?.min.toString()} to Maximum {depositRange?.drive?.max.toString()}</h5></FlexH><GapV x='2'/>
        <FlexH x='flex-start'><h4>Bank:</h4><GapH x='2'/><h5>Minimum {depositRange?.bank?.min.toString()} to Maximum {depositRange?.bank?.max.toString()}</h5></FlexH>
      </div>
}