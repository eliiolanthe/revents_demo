import React, { Component } from 'react';
import { Grid, Button } from 'semantic-ui-react';
import EventList from '../EventList/EventList';
import EventForm from '../EventForm/EventForm';
import cuid from 'cuid';

import events from '../services/events';

class EventDashboard extends Component {
  state = {
    events,
    isOpen: false,
    selectedEvent: null,
  };

  toggleFormVisibility = () => {
    this.setState(({ isOpen }) => ({
      // destructured prev state
      isOpen: !isOpen,
    }));
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false,
    }));
  };

  render() {
    const { events, isOpen } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList events={events} />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Event"
            onClick={this.toggleFormVisibility}
          />
          {isOpen && (
            <EventForm
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.toggleFormVisibility}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
