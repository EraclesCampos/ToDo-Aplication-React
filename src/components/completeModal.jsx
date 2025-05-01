import { useState, useEffect } from 'react';
import '../App.css'
export function CompleteModal({ showComplete, setTasks, idTask, onClose}){
     const [visible, setVisible] = useState(showComplete)
    
    // console.log(isOpenFormAdd)

    useEffect(() => {
        if (showComplete) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        
    }, [showComplete])

    if (!visible) return null;

    const handleSubmit = (e)=>{
        e.preventDefault()
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
        const index = tasks.findIndex(task => task.id === idTask)
        const taskToComplete = tasks[index]
        if(!taskToComplete) return
        taskToComplete.completed = true
        tasks[index] = taskToComplete
        localStorage.setItem('tasks', JSON.stringify(tasks))
        setTasks(tasks)
        onClose()
    }

    return(
        <div className={`confirm-modal-complete modal showed ${showComplete ? 'modal-animation-entered' : 'modal-animation-leaving'}`} onClick={onClose}>
            <div className={`confirm-container-complete confirm-modal ${showComplete ? 'form-animation-entered' : 'form-animation-leaving'}`}  onClick={(e) => e.stopPropagation()}>
                <img src="check.png" alt="" />
                <h1>¿Seguro que deseas completar esta tarea?</h1>
                <div>
                    <button className="btn-complete-cancel btn-cancel-modal" onClick={onClose}>Cancelar</button>
                    <button className="btn-complete-confirm btn-confirm-modal" onClick={handleSubmit}>Confrimar</button>
                </div>
            </div>
        </div>
    )
}