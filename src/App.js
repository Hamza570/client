import React from 'react'
import { StyledEngineProvider } from '@mui/material/styles';
import MiniDrawer from './pages/mainBox/dashboard';
import SignIn from './pages/login';
import { Link, Route, Routes } from 'react-router-dom';
import "./App.css"
const App = () => {
  return (
    <>

    <StyledEngineProvider injectFirst>
      <MiniDrawer />
    </StyledEngineProvider>
    </>
  )
}

export default App