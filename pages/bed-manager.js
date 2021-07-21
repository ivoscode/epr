import { DndProvider } from "dnd14";
import dynamic from "next/dynamic";
import { HTML5Backend } from "react-dnd-html5-backend";

//import BedManager from "../components/UI/client/bedManagment/BedManager";
const BedManager = dynamic(
  () => import("../components/UI/client/bed-manager/BedManager"),
  {
    ssr: false,
  }
);
export default function Bedtest() {
  return (
    <DndProvider backend={HTML5Backend}>
      <div className="App">
        <BedManager />
      </div>
    </DndProvider>
  );
}
