import {useState} from 'react';
//import {useTelecom} from '../contexts/TelecomContext';
import {Dropdown,DropdownSelected,DropdownItems,DropdownItem,TinyIcon} from './styled';

export default ({items,/*selected,*/handler}) =>{
  const [drop,setDrop] = useState(false);
  //let {telecoms} = useTelecom();
  //const allowedTelecoms= telecoms?.filter(t => items.includes(t.name)) //const telecomIcons = telecoms ? Object.fromEntries(telecoms.map(item=>[item.name,item.icon])) :{};
  //const opt = JSON.parse(localStorage.getItem('last-used'))[0]||items[0];
  const [selected,setSelected] = useState(items[0]);
  
  return <Dropdown>
    <DropdownSelected onClick={e=>setDrop(prev=>!prev)}><TinyIcon src={selected.icon}/><span>{selected.name}</span></DropdownSelected>
    {drop&&<DropdownItems>{items.map(({name,icon})=> <DropdownItem key={name} onClick={e=>{handler(name,icon);setSelected({name,icon})}}><TinyIcon src={icon}/><span>{name}</span></DropdownItem>)}</DropdownItems>}
  </Dropdown>
};