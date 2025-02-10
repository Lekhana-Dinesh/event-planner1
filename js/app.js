// let selectedVenue = "";

// /***********************************
//  * Attendee Management Section
//  ***********************************/
// document.getElementById('attendee-form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const name = document.getElementById('attendee-name').value;
//   const email = document.getElementById('attendee-email').value;

//   const li = document.createElement('li');
//   li.textContent = `${name} (${email})`;

//   // Create and attach delete button for attendee
//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Remove';
//   deleteBtn.addEventListener('click', () => {
//     li.remove();
//     saveData();
//     updateItinerary();
//   });
//   li.appendChild(deleteBtn);

//   document.getElementById('attendee-list').appendChild(li);
//   e.target.reset();
//   updateItinerary();
// });

// /***********************************
//  * Schedule & Google Calendar Section
//  ***********************************/
// document.getElementById('schedule-form').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const title = document.getElementById('event-title').value;
//   const dateTime = document.getElementById('event-date').value;

//   // Create event element with delete button
//   const eventDiv = document.createElement('div');
//   eventDiv.classList.add('event');
//   eventDiv.innerHTML = `<strong>${title}</strong><br>${new Date(dateTime).toLocaleString()}`;

//   // Create delete button for scheduled event
//   const deleteBtn = document.createElement('button');
//   deleteBtn.textContent = 'Delete';
//   deleteBtn.addEventListener('click', function() {
//     deleteCalendarEvent(eventDiv);
//     eventDiv.remove();
//     updateItinerary();
//     saveData();
//   });
//   eventDiv.appendChild(deleteBtn);
  
//   document.getElementById('calendar-display').appendChild(eventDiv);

//   // Add event to Google Calendar, passing the eventDiv to store event ID
//   if (!gapi.auth2.getAuthInstance().isSignedIn.get()) {
//     gapi.auth2.getAuthInstance().signIn({ prompt: 'consent', ux_mode: 'redirect' }).then(() => {
//       addEventToGoogleCalendar(title, dateTime, eventDiv);
//     });
//   } else {
//     addEventToGoogleCalendar(title, dateTime, eventDiv);
//   }
  
//   updateItinerary();
//   e.target.reset();
// });

// /***********************************
//  * updateItinerary() & Persistence Functions
//  ***********************************/
// function updateItinerary() {
//   const itineraryDisplay = document.getElementById('itinerary-display');
//   itineraryDisplay.innerHTML = ''; // Clear previous itinerary

//   // Collect scheduled events
//   const events = Array.from(document.querySelectorAll('#calendar-display .event'))
//                       .map(eventDiv => eventDiv.innerHTML);

//   // Collect attendee names (removing the "Remove" text)
//   const attendees = Array.from(document.querySelectorAll('#attendee-list li'))
//                         .map(li => li.textContent.replace('Remove', '').trim());

//   // Build itinerary summary including the selected venue
//   itineraryDisplay.innerHTML = `
//     <h3>Itinerary Summary</h3>
//     <p><strong>Events:</strong><br>${events.join('<br>')}</p>
//     <p><strong>Attendees:</strong><br>${attendees.join(', ')}</p>
//     ${selectedVenue ? `<p><strong>Venue:</strong> ${selectedVenue}</p>` : ''}
//   `;
  
//   saveData();
// }

// function saveData() {
//   const attendeeItems = Array.from(document.querySelectorAll('#attendee-list li'))
//                         .map(li => li.textContent.replace('Remove', '').trim());
//   const eventItems = Array.from(document.querySelectorAll('#calendar-display .event'))
//                         .map(div => div.innerHTML);
//   const data = {
//     attendees: attendeeItems,
//     events: eventItems,
//     selectedVenue: selectedVenue
//   };
//   localStorage.setItem('eventPlannerData', JSON.stringify(data));
// }

// function loadData() {
//     const dataString = localStorage.getItem('eventPlannerData');
//     if (dataString) {
//       const data = JSON.parse(dataString);
  
//       // Load events
//       const calendarDisplay = document.getElementById('calendar-display');
//       calendarDisplay.innerHTML = '';
//       data.events.forEach(eventHtml => {
//         const div = document.createElement('div');
//         div.classList.add('event');
//         div.innerHTML = eventHtml;
//         // Reattach delete button if it's not present (event listeners are lost when storing innerHTML)
//         if (!div.querySelector('button')) {
//           const deleteBtn = document.createElement('button');
//           deleteBtn.textContent = 'Delete';
//           deleteBtn.addEventListener('click', function() {
//             deleteCalendarEvent(div);
//             div.remove();
//             updateItinerary();
//             saveData();
//           });
//           div.appendChild(deleteBtn);
//         }
//         calendarDisplay.appendChild(div);
//       });
  
//       // Load attendees (unchanged)
//       const attendeeList = document.getElementById('attendee-list');
//       attendeeList.innerHTML = '';
//       data.attendees.forEach(attendeeText => {
//         const li = document.createElement('li');
//         li.textContent = attendeeText;
//         const deleteBtn = document.createElement('button');
//         deleteBtn.textContent = 'Remove';
//         deleteBtn.addEventListener('click', () => {
//           li.remove();
//           saveData();
//           updateItinerary();
//         });
//         li.appendChild(deleteBtn);
//         attendeeList.appendChild(li);
//       });
  
//       // Load selected venue
//       selectedVenue = data.selectedVenue || "";
  
//       updateItinerary();
//     }
//   }
  

// /***********************************
//  * Google Calendar API Integration
//  ***********************************/
// const CLIENT_ID = '838524696505-i0lqf702126h7h3fvekkckdg6trmg646.apps.googleusercontent.com';
// const API_KEY = 'AIzaSyA-2RQd-_Sbg1cBDsVPgXj9aSm2QvlMMro';
// const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
// const SCOPES = "https://www.googleapis.com/auth/calendar.events";

// function handleClientLoad() {
//   gapi.load('client:auth2', initClient);
// }
// function initClient() {
//   gapi.client.init({
//     apiKey: API_KEY,
//     clientId: CLIENT_ID,
//     discoveryDocs: DISCOVERY_DOCS,
//     scope: SCOPES
//   }).then(() => {
//     console.log("Google API client initialized");
//     gapi.auth2.getAuthInstance().isSignedIn.listen(updateSigninStatus);
//     updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());
//   }, error => {
//     console.error(JSON.stringify(error, null, 2));
//   });
// }
// function updateSigninStatus(isSignedIn) {
//   if (isSignedIn) {
//     // Ready to interact with the Calendar API.
//   } else {
//     gapi.auth2.getAuthInstance().signIn({ prompt: 'consent', ux_mode: 'redirect' });
//   }
// }
// function addEventToGoogleCalendar(title, dateTime, eventDiv) {
//   const event = {
//     'summary': title,
//     'start': {
//       'dateTime': new Date(dateTime).toISOString(),
//       'timeZone': 'America/Los_Angeles'
//     },
//     'end': {
//       'dateTime': new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
//       'timeZone': 'America/Los_Angeles'
//     }
//   };
//   const request = gapi.client.calendar.events.insert({
//     'calendarId': 'primary',
//     'resource': event
//   });
//   request.execute(response => {
//     console.log("Google API response:", response);
//     if (response.error) {
//       console.error('My Error creating event:', response.error);
//     } else {
//       console.log('Event created: ', response.htmlLink);
//       // Store the event ID for deletion later.
//       eventDiv.dataset.eventId = response.id;
//     }
//   });
// }
// function deleteCalendarEvent(eventDiv) {
//   const eventId = eventDiv.dataset.eventId;
//   if (eventId) {
//     const request = gapi.client.calendar.events.delete({
//       'calendarId': 'primary',
//       'eventId': eventId
//     });
//     request.execute(response => {
//       if (response && response.error) {
//         console.error('Error deleting event:', response.error);
//       } else {
//         console.log('Event deleted from Google Calendar.');
//       }
//     });
//   } else {
//     console.log('No Google Calendar event ID found for this event.');
//   }
// }
// window.onload = function() {
//   handleClientLoad();
//   loadData();
// };

// /***********************************
//  * Foursquare API Integration
//  ***********************************/
// const FOURSQUARE_API_KEY = 'fsq3zF5q1fEQN1Bc/+c8fqA2R8KMHiiWuAkJDOxqyFM6bAk=';
// document.getElementById('venue-id').addEventListener('submit', function(e) {
//   e.preventDefault();
//   const location = document.getElementById('venue-location').value;
//   const keyword = document.getElementById('venue-keyword').value;
//   searchFoursquareVenues(location, keyword);
// });
// function searchFoursquareVenues(location, query) {
//     // Build endpoint using only location and keyword.
//     const endpoint = `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}&fields=fsq_id,name,location`;
    
//     fetch(endpoint, {
//       method: 'GET',
//       headers: {
//         'Accept': 'application/json',
//         'Authorization': FOURSQUARE_API_KEY
//       }
//     })
//       .then(response => {
//         if (!response.ok) {
//           throw new Error(`Error: ${response.status} ${response.statusText}`);
//         }
//         return response.json();
//       })
//       .then(data => {
//         console.log("Foursquare data:", data);
//         displayVenues(data.results);
//       })
//       .catch(error => console.error('Error fetching Foursquare data:', error));
//   }


// function displayVenues(venues) {
//     const resultsDiv = document.getElementById('venue-results');
//     resultsDiv.innerHTML = ''; // Clear previous results
  
//     if (venues && venues.length) {
//       venues.forEach(venue => {
//         const venueDiv = document.createElement('div');
//         venueDiv.classList.add('venue');
        
//         // Get venue name and address
//         const name = venue.name;
//         const address = venue.location && venue.location.formatted_address 
//                           ? venue.location.formatted_address 
//                           : 'Address not available';
        
//         venueDiv.innerHTML = `
//           <h3>${name}</h3>
//           <p>${address}</p>
//           <button onclick="selectVenue('${name}')">Select This Venue</button>
//         `;
//         resultsDiv.appendChild(venueDiv);
//       });
//     } else {
//       resultsDiv.innerHTML = '<p>No venues found for the specified criteria.</p>';
//     }
//   }

// function selectVenue(venueName) {
//   console.log('Selected Venue:', venueName);
//   selectedVenue = venueName;
//   updateItinerary();
// }
// function resetApp() {
//     // Clear all data stored in localStorage
//     localStorage.clear();
    
//     // Optionally, clear any other variables or state if needed
  
//     // Reload the page
//     window.location.reload();
//   }

/***********************************
 * Global Variables
 ***********************************/
let selectedVenue = "";
window.accessToken = null;   // Global variable to store the GIS access token
let pendingEvent = null;     // To temporarily store event details if no token is available

/***********************************
 * New GIS Authentication Code
 ***********************************/
const CLIENT_ID = '838524696505-i0lqf702126h7h3fvekkckdg6trmg646.apps.googleusercontent.com';
const SCOPES = 'https://www.googleapis.com/auth/calendar.events https://www.googleapis.com/auth/userinfo.email';
let tokenClient;

function initTokenClient() {
  tokenClient = google.accounts.oauth2.initTokenClient({
    client_id: CLIENT_ID,
    scope: SCOPES,
    callback: (response) => {
      if (response.error) {
        console.error('Error obtaining access token:', response);
        return;
      }
      console.log('Access token obtained:', response.access_token);
      window.accessToken = response.access_token;
      
      // If a pending event exists, add it now.
      if (pendingEvent) {
        addEventToGoogleCalendar(pendingEvent.title, pendingEvent.dateTime, pendingEvent.eventDiv);
        pendingEvent = null;
      }
    },
  });
}

/***********************************
 * Attendee Management Section
 ***********************************/
document.getElementById('attendee-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const name = document.getElementById('attendee-name').value;
  const email = document.getElementById('attendee-email').value;

  const li = document.createElement('li');
  li.textContent = `${name} (${email})`;

  // Create and attach delete button for attendee
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Remove';
  deleteBtn.addEventListener('click', () => {
    li.remove();
    saveData();
    updateItinerary();
  });
  li.appendChild(deleteBtn);

  document.getElementById('attendee-list').appendChild(li);
  e.target.reset();
  updateItinerary();
});

/***********************************
 * Schedule & Google Calendar Section
 ***********************************/
document.getElementById('schedule-form').addEventListener('submit', function(e) {
  e.preventDefault();
  const title = document.getElementById('event-title').value;
  const dateTime = document.getElementById('event-date').value;

  // Create event element with delete button
  const eventDiv = document.createElement('div');
  eventDiv.classList.add('event');
  eventDiv.innerHTML = `<strong>${title}</strong><br>${new Date(dateTime).toLocaleString()}`;

  // Create delete button for scheduled event
  const deleteBtn = document.createElement('button');
  deleteBtn.textContent = 'Delete';
  deleteBtn.addEventListener('click', function() {
    deleteCalendarEvent(eventDiv);
    eventDiv.remove();
    updateItinerary();
    saveData();
  });
  eventDiv.appendChild(deleteBtn);
  
  document.getElementById('calendar-display').appendChild(eventDiv);

  // If not signed in (no access token), save the event as pending and request a token.
  if (!window.accessToken) {
    pendingEvent = { title, dateTime, eventDiv };
    tokenClient.requestAccessToken({ prompt: 'consent' });
    return;
  }
  
  // If already signed in, add the event immediately.
  addEventToGoogleCalendar(title, dateTime, eventDiv);
  
  updateItinerary();
  e.target.reset();
});

/***********************************
 * updateItinerary() & Persistence Functions
 ***********************************/
function updateItinerary() {
  const itineraryDisplay = document.getElementById('itinerary-display');
  itineraryDisplay.innerHTML = ''; // Clear previous itinerary

  // Clone scheduled events and remove delete buttons from the clone.
  const events = Array.from(document.querySelectorAll('#calendar-display .event'))
    .map(eventDiv => {
      const clone = eventDiv.cloneNode(true);
      const btn = clone.querySelector('button');
      if (btn) { btn.remove(); }
      return clone.innerHTML;
    });

  // Collect attendee names (remove the "Remove" text)
  const attendees = Array.from(document.querySelectorAll('#attendee-list li'))
    .map(li => li.textContent.replace('Remove', '').trim());

  // Build itinerary summary including the selected venue.
  itineraryDisplay.innerHTML = `
    <h3>Itinerary Summary</h3>
    <p><strong>Events:</strong><br>${events.join('<br>')}</p>
    <p><strong>Attendees:</strong><br>${attendees.join(', ')}</p>
    ${selectedVenue ? `<p><strong>Venue:</strong> ${selectedVenue}</p>` : ''}
  `;
  
  saveData();
}

function saveData() {
  const attendeeItems = Array.from(document.querySelectorAll('#attendee-list li'))
    .map(li => li.textContent.replace('Remove', '').trim());
  const eventItems = Array.from(document.querySelectorAll('#calendar-display .event'))
    .map(div => div.innerHTML);
  const data = {
    attendees: attendeeItems,
    events: eventItems,
    selectedVenue: selectedVenue
  };
  localStorage.setItem('eventPlannerData', JSON.stringify(data));
}

function loadData() {
  const dataString = localStorage.getItem('eventPlannerData');
  if (dataString) {
    const data = JSON.parse(dataString);

    // Load events
    const calendarDisplay = document.getElementById('calendar-display');
    calendarDisplay.innerHTML = '';
    data.events.forEach(eventHtml => {
      const div = document.createElement('div');
      div.classList.add('event');
      div.innerHTML = eventHtml;
      // Reattach delete button if missing
      if (!div.querySelector('button')) {
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
          deleteCalendarEvent(div);
          div.remove();
          updateItinerary();
          saveData();
        });
        div.appendChild(deleteBtn);
      }
      calendarDisplay.appendChild(div);
    });

    // Load attendees
    const attendeeList = document.getElementById('attendee-list');
    attendeeList.innerHTML = '';
    data.attendees.forEach(attendeeText => {
      const li = document.createElement('li');
      li.textContent = attendeeText;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'Remove';
      deleteBtn.addEventListener('click', () => {
        li.remove();
        saveData();
        updateItinerary();
      });
      li.appendChild(deleteBtn);
      attendeeList.appendChild(li);
    });

    selectedVenue = data.selectedVenue || '';
    updateItinerary();
  }
}

/***********************************
 * Google Calendar API Integration using GIS & Fetch
 ***********************************/
const API_KEY = 'AIzaSyA-2RQd-_Sbg1cBDsVPgXj9aSm2QvlMMro';

function addEventToGoogleCalendar(title, dateTime, eventDiv) {
  const event = {
    summary: title,
    start: {
      dateTime: new Date(dateTime).toISOString(),
      timeZone: 'America/Los_Angeles'
    },
    end: {
      dateTime: new Date(new Date(dateTime).getTime() + 60 * 60 * 1000).toISOString(),
      timeZone: 'America/Los_Angeles'
    }
  };

  if (!window.accessToken) {
    console.error("No access token available.");
    return;
  }

  fetch('https://www.googleapis.com/calendar/v3/calendars/primary/events?key=' + API_KEY, {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer ' + window.accessToken,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(event)
  })
  .then(response => response.json())
  .then(response => {
    console.log("Calendar event created:", response);
    if (response.error) {
      console.error("Error creating event:", response.error);
    } else {
      // Store the event ID for deletion later.
      eventDiv.dataset.eventId = response.id;
    }
  })
  .catch(error => console.error("Error in fetch:", error));
}

function deleteCalendarEvent(eventDiv) {
  const eventId = eventDiv.dataset.eventId;
  if (!eventId) {
    console.log("No Google Calendar event ID found for this event.");
    return;
  }
  fetch(`https://www.googleapis.com/calendar/v3/calendars/primary/events/${eventId}?key=${API_KEY}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + window.accessToken
    }
  })
  .then(response => {
    if (response.ok) {
      console.log("Event deleted successfully");
    } else {
      console.error("Error deleting event");
    }
  })
  .catch(error => console.error("Error in delete fetch:", error));
}

/***********************************
 * Foursquare API Integration
 ***********************************/
const FOURSQUARE_API_KEY = 'fsq3zF5q1fEQN1Bc/+c8fqA2R8KMHiiWuAkJDOxqyFM6bAk=';
document.getElementById('venue-id').addEventListener('submit', function(e) {
  e.preventDefault();
  const location = document.getElementById('venue-location').value;
  const keyword = document.getElementById('venue-keyword').value;
  searchFoursquareVenues(location, keyword);
});
function searchFoursquareVenues(location, query) {
  const endpoint = `https://api.foursquare.com/v3/places/search?near=${encodeURIComponent(location)}&query=${encodeURIComponent(query)}&fields=fsq_id,name,location`;
  fetch(endpoint, {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Authorization': FOURSQUARE_API_KEY
    }
  })
  .then(response => {
    if (!response.ok) {
      throw new Error(`Error: ${response.status} ${response.statusText}`);
    }
    return response.json();
  })
  .then(data => {
    console.log("Foursquare data:", data);
    displayVenues(data.results);
  })
  .catch(error => console.error('Error fetching Foursquare data:', error));
}

function displayVenues(venues) {
  const resultsDiv = document.getElementById('venue-results');
  resultsDiv.innerHTML = ''; // Clear previous results
  if (venues && venues.length) {
    venues.forEach(venue => {
      const venueDiv = document.createElement('div');
      venueDiv.classList.add('venue');
      const name = venue.name;
      const address = venue.location && venue.location.formatted_address 
                      ? venue.location.formatted_address 
                      : 'Address not available';
      venueDiv.innerHTML = `
        <h3>${name}</h3>
        <p>${address}</p>
        <button onclick="selectVenue('${name}')">Select This Venue</button>
      `;
      resultsDiv.appendChild(venueDiv);
    });
  } else {
    resultsDiv.innerHTML = '<p>No venues found for the specified criteria.</p>';
  }
}

function selectVenue(venueName) {
  console.log('Selected Venue:', venueName);
  selectedVenue = venueName;
  updateItinerary();
}

function resetApp() {
  localStorage.clear();
  window.location.reload();
}

/***********************************
 * Initialize on Page Load
 ***********************************/
window.onload = function() {
  // Initialize the new GIS token client.
  initTokenClient();
  // Load persisted data.
  loadData();
};
  
