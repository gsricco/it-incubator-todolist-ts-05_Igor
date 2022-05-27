import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodolistsType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key:string]:Array<TaskType>
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
    console.log(typeof tasks)
    console.log(typeof setTasks)
    console.log(typeof useState)

    /*let [todolists, setTodolists] = useState<Array<TodolistsType>>([
        {id: v1(), title: 'What to learn', filter: 'all'},
        {id: v1(), title: 'What to buy', filter: 'all'},
        {id: v1(), title: 'What to see', filter: 'all'},
    ])


    let [tasks, setTasks] = useState([
        {id: v1(), title: "HTML&CSS", isDone: true},
        {id: v1(), title: "JS", isDone: true},
        {id: v1(), title: "ReactJS", isDone: false},
        {id: v1(), title: "Rest API", isDone: false},
        {id: v1(), title: "GraphQL", isDone: false},
    ]);
    // let [filter, setFilter] = useState<FilterValuesType>("all");
*/

    function removeTask(todolistID: string, id: string) {
        // let filteredTasks = tasks[todolistID].filter(t => t.id != id);
        setTasks({...tasks, [todolistID]: tasks[todolistID].filter(t => t.id != id)});
    }

    function addTask(todolistID: string,title: string) {
             let newTask = {id: v1(), title: title, isDone: false};
           setTasks({...tasks,[todolistID]:[newTask,...tasks[todolistID]]})

    }
        function changeStatus(todolistID: string,taskId: string, isDone: boolean) {
             setTasks({...tasks,[todolistID]:tasks[todolistID].map(el=>el.id===taskId?{...el,isDone}:el)});
        }


        function changeFilter(todolistID: string, value: FilterValuesType) {
            setTodolists(todolists.map(el => el.id === todolistID ? {...el, filter: value} : el));
        }

    function removeTodolist(todolistID: string){
        setTodolists(todolists.filter(el=>el.id !==todolistID))
        delete tasks[todolistID]
    }

        return (
            <div className="App">
                {
                    todolists.map(el => {
                        let tasksForTodolist = tasks[el.id];

                        if (el.filter === "active") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === false);
                        }
                        if (el.filter === "completed") {
                            tasksForTodolist = tasks[el.id].filter(t => t.isDone === true);
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
                            />
                        )
                    })
                }


            </div>
        );
    }

export default App;
