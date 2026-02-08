import {useState} from 'react';
import {NavLink,useLocation,useNavigate} from 'react-router-dom';
import {MdClose} from 'react-icons/md';
import {CiMenuBurger} from 'react-icons/ci';
import {BsChevronDown} from 'react-icons/bs';
import {useAuth} from '../../contexts/AuthContext'
import {useTheme} from '../../contexts/ThemeContext';
import {useNotification} from '../../contexts/NotificationContext';
import {FlexH,Header,NavToggler,Menu,Badge,InlineBadge,Icon,Avatar} from '../../components/styled';

export default () =>{
	let	navigate	= useNavigate()
  const {user} = useAuth() 
  const {themeData,modeData} = useTheme();
  const location = useLocation();
  const [navExpand,setNavExpand] = useState(false)
  const {inboxCount,countFailedOrCancel:{deposit,topup,drive,bill,bkash,dbbl,nagad}} = useNotification()
  let total = deposit+topup+drive+bill+bkash+dbbl+nagad
  const getNavColor = p => location.pathname.includes(p)?themeData.themeBackground:modeData.textPrimary
  return <Header /*x='flex-end' style={{position:'relative'}}*/>
      {/*<div><Avatar size='2' src='https://res.cloudinary.com/dnyyugfjv/image/upload/v1752837562/bitmap_q4lnon.svg'/></div>*/}
    <NavToggler onClick={e=>setNavExpand(prev=>!prev)}><Icon x='2'>{navExpand?<MdClose/>:<CiMenuBurger/>}</Icon></NavToggler>
			<Menu /*mode={modeData}*/ $toggleNav={navExpand.toString()}>
        <ul id="items">
					<li style={{color:getNavColor('/index')}}><NavLink to='/index'>Home</NavLink></li>
					<li><>{total>0&&<Badge>{total}</Badge>}</>History&nbsp;<BsChevronDown/>
            <ul>
              <li style={{color:getNavColor('/history/deposit')}}><NavLink to='/history/deposit'>Deposit History</NavLink>{deposit>0&&<InlineBadge>{deposit}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/topup')}}><NavLink to='/history/topup'>Topup History</NavLink>{topup>0&&<InlineBadge>{topup}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/drive')}}><NavLink to='/history/drive'>Drive History</NavLink>{drive>0&&<InlineBadge>{drive}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/bill')}}><NavLink to='/history/bill'>Bill History</NavLink>{bill>0&&<InlineBadge>{bill}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/bkash')}}><NavLink to='/history/bkash'>Bkash History</NavLink>{bkash>0&&<InlineBadge>{bkash}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/dbbl')}}><NavLink to='/history/dbbl'>DBBL History</NavLink>{dbbl>0&&<InlineBadge>{dbbl}</InlineBadge>}</li>
              <li style={{color:getNavColor('/history/nagad')}}><NavLink to='/history/nagad'>Nagad History</NavLink>{nagad>0&&<InlineBadge>{nagad}</InlineBadge>}</li>
            </ul>
          </li>
          <li>Support&nbsp;<BsChevronDown/>
            <ul>
              <li style={{color:getNavColor('/contact')}}><NavLink to='/contact'>Contact</NavLink></li>
              <li style={{color:getNavColor('/feedback')}}><NavLink to='/feedback'>Feedback</NavLink></li>
            </ul>
          </li>
          <li style={{color:getNavColor('/notice')}}>{inboxCount>0&&<Badge>{inboxCount}</Badge>}<NavLink to='/notice'>Notification</NavLink></li>
				</ul>
		  <div onClick={e=>navigate('/profile')}><Avatar size='2' src={user?.avatar}/></div>
		</Menu>
	</Header>
}