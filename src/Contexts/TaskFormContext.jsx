// crear un contexto para los inputs del formulario
import { createContext, useContext, useState } from "react";

const TasksFormContext = createContext()

const initialValues = {
    title: '',
    description: '',
    date: '',
    rememberOnceADay: false,
    lastNotified: null,
}

export function TasksFormProvider({children}){
    const [formValues, setFormValues] = useState(initialValues)
    const [editingTaskId, setEditingTaskId] = useState(null)

    const mode = editingTaskId ? 'edit' : 'create'

    const updateField = (name, value) => {
        setFormValues(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const loadTaskToEdit = (task) => {
        setFormValues({
            title: task.title,
            desceription: task.description,
            date: task.date,
            rememberOnceADay: task.rememberOnceADay,
        })
        setEditingTaskId(task.id)
    }
    const resetForm = ()=>{
        setFormValues(initialValues)
        setEditingTaskId(null)
    }

    const values = {
        formValues,
        updateField,
        loadTaskToEdit,
        resetForm,
        mode,
        editingTaskId,
    }
    
    return(
        <TasksFormContext.Provider value={values}>
            {children}
        </TasksFormContext.Provider>
    )
}

export function useTasksFormContext(){
    const context = useContext(TasksFormContext)
    
    return context
}
