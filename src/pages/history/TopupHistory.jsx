import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useTelecom} from '../../contexts/TelecomContext';
import {FlexH,GapV,GapH,Field,PaginationBar,IconButton,TinyIcon} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date' //= searchParams.get('page') || '1'
import Filter from '../../components/Filter';
import Pages from '../../components/Pagination';
import useFetch from '../../hooks/useFetch';
import url from '../../config/url';


export default () =>{
  const navigate = useNavigate()
  const {themData,modeData,statusTheme} = useTheme();
  const {fetchTelecoms,telecoms} = useTelecom();
  const [searchParams] = useSearchParams();
  const {socket,countFailedOrCancel,reduceFailedCount} = useNotification()
  const {user} = useAuth()
  const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  const {data,} = useFetch(`${url.urlTopupHistory}?search=${search}&page=${page}`);
  
  useEffect(()=> {
    fetchTelecoms();
    navigate(`/topup/history?search=${search}&page=${page}`)
  },[])
  useEffect(()=> {
    if(countFailedOrCancel.topup>0){
      reduceFailedCount('topup')
      navigate(`/deposit/history?search=failed&page=${page}`)
    }
  },[countFailedOrCancel])
  
  useEffect(()=>{
    if(user) socket.emit('user:seen-failed-topup',user?.username)
  },[user])
  
  useEffect(()=>{
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/topup/history?search=${e.target.search.value}&page=1`)
  }
  
  const pageNav = p=> navigate(`/topup/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  const telecomIcons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
  
  return <div style={{width:'100%'}}><GapV x='5'/>
    <div>
     <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
      {/*<form onSubmit={filter}>
        <FlexH x='space-between' y='center' style={{width:'15rem',marginLeft:'auto'}}>
          /<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>/
          <Field  x='12' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton size='2'><CiSearch/></IconButton></FlexH>
      </form>*/}
    </div><GapV x='4'/>
    <div style={{background:modeData.backSecondary,padding:' 0.5rem',width:'100%'}}>
      <table style={{width:'100%'}}>
        <tbody style={{width:'100%'}}>
          {data?.topups?.map(({_id,updatedAt,recipient,amount,operator,status})=> <tr key={_id} style={{/*background:modeData.backPrimary,*/color:statusTheme[status.toLowerCase()],marginBottom:'1rem',width:'100%'}}>
            <td style={{width:'55%',padding:'1rem 0'}}><TinyIcon src={telecomIcons[operator]}/> <GapH x='0.3'/>{recipient}</td>
            <td style={{width:'15%',padding:'1rem 0'}}>&#2547;{amount}</td>
            <td style={{width:'30%',padding:'1rem 0',textAlign:'right' }}>{getLocalDateFromUTC(updatedAt) }</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}