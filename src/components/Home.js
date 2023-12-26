import React, { useEffect, useState } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import EventItem from './events/EventItem';
import { getEvents } from '../api-helpers/api-helpers.js';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedLocation, setSelectedLocation] = useState('');
  const [isfiltered1, setIsFiltered1] = useState(false);
  const [isfiltered2, setIsFiltered2] = useState(false);
  const [isfiltered3, setIsFiltered3] = useState(false);
  const [eventNameSearch, setEventNameSearch] = useState('');

  useEffect(() => {
    getEvents()
      .then((data) => setEvents(data))
      .catch((err) => console.log(err));
  }, []);

  const formatToDdMmYyyy = (inputDate) => {
    const dateObject = new Date(inputDate);
    const dd = String(dateObject.getDate()).padStart(2, '0');
    const mm = String(dateObject.getMonth() + 1).padStart(2, '0');
    const yyyy = dateObject.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
  };

  const applyFilters = () => {
    const hasDateFilter = selectedDate !== '';
    const hasCategoryFilter = selectedCategory !== '';
    const hasLocationFilter = selectedLocation !== '';

    setIsFiltered1(hasDateFilter);
    setIsFiltered2(hasCategoryFilter);
    setIsFiltered3(hasLocationFilter);
  };

  const handleEventNameSearchChange = (event, value) => {
    setEventNameSearch(value);
  };

  const eventNameMatches = (event) => {
    return (
      !eventNameSearch ||
      (event.eventname &&
        (eventNameSearch === '' || event.eventname.toLowerCase().includes(eventNameSearch.toLowerCase())))
    );
  };

  const filteredEvents = events.filter((event) => {
    const eventStartDate = event.startdate ? formatToDdMmYyyy(event.startdate) : '';
    const eventEndDate = event.enddate ? formatToDdMmYyyy(event.enddate) : '';
    const formattedSelectedDate = formatToDdMmYyyy(selectedDate);
  
    const categoryMatches =
      !isfiltered2 ||
      (event.category &&
        (selectedCategory === null || selectedCategory === '' || event.category.toLowerCase() === selectedCategory.toLowerCase()));
    const locationMatches =
      !isfiltered3 ||
      (event.location &&
        (selectedLocation === null || selectedLocation === '' || event.location.toLowerCase() === selectedLocation.toLowerCase()));
    
    const dateMatches =
      !isfiltered1 ||
      (eventStartDate.includes(formattedSelectedDate) || eventEndDate.includes(formattedSelectedDate) ||
        (formattedSelectedDate >= eventStartDate && formattedSelectedDate <= eventEndDate));
  
    return dateMatches && (isfiltered2 ? categoryMatches : true) && (isfiltered3 ? locationMatches : true) && eventNameMatches(event);
  });
  

  const uniqueCategories = [...new Set(events.map((event) => event.category || ''))];
  const uniqueLocations = [...new Set(events.map((event) => event.location || ''))];

  useEffect(() => {
    applyFilters();
  }, [selectedDate, selectedCategory, selectedLocation, eventNameSearch]);

  return (
    <div>
      <div className='my-3 mx-3'>
        <div className='row mx-2'>
          <div className='col-3'>
            <h6>Choose a Date</h6>
            <input
              type='date'
              className='form-control'
              placeholder='Choose a Date'
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
            />
          </div>
          <div className='col-3'>
            <h6>Choose a Category</h6>
            {events && events.length > 0 && (
              <Autocomplete
                id='category-filter'
                freeSolo
                options={uniqueCategories}
                value={selectedCategory}
                onChange={(e, newValue) => setSelectedCategory(newValue)}
                renderInput={(params) => (
                  <TextField
                    style={{ width: '350px', backgroundColor: 'white', borderRadius: '5px' }}
                    {...params}
                    placeholder='Search'
                  />
                )}
              />
            )}
          </div>
          <div className='col-3'>
            <h6>Choose a Location</h6>
            {events && events.length > 0 && (
              <Autocomplete
                id='location-filter'
                freeSolo
                options={uniqueLocations}
                value={selectedLocation}
                onChange={(e, newValue) => setSelectedLocation(newValue)}
                renderInput={(params) => (
                  <TextField
                    style={{ width: '350px', backgroundColor: 'white', borderRadius: '5px' }}
                    {...params}
                    placeholder='Search'
                  />
                )}
              />
            )}
          </div>
          <div className='col-3'>
            <h6>Search With Event Name</h6>
            <Autocomplete
              id='event-name-search'
              freeSolo
              options={events && events.map((option) => option.eventname)}
              value={eventNameSearch}
              onChange={handleEventNameSearchChange}
              renderInput={(params) => (
                <TextField
                  style={{ width: '350px', backgroundColor: 'white', borderRadius: '5px' }}
                  {...params}
                  placeholder='Search'
                />
              )}
            />
          </div>
        </div>
      </div>
      <div className='row my-3 mx-3'>
        {filteredEvents.length === 0 ? (
          <div className='col-12 text-center'>
            <p>No events found.</p>
          </div>
        ) : (
          filteredEvents.map((event) => (
            <div className='col-3 my-3' key={event._id}>
              <EventItem
                key={event._id}
                id={event.id}
                eventname={event.eventname}
                image={event.image}
                startdate={event.startdate}
                enddate={event.enddate}
                description={event.description}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Home;
