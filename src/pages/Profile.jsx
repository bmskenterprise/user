import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import {MdEdit,MdCamera,MdDeviceUnknown,MdShield,MdOutlineDarkMode,MdLogout} from 'react-icons/md';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import {FlexH,GapH,GapV,Avatar,Switch,IconButton,Icon} from '../components/styled';
import url from '../config/url';
import defaultAvatar from '../assets/user-profile-icon-circle_1256048-12499.jpg';

export default ()  =>{
    const {user,fetchBio,bio,logout} = useAuth();
    const {themeData,modeData,thememode,toggleMode} = useTheme();
    const [avatar,setAvatar] = useState(defaultAvatar);
    
    useEffect(()=>{if(user?.avatar){setAvatar(user.avatar)}}, [user])
    
    const uploadAvatar = e=> {
        const file = e.target.files[0];
        if(file &&file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = async ()=>{
                try{
                    const res = await fetch(url.urlAvatar,{
                        method:'POST',credentials:'include',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({avatar:reader.result})
                    });
                    if(!res.ok) throw new Error('Error uploading avatar')
                    setAvatar(reader.result)
                }catch(e) {toast.error(e.message)}
            }
        }
    }
    const listtile = {background:modeData.backSecondary,borderRadius:'0.25rem',cursor:'pointer',paddingBlock:'0.5rem',borderRadius:'0.5rem',width:'100%'}
    useEffect(()=>{fetchBio()}, [])
    const confirm = ()=>{
        Swal.fire({
            title: 'Want to logout?',
            background: modeData.backSecondary,
            confirmButtonText: 'LOGOUT',
            showCancelButton: true,
            confirmButtonColor: themeData.themeBackground,
        }).then(result=>{if(result.isConfirmed) logout()})
    }
    return <div><GapV x='6'/>
        <FlexH x='space-between'>
            <FlexH x='flex-start'>
                <div style={{position:'relative'}}>
                    <label htmlFor='avatar'><Avatar size='4' src={avatar}/></label>
                    <input type='file' id='avatar' onChange={uploadAvatar} hidden/></div>
                    {/*<div style={{position:'absolute',bottom:'0',right:'0',background:'white',borderRadius:'50%',padding:'0.2rem'}}><Icon x='2'><MdCamera/></Icon>
                </div>*/}<GapH x='1'/>
                <div><h3>{bio?.fullname}</h3><GapV x='0.5'/><h4>{user?.username}</h4></div>
            </FlexH>
            <div><IconButton x='1.5'><MdEdit/></IconButton></div>
        </FlexH><GapV x='6'/>
        <div>
            <FlexH x='flex-start' y='center' style={listtile}><Icon x='1.7'><MdDeviceUnknown/></Icon><GapH x='2'/><h4>Device Lock</h4></FlexH><GapV x='2'/>
            <FlexH x='flex-start' y='center' style={listtile}><Icon x='1.7'><MdShield/></Icon><GapH x='2'/><h4>Two Step</h4></FlexH><GapV x='2'/>
            <FlexH x='space-between' style={listtile}>
                <FlexH x='flex-start'><Icon x='1.7'><MdOutlineDarkMode/></Icon><GapH x='2'/><h4>Dark Theme</h4></FlexH>
                <Switch /*theme={themeData}*/><input type='checkbox' checked={thememode=='dark'} onChange={e=>toggleMode(thememode=='dark'?'light':'dark')}/><span></span></Switch>
            </FlexH><GapV x='2'/>
            <FlexH x='flex-start' y='center' onClick={confirm} style={{...listtile,color:'red'}}><Icon x='1.7'><MdLogout/></Icon><GapH x='2'/><h4>Logout</h4></FlexH>
        </div>
    </div>
}
