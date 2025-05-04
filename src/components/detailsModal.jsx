import { useState, useEffect } from 'react';
import '../App.css'
export function DetailsModal({ isShowDetailsTask, tasks, idTask, onClose}){
    const [visible, setVisible] = useState(isShowDetailsTask)
    const task = tasks.find(task => task.id === idTask)
    const fechaEscrita = task?.date ? new Date(task.date).toLocaleTimeString('es-ES',{ year: "numeric", month: "long", day: "numeric"}) : null
    
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
                        <h4 className='h-infoTask'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                        <path d="M4 20h4l10.5 -10.5a2.828 2.828 0 1 0 -4 -4l-10.5 10.5v4"></path>
                        <path d="M13.5 6.5l4 4"></path>
                        </svg>Titulo</h4>
                        {task.title ? <p className="taskName p-infoTask">{task.title}</p> : <p className="taskName p-infoTask">Sin titulo</p>}
                    </div>
                    <div>
                        <h4 className='h-infoTask'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" width="24" height="24" strokeWidth="2">
                        <path d="M14 3v4a1 1 0 0 0 1 1h4"></path>
                        <path d="M5 12v-7a2 2 0 0 1 2 -2h7l5 5v4"></path>
                        <path d="M5 21h14"></path>
                        <path d="M5 18h14"></path>
                        <path d="M5 15h14"></path>
                        </svg>Descripcion</h4>
                        {task.description ? <p className="taskDescription p-infoTask">{task.description}</p> : <p className="taskDescription p-infoTask">Sin descripcion</p>}
                    </div>
                    <div>
                        <h4 className='h-infoTask'><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" width="24" height="24" strokeWidth="2" strokeLinejoin="round" strokeLinecap="round" stroke="currentColor">
                        <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"></path>
                        <path d="M16 3l0 4"></path>
                        <path d="M8 3l0 4"></path>
                        <path d="M4 11l16 0"></path>
                        <path d="M8 15h2v2h-2z"></path>
                        </svg>Fecha</h4>
                        {task.date ? <p className="taskDate p-infoTask">{fechaEscrita}</p> : <p className="taskDate p-infoTask">Sin fecha</p>}
                    </div>   
                </div>
            </div>
        </div>
    )
}