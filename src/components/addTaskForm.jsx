import React from 'react'
import { useState, useEffect } from 'react'
import '../App.css'
import { Form } from './form'
import { useTasksFormContext } from '../Contexts/TaskFormContext'
import { saveLocalStorage } from '../utils/saveLocalStorage'

export function AddTareaForm({isOpenedFormAdd, setTasks, onClose}) {
    const [error, setError] = useState(false)
    const [visible, setVisible] = useState(isOpenedFormAdd)
    const { resetForm } = useTasksFormContext()
    useEffect(() => {
        if (isOpenedFormAdd) {
            resetForm()
        }
    }, [isOpenedFormAdd])

    useEffect(() => {
        if (isOpenedFormAdd) setVisible(true)
        else setTimeout(() => setVisible(false), 250)
        setError(false)
        
    }, [isOpenedFormAdd])

    if (!visible) return null;

    const handleSubmit = (params)=>{
        if(!params.title.trim()){
            setError(true)
            return
        }
        const tarea = {
            id: Date.now(),
            title: params.title.trim(),
            description: params.description.trim(),
            date: params.date,
            rememberOnceADay: params.rememberOnceADay,
            completed: false,
            lastNotified: null,
        }
        const tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : []
        tasks.push(tarea)
        saveLocalStorage(tasks)
        setTasks(tasks)
        closeModal()
        
    }

    const closeModal = ()=>{
        onClose()
        setError(false)
        resetForm()
    }
    
    return (
        <Form
            isOpenedForm={isOpenedFormAdd}
            onClose={closeModal}
            onSubmit={handleSubmit}
            error={error}
        />
    )
}
