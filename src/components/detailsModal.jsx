import { useState, useEffect } from 'react';
import '../App.css'
export function DetailsModal({ isShowDetailsTask, tasks, idTask, onClose}){
    const [visible, setVisible] = useState(isShowDetailsTask)
    const task = tasks.find(task => task.id === idTask)
    
    useEffect(() => {
        if (isShowDetailsTask) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
    }, [isShowDetailsTask])

    if (!visible){
        return null;
    } 
    
    if(!task) return null
    
    return(
        <div className={`details-task-modal modal showed ${isShowDetailsTask ? 'bg-modal-entered' : 'bg-modal-leaving'}`} onClick={onClose}>
            <div className={`details-task-container ${isShowDetailsTask ? 'modal-entered' : 'modal-leaving'}`} onClick={(e) => e.stopPropagation()}>
                <img className="closeModal" src="images/close.png" title="cerrar" onClick={onClose} />
                <h2>Detalles</h2>
                <div>
                    <div>
                        <h4>Titulo</h4>
                        {task.title ? <p className="taskName infoTask">{task.title}</p> : <p className="taskName infoTask">Sin titulo</p>}
                        {/* <p className="taskName"></p> */}
                    </div>
                    <div>
                        <h4>Descripcion</h4>
                        {task.description ? <p className="taskDescription infoTask">{task.description}</p> : <p className="taskDescription infoTask">Sin descripcion</p>}
                        {/* <p className="taskDescription"></p> */}
                    </div>
                    <div>
                        <h4>Fecha</h4>
                        {task.date ? <p className="taskDate infoTask">{task.date.replace('T', ' ')}</p> : <p className="taskDate infoTask">Sin fecha</p>}
                        {/* <p className="taskDate"></p> */}
                    </div>   
                </div>
            </div>
        </div>
    )
}