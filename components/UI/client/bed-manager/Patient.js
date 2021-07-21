import { useDrag } from "dnd14";
export default function Patient(props) {
  const { id, patientPic, name, status } = props.patient;
  const [{ isDragging }, drag] = useDrag(() => ({
    type: "patient",
    item: () => {
      return { ...props.patient };
    },
    collect: (monitor) => {
      //console.log(`${title} drop result ${monitor.canDrag()}`);
      return {
        isDragging: !!monitor.isDragging(),
      };
    },
  }));

  return (
    <div
      className={`border  border-gray-300 shadow-xl rounded-xl m-4 w-32 p-4 cursor-move overflow-hidden ${
        isDragging && "opacity-50"
      }`}
    >
      <img className="overflow-hidden rounded-md" ref={drag} src={patientPic} />
      <div>{name}</div>
      <div> {status}</div>
    </div>
  );
}
