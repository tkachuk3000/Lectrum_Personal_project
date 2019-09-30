import { MAIN_URL, TOKEN } from './config';

const fetchTasks = async () => {
    const response  = await fetch(MAIN_URL,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
        },
    });

    

    const { data: tasks } = await response.json();

    console.log('api =====>: ', tasks);
    console.log('MAIN_URL =====>: ', MAIN_URL)

    // this.setState((prevState) =>({
    //     tasks: [tasks, ...prevState.tasks],

    //     // spin: false,
    // }),()=> console.log('api =====>: ', this.state.tasks) );
} 

export const api = {
    fetchTasks
};

