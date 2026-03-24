import {useEffect,useRef,useState} from 'react';
import {NavLink,useLocation,useNavigate} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import {CiMenuBurger} from 'react-icons/ci';
import {BsChevronDown} from 'react-icons/bs';
import {useAuth} from '../../contexts/AuthContext'
import {useTheme} from '../../contexts/ThemeContext';
import {useNotification} from '../../contexts/NotificationContext';
import {FlexH,Header,NavToggler,Menu,Badge,InlineBadge,IconButton,Avatar,ProfileSection,ProfileIcon} from '../../components/styled';
import bell from '../../assets/new-notification-010-352755.mp3';

export default () =>{
	let	navigate	= useNavigate()
  const {user} = useAuth()
  const bellRef = useRef(null)
  const {themeData,modeData} = useTheme();
  const location = useLocation();
  const [isNavExpanded,setIsNavExpanded] = useState(false)
  const {isFailed,inboxCount,countFailedOrCancel:{deposit,withdraw,topup,drive,bill,bkash,dbbl,nagad}} = useNotification()
  
  useEffect(()=>{setIsNavExpanded(false)}, [location.pathname])
  
  useEffect(()=>{
    if(isFailed) bellRef.current.click()
  },[isFailed])
  
  let totalHistory = deposit+withdraw+topup+drive+bill+bkash+dbbl+nagad
  const getNavColor = p => location.pathname.includes(p)?themeData.themeBackground:modeData.textPrimary
  
  return <Header >
    <button ref={bellRef} onClick={e=>{(new Audio(bell)).play()}} hidden></button>
    <NavToggler onClick={e=>setIsNavExpanded(prev=>!prev)}><IconButton size='2'>{isNavExpanded?<MdClose/>:<CiMenuBurger/>}</IconButton></NavToggler>
			<Menu togglenav={isNavExpanded}>
        <ul >
					<li style={{color:getNavColor('index')}}><NavLink to='/index'>Home</NavLink></li>
					<li><NavLink>History&nbsp;<BsChevronDown/></NavLink>{totalHistory>0&&<Badge>{totalHistory}</Badge>}
            <ul>
              <li style={{color:getNavColor('deposit/history')}}><NavLink to='/deposit/history'>Deposit History</NavLink>{deposit>0&&<InlineBadge>{deposit}</InlineBadge>}</li>
              <li style={{color:getNavColor('withdraw/history')}}><NavLink to='/withdraw/history'>Withdraw History</NavLink>{withdraw>0&&<InlineBadge>{withdraw}</InlineBadge>}</li>
              <li style={{color:getNavColor('topup/history')}}><NavLink to='/topup/history'>Topup History</NavLink>{topup>0&&<InlineBadge>{topup}</InlineBadge>}</li>
              <li style={{color:getNavColor('drive/history')}}><NavLink to='/drive/history'>Drive History</NavLink>{drive>0&&<InlineBadge>{drive}</InlineBadge>}</li>
              <li style={{color:getNavColor('bill/history')}}><NavLink to='/bill/history'>Bill History</NavLink>{bill>0&&<InlineBadge>{bill}</InlineBadge>}</li>
              <li style={{color:getNavColor('mbank/bkash/history')}}><NavLink to='/mbank/bkash/history'>Bkash History</NavLink>{bkash>0&&<InlineBadge>{bkash}</InlineBadge>}</li>
              <li style={{color:getNavColor('mbank/dbbl/history')}}><NavLink to='/mbank/dbbl/history'>DBBL History</NavLink>{dbbl>0&&<InlineBadge>{dbbl}</InlineBadge>}</li>
              <li style={{color:getNavColor('mbank/nagad/history')}}><NavLink to='/mbank/nagad/history'>Nagad History</NavLink>{nagad>0&&<InlineBadge>{nagad}</InlineBadge>}</li>
            </ul>
          </li>
          <li><NavLink>Support&nbsp;<BsChevronDown/></NavLink>
            <ul>
              <li style={{color:getNavColor('contact')}}><NavLink to='/contact'>Contact</NavLink></li>
              <li style={{color:getNavColor('feedback')}}><NavLink to='/feedback'>Feedback</NavLink></li>
            </ul>
          </li>
          <li style={{color:getNavColor('notice')}}><NavLink to='/notice'>Notification</NavLink>{inboxCount>0&&<Badge>{inboxCount}</Badge>}</li>
				</ul>
		  <ProfileSection><ProfileIcon onClick={e=>navigate('/profile')}><Avatar /*style={{display:'block',marginLeft:'auto'}}*/ size='2.5' src={user?.avatar}/></ProfileIcon></ProfileSection>
		</Menu>
	</Header>
}