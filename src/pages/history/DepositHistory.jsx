import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useTheme} from '../../contexts/ThemeContext';
import useFetch from '../../hooks/useFetch';
import {useDeposit} from '../../contexts/DepositContext';
import {FlexH,GapV,Field,Select,PaginationBar,TinyIcon,IconButton} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date'
import Filter from '../../components/Filter';
import Pages from '../../components/Pagination';
import url from '../../config/url'


export default () =>{
  const navigate = useNavigate()
  const {socket,countFailedOrCancel,reduceFailedCount} = useNotification()
  const {themData,modeData,statusTheme} = useTheme();
  const {mbanks} = useDeposit();
  const [searchParams] = useSearchParams();
  const {user} = useAuth()
  const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']
  const {data,} = useFetch(`${url.urlDepositHistory}?search=${search}&page=${page}`);
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  const [mbankIcons,setMbankIcons] = useState({})
  
  useEffect(()=>{
    navigate(`/deposit/history?search=${search}&page=${page}`)
  },[])
  useEffect(()=>{
    if(user) socket.emit('user:seen-failed-deposit',user?.username)
  }, [user])
  useEffect(()=>{
    if(countFailedOrCancel.deposit>0){
      reduceFailedCount('deposit')
       navigate(`/deposit/history?search=failed&page=${page}`)
    }
  },[countFailedOrCancel])
  
  useEffect(()=>{
    setFilterData({/*status,*/search,page})
    //fetchDepositHistory(/*status,*/search,page)
  },[/*status,*/search,page])
  useEffect(()=>{
      if(mbanks?.length>0) setMbankIcons(Object.fromEntries(mbanks.map(item=>[item.name,item.icon])))
  }, [mbanks])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/deposit/history?search=${e.target.search.value.trim()}&page=1`)
  }
  
  const pageNav = p=> navigate(`/deposit/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  return <div style={{width:'100%'}}><GapV x='6'/>
    <div>
     <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
      {/*<form onSubmit={filter}>
        <FlexH x='space-between' style={{width:'15rem',marginLeft:'auto'}}>
           <Field x='12' type='search' value={filterData.search} placeholder='search' name='search' onChange={filterParams}/>
          /<Field theme={themData} mode={modeData} x='8' value={filterData.gateway} name='gateway' placeholder="gateway" list='gateway' onChange={filterParams}/>
          <datalist id='gateway'>{mbanks?.map(g=><option value={g.name} key={g.name}/>)}</datalist>
          <Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option>  </Select>/
          <IconButton size='2' type='submit'><CiSearch/></IconButton></FlexH>
      </form>*/}
    </div><GapV x='5'/>
    <div style={{background:modeData.backSecondary,paddingBlock:'0.5rem',width:'100%'}}>
      <table style={{width:'100%'}}>
        <tbody style={{width:'100%'}}>
          {data?.deposits?.map(({_id,updatedAt,txn,gateway,amount,extra,balanceType,status})=><tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
            <td style={{width:'30%',padding:'1rem 0'}}>{getLocalDateFromUTC(updatedAt  )}</td>
            <td style={{width:'40%',padding:'1rem 0'}}><TinyIcon src={mbankIcons[gateway]}/> {txn}</td>
            <td style={{width:'30%',padding:'1rem 0'}}>{amount} <small>{extra}</small></td>
            {/*<td style={{width:'10%'}}>{balanceType}</td>*/}
          </tr>)}
        </tbody>
      </table>
    </div>
            {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}