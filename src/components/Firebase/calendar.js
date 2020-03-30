import getFirebase from './firebase';

export const createSlot = hour => {
  const currentUser = getFirebase().auth.currentUser;
  
  const slotKey = getFirebase().db.ref('timeSlots').push().key;

  const timeSlot = {
    id: slotKey,
    userId: currentUser.uid,
    allDay: hour.start === hour.end ? true : false,
    title: currentUser.displayName || "Anonymous Volunteer",
    start: hour.start.toISOString(),
    end: hour.end.toISOString()
  }
  
  return getFirebase().db.ref('timeSlots').update({
    [`/${slotKey}`]: timeSlot,
  })
}

export const getTimeSlots = onTimeSlotsChange => {
  const timeSlotsRef = getFirebase().db.ref('timeSlots');
  timeSlotsRef.on('value', snapshot => {
    const snapshotValue = snapshot.val();
    const events = Object.values(snapshotValue);
    events.map((event) => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
    });
    onTimeSlotsChange(events);
  })

  return () => timeSlotsRef.off('value');
}

export const updateSlot = (event, onComplete) => {
  const currentUser = getFirebase().auth.currentUser;

  const timeSlot = {
    id: event.id,
    userId: currentUser.uid, // [TODO] insert check to only allow users to change their own events
    allDay: event.start === event.end ? true : false,
    title: currentUser.displayName || "Anonymous Volunteer",
    start: event.start.toISOString(),
    end: event.end.toISOString()
  }

  return getFirebase().db.ref('timeSlots').update(
    {[`/${event.id}`]: timeSlot},
    onComplete(event)
    );
}