import { XCircleIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
function Modal({ isOpened, children, onClose }) {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div>
      <div
        className="fixed top-0 left-0 w-full h-screen z-60 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>

      <div className="custom-modal  overflow-y-auto bg-gray-50   ">
        {/*----------------Close button------------------*/}

        <div className="flex sticky top-0 justify-end bg-gray-50 z-70 ">
          <span
            onClick={onClose}
            className="text-pink-800  mr-4 mt-4 cursor-pointer  "
          >
            <XCircleIcon className="w-12 h-12 " />
          </span>
        </div>
        {/*----------------Content------------------*/}
        <div> {children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
