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

  // toggleFormVisibility = () => {
  //   this.setState(({ isOpen }) => ({
  //     // destructured prev state
  //     isOpen: !isOpen,
  //   }));
  // };

  handleCreateFormOpen = () => {
    this.setState({
      isOpen: true,
      selectedEvent: null,
    });
  };

  handleCreateFormCancel = () => {
    this.setState({
      isOpen: false,
    });
  };

  handleCreateEvent = newEvent => {
    newEvent.id = cuid();
    newEvent.hostPhotoURL = '/assets/user.png';
    this.setState(({ events }) => ({
      events: [...events, newEvent],
      isOpen: false,
    }));
  };

  handleSelectEvent = event => {
    this.setState({
      selectedEvent: event,
      isOpen: true,
    });
  };

  handleUpdateEvent = updatedEvent => {
    this.setState(({ events }) => ({
      events: events.map(event => {
        if (event.id === updatedEvent.id) {
          return { ...updatedEvent };
        } else return event;
      }),
      isOpen: false,
      selectedEvent: null,
    }));
  };

  handleDeleteEvent = id => {
    this.setState(({ events }) => ({
      events: events.filter(event => event.id !== id),
    }));
  };

  render() {
    const { events, isOpen, selectedEvent } = this.state;
    return (
      <Grid>
        <Grid.Column width={10}>
          <EventList
            events={events}
            selectEvent={this.handleSelectEvent}
            deleteEvent={this.handleDeleteEvent}
          />
        </Grid.Column>
        <Grid.Column width={6}>
          <Button
            positive
            content="Create Event"
            onClick={this.handleCreateFormOpen}
          />
          {isOpen && (
            <EventForm
              key={selectedEvent ? selectedEvent.id : 0} // for updating
              selectedEvent={selectedEvent}
              createEvent={this.handleCreateEvent}
              cancelFormOpen={this.handleCreateFormCancel}
              updateEvent={this.handleUpdateEvent}
            />
          )}
        </Grid.Column>
      </Grid>
    );
  }
}

export default EventDashboard;
