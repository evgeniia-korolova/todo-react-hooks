import { useState} from "react";

import './AddTodo.css';


const AddTodo = ({todos, setTodos}) => {

    const [value, setValue] = useState('');
    const [taskPriority, setTaskPriority] = useState('');

    const addTask = () => {
        const newTodos = [{
                id: Date.now(),
                title: value,
                completed: false,
                priority: taskPriority,
                createDate: new Date().toLocaleDateString()
            }, ...todos]
       
        setTodos(newTodos)
        setValue('')   
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }
   


    const handleKeyPress = (e) => {
        if(e.key === "Enter") {
            addTask()
        }
    }

      const priorityHandler = (e) => {
        setTaskPriority(e.target.value)
    } 

    return (
        <div className="TaskInputForm">
            <input type="text"
                placeholder="Add a task"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={handleKeyPress} />
            <select name="" id="" onChange={priorityHandler} >
                <option value="">Priority</option>
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
            </select>
            <button onClick={addTask} >Add</button>
        </div>
    )
}

export default AddTodo;