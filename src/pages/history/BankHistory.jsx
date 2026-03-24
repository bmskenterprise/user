import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useDeposit} from '../../contexts/DepositContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date';
import Pages from '../../components/Pagination';
import Filter from '../../components/Filter';
import useFetch from '../../hooks/useFetch';
import url from '../../config/url'


export default () =>{
    const {themData,modeData,statusTheme} = useTheme();
    const {mbanks} = useDeposit();
    const navigate = useNavigate()
    const [searchParams] = useSearchParams();
    const {socket} = useNotification()
    const {user} = useAuth()
    const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']  
    const [filterData,setFilterData] = useState({/*status,*/search,page})
    const {data} = useFetch(`${url.urlBankHistory}?search=${search}&page=${page}`) //|| '1'
    useEffect(()=>{
      socket.emit('user:failed-bank:seen',user?.username)
      navigate(`/bank/history?search=${search}&page=${page}`)
    },[])
    useEffect(()=>{
      setFilterData({/*status,*/search,page})
    },[/*status,*/search,page])
    
    const filter = (e) =>{
      e.preventDefault()
      navigate(`/bank/history?search=${e.target.search.value.trim()}&page=1`)
    }
    
    const pageNav = p=> navigate(`/bank/history?search=${search}&page=${p}`)
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
    
    return <div style={{width:'100%'}}><GapV x='5'/>
      <div>
      <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
        {/*<form onSubmit={filter}>
          <FlexH x='space-between'>
            <Field  x='8' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
            /<Select mode={modeData} name='status' value={filterData.status}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option>   </Select>/
            <IconButton><CiSearch/></IconButton></FlexH></form>*/}
    
      </div><GapV x='4'/>
      <div style={{background:modeData.backSecondary,padding:' 0.5rem',width:'100%'}}>
        <table style={{width:'100%'}}>
          <tbody style={{width:'100%'}}>
            {data?.banks?.map(({_id,updatedAt,bank,acNumber,amount,status})=> <tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
              <td style={{width:'35%',padding:'1rem 0'}}>{bank}</td>
              <td style={{width:'30%',padding:'1rem 0'}}>{acNumber}</td>
              <td style={{width:'15%',padding:'1rem 0'}}>{amount}</td>
              <td style={{width:'20%',padding:'1rem 0',textAlign:'right'}}>{getLocalDateFromUTC(updatedAt)}</td>
            </tr>)}
          </tbody>
        </table>
      </div>
      {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
    </div>
  }