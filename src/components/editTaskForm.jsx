import React, { useEffect, useState } from 'react'
import '../App.css'
import { Form } from './form'
import { useTasksFormContext } from '../Contexts/TaskFormContext'
import { saveLocalStorage } from '../utils/saveLocalStorage'

export function EditTaskForm({isOpenedFormEdit, setTasks, tasks, idTaskEdit, onClose}) {
    const [lastNotified, setLastNotified] = useState(null)
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(isOpenedFormEdit)
    const {loadTaskToEdit, resetForm} = useTasksFormContext()
    
    useEffect(() => {
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const taskToEdit = tasks[index]
        if(!taskToEdit) return 

        loadTaskToEdit(taskToEdit)
    }
    , [idTaskEdit, tasks, isOpenedFormEdit])
    
    useEffect(() => {
        if (isOpenedFormEdit) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        setError(false)
        
    }, [isOpenedFormEdit])

    if (!visible) return null;

    const handleSubmit = (params)=>{
        if(!params.title.trim()){
            setError(true)
            return
        }
        const tarea = {
            id: Date.now(),
            title: params.title,
            description: params.description,
            date: params.date,
            rememberOnceADay: params.rememberOnceADay,
            completed: false,
            lastNotified: lastNotified,
        }
        const index = tasks.findIndex(task => task.id === idTaskEdit)
        const newTasks = [...tasks]
        newTasks[index] = tarea
        saveLocalStorage(newTasks)
        setTasks(newTasks)

        closeModal()
    }

    const closeModal = ()=>{
        onClose()
        setError(false)
        resetForm()
    }

    return (
        <Form
            isOpenedForm={isOpenedFormEdit}
            onClose={closeModal}
            onUpdate={handleSubmit}
            error={error}
        />
    )
  }