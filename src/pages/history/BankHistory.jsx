import React,{useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useHistory} from '../../contexts/HistoryContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useDeposit} from '../../contexts/DepositContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton} from '../../components/styled';
import Pages from '../../components/Pagination';


export default () =>{
  const {fetchBankHistory,history} = useHistory();
  const {themData,modeData,statusTheme} = useTheme();
  const {mbanks} = useDeposit();
  const {navigate} = useNavigate()
  const [searchParams] = useSearchParams();
  const {socket} = useNotification()
  const {user} = useAuth()
  const search = searchParams.get('search') || 'pending'
  const page = searchParams.get('page') || '1'
  const [filterData,setFilterData] = useState({/*status,*/search,page})
    useEffect(()=>{socket.emit('seen-failed-bank',user?.username)
      setFilterData({/*status,*/search,page})
      fetchBankHistory(/*status,*/search,page)
    },[/*status,*/search,page])
    
    const filter = (e) =>{
      e.preventDefault()
      navigate(`/bank/history?search=${e.target.search.value.trim()}&page=1`)
    }
    
    const pageNav = p=> navigate(`/bank/history?search=${search}&page=${p}`)
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
    
    return <div>
      <div>
        <form onSubmit={filter}>
          <FlexH x='space-between'>
            <Field /*theme={themData}*/ x='8' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
            {/*<Select mode={modeData} name='status' value={filterData.status}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option>   </Select>*/}
            <IconButton><CiSearch/></IconButton>
ci    </FlexH>
        </form>
      </div><GapV x='8'/>
      <div>
        <table>
          <tbody>
            {history?.banks?.map(({_id,updatedAt,bank,acNumber,amount,status})=> <tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
              <td style={{width:'20%'}}>{updatedAt}</td>
              <td style={{width:'20%'}}>{bank}</td>
              <td style={{width:'20%'}}>{acNumber}</td>
              <td style={{width:'20%'}}>{amount}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      {history?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={history?.pagination?.totalPage} currentPage={history?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
    </div>
  }