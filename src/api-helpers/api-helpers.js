import axios from 'axios';


let userid = null;
let token = null;


export const getEvents = async () => {
    const response = await axios.get('/event').catch((err) => {
        console.log('Error', err);
    });
    
    if(response.status !== 200){
        console.log('There was a problem');
    }

    const data = await response.data;
    return data;
}


export const UserAuth = async (data,signup) => {
    const response = await axios
    .post(`/user/${signup?'signup':'login'}`,{
        name: signup? data.name:"",
        email: data.email,
        password: data.password
    }).catch((err) => {
        console.log('Error', err);
    });

    if(response.status !== 200 && response.status !== 201){
        console.log('There was a problem');
    }

    const resdata = await response.data;
    console.log("resdata",resdata);
    userid = resdata.id;
    token = resdata.token;
    console.log("userid",userid);
    console.log("token",token);
    return resdata;
}

export const addEvent = async (data) => {  
    console.log("userid",userid);
    console.log("token",token); 
    const response = await
    axios.post('/event',{
        eventname: data.eventname,
        description: data.description,
        startdate: data.startdate,
        enddate: data.enddate,
        location: data.location,
        category: data.category,
        image: data.posterurl,
        creator: userid
    },{
        headers:{
            Authorization: `Bearer ${token}`
        }, 
    
    }
    ).catch((err) => {
        console.log('Error', err);
    });

    if(response.status !== 201){
        console.log('There was a problem');
    }

    const resdata = await response.data;
    return resdata;
}


    


export const getEventsbyId = async () => {
    console.log("userid",userid);
    try {
        const response = await axios.get('/event').catch((err) => {
            console.log('Error', err);
        });
        
        if (response.status !== 200) {
            console.log('There was a problem');
        }

        const allEvents = await response.data;
        console.log("allEvents",allEvents);
        
        // Filter events based on the creator's ID
        const userEvents = userid ? allEvents.filter(event => event.creator === userid) : [];

        console.log("userEvents",userEvents);
        return userEvents;
    } catch (error) {
        console.error('Error fetching events:', error);
        throw error; // Rethrow the error to be caught by the caller
    }
};

