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
export const Header = styled.div`
  background: ${({theme})=>theme.modeData?.backSecondary};
  color: ${({theme})=>theme.modeData?.textPrimary};
  height: 4rem;position: sticky;top: 0;left: 0;
  width: 100vw;
  z-index: 10;
  /* display: flex;
    flex-flow: row nowrap;
  align-items: center;
  justify-content: space-between;*/
`

export const NavToggler = styled.div`
  //background: ${({theme})=>theme.modeData?.backSecondary};
  cursor: pointer;width:15%;position: absolute;top:0;left: 0;
  display: grid;place-items: center;height: 100%;z-index: 10;
  @media (min-width:768px){
    display: none;  
  }
`
export const Menu = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;top:0;right: 0;z-index: 9;
    display: flex;flex-flow:row nowrap;justify-content: flex-end;align-items: center;
  //}
  & >ul {
    width: 100vw;background: ${({theme})=>theme.modeData?.backSecondary};
    height: 100vh;
    display: ${({togglenav})=>togglenav?'block':'none'};
    position: absolute;top: 100%;left: 0;
    padding-left: 2rem;
    @media (min-width:768px){
      //display: block;
      width:90%;
      position:static;
      height: 100%;display: flex;flex-flow:row nowrap;justify-content: flex-end;align-items: center;
      gap:0 2rem;
    }
  }
  & >ul >li{
    margin:1rem 0 1rem;
    @media (min-width:768px){
      /*display: inline-block;*/position: relative;
      //margin: 0 1rem;
      //& a{color: ${({theme})=>theme.modeData?.textPrimary};line-height: 3rem;}
      /*& ul{
        background: ${({theme})=>theme.modeData?.backPrimary};
        display: none;
        position: absolute;top: 100%;left: 0;width:14rem;text-align: left;}*/
      //&:hover >ul{display: block;}
    }
    & >ul{
      background: ${({theme})=>theme.modeData?.backSecondary};
      display: none;
      margin-left:1rem;
      @media (min-width: 768px){
      position: absolute;top: 100%;left: 0;width:14rem;//text-align: left;
      }
    }
    & a{color: ${({theme})=>theme.modeData?.textPrimary};line-height: 4rem;}
    &:hover >ul{display:block;}
  }
`

export const ProfileSection = styled.div`
  width: 10%;//margin-left: auto;
`

export const ProfileIcon = styled.div`
  width: 5rem;
  height: 4rem;
  display: grid; 
  place-items: center;
  cursor: pointer;margin-left: auto;
`
export const Badge = styled.span`
  background: red;
  border-radius: 50%;
  color: white;
  @media (min-width:768px){position: absolute;top: 25%;
  left: -0.5rem;}
  padding: 0.25rem 0.5rem;
`
export const InlineBadge = styled.span`
  background: red;
  color: white;
  padding:0.25rem 0.5rem;font-size: 0.8rem;
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
  display: inline-block;
`
export const Avatar = styled.img`
  border-radius: 50%; 
  cursor: pointer;
  width: ${({size})=>size}rem;
  height: auto;
`
export const BalanceButton = styled.button`
  background: ${({theme})=>theme.modeData?.backPrimary};
  border: none;border-radius: 1.5rem;
  color: ${({theme})=>theme.modeData?.textPrimary};
  font-size: 1.1rem;
  cursor: pointer;
  padding: 0.4rem 1.5rem;outline:none;
`

export const IconButton = styled.button`
  background: ${({theme})=>theme.modeData?.backSecondary};
  border: none;
  color: ${({theme})=>theme.modeData?.textPrimary};
  cursor: pointer;
  font-size: ${({size})=>size?size:'1'}rem;
  padding: 0.5rem;outline:none;
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
  & i{font-size: 1.8rem;}
  & span{font-size: 0.8rem}
`

export const Image = styled.img`
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
`


export const TypeInit = styled.div`
  background: white;border-radius: 1rem;
    position: absolute  ;top: 50%;left: 50%;
    width: 90%;
    transform: translate(-50%,-50%);
`
export const Select = styled.select`
  color: ${({theme})=>theme.modeData?.textPrimary};
  padding: 0.8rem;
  text-transform: capitalize;
  background: transparent;font-size: 1.2rem;
  & >option{
    background: ${({theme})=>theme.modeData?.backSecondary};
    color: ${({theme})=>theme.modeData?.textPrimary};
  }
`
export const TA = styled.textarea`
  background: transparent;
  border: 1px solid ${({theme})=>theme?.modeData?.textPrimary};
  color: ${({theme})=>theme?.modeData?.textPrimary};font-size: 1.5rem;
  outline: none;
  &:focus{border:1px solid ${({theme})=>theme?.themeData?.themeBackground};}
`

export const Field = styled.input`
  background: transparent;
  border: 1px solid ${({theme})=>theme.modeData?.textSecondary};
  color: ${({theme})=>theme.modeData?.textSecondary};
  outline: none;
  &:focus{border:1px solid ${({theme})=>theme.themeData?.themeBackground};}
  width: ${({x})=>x}rem;
  font-size: 1.1rem;
  padding: 0.2rem;
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
  color: ${({theme})=>theme.modeData?.textPrimary};font-size: 1.2rem;
  outline: none;
  &:focus{border:1px solid ${({theme})=>theme.themeData?.themeBackground};}
  &::-webkit-calendar-picker-indicator {
    filter: invert(1);opacity: 0.8;
  }
`
export const Switch = styled.label`
  position: relative;
  display: inline-block;
  width: 44px;
  height: 22px;
  cursor: pointer;
  /*@media  (min-width:768px){
    width: 48px;
    height: 27px
  }*/
  & input{
    opacity: 0;
    width: 0;
    height: 0;
    &:checked + span {
      background-color: ${({theme})=>theme.themeData?.themeBackground};
    }
    &:checked + span::before {
      -webkit-transform: translateX(22px);
      -ms-transform: translateX(22px);
      transform: translateX(22px);
      /*@media (min-width:768px){
        -webkit-transform: translateX(21px);
        -ms-transform: translateX(21px);
        transform: translateX(21px);
      }*/
    }
  }
  & span{
    border-radius: 22px;
    position: absolute;
    cursor: pointer;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: #ccc;
    -webkit-transition: 0.2s;
    transition: 0.2s;
    /*@media (min-width:768px) {
      border-radius: 27px;
    }*/
    &::before{
      background-color: white;
      border-radius: 50%;
      bottom: 2px;
      content: '';
      position: absolute;
      height: 18px;
      width: 18px;
      left: 2px;
      -webkit-transition: 0.2s;
      transition: 0.2s;
      /*@media (min-width:768px) {
        width: 21px;
        height: 21px;bottom:3px
      }*/
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
  font-size: 1.2rem;
  padding: 0.3rem 0.6rem;
  outline: none;
  &:disabled{cursor: not-allowed}
`;

export const Dropdown = styled.div`
  width: 100%;
  position: relative;
  height: 3rem;
  //display: inline-block;
`;    
export const DropdownSelected = styled.div`
  border: 1px solid ${({theme})=>theme.modeData?.backSecondary};
  cursor: pointer;display: flex;align-items: center;justify-content: flex-start;
  padding-left: 0.5rem;
  width: 100%;
  height: 100%;
  & h4{text-transform: capitalize;}
  & span{color: ${({theme})=>theme.modeData?.textPrimary};}
  //@media (min-width:768px){display: inline;}
`    
export const DropdownItems = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  background: ${({theme})=>theme.modeData?.backSecondary};
  width: 100%;
  max-height: 150px;
  overflow-y: auto; 
  z-index: 1;
`    
export const DropdownItem = styled.div`
  display: flex;justify-content: flex-start;
  align-items: center;
  & h4{text-transform: capitalize;}
  //background: ${({theme})=>theme.modeData?.backPrimary};
  color: ${({theme})=>theme.modeData?.textPrimary};
  width: 100%;
  height: 3rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 0.5rem;
`    //


export const TR = styled.tr`
  background: ${({theme})=>theme.modeData?.backPrimary};
  font-size: 0.8rem;
  padding-block: 0.8rem;
  @media (min-width:768px){
    font-size: 1.3rem;
  }
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

export const Center = styled.div`
  width: 100%;
  height: 100%;
  display: grid;
  place-items: center;
`
export const Loader = styled.div`
  background:rgba(0,0,0,0.8);
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