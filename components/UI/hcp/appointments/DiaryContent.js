import format from "date-fns/format";
import getDay from "date-fns/getDay";
import { enGB } from "date-fns/locale";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import withDragAndDrop from "react-big-calendar/lib/addons/dragAndDrop";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useAxios from "../../../hooks/useAxios";
import useAxiosPost from "../../../hooks/useAxiosPost";

const DragAndDropCalendar = withDragAndDrop(Calendar);
const locales = {
  "en-GB": enGB,
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function DiaryContent() {
  const router = useRouter();
  const user = JSON.parse(localStorage.getItem("EprUser"));
  const [events, setEvents] = useState([]);
  const [eventId, setEventId] = useState();
  const [appointmentDetails, setAppointmentDetails] = useState();
  const [appointmentToSave, setAppointmentToSave] = useState();
  const [saveAndReload, setSaveAndReload] = useState();
  console.log(appointmentToSave);
  //Getting diary events
  const { response, fetchData: getEvents } = useAxios(
    `/api/appointments/range?hcp=&start=2021-06-01&end=2021-06-30`
  );
  ///Getting appointment details
  const { response: appointmentDetailsResponse } = useAxios(
    eventId && `/api/appointment/details?id=${eventId}`
  );

  //Saving appointment with updated time
  const { postData: saveAppointment } = useAxiosPost(
    `/api/appointment/save`,
    appointmentToSave
  );

  useEffect(() => {
    setEvents(response?.data);
  }, [response]);

  useEffect(() => {
    console.log(
      "setting appointment details",
      appointmentDetailsResponse?.data
    );
    setAppointmentDetails(appointmentDetailsResponse?.data);
  }, [appointmentDetailsResponse]);

  useEffect(() => {
    console.log("save and reload running");
    if (saveAndReload) {
      saveAppointment();
      setSaveAndReload(false);
      setTimeout(getEvents, 2000);
    }
  }, [saveAndReload]);

  const moveEvent = (e) => {
    setEventId(e.event.id); //axios calls event automatically once gets eventID

    //--------------------------------
    const start = format(e.start, "yyyy-MM-dd'T'HH:mm");
    const end = format(e.end, "yyyy-MM-dd'T'HH:mm");
    // const eventToUpdate = events.find((item) => item.id == e.event.id);
    // const updatedEvents = events.filter((item) => item.id !== e.event.id);
    // const updatedEvent = { ...eventToUpdate, start, end };
    // setEvents([...updatedEvents, updatedEvent]);
    //----------------------------

    setAppointmentToSave({
      ...appointmentDetails,
      datetime: start,
      duration: (e.end - e.start) / 60 / 1000,
    });
    setSaveAndReload(true);
  };

  const myEventsList = events?.map((x) => {
    return {
      id: x.id,
      title: x.title,
      start: new Date(x.start),
      end: new Date(x.end),
      desc: x.desc,
    };
  });
  if (!events) {
    return null;
  }
  return (
    <div className="p-10 ">
      <DragAndDropCalendar
        selectable
        //resizable={false}
        step={15}
        onEventDrop={moveEvent}
        onEventResize={moveEvent}
        defaultView="week"
        localizer={localizer}
        culture="en-GB"
        events={myEventsList}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        onSelectEvent={(event) => {
          router.push(
            ///ternary operator to account for cases when there is no client id
            `/hcp/appointments/appointment-details?id=${event.id}${
              event.client ? `&clientid=${event.client}` : ""
            }`
          );
        }}
        onSelectSlot={(e) => {
          router.push(
            `/hcp/appointments/appointment-details?hcp=${
              user.hcpId
            }&datetime=${format(e.start, "yyyy-MM-dd'T'HH:mm")}`
          );
        }}
      />
    </div>
  );
}
