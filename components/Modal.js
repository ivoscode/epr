import dynamic from "next/dynamic";
import { createPortal } from "react-dom";

// export function ModalOverlay(props) {
//   return (
//     <div className="modal">
//       <div>{props.children}</div>
//     </div>
//   );
// }

// export function Backdrop(props) {
//   return <div className="backdrop"></div>;
// }

function Modal({ isOpened, children, onClose }) {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div className="custom-backdrop" onClick={onClose}></div>
      <div className="custom-modal">
        <div>{children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
