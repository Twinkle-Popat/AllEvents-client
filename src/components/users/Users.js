import React from 'react'
import { useState,useEffect } from 'react'
import { addEvent,getEventsbyId } from '../../api-helpers/api-helpers'
import EventItem from '../events/EventItem'



const Users = () => {

  const[inputs,setInputs]=useState({
    eventname:"",
    description:"",
    startdate:"",
    enddate:"",
    location:"",
    category:"",
    posterurl:""
  })
  const [userEvents, setUserEvents] = useState([]);

  const handlechange=(e)=>{
    const name=e.target.name;
    const value=e.target.value;
    setInputs({...inputs,[name]:value})
  }

  const fetchUserEvents = async () => {
    try {
      const events = await getEventsbyId();
      setUserEvents(events);
    } catch (error) {
      console.error('Error fetching user events:', error);
    }
  };
  useEffect(() => {
    fetchUserEvents();
  }, []);

  const handlesubmit=(e)=>{
    e.preventDefault();
    console.log(inputs)
    addEvent(inputs).then((res)=>{console.log("Event Added")
    fetchUserEvents();
  }).catch((err)=>console.log(err))
  }



  return (
    <div  style={{margin:"30px"}}>



<button type="button" className="btn btn-info" style={{fontWeight:"normal", fontSize:"large"}} data-bs-toggle="modal" data-bs-target="#exampleModal">
  Add an Event +
</button>

<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content">
      <div className="modal-header">
        <h1 className="modal-title fs-5" id="exampleModalLabel">Add an Event</h1>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">

      <form>
  <div className="mb-3">
    <label for="exampleInput1" className="form-label">Event Name</label>
    <input name='eventname' onChange={handlechange} type="text" className="form-control" id="exampleInput1" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInput2" className="form-label">Description</label>
    <input name='description' onChange={handlechange} type="text" className="form-control" id="exampleInput2" aria-describedby="emailHelp"/>
  </div>
  <div className=" form-check-inline mb-3">
    <label for="exampleInput3" className="form-label">Start Date</label>
    <input name='startdate' onChange={handlechange} type="date" className="form-control" id="exampleInput3" aria-describedby="emailHelp"/>
  </div>
  <div className=" form-check-inline mb-3">
    <label for="exampleInput4" className="form-label">End Date</label>
    <input name='enddate' onChange={handlechange} type="date" className="form-control" id="exampleInput4" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInput5" className="form-label">Location</label>
    <input name='location' onChange={handlechange} type="text" className="form-control" id="exampleInput5" aria-describedby="emailHelp"/>
  </div>
  <div className="mb-3">
    <label for="exampleInput6" className="form-label">Category</label>
    <input name='category' onChange={handlechange} type="text" className="form-control" id="exampleInput6" aria-describedby="emailHelp"/>
</div>
  <div className="mb-3">
    <label for="exampleInput6" className="form-label">Poster URL</label>
    <input type="text" name='posterurl' onChange={handlechange} className="form-control" id="exampleInput6" aria-describedby="emailHelp"/>
  </div>
 
</form>
       







      </div>
      <div className="modal-footer">
        <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button onClick={handlesubmit} type="button" data-bs-dismiss="modal" className="btn btn-info">Add</button>
      </div>
    </div>
  </div>
</div>

<h3 className='my-3'>Your Events</h3>
{/* map function to display all events created by the user */}
<div className='row'>
        {userEvents.map((event) => (
          <div className='col-3  my-3' key={event._id}>
          <EventItem key={event._id} id={event.id} eventname={event.eventname} image={event.image} startdate={event.startdate} enddate={event.enddate} description={event.description} />
          </div>
        ))}
        </div>
      
    </div>
  )
}

export default Users