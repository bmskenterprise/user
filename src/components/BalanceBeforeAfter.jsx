import {FlexH,FlexV} from './styled'
export default ({before,after}) =>{
  return <FlexH x='space-between'>
                  <FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>Current Balance</h4><h3>&#2547;{before}</h3></FlexV>
                  <FlexV style={{width:'50%',height:'5rem'}} x='center'><h4>New Balance</h4><h3>&#2547;{after}</h3></FlexV>
              </FlexH>
}