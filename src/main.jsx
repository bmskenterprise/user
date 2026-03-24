import {createRoot} from 'react-dom/client'
import {BrowserRouter} from 'react-router-dom'
import {Toaster} from 'react-hot-toast'
import {ThemeProvider} from './contexts/ThemeContext'
import {AuthProvider} from './contexts/AuthContext'
import {NotificationProvider} from './contexts/NotificationContext'
import {DepositProvider} from './contexts/DepositContext'
import {APIProvider} from './contexts/APIContext'
import {HistoryProvider} from './contexts/HistoryContext'
import {TelecomProvider} from './contexts/TelecomContext'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider>
      <AuthProvider>
        <NotificationProvider>
          <DepositProvider>
            <APIProvider>
              <HistoryProvider>
                <TelecomProvider>
                  <App />
                </TelecomProvider>
              </HistoryProvider>
              <Toaster/>
            </APIProvider>
          </DepositProvider>
        </NotificationProvider>
      </AuthProvider>
    </ThemeProvider>
  </BrowserRouter>
)
