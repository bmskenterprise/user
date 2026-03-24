import {useEffect,useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import toast from 'react-hot-toast';
import {FlexH,GapV,GapH,TextField,ErrorText,IconButton,TinyIcon,ThemeButton,PaginationBar} from '../components/styled';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext'
import {useTelecom} from '../contexts/TelecomContext';
import {useDeposit} from '../contexts/DepositContext';
import useFetch from '../hooks/useFetch'
import url from '../config/url'
import Filter from '../components/Filter'
import BalanceBeforeAfter from '../components/BalanceBeforeAfter' //
import Pages from '../components/Pagination';
import IconDropdown from '../components/IconDropdown';
import UserPIN from '../components/UserPIN';
import Category from '../components/Category';


export default  () => {
    const {thememode,modeData:{backSecondary}} = useTheme()
    const navigate = useNavigate();
    const {fetchBalance,balance} = useDeposit();
    const [searchParams,] = useSearchParams();
    const {fetchTelecoms,telecoms,hitDrive,fetchDriveTelecoms,fetchDrivePacks,driveTelecoms,driveData,errors,loading} = useTelecom();
    const {user,} = useAuth();
    let formData = {}
    let [optName,category,search,page] = [searchParams.get('operator')||driveTelecoms[0],searchParams.get('category')||'bundle',searchParams.get('search')||'',searchParams.get('page')||'1']  
    const icons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
    const [filterData,setFilterData] = useState({opt:{name:optName,icon:icons?.[optName]},category,search,page})
    let [drop,setDrop] = useState(false)
    const [selectedPack,setSelectedPack] = useState({id:null,operator:'',title:'',price:'',commission:''})
     const [next,setNext] = useState(false)
    const [driveOpts,setDriveOpts] = useState([])
    const toggler = bool => setDrop(bool)
    
    useEffect(()=>{
        fetchTelecoms()
        fetchDriveTelecoms();fetchBalance()
    },[])
    
    useEffect(()=>{
        if(optName||driveOpts?.length>0) navigate(`/drive?operator=${optName??driveOpts[0]?.name}&category=${category}&search=${search}&page=${page}`)
        }, [optName,driveOpts])
    
    useEffect(()=>{
        if(telecoms?.length>0&&driveTelecoms?.length>0) setDriveOpts(telecoms?.filter(t => driveTelecoms.includes(t.name)))
    }, [telecoms,driveTelecoms])
    
    useEffect(()=>{
        //fetchDrivePacks(opt,category,search,page)
        setFilterData(prev=>({...prev,opt:{name:optName??driveTelecoms[0],icon:icons[optName??driveTelecoms[0]]},category,search,page}))
    },[optName,category,search,page])
    
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
    
    let {data} = useFetch(`${url.urlDrive}/${optName}?category=${category}&search=${search}&page=${page}`)  
    //const packs = search? driveData: driveData?.[opt]?.[category]
    const packtile = {background:backSecondary,borderRadius:'0.25rem',cursor:'pointer',fontSize:'1.1rem',fontWeight:'500',padding:'1rem',marginBottom:'1.5rem'}
    
    const filter = e=> {
        e.preventDefault()
        navigate(`/drive?operator=${filterData.opt.name}&category=${filterData.category}&search=${e.target.search.value.trim()}&page=1`)
    }
    const pageNav = p=> navigate(`/drive?operator=${filterData.opt.name}category=${filterData.category}&search=${filterData.search}&page=${p}`)
    const getDriveOpt = (name,icon)=> setFilterData(prev=>({...prev,opt:{name,icon}}))
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const getCategory = c=> navigate(`/drive?operator=${filterData.opt.name}&category=${c}&search=${filterData.search}&page=1`)//setFilterData(prev=>({...prev,category:c}))
    
    
    const requestDrive = (e) =>{
        e.preventDefault()
        formData = {drive:selectedPack,recipient:e.target.recipient.value.trim(),price:selectedPack.price}
        UserPIN(thememode,{cb:hitDrive,data:formData},'SEND')
    }
    
    const onPackSelect = (id,operator,title,price,commission)=>{
        if(Number(price-commission)>balance?.drive) {toast.error('Insufficient Drive Balance');return}
            setNext(true)
        setSelectedPack({id,operator,title,price,commission})
    }
    
    
    
    return !user?.accesses?.includes('drive')?<FlexH x='center' y='center'><p>Dont have drive permission at this time</p></FlexH>:<div onClick={e=>setDrop(false)}><GapV x='6'/>
        {!next?<div>
            {/*<form onSubmit={filter}>*/}
                <FlexH x='space-between'>
                    <div style={{width:'2rem'}}><IconDropdown items={driveOpts} toggleState={{toggler,drop}} marked={filterData.opt} handler={getDriveOpt}/></div>
                    <div style={{width:'70%'}}><Filter   searchValue={filterData.search} filter={filter} setParams={filterParams}/></div>{/*<IconButton type='submit'><CiSearch/></IconButton>*/}
                </FlexH>
            {/*</form>*/}<GapV x='5'/>
            {/*driveData[opt]*/data && <div>
                <Category handler={getCategory} selected={filterData.category}/><GapV x='4'/>
                <div>{/*driveData[filterData.opt]*/data?.drives?.map(({_id,operator,title,price,commission}) => <div key={_id} style={packtile} onClick={e=>onPackSelect(_id,operator,title,price,commission)}>
                    <h4>{title}</h4><GapV x='1'/>
                    <FlexH x='space-between'><span>&#2547;{price}</span><span>&#2547;{commission}</span></FlexH>
                </div>)}
                </div>
                {/*driveData[filterData.opt]*/data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={/*driveData[filterData.opt]*/data?.pagination?.totalPage} currentPage={data?.pagination?.currentPage} changePage={p=>pageNav(p)}/></PaginationBar>}
            </div>}
        </div>:
        <div>
            <BalanceBeforeAfter before={balance?.drive} after={balance?.drive-Number(selectedPack.price-selectedPack.commission)}/><GapV x='6'/>
            <FlexH x='flex-start' y='center'><TinyIcon src={icons[optName]}/><GapH x='0.5'/><h4>{selectedPack.title}</h4></FlexH><GapV x='6'/>
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
        <GapV x='5'/>
    </div>
}
