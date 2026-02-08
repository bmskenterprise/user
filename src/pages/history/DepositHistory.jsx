import React,{useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useHistory} from '../../contexts/HistoryContext';
import {useDeposit} from '../../contexts/DepositContext';
import {FlexH,GapV,Field,Select,PaginationBar,TinyIcon,IconButton} from '../../components/styled';
import Pages from '../../components/Pagination';


export default () =>{
  const {socket} = useNotification() //|| ''
  const {themData,modeData,statusTheme} = useTheme();
  const {fetchDepositHistory,history} = useHistory();
  const {mbanks} = useDeposit();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const {user} = useAuth() //|| 'pending'
  const search = searchParams.get('search') || 'pending'
  const page = searchParams.get('page') || '1'
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  useEffect(()=>{socket.emit('seen-failed-deposit',user?.username)
    setFilterData({/*status,*/search,page})
    fetchDepositHistory(/*status,*/search,page)
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/deposit/history?search=${e.target.search.value.trim()}&page=1`)
  }
  
  const pageNav = p=> navigate(`/deposit/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  
  return <div>
    <div>
      <form onSubmit={filter}>
        <FlexH x='space-between'>
          <Field /*theme={themData}*/ x='8' type='search' value={filterData.search} placeholder="search" name='search' onChange={filterParams}/>
          {/*<Field theme={themData} mode={modeData} x='8' value={filterData.gateway} name='gateway' placeholder="gateway" list='gateway' onChange={filterParams}/>
          <datalist id='gateway'>{mbanks?.map(g=><option value={g.name} key={g.name}/>)}</datalist>
          <Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option>  </Select>*/}
          <IconButton><CiSearch/></IconButton>
        </FlexH>
      </form>
    </div><GapV x='8'/>
    <div>
      <table>
        <tbody>
          {history?.deposits?.map(({_id,updatedAt,txn,gateway,amount,extra,balanceType,status})=><tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
            <td style={{width:'20%'}}>{updatedAt}</td>
            <td style={{width:'30%'}}><TinyIcon src={mbankIcons[gateway]}/> {txn}</td>
            <td style={{width:'20%'}}>{amount} <small>{extra}</small></td>
            <td style={{width:'10%'}}>{balanceType}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
            {history?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={history?.pagination?.totalPage} currentPage={history?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}