import {createContext,useContext,useState} from 'react';
import getComplementaryColor from '../utils/complementaryColor'
const ThemeContext = createContext();

export const ThemeProvider = ({children})=>{
    let appMode = localStorage.getItem('mode') || 'dark'
    const [thememode,setThememode] = useState(appMode)
    const statusTheme = {
        pending: '#FFC107',
        success: '#4CAF50',
        failed: '#F44336'
    }
    
    const modes = {
        dark: {
            backPrimary:'#121212',
            backSecondary:'#1E1E1E',
            textPrimary:'#FFFFFF',
            textSecondary:'#D9D9D9',
            glassmorph:{
                back:'rgba(255,255,255,0.1)',
                shadow:'0 4px 30px rgba(0, 0, 0, 0.1)'
            }
        },
        light: {
            backPrimary:'#FAFAFA',
            backSecondary:'#D9D9D9',
            textPrimary:'#212121',
            textSecondary:'#666666',
            glassmorph:{
                back:'rgba(255,255,255,0.1)',
                shadow:'0 4px 30px rgba(0, 0, 0, 0.1)'
            }
        },
    }
    const [themeData, setThemeData] = useState(JSON.parse(localStorage.getItem('theme')) || {themeBackground:'#08599f', themeText:getComplementaryColor('#08599f')});
    const [modeData, setModeData] = useState(modes[appMode]);
    const toggleMode = (selectedMode)=>{
        localStorage.setItem('mode', selectedMode);
        setThememode(selectedMode);
        setModeData(modes[selectedMode]);
    };
    const toggleTheme = (themeSet) =>{
        localStorage.setItem('theme', JSON.stringify(themeSet))
        setThemeData(themeSet)
    }
    return <ThemeContext.Provider value={{thememode,modeData,toggleMode,themeData,toggleTheme,statusTheme}}>{children}</ThemeContext.Provider>
}

export const useTheme = ()=> useContext(ThemeContext);