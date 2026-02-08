import React,{useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import {useAuth} from '../../contexts/AuthContext';
import {useNotification} from '../../contexts/NotificationContext';
import {useHistory} from '../../contexts/HistoryContext';
import {useTheme} from '../../contexts/ThemeContext';
import {useTelecom} from '../../contexts/TelecomContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton,TinyIcon} from '../../components/styled';
import Pages from '../../components/Pagination';


export default () =>{
  const {fetchDriveHistory,history} = useHistory();
  const {themeData,modeData,statusTheme} = useTheme();
  const {fetchTelecoms,telecoms} = useTelecom();
  const {navigate} = useNavigate()
  const [searchParams] = useSearchParams();
  const {socket} = useNotification()
  const {user} = useAuth()
  const search = searchParams.get('search') || ''
  const page = searchParams.get('page') || '1'
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  
  useEffect(()=> {fetchTelecoms()},[])
  useEffect(()=>{socket.emit('seen-failed-drive',user?.username)
    fetchDriveHistory(/*status,*/search,page)
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/drive/history?search=${e.target.search.value}&gateway=${e.target.gateway.value}&page=1`)
  }
  
  const pageNav = p=> navigate(`/drive/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
  const telecomIcons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
  
  return <div>
    <div>
      <form onSubmit={filter}>
        <FlexH x='space-between'>
          {/*<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>*/}
          <Field /*theme={themeData}*/ x='8' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton><CiSearch/></IconButton>
        </FlexH>
      </form>
    </div><GapV x='8'/>
    <div>
      {history?.drives?.map((_id,drive,updatedAt,recipient,price,operator,status)=>
        <div key={_id} style={statusTheme[status.toLowerCase()]}>
          <h4 >{drive.title}</h4>
          <FlexH x='space-between'>
            <span>{updatedAt}</span>
            <span><TinyIcon src={telecomIcons[operator]}/> {recipient}</span>
            <span>&#2547;{price}</span>
          </FlexH>
        </div>)}
    </div>
      
    {history?.pagination.totalPage>1 && <PaginationBar><Pages totalPage={history?.pagination.totalPage} currentPage={history?.pagination.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}