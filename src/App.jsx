import { useState, useEffect } from 'react'
import './App.css'
import { AddTareaForm } from './components/addTaskForm'
import { EditTaskForm } from './components/editTaskForm'
import { CompleteModal } from './components/completeModal'


function App() {
  const [tasks, setTasks] = useState(localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [])
  // const [task, setTarea] = useState('')
  const [isOpenFormAdd, setIsOpenFormAdd] = useState(false)
  const [isOpenFormEdit, setIsOpenFormEdit] = useState(false)
  const [showComplete, setShowComplete] = useState(false)
  const [showDelete, setShowDelete] = useState(false)
  const [showDetailsTask, setShowDetailsTask] = useState(false)
  const [idTask, setIdTask] = useState(null)

  const filterTasksCompleted = tasks.filter(task => task.completed === false)

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
                    <button className='check' onClick={()=>{setIdTask(task.id); setShowComplete(true)}}><img src='images/check.png'/></button>   
                    <button className="delete" onClick={()=>setShowDelete(true)}><img src='images/delete.png'/></button>
                    <button className='edit' onClick={()=>{setIdTask(task.id); setIsOpenFormEdit(!isOpenFormEdit)}}><img src='images/edit.png'/></button>
                    <button className="details" onClick={()=>setShowDetailsTask(true)}><img src='images/info.png'/></button>
                    <input type="hidden" value={task.id} />
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
      <CompleteModal showComplete={showComplete} setTasks={setTasks} idTask={idTask} onClose={()=>setShowComplete(false)}/>
      {/* <DeleteModal showDelete={showDelete} setTasks={setTasks} idTask={idTaskEdit} onClose={()=>setShowDelete(false)}/> */}
      {/* <DetailsModal showDetailsTask={showDetailsTask} setTasks={setTasks} idTask={idTaskEdit} onClose={()=>setShowDetailsTask(false)}/> */}
    </>
  )
}

export default App
