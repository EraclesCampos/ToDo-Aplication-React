import { useState, useEffect } from 'react'
import './App.css'
import { AddTareaForm } from './components/addTaskForm'
import { EditTaskForm } from './components/editTaskForm'
import { CompleteModal } from './components/completeModal'
import { DeleteModal } from './components/deleteModal'
import { DetailsModal } from './components/detailsModal'


function App() {
  const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [])
  // const [task, setTarea] = useState('')
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false)
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false)
  const [isShowComplete, setShowComplete] = useState(false)
  const [isShowDelete, setShowDelete] = useState(false)
  const [isShowDetailsTask, setShowDetailsTask] = useState(false)
  const [idTask, setIdTask] = useState(null)

  const filterTasksCompleted = tasks.filter(task => task.completed === false)

  useEffect(() => {
    if(Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  },[])

  // manejo de notificaciones
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission()
    }
  
    const notifiedTasks = new Set()
  
    const interval = setInterval(() => {
      const ahora = new Date()
  
      tasks.forEach(task => {
        const fechaRecordatorio = new Date(task.date)
        if (!task.completed && fechaRecordatorio <= ahora) {
          mostrarNotificacion(task.title)
          notifiedTasks.add(task.id)
        }
      })
      console.log("verificado")
    }, 60000)
  
    return () => clearInterval(interval)
  }, [tasks])

  function mostrarNotificacion(task) {
    if (Notification.permission === 'granted') {
      new Notification('Tarea pendiente', {
        body: `Recordatorio de tarea: ${task}`,
        icon: 'images/checked.ico'
      })
    } else if (Notification.permission !== 'denied') {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('Tarea pendiente', {
            body: `Recordatorio de tarea: ${task}`,
            icon: 'images/checked.ico'
          })
        }
      })
    }
  }

  return (
    <>
      <div className="global-container">
        <img src="images/checked.png" alt="completadas" title="completadas" className="completadas" />
        <h1 className="title">Tu lista de tareas</h1>
        <div className="tareas-container">
            {tasks.length === 0 || filterTasksCompleted.length === 0 ? 
              <p>No hay tareas pendientes</p>
              :
             tasks.map((task, index) =>{
              return (
              task.completed ? null : 
              <div className="tarea" key={index} data-id={task.id}>
                <div className="h3-container">
                    <h3>{task.title}</h3>
                </div>
                <div className="check-delete">
                    <button className='check' title='Marcar tarea como completada' onClick={()=>{setIdTask(task.id); setShowComplete(true)}}><img src='images/check.png'/></button>   
                    <button className="delete" title='Eliminar tarea' onClick={()=>{setIdTask(task.id); setShowDelete(true)}}><img src='images/delete.png'/></button>
                    <button className='edit' title='Editar tarea' onClick={()=>{setIdTask(task.id); setIsOpenFormEdit(true)}}><img src='images/edit.png'/></button>
                    <button className="details" title='Ver detalles de la tarea' onClick={()=>{setIdTask(task.id); setShowDetailsTask(true)}}><img src='images/info.png'/></button>
                </div>
              </div>)
            })}
        </div>
        <div className="add-container">
            <button className="add" title="agregar" onClick={()=>setIsOpenFormAdd(!isOpenFormAdd)}><img src="images/add.png" alt="agregar" /></button>
        </div>
      </div>
      <AddTareaForm isOpenFormAdd={isOpenFormAdd} setTasks={setTasks} onClose={()=>setIsOpenFormAdd(false)}/>
      <EditTaskForm isOpenFormEdit={isOpenFormEdit} setTasks={setTasks} tasks={tasks} idTaskEdit={idTask} onClose={()=>setIsOpenFormEdit(false)}/>
      <CompleteModal isShowComplete={isShowComplete} setTasks={setTasks} idTask={idTask} onClose={()=>setShowComplete(false)}/>
      <DeleteModal isShowDelete={isShowDelete} setTasks={setTasks} idTask={idTask} onClose={()=>setShowDelete(false)}/>
      <DetailsModal isShowDetailsTask={isShowDetailsTask} tasks={tasks} idTask={idTask} onClose={()=>setShowDetailsTask(false)}/>
    </>
  )
}

export default App
