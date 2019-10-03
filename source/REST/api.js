import { MAIN_URL, TOKEN } from './config';

const fetchTasks = async () => {
    
    const response  = await fetch(MAIN_URL,{
        method: 'GET',
        headers: {
            'Content-Type': 'application/json', 
            Authorization: TOKEN,
        },
    });

    if(response.status == 200){
        const { data: tasks } = await response.json();
 
        return tasks
    }else{
        console.log('error ===>',response.text)
    }
} 

const createTask = async ( task ) => {
    
    const response  = await fetch(MAIN_URL,{
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
        },
        body: JSON.stringify(task),
    });

    if(response.status == 200){
        const { data: tasks } = await response.json();
        console.log('response.status => ',response.status)
        return tasks
    }else{
        console.log('error')                  
        throw new Error('Create task is failed')          
    }
}

const updateTask = async ( task ) => {
    
    const response = await fetch(MAIN_URL,{
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: TOKEN,
        },
      
        body: JSON.stringify([task]),
       
    });
    
    if(response.status == 200){
        
        const { data: message } = await response.json(); 
        console.log('response.status => ',response.status)
        return message
    }else{
                          
        throw new Error('Update task is failed')          
    }

}

const removeTask = async (id) => {
    
    const response = fetch(`${MAIN_URL}/${id}`,{
        method: 'DELETE',
        headers: {
            Authorization: TOKEN,
        },
    })

    if(response.status == 204){
        
        const { data: message } = await response.json(); 
        console.log('response.status => ',response.status)
        return message
    }else{
                        
        throw new Error('Remove task is failed')          
    }
}

const completeAllTasks = async ( tasks ) => {

    const request = tasks.map((task) => {
        fetch(MAIN_URL,{
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                Authorization: TOKEN,
            },
            body: JSON.stringify([task]),
        })
    })

    const responses = Promise.all(request);

    responses.then(() => console.log('bingo'), () => {throw new Error('All tasks not Complete!!')})
}

export const api = {
    fetchTasks, 
    createTask,
    updateTask,
    removeTask,
    completeAllTasks
};

