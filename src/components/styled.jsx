import styled,{keyframes} from 'styled-components';
const size = {
  lg: '70%',
  md: '50%',
  sm: '20%'
};

export const CenterCard = styled.div`
  background: ${({theme})=> theme.modeData?.backSecondary};
  border-radius:0.5rem;
  box-shadow: ${({theme})=> theme.modeData?.glassmorph.shadow};
  width: 30rem;
  //height: 20rem;
  padding: 2rem;
  position:absolute;
  top:50%;
  left:50%; 
  transform:translate(-50%,-50%);
`;

export const Stack = styled.div`
  position: relative;
`
export const ScrollViewH = styled.div`
  overflow-x: auto;
  &::-webkit-scrollbar {
    display: none;
  }  
`
export const NavToggler = styled.div`
  background: ${({theme})=>theme.modeData?.backSecondary};
  cursor: pointer;   //
  padding: 1rem;
  @media (min-width:768px){
    display: none;  
  }
`
/*     :   ;
      max-height: 150px;
      z-index: 1;*/
export const Header = styled.div`
  background: ${({theme})=>theme.modeData?.backPrimary};
  color: ${({theme})=>theme.modeData?.textPrimary};
  height: 4rem;position: sticky;top: 0;left: 0;
  width: 100%;
  padding: 1rem;
    display: flex;background:red;
    flex-flow: row nowrap;
    align-items: center;
    justify-content: space-between;
`
  /*@media  (min-width:768px){
    & Burger{display: none;}
  }*/

export const Menu = styled.div`
  //width: 100%;
  height: 100%;
  position: absolute;
  & >ul {
    display: ${({$toggleNav})=>$toggleNav?'block':'none'};
    position: absolute;top: 100%;left: 0;
  }
  @media  (min-width:768px){
    width: 80%;
    display: flex;flex-flow:row nowrap;justify-content: flex-end;align-items: center;
    & >ul{position:static}
    & >ul >li{
      //color: ${({theme})=>theme.modeData?.textPrimary};
      display: inline-block;position: relative;
      margin: 0 1rem;
      & a{color: ${({theme})=>theme.modeData?.textPrimary};line-height: 3rem;}
      & ul{
        background: ${({theme})=>theme.modeData?.backPrimary};
        display: none;
        position: absolute;top: 100%;left: 0;width:14rem;
      }
      &:hover >ul{display: block;}
    }
  }
`
    //background: ;
export const Badge = styled.div`
  background: red;
  color: white;
  position: absolute;top: -0.5rem;
  left: -0.5rem;
  padding: 0.25rem 0.5rem;
`
export const InlineBadge = styled.span`
  background: red;
  color: white;
  padding:0.25rem 0.5rem;font-size: 0.5rem;
`
export const Section = styled.section`
  border: 1px solid #ddd;
  border-radius: 2rem;
  margin: 3rem auto;
  padding: 1rem;
  width: 90%;
`
export const FlexH = styled.div`
  display: flex;
  flex-flow:row wrap;
  justify-content: ${({x})=>x};
  align-items: ${({y})=>y};
`;

export const FlexV = styled.div`
  display: flex;
   flex-flow: column nowrap;
    justify-content: ${({y})=>y};
    align-items: ${({x})=>x};
`
export const GapV = styled.div`
  height: ${({x})=>x}rem;
`
export const GapH = styled.div`
  width: ${({x})=>x}rem; 
`
export const Avatar = styled.img`
  border-radius: 50%; 
  cursor: pointer;
  width: ${({size})=>size}rem;
  height: auto;
`
export const IconButton = styled.button`
  background: none;
  border: none;
  cursor: pointer;
`
export const ActionBtn = styled.div`
  background: ${({theme})=>theme.modeData?.backSecondary};
  color: ${({theme})=>theme.modeData?.textSecondary};
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 5rem;
  padding: 0.5rem;width: 20%;
  & i{font-size: 2.2rem;}
  & span{font-size: 1.1rem}
`

export const ImageIcon = styled.img`
    width: ${({x})=>x}rem;
    height: ${({x})=>x}rem;
`
/*export const Icon = styled.img`
  width: ${({x})=>x}rem;
  height: ${({x})=>x}rem;
`;*/

export const TinyIcon = styled.img`
  width: 1.5rem;
  height: 1.5rem;
`;

export const Icon = styled.i`
  font-size: ${({x})=>x}rem;
`

export const AmountOption = styled.button`
    background: none;
    border: 1px solid cyan;
    border-radius: 1rem;
    width: 100%;
`


export const TypeInit = styled.div`
    background: white;
    border-radius: 1rem;
    position: absolute  ;top: 50%;left: 50%;
    width: 90%;
    transform: translate(-50%,-50%);
`
export const Select = styled.select`
  background: transparent;
  & >option{
    background: ${({theme})=>theme.modeData?.backSecondary};
    color: ${({theme})=>theme.modeData?.textPrimary};
  }
`

export const Field = styled.input`
  background: transparent;
  border: 1px solid ${({theme})=>theme.modeData?.textSecondary};
  color: ${({theme})=>theme.modeData?.textPrimary};
  outline: none;
  &:focus{border:1px solid ${({theme})=>theme.themeData?.themeBackground};}
  width: ${({x})=>x}rem;
`;
export const TextField= styled.input`
  background:transparent;
  border: 1px solid ${({theme})=>theme.modeData?.textPrimary};
  color: ${({theme})=>theme.modeData?.textPrimary};font-size: 1.2rem;
  outline: none;
  padding: 0.5rem;
  &:focus{border:1px solid ${({theme})=>theme.themeData?.themeBackground};}
  width: 100%;
`
export const DatePicker = styled.input`
  background: transparent;
  border: 1px solid ${({theme})=>theme.modeData?.textPrimary};
  color: ${({theme})=>theme.modeData?.textPrimary};
  outline: none;
  &:focus{border:1px solid ${({theme})=>theme.themeData?.themeBackground};}
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);opacity: 0.8;
  }
`
export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 48px;
  height: 24px;
  cursor: pointer;
  & input{
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span {
      background-color: ${({theme})=>theme.themeData?.themeBackground};
    }
    &:checked + span::before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
  }
  & span{
    border-radius: 24px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.4s;
    transition: 0.4s;
    &::before{
      background-color: white;
      border-radius: 50%;
      bottom: 4px;
      content: '';
      position: absolute;
      height: 20px;
      width: 20px;
      left: 4px;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }
`
export const ErrorText = styled.span`color:red;`

export const ThemeButton= styled.button`
  background:${({theme})=> theme.themeData?.themeBackground};
  border:0;
  border-radius: 0.25rem;
  color:${({theme})=> theme.themeData?.themeText};
  cursor: pointer;
  font-size: 1.5rem;
  padding: 0.5rem 1rem;
  outline: none;
  &:disabled{cursor: not-allowed}
`;

export const Dropdown = styled.div`
    position: relative;
    display: inline-block;
`;    
export const DropdownSelected = styled.div`
  padding: 10px;
  border: 1px solid #ccc;
  cursor: pointer;display: flex;align-items: center;
  & span{display: none;}
  @media (min-width:768px){display: inline;}
`    
export const DropdownItems = styled.div`
  display: none;
  position: absolute;
  border: 1px solid #ccc;
  background: white;
  width: 100%;
  max-height: 150px;
  overflow-y: auto; 
  z-index: 1;
`    
export const DropdownItem = styled.div`
    padding: 10px;
      display: flex;
      align-items: center;
      cursor: pointer;
`    
export const Pagination = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  padding: 0;
  list-style-type: none;
  & button{
    background: none;
    color: ${({theme})=>theme.modeData?.textPrimary};
    border: 1px solid ${({theme})=>theme.modeData?.textPrimary};
    cursor: pointer;
    width: 2.5rem;
    height: 2.5rem;
  }
`
export const PaginationBar = styled.div`
  height: 10%;
  display: flex;
  justify-content: center;
  align-items: center;
`
const spinner = keyframes`
  from{transform: rotate(0deg);}
  to{transform: rotate(360deg);}
`
export const Spinner = styled.div`
  animation: ${spinner} 1s linear infinite;
  border: 3px solid ${({theme})=> theme.themeData?.themeBackground};
  border-top: 3px solid transparent;
  border-radius: 50%;
  width: ${({size})=> size?size:2}rem;
  height: ${({size})=> size?size:2}rem;
`;

export const Loader = styled.div`
  background:rgba(0,0,0,0.8);
  width: 100%;
  height: 100vh;
  position: absolute;
  //place-items: center;
  top: 0;
  left: 0;
  z-index: 5;
`;
export const FullScreen = styled.div`
  background: ${({theme})=>theme.modeData?.backPrimary};
  //position: absolute;
  width:100vw;
  height:100vh;
`