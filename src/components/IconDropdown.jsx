import {useEffect,useState} from 'react';
import {GapH,Dropdown,DropdownSelected,DropdownItems,DropdownItem,TinyIcon,Image} from './styled';
import {useTheme} from '../contexts/ThemeContext';

export default ({items,toggleState,marked,handler}) =>{
  const {modeData:{backPrimary,backSecondary}} = useTheme();
  const [selected,setSelected] = useState(marked??items[0]);
  useEffect(()=>{if(marked||items.length>0) setSelected(marked??items[0])}, [items,marked])
  
  const onSelect = (name,icon) =>{handler(name,icon);setSelected({name,icon});/*toggleState.handler(false)*/}
  
  return <Dropdown>
    <DropdownSelected onClick={e=>{e.stopPropagation();toggleState.toggler(true)}}><Image x='2' src={selected?.icon}/><GapH x='1'/></DropdownSelected>
    {toggleState.drop&&<DropdownItems>{items.map(({name,icon})=> <DropdownItem key={name} style={{background:selected?.name==name?backPrimary:backSecondary}} onClick={e=>onSelect(name,icon)}><TinyIcon src={icon}/><GapH x='1'/><h4>{name}</h4></DropdownItem>)}</DropdownItems>}
  </Dropdown>
};