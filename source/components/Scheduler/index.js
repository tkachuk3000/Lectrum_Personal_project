// Core
import React, { Component } from 'react';
import moment from 'moment';

// Instruments
import Styles from './styles.m.css';
import { api } from '../../REST'; // ! Импорт модуля API должен иметь именно такой вид (import { api } from '../../REST')
import Task from '../Task';
import Checkbox from '../../theme/assets/Checkbox.js'
import { async } from 'q';
import {sortTasksByDate, sortTasksByGroup} from '../../instruments';

export default class Scheduler extends Component {
    
    state = {
        tasks: [
            {id:12, message: 'Сходить за хлебом', favorite: false, completed: false, created: Date.now()},
            {id:13, message: 'Покормить кота!', favorite: false, completed: false, created: Date.now()},
        ],
        newTaskMessage:'',
        searchTask:'',
    };

    _editTaskFromTask = (id,newMessage) => {
        const { tasks } = this.state;
        const newTasks = tasks.map((task) => {
            if( task.id == id ){
                task.message = newMessage;
            }
            return task
        })
        
        this.setState({
            tasks: newTasks
        })
    }

    _updateTextTask = (event) =>{
        const { newTaskMessage } = this.state;
        
        if( newTaskMessage.length <= 50 ){
            this.setState({
                newTaskMessage: event.target.value,
            })
        }
    };

    _submitOnEnter = (event) => {
        if(event.key === 'Enter'){
            event.preventDefault();
            this._submitTask();
        }
    };

    _submitTask = () => {
        const {newTaskMessage} = this.state;
// console.log('',);
        if(!newTaskMessage){
            return null
        };

        const task = {id: Date.now(),
                      message: newTaskMessage,
                      favorite: false,
                      completed: false,
                      created: Date.now(),
                    };

        this.setState((prevState) => ({
            tasks:[task, ...prevState.tasks],
            newTaskMessage: '',
        }));
    }

    _handleFormSubmit = (event) =>{
        event.preventDefault();
        this._submitTask();
    }

    _removeTaskFromState = (id) =>{
        const { tasks }  = this.state;
        const updateTask = tasks.filter((task)=>{
            if( id !== task.id ) {
                return task
            };
        })
        this.setState({tasks:updateTask})
    }

    _searchTask = (event) => {
        const { searchTask } = this.state;
        this.setState({
            searchTask: event.target.value,
        })
    }
    _changeFavorite = (id) => {
        const { tasks } = this.state;
        const newTasks = tasks.map((task) => {
            if(id == task.id){
                task.favorite = !task.favorite
            }
            return task
        });

        this.setState({tasks: newTasks},() => {
            const sortTasks = sortTasksByGroup(this.state.tasks);
            this.setState({tasks: sortTasks})
        });

    }

    _changeCheckbox = (id) => {
        // console.log('=======> from scheduler===>')
        const { tasks } = this.state;
        const newTasks = tasks.map((task) => {
            if(id == task.id){
                task.completed = !task.completed
            }
            return task
        });

        this.setState({tasks: newTasks},() => {
            const sortTasks = sortTasksByGroup(this.state.tasks);
            this.setState({tasks: sortTasks})
        });
    }
    
    _showSearchResult = ( task, searchTask ) => {

        const str = task.message.substr(0,searchTask.length);

                if(searchTask == str){
                    return(
                        <Task
                            key = { task.id }
                            {...task}
                            removeTask = {this._removeTaskFromState}
                            editTaskFromTask = {this._editTaskFromTask}
                            changeFavorite = {this._changeFavorite}
                            changeCheckbox = {this._changeCheckbox}
                        />
                    )
                }
    }

    render () {
        const { tasks, newTaskMessage, searchTask}  = this.state;

        const showTasks = tasks.map((task) => {
            if(!searchTask){
                return (
                    <Task
                        key = { task.id }
                        {...task}
                        removeTask = {this._removeTaskFromState}
                        editTaskFromTask = {this._editTaskFromTask}
                        changeFavorite = {this._changeFavorite}
                        changeCheckbox = {this._changeCheckbox}
                    />
                )
            }else{
                return this._showSearchResult(task, searchTask);
            }
        })
        
        return (
            <section className = { Styles.scheduler }>
                {/* Планировщик: стартовая точка */}
                <main>
                    <header>
                        <h1>Планировщик Задач</h1>
                        <input 
                        type = 'search' 
                        placeholder = 'Найти'
                        onChange = {this._searchTask}
                        // value =''
                        />
                    </header> 
                    {/* <input type = 'text' placeholder = 'Новая задача'></input> */}
                    <section>
                        <form onSubmit = {this._handleFormSubmit}>
                            <input
                            className="createTask"
                            maxLength={50}
                            type = 'text' 
                            placeholder = 'Описaние моей новой задачи'
                            value = {newTaskMessage}
                            onChange = {this._updateTextTask}
                            onKeyPress = {this._submitOnEnter}
                            />
                            <button>Добавить задачу</button>
                        </form>
                    </section>
                    <ul>{showTasks}</ul>
                    <footer>
                        <Checkbox/>
                        <span >Все задачи выполнены</span>
                    </footer>
                </main>
                
            </section>
        );
    }
}
