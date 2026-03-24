import {useEffect,useMemo,useState} from 'react';
import {useNavigate,useSearchParams} from 'react-router-dom';
import toast from 'react-hot-toast'
import {FlexH,Field,GapH,GapV,IconButton,ThemeButton,TinyIcon,TextField,ErrorText,PaginationBar} from '../components/styled';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext'
import {useDeposit} from '../contexts/DepositContext'
import {useTelecom} from '../contexts/TelecomContext';
import UserPIN from '../components/UserPIN';
import Pages from '../components/Pagination';
import IconDropdown from '../components/IconDropdown';
import Filter from '../components/Filter';
import Category from '../components/Category';
import BalanceBeforeAfter from '../components/BalanceBeforeAfter';
import useFetch from '../hooks/useFetch';
import url from '../config/url';


export default  () => {
    const {thememode,modeData:{backSecondary}} = useTheme()
    const navigate = useNavigate();
    const {user} = useAuth()
    const {fetchBalance,balance} = useDeposit()
    const {fetchTelecoms,telecoms,fetchRegularTelecoms,fetchRegularPacks,regularTelecoms,regularData,topup,errors} = useTelecom();
    const [searchParams,] = useSearchParams();
    const packtile = {background:backSecondary,borderRadius:'0.25rem',cursor:'pointer',fontSize:'1.1rem',fontWeight:'500',padding:'1rem',marginBottom:'1.5rem'}
    const [selectedPack,setSelectedPack] = useState({operator:'',title:'',price:''});
    let [drop,setDrop] = useState(false) //|| '1'*/
    let formData = {}
    let [optName,category,search,page] = [searchParams.get('operator')||regularTelecoms[0],searchParams.get('category')||'bundle',searchParams.get('search')||'',searchParams.get('page')||'1']  
    const toggler = bool => setDrop(bool)
    const icons = useMemo(()=>telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) : {},[telecoms])
    const [filterData,setFilterData] = useState({opt:{name:optName,icon:icons?.[optName]},category,search,page})
    const [regularOpts,setRegularOpts] = useState([])//telecoms?.filter(t => regularTelecoms.includes(t.name))
    console.log(optName,category,search,page);
    useEffect(()=>{
        fetchTelecoms()
        fetchRegularTelecoms();fetchBalance()
    },[])
    
    useEffect(()=>{
        if(telecoms?.length>0&&regularTelecoms?.length>0) setRegularOpts(telecoms.filter(t => regularTelecoms.includes(t.name)))
        //if(regularTelecoms?.length>0) setFilterData(prev=>({...prev,opt:{name:regularTelecoms[0],icon:icons[regularTelecoms[0]]}}))
        //if(!optName&&regularTelecoms?.length>0) navigate(`/regular?operator=${regularTelecoms[0]}&category=${filterData.category}&search=${search}&page=1`)
    },[telecoms,regularTelecoms])
    useEffect(()=>{
        if(optName||regularOpts?.length>0) navigate(`/regular?operator=${optName??regularOpts[0]?.name}&category=${category}&search=${search}&page=${page}`)
    }, [optName,regularOpts])
    /*useEffect(()=>{
        if(!optName&&regularTelecoms?.length>0) navigate(`/regular?operator=${regularTelecoms[0]}&category=${filterData.category}&search=${search}&page=1`)
    }, [regularTelecoms])*/
    
    useEffect(()=>{
        //if(optName||regularOpts?.length>0) fetchRegularPacks(optName??regularOpts[0]?.name,category,search,page)
        setFilterData(prev=>({...prev,opt:{name:optName??regularTelecoms[0],icon:icons[optName??regularTelecoms[0]]},category,search,page}));
        //navigate(`/regular?operator=${optName??regularTelecoms[0]}&category=${category}&search=${search}&page=${page}`)
    },[optName,category,search,page,regularTelecoms])
    
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
    
    let {data,loading} = useFetch(`${url.urlRegular}/${optName}?category=${category}&search=${search}&page=${page}`)  //
    //let packs= search? regularData: (regularData?.[optName]?.[category]??regularData)
    const requestTopup = (e) =>{
        e.preventDefault()
        formData={operator:filterData.opt,recipient:e.target.recipient.value.trim(),amount:selectedPack.price}
        UserPIN(thememode,{cb:topup,data:formData},'SEND')
    }
    const onPackSelect = (operator,title,price)=>{
        if(price>user?.balance?.topup){toast.error('Insufficient Topup Balance');return}
        setSelectedPack({operator,title,price})
    }
    
    const filter = e=> {
        e.preventDefault()
        navigate(`/regular?operator=${filterData.opt.name}&category=${filterData.category}&search=${e.target.search.value.trim()}&page=1`)
    }
    const pageNav = p=> navigate(`/regular?operator=${filterData.opt.name}&category=${filterData.category}&search=${filterData.search}&page=${p}`)
    const getRegularOpt = (name,icon)=> setFilterData(prev=>({...prev,opt:{name,icon}})) //= {name:opt,icon}
    const filterParams = e=> setFilterData(prev=>({...prev,[e.target.name]:e.target.value}))
    const getCategory = (c) => navigate(`/regular?operator=${filterData.opt.name}&category=${c}&search=${filterData.search}&page=1`)//setFilterData(prev=>({...prev,category:c}))
    
    return !user?.accesses?.includes('regular')?<FlexH x='center' y='center' style={{width:'100%',height:'100%',}}><p>Don't have Regular pack permission at this time</p></FlexH>:<div style={{marginTop:'2rem'}} onClick={e=>setDrop(false)}><GapV x='6'/>
        {!selectedPack.title?<div>
            {/*<form onSubmit={filter}>*/}
                <FlexH x='space-between'>
                    <div style={{width:'5rem'}}><IconDropdown items={regularOpts} toggleState={{toggler,drop}} marked={filterData.opt} handler={getRegularOpt}/></div>
                    <div style={{width:'70%'}}><Filter   searchValue={filterData.search} filter={filter} setParams={filterParams}/></div>{/*<IconButton size='2' type='submit'><CiSearch/></IconButton>*/}
                </FlexH>
            {/*</form>*/}<GapV x='3'/>
            {/*regularData[opt][category]*/data && <div>
                <Category handler={getCategory} selected={filterData.category}/><GapV x='3'/>
                <div>
                    {/*regularData[filterData.opt][category]*/data?.regulars?.map(({_id,operator,title,price}) => <p key={_id} style={packtile} onClick={e=>onPackSelect(operator,title,price)}>{title}</p>)}
                </div>
                {/*regularData[filterData.opt][category]*/data?.pagination?.totalPage>1 && <PaginationBar><Pages totalPage={/*regularData[filterData.opt][category]*/data?.pagination?.totalPage} currentPage={/*regularData[filterData.opt][category]*/data?.pagination?.currentPage} changePage={p=>pageNav(p)}/></PaginationBar>}
            </div>}
        </div>:
        <div>
            <div>
                <BalanceBeforeAfter before={balance?.topup} after={balance?.topup-Number(selectedPack.price)}/><GapV x='3'/>
                <FlexH x='flex-start'><TinyIcon src={icons[optName]}/><GapH x='1'/><h4>{selectedPack?.title}</h4></FlexH>
            </div><GapV x='6'/>
            <div>
                <form onSubmit={requestTopup}>
                    <div>
                      <TextField name='recipient' placeholder='Recipient'/><GapV x='1'/>
                      <ErrorText>{errors?.recipient}</ErrorText>
                    </div><GapV x='5'/>
                    <FlexH x='center'><ThemeButton type='submit' disabled={loading}>NEXT</ThemeButton></FlexH>
                </form>
            </div>
        </div>}
        <GapV x='6'/>
    </div>
}