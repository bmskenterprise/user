import './App.css';import {useMemo} from 'react';
import {Routes,Route} from 'react-router-dom'
import {ThemeProvider} from 'styled-components'
import ProtectedRoute from './pages/layout/ProtectedRoute'
import Login from './pages/Login';
import Home from './pages/Home'
import Balance from './pages/Balance'
import Withdraw from './pages/Withdraw'
import DepositManual from './pages/Deposit'
import DepositPayment from './pages/DepositPayment'
import Drive from './pages/DrivePackage'
import Regular from './pages/Re'
import Topup from './pages/Topup'
import Bkash from './pages/Bkash'
//import DBBL from './pages/DBBL'
//import Nagad from './pages/Nagad'
import Bill from './pages/PayBill'
import Bank from './pages/Bank'
import DepositHistory from './pages/history/DepositHistory'
import TopupHistory from './pages/history/TopupHistory'
import DriveHistory from './pages/history/DriveHistory'
import BillHistory from './pages/history/PayBillHistory'
import BkashHistory from './pages/history/BkashHistory'
//import DBBLHistory from './pages/history/DBBLHistory'
//import NagadHistory from './pages/history/NagadHistory'
import BankHistory from './pages/history/BankHistory'
//import ChangePIN from './pages/ChangePIN'
//import ChangePassword from './pages/ChangePassword'
import RegisterForm from './pages/Register'
import Profile from './pages/Profile'
import Notice from './pages/Notice'
import Contacts from './pages/Contacts'
import Feedback from './pages/Feedback'
//import DeviceLock from './pages/DeviceLock'
import RegFee from './pages/RegistrationFee'
import VerifyOTP from './pages/VerifyOTP'   
import {useTheme} from './contexts/ThemeContext'
import NotFound from './pages/NotFound';

export default() =>{
  const {themeData,modeData} = useTheme();
  const theme = useMemo(()=>({themeData,modeData}), [themeData,modeData])

  return <ThemeProvider theme={theme}><Routes>
      {/*<Account />
      </SecuritySettings>*/}
      <Route path='*' element={<NotFound/>}/>
      <Route path='/login' element={<Login/>}/>
      <Route path='/register' element={<RegisterForm/>}/>
      <Route path='/register/regfee' list={<RegFee/>}/>
      <Route path='/register/otp-verification' element={<VerifyOTP/>}/>
      <Route path='/*' element={<ProtectedRoute/>}>
        <Route path='index' element={<Home/>}/>
        <Route path='balance' element={<Balance/>}/>
        <Route path='withdraw' element={<Withdraw/>}/>
        <Route path='deposit/transaction' element={<DepositManual/>}/>
        <Route path='deposit/payment' element={<DepositPayment/>}/>
        <Route path='topup' element={<Topup/>}/>
        <Route path='drive' element={<Drive/>}/>
        <Route path='regular' element={<Regular/>}/>
        <Route path='bill' element={<Bill/>}/>
        <Route path='bkash' element={<Bkash/>}/>
        {/*<Route path='dbbl' element={<DBBL/>}/>
        <Route path='nagad' element={<Nagad/>}/>*/}
        <Route path='bank' element={<Bank/>}/>
        <Route path='deposit/history' element={<DepositHistory/>}/>
        <Route path='topup/history' element={<TopupHistory/>}/>
        <Route path='drive/history' element={<DriveHistory/>}/>
        <Route path='bill/history' element={<BillHistory/>}/>
        <Route path='bkash/history' element={<BkashHistory/>}/>
        {/*<Route path='nagad/history' element={<NagadHistory/>}/>
        <Route path='dbbl/history' element={<DBBLHistory/>}/>
        <Route path="password" element={<ChangePassword/>}/>
        <Route path="pin" element={<ChangePIN/>}/>*/}
        <Route path='bank/history' element={<BankHistory/>}/>
        {/*</Route><Route path="device-lock" element={<DeviceLock/>}/>
        <Route path="two-step" element={<TwoStep/>}/>*/}
        <Route path="notice" element={<Notice/>}/>
        <Route path="profile" element={<Profile/>}/>
        <Route path="contact" element={<Contacts/>}/>
        <Route path='feedback' element={<Feedback/>}/>
      </Route> 
    </Routes>       
    </ThemeProvider>
}
      {/*typeInit && <div className='blur' onClick={e=>setTypeInit(false)}>
        <TypeInit onClick={e=>e.stopPropagation()}>
          <div href="" target="">
            <h4>select balance type</h4>
            <button style={{color:'red',float:'right'}} onClick={()=>setTypeInit(false)}>&times;</button>
          </div>
          <div href="" target="">
            {balanceTypes.map(type=> <div> <label htmlFor={type}>{type}</label> <input onInput={checkBalance} className="logo " type="radio" name='balance-type' value={type} id={type} /></div>)}
        </TypeInit>
      </div>*/}
  

  
