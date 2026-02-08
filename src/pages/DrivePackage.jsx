import {useEffect,useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import {CiSearch} from 'react-icons/ci';
import toast from 'react-hot-toast';
import {FlexH,GapV,TextField,Field,ErrorText,IconButton,TinyIcon,ThemeButton,PaginationBar} from '../components/styled';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext'             
import {useTelecom} from '../contexts/TelecomContext';
import Pages from '../components/Pagination';
import Dropdown from '../components/Dropdown';
import UserPIN from '../components/UserPIN';
import Category from '../components/Category';


export default  () => {
    const {modeData:{backSecondary}} = useTheme()
    const navigate = useNavigate();
    const [searchParams,] = useSearchParams();
    const {fetchTelecoms,telecoms,hitDrive,fetchDriveTelecoms,fetchDrivePacks,driveTelecoms,driveData,errors,loading} = useTelecom();
    const {user,} = useAuth();
    let formData = {}
    let opt = searchParams.get('operator') || driveTelecoms[0]
    let search = searchParams.get('search') || ''
    let category = searchParams.get('category') || 'bundle'
    let page = searchParams.get('page') || '1'
    const [filterData,setFilterData] = useState({opt,category,search,page})
    const [selectedPack,setSelectedPack] = useState({id:null,operator:'',title:'',price:'',commission:''})
    const driveOpts = telecoms?.filter(t => driveTelecoms.includes(t.name))
    
    useEffect(()=>{
        fetchTelecoms()
        fetchDriveTelecoms()
    },[])
    useEffect(()=>{
        fetchDrivePacks(opt,category,search,page)
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
    const packtile = {background:backSecondary,borderRadius:'0.25rem',padding:'1rem',marginBottom:'2rem'}
    
    const filter = e=> navigate(`/drive?operator=${formData.operator}category=${category}&search=${e.target.search.value}&page=1`)
    const pageNav = p=> navigate(`/drive?operator=${formData.operator}category=${category}&search=${formData.search}&page=${p}`)
    const getDriveOpt = opt=> setFilterData(prev=>({...prev,opt}))
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const getCategory = c=> navigate(`/drive?operator=${filterData.opt}&category=${c}&search=${filterData.search}&page=1`)//setFilterData(prev=>({...prev,category:c}))
    
    const icons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
    const requestDrive = (e) =>{
        e.preventDefault()
        formData = {drive:selectedPack,recipient:e.target.recipient.value.trim(),price:selectedPack.price}
        UserPIN({cb:hitDrive,data:formData},'SEND')
    }
    const onPackSelect = (id,operator,title,price,commission)=>{
        if(price>user?.balance?.drive) {toast.error('Insufficient Drive Balance');return}
        setSelectedPack({id,operator,title,price,commission})
    }
    
    return !user?.accesses?.includes('drive')?<FlexH x='center' y='center'><p>Dont have drive permission at this time</p></FlexH>:<div>
        {!selectedPack.title?<div>
            <form onSubmit={filter}>
                <FlexH x='space-between'>
                    <Dropdown items={driveOpts} /*selected={filterData.opt}*/ handler={getDriveOpt}/>
                    <Field x='10' type='search' name='search' value={filterData.search} placeholder='search' onChange={filterParams}/><IconButton type='submit'><CiSearch/></IconButton>
                </FlexH>
            </form><GapV x='4'/>
            {driveData[opt] && <div>
                <Category handler={getCategory} selected={filterData.category}/>
                <div>{driveData[filterData.opt].drives.map(({_id,operator,title,price,commission}) => <div key={_id} style={packtile} onClick={e=>onPackSelect(_id,operator,title,price,commission)}>
                    <h5>{title}</h5>
                    <FlexH x='space-between'><span>&#2547;{price}</span><span>&#2547;{commission}</span></FlexH>
                </div>)}
                </div>
                {driveData[filterData.opt].pagination.totalPage>1 && <PaginationBar><Pages totalPage={driveData[filterData.opt].pagination.totalPage} currentPage={driveData[filterData.opt].pagination.currentPage} changePage={p=>pageNav(p)}/></PaginationBar>}
            </div>}
        </div>:
        <div>
            <FlexH x='flex-start'><TinyIcon src={icons[opt]}/><h5>{selectedPack.title}</h5></FlexH><GapV x='6'/>
            <div>
                <form onSubmit={requestDrive}>
                    <div>
                        <TextField name='recipient' placeholder='Recipient' />
                        <ErrorText>{errors?.recipient}</ErrorText>
                    </div><GapV x='4'/>
                    <FlexH x='center'><ThemeButton type='submit' disabled={loading}>NEXT</ThemeButton></FlexH>
                </form><GapV x='4'/>
            </div>
        </div>}
    </div>
}
