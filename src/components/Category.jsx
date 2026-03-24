import {useTheme} from '../contexts/ThemeContext';
import {ScrollViewH,FlexH} from '../components/styled';

export default ({handler,selected,})=>{
  const {themeData,modeData} = useTheme()
  const getStyle = c=> ({background:selected==c?themeData.themeBackground:modeData.backSecondary,borderRadius:'0.25rem',color:selected==c?themeData.themeText:modeData.textPrimary,cursor:'pointer',padding:'0.5rem'});
  return <ScrollViewH style={{maxWidth:'48rem'}}>
    {/*<h3>{title}</h3>*/}
    <FlexH x='space-between' y='center' style={{height:'3rem',width:'48rem'}}>
    <h4 onClick={e=>handler('bundle')} style={getStyle('bundle')}>Bundle</h4>
    <h4 onClick={e=>handler('internet')} style={getStyle('internet')}>Internet</h4>
    <h4 onClick={e=>handler('minute')} style={getStyle('minute')}>Minute</h4>
    <h4 onClick={e=>handler('gift')} style={getStyle('gift')}>Gift</h4>
    </FlexH>
  </ScrollViewH>
}