import { useState, useEffect } from 'react';
import '../App.css'
export function DeleteModal({ isShowDelete, setTasks, idTask, onClose}){
    const [visible, setVisible] = useState(isShowDelete)

    useEffect(() => {
        if (isShowDelete) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        
    }, [isShowDelete])

    if (!visible) return null;

    const handleSubmit = (e)=>{
        e.preventDefault()
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
        const index = tasks.findIndex(task => task.id === idTask)
        const taskToDelete = tasks[index]
        if(!taskToDelete) return
        const newTasks = tasks.filter(task => task.id !== idTask)
        localStorage.setItem('tasks', JSON.stringify(newTasks))
        setTasks(newTasks)
        onClose()
    }

    return(
        <div className={`confirm-modal-delete modal showed ${isShowDelete ? 'bg-modal-entered' : 'bg-modal-leaving'}`} onClick={onClose}>
            <div className={`confirm-container-delete confirm-modal ${isShowDelete ? 'modal-entered' : 'modal-leaving'}`}  onClick={(e) => e.stopPropagation()}>
                <img src="images/delete.png" alt="" />
                <h1>¿Seguro que deseas eliminar esta tarea?</h1>
                <div>
                    <button className="btn-delete-cancel btn-cancel-modal" onClick={onClose}>Cancelar</button>
                    <button className="btn-delete-confirm btn-confirm-modal" onClick={handleSubmit}>Confrimar</button>
                </div>
            </div>
        </div>
    )
}