import { useState } from "react";


import './TodoList.css';

const TodoList = ({ todos, setTodos }) => {

    const [edit, setEdit] = useState(null);
    const [value, setValue] = useState('');
    
     

    const deleteTodo = (id) => {       
        let newTodos = [...todos].filter(item => item.id !== id);
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const toggleCompleted = (id) => {
        let newTodos = [...todos].filter(item => {
            if (item.id === id) {
                item.completed = !item.completed
            }
            return item
        })
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const editTodo = (id, title) => {
        setEdit(id)
        setValue(title)
    }

    const saveTodo = (id) => {
        let newTodos = [...todos].map(item => {
            if (item.id === id) {
                item.title = value
            }
            return item
        })
        setTodos(newTodos);
        setEdit(null);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const sortHandler = () => {
        setTodos([...todos].sort((a, b) => a.title !== b.title ? a.title < b.title ? -1 : 1 : 0) )
    }

    const deleteAllHandler = () => {
        let newTodos = []
        setTodos(newTodos);
        localStorage.setItem('todos', JSON.stringify(newTodos));
    }

    const allTasksHandler = () => {
        const allTodos =JSON.parse(localStorage.getItem('todos'))
        setTodos(allTodos)
    }

    const completedTasksHandler = () => {
        let completedTodos = [...todos].filter(item => item.completed);
        setTodos(completedTodos)
    }
    const uncompletedTasksHandler = () => {
        let uncompletedTodos = [...todos].filter(item => !item.completed);
        setTodos(uncompletedTodos)
    }

    
    
    return (
        <>
            <div className='filter-buttons'>
				<button
                    className='filter-btn'
                    onClick={sortHandler}
					>
					Sort A-Z
				</button>
				<button
                    className='filter-btn'
                    onClick={allTasksHandler}
					>
					All
				</button>
				<button
                    className='filter-btn'
                    onClick={completedTasksHandler}
					>
					Completed
				</button>
				<button
                    className='filter-btn'
                    onClick={uncompletedTasksHandler}
					>
					Not completed
				</button>
			</div>
        <div className="ListContainer"> 
            
            {todos.map(item => (
                <div key={item.id} className="TodoList">
                    {
                        edit === item.id ? <div>
                            <input type="text" className="edit-input" value={value}
                            onChange={(e) => setValue(e.target.value)} />
                            
                        </div >
                            : <div className="taskBlock">
                                <div className="date">{item.createDate }</div>
                                <div className={item.completed ? 'task completed-task' : 'task'}>  {item.title} </div>
                                <div className="priority">Priority :{item.priority }</div>
                            </div>
                             
                        
                    }
                    {
                        edit === item.id ?
                            <div>
                                <button className="save-btn" onClick={() => saveTodo(item.id)} >Save</button>
                            </div> :
                            <div className="buttons-group">
                                <input                                    
                                    type="checkbox" onClick={() => toggleCompleted(item.id)} />
                                <button
                                    className="edit-btn"
                                    onClick={() => editTodo(item.id, item.title)} >Edit</button>
                                <div onClick={() => deleteTodo(item.id)}>
                                    <img src="./icon-bin.png" alt="delete" />
                                </div>
                            </div>
                    }             
                    
                </div>
            ))}
            </div>
            <button className="delete-all-btn"
            onClick={deleteAllHandler} >Delete all</button>
            </>
    )
}

export default TodoList;