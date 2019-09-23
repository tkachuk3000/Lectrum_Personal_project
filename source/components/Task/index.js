// Core
import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

// Instruments
import Styles from './styles.m.css';
import Checkbox from '../../theme/assets/Checkbox.js'
import Star from '../../theme/assets/Star.js'
import Edit from '../../theme/assets/Edit.js'
import Remove from '../../theme/assets/Remove.js'

export default class Task extends PureComponent {
    constructor(props){
        super(props);
        this.taskInput = React.createRef();
    }
    
    static propTypes = {
        id: propTypes.number.isRequired,
        completed: propTypes.bool.isRequired,
        removeTask: propTypes.func.isRequired,
        editTaskFromTask: propTypes.func.isRequired,
        changeFavorite: propTypes.func.isRequired,
        changeCheckbox: propTypes.func.isRequired
    }

    state = {
        edit: true,
        message: '',
        // checkboxChecked: true,
        // starChecked: true,
        // editChecked: false,

    }
    _getTaskShape = ({
        id = this.props.id,
        completed = this.props.completed,
        favorite = this.props.favorite,
        message = this.props.message,
    }) => ({
        id,
        completed,
        favorite,
        message,
    });

    _remove = () => {
        const { removeTask, id } = this.props;
        return removeTask(id)
    };

     _On_Off_EditTask = () => {
        this.taskInput.current.focus();

        const {id, editTaskFromTask, message} = this.props;
        const {message: messageState} = this.state;
        
      
        
        this.setState((prevState) => ({
            edit: !prevState.edit,
            editChecked: !prevState.editChecked,
        }))
        
        const newMessage = messageState ||  message;
        editTaskFromTask(id, newMessage);
    }

    _changeMessageState = (event) =>{
        this.setState({
            message: event.target.value
        })
    }

    _submitOnEnter = (event) => {
        const {id, editTaskFromTask} = this.props;
        
        if(event.key === 'Enter'){
            this.setState((prevState) => ({edit: !prevState.edit,
                                            editChecked: !prevState.editChecked})
                        );
            
                const newMessage =  event.target.value;
            editTaskFromTask(id, newMessage);
        };
    }

    _escapeKey = (event) => {
        // console.log('Escape');
        if(event.key === 'Escape'){
            
            this.setState((prevState) => ({
                message: '',
                edit: !prevState.edit,
                editChecked: !prevState.editChecked,
            }))
        }
    }

    _onClickFavorite = () => {
        const { changeFavorite, id } = this.props;
        // console.log('===> =... ===>');
        changeFavorite(id);
    }

    _OnClickChecked = () => {
        const { changeCheckbox, id} = this.props;
        console.log('****=> =... ****=>')
        changeCheckbox(id);
    }

    render () {
        // const { message, removeTask } = this.props;
        const task = this._getTaskShape(this.props);
        // const { starChecked,  }

        return (
        <li className = { Styles.task }>
            <Checkbox
            checked = {this.props.completed}
            onClick = {this._OnClickChecked}
            />
            <div className = {Styles.content}>
            <input 
                type = 'text' 
                maxLength = "50"
                ref = {this.taskInput}
                onChange = {this._changeMessageState}
                value = { this.state.message || task.message }
                disabled = { this.state.edit }
                onKeyPress = {this._submitOnEnter}
                onKeyDown = {this._escapeKey}
            />
            </div>
            <Star
            // disabled = {true}
            checked = {this.props.favorite}
            onClick = {this._onClickFavorite}
            />
            <Edit
            checked = {this.state.editChecked}
            onClick = {this._On_Off_EditTask}
            />
            <Remove onClick = {this._remove}/>
        </li>
        )
    }
}
