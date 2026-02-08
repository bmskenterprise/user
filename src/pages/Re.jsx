import {useEffect,useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import toast from 'react-hot-toast'
import {FlexH,Field,GapV,IconButton,ThemeButton,TinyIcon,TextField,ErrorText,PaginationBar} from '../components/styled';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext'
import {useDeposit} from '../contexts/DepositContext'
import {useTelecom} from '../contexts/TelecomContext';
import UserPIN from '../components/UserPIN';
import Pages from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import Category from '../components/Category';
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';


export default  () => {
    const {modeData:{backSecondary}} = useTheme()
    const packtile = {background:backSecondary,borderRadius:'0.25rem',padding:'1rem',marginBottom:'2rem'}
    const navigate = useNavigate();
    const {user} = useAuth()
    const {balance} = useDeposit()
    const [searchParams,] = useSearchParams();
    const {fetchTelecoms,telecoms,fetchRegularTelecoms,fetchRegularPacks,regularTelecoms,regularData,topup,errors,loading} = useTelecom();
    const [selectedPack,setSelectedPack] = useState({operator:'',title:'',price:''});
    let formData = {}
    let opt = searchParams.get('operator') || regularTelecoms[0]
    let search = searchParams.get('search') || ''
    let category = searchParams.get('category') || 'bundle'
    let page = searchParams.get('page') || '1'
    const [filterData,setFilterData] = useState({opt,category,search,page})
    const icons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) : {}
    const regularOpts = telecoms?.filter(t => regularTelecoms.includes(t.name))
    let packs= search?regularData:regularData[opt][category]
    
    useEffect(()=>{
        fetchTelecoms()
        fetchRegularTelecoms()
    },[])
    useEffect(()=>{
        fetchRegularPacks(opt,category,search,page)
        setFilterData({opt,category,search,page})
    },[opt,category,search,page])
    
    useEffect(()=> {
        window.history.pushState(null,'',window.location.href)
        const handlePopState = e =>{
            if(selectedPack.title){
                window.history.pushState(null,'',window.location.href);
                setSelectedPack(prev=>({...prev,title:''}))
            }
        }
        window.addEventListener('popstate',handlePopState)
        return ()=> window.removeEventListener('popstate',handlePopState)
    },[selectedPack])
    
    const requestTopup = (e) =>{
        e.preventDefault()
        formData={operator:selectedPack.operator,recipient:e.target.recipient.value.trim(),amount:selectedPack.price}
        UserPIN({cb:topup,data:formData},'SEND')
    }
    const onPackSelect = (operator,title,price)=>{
        if(price>user?.balance?.topup){toast.error('Insufficient Topup Balance');return}
        setSelectedPack({operator,title,price})
    }
    
    const filter = e=> navigate(`/regular?operator=${filterData.opt}&category=${filterData.category}&search=${e.target.search.value.trim()}&page=1`)
    const pageNav = p=> navigate(`/regular?operator=${filterData.opt}&category=${filterData.category}&search=${filterData.search}&page=${p}`)
    const getRegularOpt = (opt,icon)=> setFilterData(prev=>({...prev,opt})) //= {name:opt,icon}
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const getCategory = (c) => navigate(`/regular?operator=${filterData.opt}&category=${c}&search=${filterData.search}&page=1`)//setFilterData(prev=>({...prev,category:c}))
    
    return !user?.accesses?.includes('regular')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Regular pack permission at this time</p></FlexH>:<div>
        {!selectedPack.title?<div>
            <form onSubmit={filter}>
                <FlexH x='space-between'>
                    {!extra&&<Dropdown items={regularOpts} handler={getRegularOpt}/>}
                    <Field x='10' type='search' name='search' value={filterData.search} placeholder='search' onChange={filterParams}/><IconButton type='submit'><CiSearch/></IconButton>
                </FlexH>
            </form><GapV x='4'/>
            {/*regularData[opt][category]*/packs && <div>
                <Category handler={getCategory} selected={filterData.category}/>
                <div>
                    {/*regularData[filterData.opt][category]*/packs.regulars.map(({_id,operator,title,price}) => <h5 key={_id} style={packtile} onClick={e=>onPackSelect(operator,title,price)}>{title}</h5>)}
                </div>
                {/*regularData[filterData.opt][category]*/packs.pagination.totalPage>1 && <PaginationBar><Pages totalPage={/*regularData[filterData.opt][category]*/packs.pagination.totalPage} currentPage={/*regularData[filterData.opt][category]*/packs.pagination.currentPage} changePage={p=>pageNav(p)}/></PaginationBar>}
            </div>}
        </div>:
        <div>
            <div>
                <BalanceBeforeAfter before={balance?.topup} after={balance?.topup-selectedPack.price}/><GapV x='4'/>
                <FlexH x='flex-start'><TinyIcon src={icons[opt]}/><h4>{selectedPack?.title}</h4></FlexH>
            </div><GapV x='6'/>
            <div>
                <form onSubmit={requestTopup}>
                    <div>
                      <TextField name='recipient' placeholder='Recipient'/><GapV x='2'/>
                      <ErrorText>{errors?.recipient}</ErrorText>
                    </div>
                    <FlexH x='center'><ThemeButton type='submit' disabled={loading}>NEXT</ThemeButton></FlexH>
                </form>
            </div>
        </div>}
    </div>
}