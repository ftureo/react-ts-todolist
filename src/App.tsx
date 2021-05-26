import React, { useState, useRef } from 'react';

//Set data type for 'e'
type FormElement = React.FormEvent<HTMLFormElement>

interface ITask {
    name: string,
    done: boolean
}

function App(): JSX.Element {

    //Defining the state of a new task
    const [newTask, setNewTask] = useState<string>('')
    const [tasks, setTasks] = useState<ITask[]>([]) 
    const taskInput = useRef<HTMLInputElement>(null)

    //Submiting the form
    const handleSubmit = (e: FormElement): void => {
        e.preventDefault()
        addTask(newTask)
        setNewTask('')
        //For each update, the focus will be on the input
        taskInput.current?.focus()
    }

    //Saving the tasks
    const addTask = (name: string): void => {
        const newTasks = [...tasks, { name, done: false }]
        setTasks(newTasks)
    }

    //Capturing click for done task
    const toggleDoneTask = (i: number): void => {
        const newTasks: ITask[] = [...tasks]
        newTasks[i].done = !newTasks[i].done
        setTasks(newTasks)

    }

    //Removing tasks completed
    const removeTask = (i: number): void => {
        const newTasks: ITask[] = [...tasks]
        newTasks.splice(i,1)
        setTasks(newTasks)
    }

    return (
        <div className='container p-4'>
            <div className='row'>
                <div className='col-md-6 offset-md-3'>
                    <div className='card'>
                        <div className='card-body'>
                            <form onSubmit={ handleSubmit }>
                                <input
                                    className='form-control'
                                    type="text" 
                                    onChange={ e => setNewTask(e.target.value) } 
                                    value={ newTask }
                                    ref={taskInput}
                                    autoFocus
                                />
                                <button className='btn btn-success col-12 mt-2'>
                                    Save
                                </button>
                            </form>
                        </div>
                    </div>
                    {tasks.map((t: ITask, i: number) => (
                        <div className='card card-body mt-2' key={ i }>
                            <h1 style={ 
                                { textDecoration: t.done ? 'line-through' : '' } 
                            }>{ t.name }</h1>
                            <div className='row'>    
                                <button className='btn btn-secondary col-3' onClick={ () => toggleDoneTask(i) }>
                                    { t.done ? '✓' : '✗'}
                                </button>
                                <button className='btn btn-danger col-3' onClick={ () => removeTask(i)}>
                                🚮
                                </button>
                            </div>
                        </div>
                    ))
                    }
                </div>
            </div>
        </div>
    );
}

export default App;
