import format from "date-fns/format";
import getDay from "date-fns/getDay";
//import { enGB } from "date-fns/locale";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { useRouter } from "next/router";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import useAxios from "../../../hooks/useAxios";
const locales = {
  "en-GB": require("date-fns/locale/en-GB"),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

export default function CalendarContent() {
  const router = useRouter();
  const { response } = useAxios(
    `/api/appointments/range?hcp=&start=2021-06-01&end=2021-06-30`
  );

  const user = JSON.parse(localStorage.getItem("EprUser"));

  if (!response) {
    return null;
  }

  console.log(response);

  const myEventsList = response.data.map((x) => {
    return {
      id: x.id,
      title: x.title,
      start: new Date(x.start),
      end: new Date(x.end),
      desc: x.desc,
    };
  });

  return (
    <div className="p-10 ">
      <Calendar
        selectable
        step={15}
        defaultView="week"
        localizer={localizer}
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
