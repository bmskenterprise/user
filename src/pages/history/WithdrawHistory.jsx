import {useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useAPI} from '../../contexts/APIContext';
import {FlexH,GapV,Field,Select,PaginationBar,TinyIcon,IconButton} from '../../components/styled';
import {getLocalDateFromUTC} from '../../utils/date'
import useFetch from '../../hooks/useFetch';
import Filter from '../../components/Filter';
import Pages from '../../components/Pagination';
import url from '../../config/url'


export default () =>{
  const {socket,countFailedOrCancel,reduceFailedCount} = useNotification()
  const {themData,modeData,statusTheme} = useTheme();
  const {fetchMbanks,mbanks} = useAPI();
  const navigate = useNavigate()
  const [searchParams] = useSearchParams();
  const {user} = useAuth()
  const [search,page] = [searchParams.get('search')||'pending',searchParams.get('page')||'1']
  const {data,} = useFetch(`${url.urlWithdrawHistory}?search=${search}&page=${page}`);
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  //const [mbankIcons,setMbankIcons] = useState({})
    const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) : {} 
  
  useEffect(()=>{fetchMbanks()
    navigate(`/withdraw/history?search=${search}&page=${page}`)
  },[])
  
  useEffect(()=>{
    if(user) socket.emit('user:seen-failed-withdraw',user?.username)
  }, [user])
  
  useEffect(()=>{
    if(countFailedOrCancel.withdraw>0){
      reduceFailedCount('withdraw')
      navigate(`/withdraw/history?search=failed&page=${page}`)
    }
  },[countFailedOrCancel])
  
  useEffect(()=>{
    setFilterData({search,page})
  },[search,page])
  /*useEffect(()=>{
      if(mbanks?.length>0) setMbankIcons(Object.fromEntries(mbanks.map(item=>[item.name,item.icon])))
  }, [mbanks])*/
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/withdraw/history?search=${e.target.search.value.trim()}&page=1`)
  }
  const pageNav = p=> navigate(`/withdraw/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  
  return <div style={{width:'100%'}}><GapV x='5'/>
    <div>
     <Filter searchValue={filterData.search} setParams={filterParams} filter={filter}/>
      {/*<form onSubmit={filter}>
        <FlexH x='space-between' style={{width:'15rem',marginLeft:'auto'}}>
           <Field x='12' type='search' value={filterData.search} placeholder="search" name='search' onChange={filterParams}/>
          <IconButton size='2' type='submit'><CiSearch/></IconButton></FlexH>
      </form>*/}
    </div><GapV x='4'/>
    <div style={{background:modeData.backSecondary,padding:'0.5rem',width:'100%'}}>
      <table style={{width:'100%'}}>
        <tbody style={{width:'100%'}}>
          {data?.withdraws?.map(({_id,updatedAt,gateway,amount,status})=><tr key={_id} style={{color:statusTheme[status.toLowerCase()],width:'100%',marginBottom:'1rem'}}>
            <td style={{width:'45%',padding:'1rem 0'}}><TinyIcon src={mbankIcons[gateway]}/> {gateway}</td>
            <td style={{width:'35%',padding:'1rem 0'}}>&#2547;{Object.values(amount|| {}).reduce((sum,val)=>sum+val,0)} </td>
            <td style={{width:'20%',padding:'1rem 0',textAlign:'right'}}>{getLocalDateFromUTC(updatedAt  )}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
        {data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}