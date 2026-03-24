import {useEffect,useState} from 'react';
import {useTheme} from '../contexts/ThemeContext';
import {GapH,Dropdown,DropdownSelected,DropdownItems,DropdownItem,TinyIcon,Image} from './styled';

export default ({items,toggleState,handler}) =>{
  //const [drop,setDrop] = useState(false);
  const [selected,setSelected] = useState(items[0]);
  useEffect(()=>{if(items.length>0) setSelected(items[0])}, [items])
  const {modeData:{backPrimary,backSecondary}} = useTheme();
  
  const onSelect = (name,icon) =>{handler(name,icon);setSelected({name,icon});toggleState.toggler(false)}//telecoms?.filter(t=>items.includes(t.name)) //const telecomIcons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
  //const opt = JSON.parse(localStorage.getItem('last-used'))[0]||items[0];
  return <Dropdown>
    <DropdownSelected onClick={e=>{e.stopPropagation();toggleState.toggler(true)}}><Image x='2' src={selected?.icon}/><GapH x='1'/><h4>{selected?.name}</h4></DropdownSelected>
    {toggleState.drop&&<DropdownItems>{items.map(({name,icon})=> <DropdownItem key={name} style={{background:selected?.name==name?backPrimary:backSecondary}} onClick={e=>onSelect(name,icon)}><TinyIcon src={icon}/><GapH x='1'/><h4>{name}</h4></DropdownItem>)}</DropdownItems>}
  </Dropdown>
};