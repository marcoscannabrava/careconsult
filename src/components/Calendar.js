import React from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/addons/dragAndDrop/styles.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { createSlot, getTimeSlots, updateSlot } from './Firebase/calendar';
import { withFirebase } from "./Firebase";


const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(Calendar)


class MyCalendar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      ...this.state,
      events: [],
      defaultView:'week'
    }
    this.onClick = this.onClick.bind(this);
    this.moveEvent = this.moveEvent.bind(this)
    this.newEvent = this.newEvent.bind(this)
  }

  moveEvent({ event, start, end, isAllDay: droppedOnAllDaySlot }) {
    const updatedEvent = { ...event, start, end };
    updateSlot(updatedEvent, (eventFromDB) => {
      this.setState({ events: this.state.events.concat([eventFromDB]) })
    });
  }

  resizeEvent = (event) => {
    console.log(event);
    updateSlot(event, (event) => {
      this.setState({ events: this.state.events.concat([event]) })
    });
  }

  newEvent(event) {
    let timeSlot = {
      title: 'New Volunteer Time Slot',
      allDay: event.slots.length === 1,
      start: event.start,
      end: event.end,
    };
    createSlot(timeSlot);
  }

componentDidMount(){
  this.updateCalendarEvents = getTimeSlots(events => this.setState({ events }));
}


onClick(pEvent,event) {
    if(event.target.className === "rbc-trash"){
      const r = window.confirm("Would you like to remove this event?")
      if(r === true){
        this.setState((prevState, props) => {
          const events = [...prevState.events]
          const idx = events.indexOf(pEvent)
          events.splice(idx, 1);
          return { events };
        });
      }
   }
    
  }

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
    // console.log("props on render");
    // console.log(this.props);     // Why is firebase only here and not anywhere else?
    return (
      <DragAndDropCalendar
        {...this.props}
        selectable
        localizer={localizer}
        events={this.state.events}
        onEventDrop={this.moveEvent}
        resizable
        onEventResize={this.resizeEvent}
        onSelectSlot={this.newEvent} // [TODO] make it condition on user role: only health providers allowed
        onDragStart={console.log}
        defaultView={this.state.defaultView}
        defaultDate={new Date()}
        style={{ height: "80vh" }}
        onSelectEvent = {this.onClick}
      />
    )
  }
}

const CalendarComponent = withFirebase(MyCalendar);

export default CalendarComponent;