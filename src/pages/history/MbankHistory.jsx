import {useEffect,useState} from 'react'
import {useNavigate,useParams,useSearchParams} from 'react-router-dom';
import {useNotification} from '../../contexts/NotificationContext';
import {useAuth} from '../../contexts/AuthContext'
import {useAPI} from '../../contexts/APIContext';
import {useTheme} from '../../contexts/ThemeContext';
import {FlexH,GapV,Field,Select,PaginationBar,} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date'
import useFetch from '../../hooks/useFetch';
import Filter from '../../components/Filter';
import Pages from '../../components/Pagination';
import url from '../../config/url';


export default () =>{
  const navigate = useNavigate()
    const {mbankType} = useParams()
  const {themData,modeData,statusTheme} = useTheme();
  const {socket,countFailedOrCancel,reduceFailedCount} = useNotification();
  const [searchParams] = useSearchParams();
  const {user} = useAuth()
  const {mbanks} = useAPI()
  const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  const {data,loading} = useFetch(`${url.urlMBankTransactionHistory}/${mbankType}?search=${search}&page=${page}`);
  
  useEffect(()=>{
    navigate(`/mbank/${mbankType}/history?search=${search}&page=1`)
  }, [])
  
  useEffect(()=>{
    if(countFailedOrCancel.mbank>0){
      reduceFailedCount('mbank')
      navigate(`/deposit/history?search=failed&page=${page}`)
    }
  }, [countFailedOrCancel])
  
  useEffect(()=>{
    if(user) socket.emit('user:seen-failed-mbank',user?.username)
  },[user])
  
  useEffect(()=>{
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/mbank/${mbankType}/history?search=${e.target.search.value.trim()}&page=1`)
  }
  
  const pageNav = p=> navigate(`/mbank/${mbankType}/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,search:e.target.value}))
  const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  return <div style={{width:'100%'}}><GapV x='5'/>
    <div>
     <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
      {/*<form onSubmit={filter}>
        <FlexH x='space-between' y='center' style={{width:'15rem',marginLeft:'auto'}}>
          /<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>/
          <Field x='12' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton size='2'><CiSearch/></IconButton></FlexH>
      </form>*/}
    </div><GapV x='4'/>
    <div style={{background:modeData.backSecondary,padding:' 0.5rem',width:'100%'}}>
      <table style={{width:'100%'}}>
        <tbody style={{width:'100%'}}>
          {data?.history?.map(({_id,updatedAt,recipient,amount,mbankType,transactionType,status})=> <tr key={_id} style={{/*background:modeData.backPrimary,*/color:statusTheme[status.toLowerCase()],width:'100%'}}>
            <td style={{width:'30%',padding:'1rem 0'}}>{recipient}</td>
            <td style={{width:'25%',padding:'1rem 0'}}>&#2547;{amount}</td>
            <td style={{width:'25%',padding:'1rem 0'}}>{mbankIcons[mbankType]}{transactionType}</td>
            <td style={{width:'20%',padding:'1rem 0',textAlign:'right'}}>{getLocalDateFromUTC(updatedAt)}</td>  
          </tr>)}
        </tbody>
      </table>
    </div>
    {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}