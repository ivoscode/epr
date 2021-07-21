import { HTML5Backend } from "backend14";
import { DndProvider } from "dnd14";
import dynamic from "next/dynamic";

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
