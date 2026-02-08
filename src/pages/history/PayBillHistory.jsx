import React,{useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {FaFilter,FaTint,FaTv,FaCreditCard} from 'react-icons/fa';
import {MdElectricBolt} from 'react-icons/md';
import {CiGlobe} from 'react-icons/ci';
//import {useAuth} from '../../contexts/Auth';
import {useNotification} from '../../contexts/NotificationContext';
import {useAuth} from '../../contexts/AuthContext';
import {useHistory} from '../../contexts/HistoryContext';
import {useTheme} from '../../contexts/ThemeContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton} from '../../components/styled';
import Pages from '../../components/Pagination';


export default () =>{
  const {fetchBillHistory,history} = useHistory();
  const {themeData,modeData,statusTheme} = useTheme();
  //const {mbanks} = useDeposit();
  const {navigate} = useNavigate()
  const [searchParams] = useSearchParams();
  const {socket} = useNotification()
  const {user} = useAuth()
  const search = searchParams.get('search') || ''
  const page = searchParams.get('page') || '1'
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  useEffect(()=>{socket.emit('seen-failed-bill',user?.username)
    fetchBillHistory(/*status,*/search,page)
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/bill/history?search=${e.target.search.value}&page=1`)
  }
  
  const pageNav = p=> navigate(`/user/bill/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  const billIcons ={
      electricity: <MdElectricBolt/>,
      water: <FaTint/>,
      internet: <CiGlobe/>,
      tv: <FaTv/>,
      card: <FaCreditCard/>
  }
  return <div>
    <div>
      <form onSubmit={filter}>
        <FlexH x='space-between'>
          {/*<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>*/}
          <Field /*theme={themeData} mode={modeData}*/ x='8' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton><FaFilter/></IconButton>
        </FlexH>
      </form>
    </div><GapV x='8'/>
    <div>
      <table>
        <tbody>
          {history?.bills?.map((_id,updatedAt,acNumber,billType,amount,status)=> <tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
            <td>{updatedAt}</td>
            <td>{billIcons[billType]} {acNumber}</td>
            <td>{amount}</td>
            <td>{status}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {history?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={history?.pagination?.totalPage} currentPage={history?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}