export function saveLocalStorage(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks))
}