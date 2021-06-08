import { XCircleIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { createPortal } from "react-dom";
function Modal({ isOpened, children, onClose }) {
  if (!isOpened) {
    return null;
  }
  return createPortal(
    <div className="">
      <div className="custom-backdrop" onClick={onClose}></div>

      <div className="custom-modal  overflow-y-auto   ">
        <div>
          <div className="flex sticky top-4 justify-end z-40 ">
            <span
              onClick={onClose}
              className="text-gray-600  mr-4  cursor-pointer  "
            >
              <XCircleIcon className="w-12 h-12 " />
            </span>
          </div>
          <div className="-mt-16"> {children}</div>
        </div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
