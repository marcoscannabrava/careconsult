import React, { Component } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import ReactDOM from 'react-dom';
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import Layout from './Layout';
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
<<<<<<< HEAD
import { createSlot, getTimeSlots } from './Firebase/calendar';
=======
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrash } from '@fortawesome/free-solid-svg-icons'


>>>>>>> added remove icon to events

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar)
const calEvents = [
  {
    start: moment().toDate(),
    end: moment()
      .add(1, "hours")
      .toDate(),
    allDay: false,
    title: "Some title",
    id:1
  },
  {
    start: moment().toDate(),
    end: moment()
      .add(2, "hours")
      .toDate(),
    allDay: false,
    title: "Another Title",
    id:2
  }
]


class MyCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      events: calEvents,
      defaultView:'week'
    }

    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const { events } = this.state

    const idx = events.indexOf(event)
    let allDay = event.allDay

    if (!event.allDay && droppedOnAllDaySlot) {
      allDay = true
    } else if (event.allDay && !droppedOnAllDaySlot) {
      allDay = false
    }

    const updatedEvent = { ...event, start, end, allDay }

    const nextEvents = [...events]
    nextEvents.splice(idx, 1, updatedEvent)

    this.setState({
      events: nextEvents,
    })

    // alert(`${event.title} was dropped onto ${updatedEvent.start}`)
  }

  resizeEvent = ({ event, start, end }) => {
    const { events } = this.state

    const nextEvents = events.map(existingEvent => {
      return existingEvent.id == event.id
        ? { ...existingEvent, start, end }
        : existingEvent
    })

    this.setState({
      events: nextEvents,
    })

    //alert(`${event.title} was resized to ${start}-${end}`)
  }

  newEvent(event) {
    let idList = this.state.events.map(a => a.id)
    let newId = Math.max(...idList) + 1
    let timeSlot = {
    id: newId,
    title: 'New Volunteer Time Slot',
    allDay: event.slots.length == 1,
    start: event.start,
    end: event.end,
    };

    createSlot(timeSlot);

    this.setState({
      events: this.state.events.concat([timeSlot]),
    })
  }

  /*componentDidMount(){
    const eventDiv = document.getElementsByClassName('rbc-event');
    // console.log(eventDiv);
    for(let elem of eventDiv){
      let el = document.createElement('div');
      el.innerHTML = 'X';
      el.style.left = "-11px";
      el.style.position = "relative";
      elem.appendChild(el);
    }
<<<<<<< HEAD

    console.log('events');
    console.log(this.state.events);
    this.updateCalendarEvents = getTimeSlots(events => this.setState({ events }));
  }
=======
  }*/
>>>>>>> added remove icon to events

  componentDidUpdate(){
    const eventDiv = document.getElementsByClassName('rbc-event');
    // console.log(eventDiv);
    for(let elem of eventDiv){
      if(!elem.querySelector(".rbc-trash")){ //prevent duplicate icons from being added to event
      let el = document.createElement('div');
      el.innerHTML = 'X';
      el.style.left = "-11px";
      el.style.position = "relative";
      el.className = "rbc-trash"
      elem.appendChild(el)
    }
  }
  }

  render() {
    // console.log(this.state);
    return (
      <DragAndDropCalendar
        selectable
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent}
        onDragStart={console.log}
        defaultView={this.state.defaultView}
        defaultDate={new Date()}
        style={{ height: "100vh" }}
      />
    )
  }
}


export default () => (
      <MyCalendar />
  );