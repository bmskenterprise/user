import {useEffect,useState} from 'react';
import toast from 'react-hot-toast';
import {useTheme} from '../contexts/ThemeContext';
import {FlexH,GapH,Image} from '../components/styled';
import url from '../config/url';
import useArrayFetch from '../hooks/useArrayFetch'

export default ()=>{
  const {modeData:{backSecondary,textSecondary}} = useTheme();
  const {data} = useArrayFetch(url.urlContacts);
  
  
       
    
          
          
         
      
     
  
  
  return <div>
    {data?.map(({media,icon,contactURL},i)=><FlexH x='flex-start' y='center' style={{background:backSecondary,color:textSecondary,cursor:'pointer',marginBottom:'2rem'}} key={i} onClick={e=>window.open(contactURL)}>
      <Image src={icon} x='2'/><GapH x='2'/>
      <h3>{media}</h3>
    </FlexH>)}
  </div>
}