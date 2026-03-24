import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {FaTint,FaTv,FaCreditCard} from 'react-icons/fa';
import {MdElectricBolt} from 'react-icons/md';
import {CiGlobe,CiSearch} from 'react-icons/ci';
import {useNotification} from '../../contexts/NotificationContext';
import {useAuth} from '../../contexts/AuthContext';
import {useTheme} from '../../contexts/ThemeContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date' 
import Filter from '../../components/Filter'//{mbanks} = useDeposit();
import Pages from '../../components/Pagination';
import useFetch from '../../hooks/useFetch';
import url from '../../config/url';


export default () =>{
  const navigate = useNavigate()
  const {themeData,modeData,statusTheme} = useTheme();
  const [searchParams] = useSearchParams();
  const {socket} = useNotification()
  const {user} = useAuth()
  const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  const {data,} = useFetch(`${url.urlBillHistory}?search=${search}&page=${page}`);
       
  useEffect(()=>{
    socket.emit('user:failed-bill:seen',user?.username)
    navigate(`/bill/history?search=${search}&page=${page}`)
  },[])
  useEffect(()=>{
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/bill/history?search=${e.target.search.value}&page=1`)
  }
  
  const pageNav = p=> navigate(`/bill/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  const billIcons ={
      electricity: <MdElectricBolt/>,
      water: <FaTint/>,
      internet: <CiGlobe/>,
      tv: <FaTv/>,
      card: <FaCreditCard/>
  }
  return <div style={{width:'100%'}}><GapV x='5'/>
    <div>
     <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
      {/*<form onSubmit={filter}>
        <FlexH x='space-between' y='center' style={{width:'15rem',marginLeft:'auto'}}>
          /<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>/
          <Field   x='12' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton size='2'><CiSearch/></IconButton></FlexH></form>*/}
      
    </div><GapV x='4'/>
    <div style={{background:modeData.backSecondary,padding:'0.5rem',width:'100%'}}>
      <table style={{width:'100%'}}>
        <tbody style={{width:'100%'}}>
          {data?.bills?.map(({_id,updatedAt,acNumber,billType,amount,status})=> <tr key={_id} style={{/*background:modeData.backPrimary,*/color:statusTheme[status.toLowerCase()],marginBottom:'1rem',width:'100%'}}>
            <td style={{width:'35%',padding:'1rem 0'}}>{billIcons[billType]} {acNumber}</td>
            <td style={{width:'35%',padding:'1rem 0'}}>&#2547;{amount}</td>
            <td style={{width:'20%',padding:'1rem 0',textAlign:'right'}}>{getLocalDateFromUTC(updatedAt) }</td>
            {/*<td>{status}</td>*/}
          </tr>)}
        </tbody>
      </table>
    </div>
    {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}