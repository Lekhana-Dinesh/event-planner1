# Event-Planner  
# Lumi`ere Event Planner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)  
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/lumiere-event-planner)  
[![Version](https://img.shields.io/badge/version-1.1.0-blue.svg)](https://github.com/yourusername/lumiere-event-planner/releases)

Lumi`ere is a dynamic and interactive event planning web application designed to streamline the process of managing events. The tool allows users to schedule events, manage guest lists, and select the perfect venue—all integrated with external APIs for live data updates and persistence. The latest update includes a migration to the new Google Identity Services (GIS) for secure and modern OAuth 2.0 authentication.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Google Calendar API (Using GIS)](#google-calendar-api-using-gis)
  - [Foursquare API](#foursquare-api)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Event Scheduling & Google Calendar Integration**  
  Create events via a simple form that displays events on the page and automatically adds them to your Google Calendar using OAuth 2.0 through the new Google Identity Services (GIS) library.

- **Attendee Management**  
  Easily add, view, and remove attendees from a dynamic, DOM-based list.

- **Venue Search with Foursquare API**  
  Search for venues based on location and keywords and select a venue to include in your event itinerary.

- **Dynamic Itinerary Generation**  
  The application automatically aggregates scheduled events, attendees, and the selected venue into a real-time itinerary (with delete options only available in the schedule section).

- **Data Persistence**  
  All data is saved to the browser’s localStorage so that your event details persist even after a page refresh.

- **Event Deletion**  
  Remove events from both the local display and Google Calendar via dedicated delete buttons.

## Installation

### Prerequisites

- A modern web browser (Chrome, Firefox, Edge, etc.)
- A local development server (e.g., [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) for Visual Studio Code)

### Steps

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/lumiere-event-planner.git
   cd lumiere-event-planner
   
2. **Open the Project:**
   Open the folder in your preferred code editor.
   
3. **Start the Local Server:**
   For example, using VS Code, right-click on index.html and select "Open with Live Server."
4. **Access the Application:**
   Open your browser and navigate to the server’s URL (e.g., http://localhost:5500).

## Configuration
### Google Calendar API (Using GIS)

**Create/Select a Project:**

Visit the Google Cloud Console and create or select a project.

**Enable the Google Calendar API:**

--In APIs & Services > Library, search for and enable the Google Calendar API.

--Configure OAuth 2.0 Credentials Using GIS:

--Navigate to APIs & Services > Credentials.

--Click "Create Credentials" and select "OAuth client ID".

--Choose "Web application".

--Under Authorized JavaScript origins, add your local development URL (e.g., http://localhost:5500) and your production URL (e.g., https://lekhana-dinesh.github.io).

--Under Authorized redirect URIs, add your deployed callback URL (e.g., https://lekhana-dinesh.github.io/event-planner1/).

--Save your credentials.

**Update Your Code:**
In js/app.js, update the CLIENT_ID and ensure the authentication flow uses the new GIS library. (The current implementation uses GIS to request an access token and then calls the Calendar API via fetch.)

### Foursquare API

**Sign Up and Create an App:**

--Visit Foursquare for Developers, sign up, and create a new app to obtain your FOURSQUARE_API_KEY.

**Update the API Key:**

Replace the placeholder in js/app.js with your actual FOURSQUARE_API_KEY.

## Usage

**Event Scheduling:**

--Enter an event title and date/time in the "Schedule your Event" section.

--If not already signed in, the application will prompt for Google sign-in using GIS. Once authenticated, the event is added to your Google Calendar.

--Scheduled events appear on the page with a delete button (only in the calendar display).

**Attendee Management:**

--Add attendee names and emails in the "Manage Attendees" section.

--Attendees are listed dynamically with options to remove them.

**Venue Search:**

--In the "Find a Venue" section, enter a location and keyword.

--Venue suggestions from Foursquare are displayed, and you can select a venue to include in your itinerary.

**Dynamic Itinerary:**

--The "Event Itinerary" section aggregates your events, attendees, and selected venue in real time.

--Delete buttons are only available on the scheduled events in the calendar display, not in the itinerary summary.

## Technologies

--HTML5 & CSS3

--Vanilla JavaScript (ES6)

--Google Calendar API (via Google Identity Services for OAuth 2.0)

--Foursquare API

--LocalStorage for data persistence
