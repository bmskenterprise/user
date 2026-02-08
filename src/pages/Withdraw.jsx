import {useEffect,useState} from 'react';
import {FlexH,GapV,TextField,ErrorText,ThemeButton} from '../components/styled';
import {useAPI} from '../contexts/APIContext';
import {useDeposit} from '../contexts/DepositContext';
import UserPIN from '../components/UserPIN';
import Dropdown from '../components/Dropdown';

export default () =>{
  const {mbanks} = useAPI();
  const {balance,balanceWithdraw,errors} = useDeposit();
  const [gateway,setGateway] = useState('')
  const [balanceByGateway,setBalanceByGateway] = useState(0)
  useEffect(()=>{
  setGateway(mbanks[0].name)
  setBalanceByGateway(balance?.main[mbanks[0].name])
  }, [])
  const handleSubmit= e=>{
      e.preventDefault()
      UserPIN({cb:balanceWithdraw,data:{gateway,amount:e.target.amount.value.trim(),ref:e.target.ref.value.trim()}},'WITHDRAW')
    }
  
  const getGateway = e => {setBalanceByGateway(balance?.main[e]);setGateway(e)}
  
  return <div>
    <form onSubmit={handleSubmit}>
        <Dropdown items={mbanks.map(m=>({name:m.name,icon:m.icon}))} handler={getGateway}/><GapV x='2'/>
        <div>
          <TextField value={balanceByGateway} onChange={e=>setBalanceByGateway(e.target.value)}/>
          <ErrorText>{errors?.amount}</ErrorText>
        </div><GapV x='3'/>
        <div>
          <TextField placeholder={`${gateway} Recipient`} name='ref'/>
          <ErrorText>{errors?.ref}</ErrorText>
        </div><GapV x='5'/>
        <FlexH x='center'><ThemeButton>NEXT</ThemeButton></FlexH>
    </form></div>  
}