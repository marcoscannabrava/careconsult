import getFirebase from './firebase';

export const createSlot = (hour) => {
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
    events.map(event => {
      event.start = new Date(event.start);
      event.end = new Date(event.end);
    });
    console.log(events);
    onTimeSlotsChange(events);
  })

  return () => timeSlotsRef.off('value');
}