import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import SocketProvider from './context/socketContext.tsx';
import { Toaster } from "@/components/ui/toaster"
import NotificationProvider from './context/notificationContext.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <SocketProvider>
      <NotificationProvider>
        <Toaster />
        <App />
      </NotificationProvider>
    </SocketProvider>
  </React.StrictMode>,
)
