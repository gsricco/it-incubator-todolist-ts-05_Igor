import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';
import {AddItemForm} from "./components/AddItemForm";

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    let todolistID1 = v1();
    let todolistID2 = v1();

    let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: todolistID1, title: 'What to learn', filter: 'all'},
        {id: todolistID2, title: 'What to buy', filter: 'all'},
    ])


    let [tasks, setTasks] = useState<TasksType>({
        [todolistID1]: [
            {id: v1(), title: "HTML&CSS", isDone: true},
            {id: v1(), title: "JS", isDone: true},
            {id: v1(), title: "ReactJS", isDone: false},
            {id: v1(), title: "Rest API", isDone: false},
            {id: v1(), title: "GraphQL", isDone: false},
        ],
        [todolistID2]: [
            {id: v1(), title: "HTML&CSS2", isDone: true},
            {id: v1(), title: "JS2", isDone: true},
            {id: v1(), title: "ReactJS2", isDone: false},
            {id: v1(), title: "Rest API2", isDone: false},
            {id: v1(), title: "GraphQL2", isDone: false},
        ]
    });

    function removeTask(todolistID: string, id: string) {
        // let filteredTasks = tasks[todolistID].filter(t => t.id != id);
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)});
    }

    function addTask(todolistID: string, title: string) {
        let newTask = {id: v1(), title: title, isDone: false};
        setTasks({...tasks, [todolistID]: [newTask, ...tasks[todolistID]]})
    }

    function changeStatus(todolistID: string, taskId: string, isDone: boolean) {
        setTasks({...tasks, [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone} : el)});
    }

    function changeFilter(todolistID: string, value: FilterValuesType) {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el));
    }

    function removeTodolist(todolistID: string) {
        setTodolists(todolists.filter(el => el.id !== todolistID))
        delete tasks[todolistID]
    }

    const addTodolist = (newTitle: string) => {
        const newID = v1();
        setTodolists([{id: newID, title: newTitle, filter: 'all'}, ...todolists])
        setTasks({[newID]: [], ...tasks})
    }

    const editTodolist = (todolistID: string, newTitle: string) => {
        setTodolists(todolists.map(el => el.id === todolistID ? {...el, title: newTitle} : el))
        console.log(newTitle)
    }

    const editTask = (todolistID: string, taskID: string, newTitle: string) => {
        setTasks({
            ...tasks,
            [todolistID]: tasks[todolistID].map(el => el.id === taskID ? {...el, title: newTitle} : el)
        })
    }

    return (
        <div className="App">
            <img className={'pic'}
                 src={'https://www.skema.edu/PublishingImages/SKEMA/skameleon/Studious/Intello%20gif.gif?_gl=1*16qgkuv*_up*MQ..*_ga*MzYwMjA1ODk0LjE2NTQwMTE0NDg.*_ga_5L9PG36FG6*MTY1NDAxMTQ0OC4xLjAuMTY1NDAxMTQ0OC4w*_ga_8JCFLXZEZ2*MTY1NDAxMTQ0OC4xLjAuMTY1NDAxMTQ0OC4w'}
                 alt={'todolist'}/>
            <AddItemForm callBack={addTodolist}/>
            {
                todolists.map(el => {
                    let tasksForTodolist = tasks[el.id];

                    if (el.filter === "active") {
                        tasksForTodolist = tasks[el.id].filter(t => !t.isDone);
                    }
                    if (el.filter === "completed") {
                        tasksForTodolist = tasks[el.id].filter(t => t.isDone);
                    }
                    return (
                        <Todolist
                            key={el.id}
                            todolistID={el.id}
                            title={el.title}
                            tasks={tasksForTodolist}
                            removeTask={removeTask}
                            changeFilter={changeFilter}
                            addTask={addTask}
                            changeTaskStatus={changeStatus}
                            filter={el.filter}
                            removeTodolist={removeTodolist}
                            editTodolist={editTodolist}
                            editTask={editTask}
                        />
                    )
                })
            }
        </div>
    );
}

export default App;
