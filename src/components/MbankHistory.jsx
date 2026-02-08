import React,{useEffect,useState} from 'react'
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import {useHistory} from '../contexts/HistoryContext';
import {useTheme} from '../contexts/ThemeContext';
//import {useDeposit} from '../contexts/DepositContext';
import {FlexH,GapV,Field,Select,PaginationBar,IconButton} from './styled';
import Pages from './Pagination';


export default ({mbankType}) =>{
  const {fetchMbankTransactionHistory,history} = useHistory();
  const {themData,modeData,statusTheme} = useTheme();
  //const {mbanks} = useDeposit();
  const {navigate} = useNavigate()
  const [searchParams] = useSearchParams();
  //const status = searchParams.get('status') || 'pending'
  const search = searchParams.get('search') || 'pending'
  const page = searchParams.get('page') || '1'
  const [filterData,setFilterData] = useState({/*status,*/search,page})
  useEffect(()=>{
    fetchMbankTransactionHistory(mbankType,search,page)
    setFilterData({/*status,*/search,page})
  },[/*status,*/search,page])
  
  const filter = (e) =>{
    e.preventDefault()
    navigate(`/mbank/${mbankType}/history?search=${e.target.search.value.trim()}&page=1`)
  }
  
  const pageNav = p=> navigate(`/mbank/${mbankType}/history?search=${search}&page=${p}`)
  const filterParams = e=> setFilterData({...filterData,search:e.target.value})
  //const mbankIcons = mbanks ? Object.fromEntries(mbanks.map(item=>[item.name,item.icon])) :{};
  
  return <div>
    <div>
      <form onSubmit={filter}>
        <FlexH x='space-between'>
          {/*<Select mode={modeData} name='status' value={filterData.status} onChange={filterParams}><option value='pending'>PENDING</option><option value='success'>SUCCESS</option><option value='failed'>FAILED</option></Select>*/}
          <Field x='8' type='search' name='search' placeholder='search' value={filterData.search} onChange={filterParams}/>
          <IconButton><CiSearch/></IconButton>
        </FlexH>
      </form>
    </div><GapV x='8'/>
    <div>
      <table>
        <tbody>
          {history.history.map(({_id,updatedAt,status})=> <tr key={_id} style={{color:statusTheme[status.toLowerCase()]}}>
            <td>{updatedAt}</td>
          </tr>)}
        </tbody>
      </table>
    </div>
    {history.pagination.totalPage>1 && <PaginationBar><Pages totalPage={history.pagination.totalPage} currentPage={history.pagination.currentPage} changePage={e=>pageNav(e)}/></PaginationBar>}
  </div>
}