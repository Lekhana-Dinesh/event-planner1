# Event-Planner
# Lumi`ere Event Planner

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](LICENSE)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen.svg)](https://github.com/yourusername/lumiere-event-planner)
[![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)](https://github.com/yourusername/lumiere-event-planner/releases)

Lumi`ere is a dynamic and interactive event planning web application designed to streamline the process of managing events. The tool allows users to schedule events, manage guest lists, and select the perfect venue—all integrated with external APIs for live data updates and persistence.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Configuration](#configuration)
  - [Google Calendar API](#google-calendar-api)
  - [Foursquare API](#foursquare-api)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- **Event Scheduling & Google Calendar Integration**  
  Create events via a simple form that displays events on the page and automatically adds them to your Google Calendar using OAuth 2.0.

- **Attendee Management**  
  Easily add, view, and remove attendees from a dynamic, DOM-based list.

- **Venue Search with Foursquare API**  
  Search for venues based on location and keywords and select a venue to include in your event itinerary.

- **Dynamic Itinerary Generation**  
  The application automatically aggregates scheduled events, attendees, and the selected venue into a real-time itinerary.

- **Data Persistence**  
  All data is saved to the browser’s localStorage so that your event details persist even after a page refresh.

- **Event Deletion**  
  Remove events from both the local display and Google Calendar via a dedicated delete button.


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
For example, using VS Code, right-click on index.html and select "Open with Live Server".

4. **Access the Application:**
Open your browser and navigate to the server’s URL (e.g., http://localhost:5500).

### Configuration
Google Calendar API
Create/Select a Project:
Visit the Google Cloud Console and create or select a project.

### Enable the Google Calendar API:
In APIs & Services > Library, enable the Google Calendar API.

### Create OAuth 2.0 Credentials:
Navigate to APIs & Services > Credentials.
Click "Create Credentials" and select "OAuth client ID".
Choose "Web application".
Under Authorized JavaScript origins, add your local development URL (e.g., http://localhost:5500).
Under Authorized redirect URIs, add http://localhost:5500/oauth2callback (or your chosen callback URI).
Save your credentials and update the CLIENT_ID and API_KEY values in js/app.js accordingly.

### Configure the OAuth Consent Screen:

Set the user type to External.
Add your test users (e.g., your Gmail address) under the Test Users section.

### Foursquare API
Sign Up and Create an App:
Visit Foursquare for Developers, sign up, and create a new app to obtain your FOURSQUARE_API_KEY.

### Update the API Key:
Replace the placeholder in js/app.js with your actual Foursquare API key.

## Usage
**Event Scheduling:**

Enter an event title and date/time in the Schedule your Event section.
The event will display on the page and be added to your Google Calendar.

**Attendee Management:**
Add attendee names and emails in the Manage Attendees section.
Attendees will be listed dynamically with options to remove them.

**Venue Search:**
In the Find a Venue section, enter a location and keyword.
Venue suggestions from Foursquare will be displayed.
(Optional: If filter inputs are removed, the search uses only location and keyword.)

**Dynamic Itinerary:**
The Event Itinerary section aggregates your events, attendees, and selected venue in real time.
Use the delete buttons to remove scheduled events (both locally and from Google Calendar).

## Technologies
--HTML5 & CSS3

--Vanilla JavaScript (ES6)

--Google Calendar API (OAuth 2.0)

--Foursquare API

--LocalStorage for data persistence
