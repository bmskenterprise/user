import {useTheme} from '../contexts/ThemeContext';
import {ScrollViewH,FlexH} from '../components/styled';

export default ({handler,selected,})=>{
  const {themeData} = useTheme()
  const getColor = c=> selected==c?themeData.themeBackground:'';
  return <ScrollViewH style={{maxWidth:'48rem'}}>
    {/*<h3>{title}</h3>*/}
    <FlexH x='space-between' style={{width:'48rem'}}>
    <h6 onClick={e=>handler('bundle')} style={{color:getColor('bundle')}}>Bundle</h6>
    <h6 onClick={e=>handler('internet')} style={{color:getColor('internet')}}>Internet</h6>
    <h6 onClick={e=>handler('minute')} style={{color:getColor('minute')}}>Minute</h6>
    <h6 onClick={e=>handler('gift')} style={{color:getColor('gift')}}>Gift</h6>
    </FlexH>
  </ScrollViewH>
}