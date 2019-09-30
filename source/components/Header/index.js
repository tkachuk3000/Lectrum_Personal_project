//core
import React, { Component } from 'react';

// Instruments


export default class Header extends Component {
    state = {
        searchTask:''
    }
    
    _searchTask = (event) => {
        const { searchTask } = this.state;
        this.setState({
            searchTask: event.target.value,
        })
    }
    
    render () {
        return (
            <header>
                <h1>Планировщик Задач</h1>
                <input 
                type = 'search' 
                placeholder = 'Найти'
                onChange = {this._searchTask}
                />
            </header>
        )
    }
}