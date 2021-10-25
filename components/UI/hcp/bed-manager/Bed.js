import { useDrag, useDrop } from "dnd14";
import { useRouter } from "next/router";

export default function Bed(props) {
  const { bedId, url, patientName, status, patientPic, patientId, location } =
    props.bed;
  const router = useRouter();
  if (!bedId) {
    return null;
  }
  {
    /*----------controls dropping in to bed---------*/
  }
  const [{ canDrop, isOver }, drop] = useDrop(() => ({
    accept: "patient",
    canDrop: (item) => {
      if (props.bed.status === "vacant") return true;
    },
    drop: (patient) => props.addPatientToBed(patient, props.bed),

    collect: (monitor) => ({
      isOver: !!monitor.isOver(),
      canDrop: !!monitor.canDrop(),
    }),
  }));
  //console.log(isOver, canDrop, props.bed.status);
  {
    /*-------taking patient out of bed---------------*/
  }
  const [{ isDragging, didDrop }, drag] = useDrag(() => ({
    type: "patient",
    item: () => {
      return {
        id: patientId,
        name: patientName,
        patientPic: patientPic,
        prevBedId: bedId,
      };
    },

    collect: (monitor) => {
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  const admit = () => {
    return (
      <button
        onClick={() => {
          console.log("admit clicked", bedId, location);
          router.push(
            `/hcp/bedManagement/admissions?formid=admission&bedId=${bedId}&location=${location}`
          );
          sessionStorage.setItem(
            `bed-to-admit`,
            JSON.stringify({ bedId, location })
          );
        }}
        className="bg-gray-700 text-white px-3 rounded-lg"
      >
        Admit
      </button>
    );
  };
  const discharge = () => {
    return (
      <button
        onClick={() => {
          console.log("discharge clicked");
        }}
        className="bg-gray-700 text-white px-3 rounded-lg"
      >
        Disch
      </button>
    );
  };
  return (
    <div
      ref={drop}
      className={`border w-full h-full relative pb-3 bg-gray-300  border-gray-300 shadow-xl rounded-xl cursor-move  `}
    >
      <div className="flex justify-center">
        {patientPic ? (
          <img
            ref={drag}
            className=" w-16 h-16 top-2 rounded-md  "
            src={patientPic}
          />
        ) : (
          <img className=" w-16 h-16 top-2" src={url} />
        )}
      </div>
      <div>{bedId}</div>
      <div>{patientName}</div>
      {status == "vacant" && <div> {status}</div>}
      <div className="flex justify-center">
        {patientName ? discharge() : admit()}
      </div>
    </div>
  );
}
