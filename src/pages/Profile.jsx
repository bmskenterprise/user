import {useEffect, useState} from 'react';
import Swal from 'sweetalert2';
import toast from 'react-hot-toast';
import {MdEdit,MdCamera,MdDeviceUnknown,MdShield,MdOutlineDarkMode,MdLogout} from 'react-icons/md';
import {useAuth} from '../contexts/AuthContext';
import {useTheme} from '../contexts/ThemeContext';
import {FlexH,GapH,GapV,Avatar,Switch,IconButton,Icon} from '../components/styled';
import url from '../config/url';

export default ()  =>{
    const {user,fetchBio,bio,logout} = useAuth();
    const {themeData,modeData,thememode,toggleMode} = useTheme();
    const [avatar,setAvatar] = useState(user?.avatar);
    
    const uploadAvatar = e=> {
        const file = e.target.files[0];
        if(file &&file.type.startsWith('image/')) {
            const reader = new FileReader();
            reader.readAsDataURL(file)
            reader.onloadend = async ()=>{
                try{
                    const res = await fetch(url.urlAvatar,{
                        method:'POST',
                        headers:{'Content-Type':'application/json'},
                        body:JSON.stringify({avatar:reader.result})
                    });
                    if(!res.ok) throw new Error('Error uploading avatar')
                    setAvatar(reader.result)
                }catch(e) {toast.error(e.message)}
            }
        }
    }
    const listtile = {background:modeData.backSecondary,cursor:'pointer'}
    useEffect(()=>{fetchBio()}, [])
    const confirm = ()=>{
        Swal.fire({
            title: 'Want to logout?',
            confirmButtonText: 'LOGOUT',
            showCancelButton: true,
            confirmButtonColor: themeData.themeBackground,
        }).then(result=>{if(result.isConfirmed) logout()})
    }
    return <div>
        <FlexH x='space-between'>
            <FlexH x='flex-start'>
                <div style={{position:'relative'}}>
                    <Avatar size='8' src={avatar}/>
                    <div style={{position:'absolute',bottom:'0',right:'0',background:'white',borderRadius:'50%',padding:'0.2rem'}}><label htmlFor='avatar'><Icon x='2'><MdCamera/></Icon></label><input type='file' id='avatar' onChange={uploadAvatar} hidden/></div>
                </div><GapH x='2'/>
                <div><h3>{bio?.fullname}</h3><h4>{user?.username}</h4></div>
            </FlexH>
            <div><IconButton><MdEdit/></IconButton></div>
        </FlexH><GapV x='5'/>
        <div>
            <FlexH x='flex-start' style={listtile}><Icon x='2'><MdDeviceUnknown/></Icon><GapH x='2'/><h5>Device Lock</h5></FlexH><GapV x='3'/>
            <FlexH x='flex-start' style={listtile}><Icon x='2'><MdShield/></Icon><GapH x='2'/><h5>Two Step</h5></FlexH><GapV x='3'/>
            <FlexH x='space-between' style={listtile}>
                <FlexH x='flex-start'><Icon x='2'><MdOutlineDarkMode/></Icon><GapH x='2'/><h5>Dark Theme</h5></FlexH>
                <Switch /*theme={themeData}*/><input type='checkbox' checked={thememode=='dark'} onChange={e=>toggleMode(thememode=='dark'?'light':'dark')}/><span></span></Switch>
            </FlexH><GapV x='3'/>
            <FlexH x='flex-start' onClick={confirm} style={{...listtile,color:'red'}}><Icon x='2'><MdLogout/></Icon><GapH x='2'/><h5>Logout</h5></FlexH>
        </div>
    </div>
}
