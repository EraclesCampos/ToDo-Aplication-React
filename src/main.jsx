import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import { TasksFormProvider } from './Contexts/TaskFormContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TasksFormProvider>
      <App />
    </TasksFormProvider>
  </StrictMode>,
)
