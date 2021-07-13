import { XCircleIcon } from "@heroicons/react/outline";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { createPortal } from "react-dom";
function Modal({ isOpened, children, onClose }) {
  useEffect(() => {
    if (!isOpened) {
      document.documentElement.style.overflow = "scroll";
      document.body.scroll = "yes";
    }
  }, [isOpened]);

  if (!isOpened) {
    return null;
  }
  document.documentElement.style.overflow = "hidden";
  document.body.scroll = "no";
  return createPortal(
    <div>
      <div
        className="fixed  w-full h-full z-40 bg-black bg-opacity-75"
        onClick={onClose}
      ></div>

      <div className="custom-modal max-w-9xl overflow-y-auto  bg-main-bg-color  ">
        {/*----------------Close button------------------*/}

        <div className="sticky top-5 mr-5 inline-block  left-full  z-70 ">
          <span
            onClick={onClose}
            className="text-gray-700 hover:text-gray-900  mr-4 mt-4 cursor-pointer  "
          >
            <XCircleIcon className="w-12 h-12 " />
          </span>
        </div>
        {/*----------------Content------------------*/}
        <div className="px-5"> {children}</div>
      </div>
    </div>,
    document.getElementById("modal")
  );
}
export default dynamic(() => Promise.resolve(Modal), {
  ssr: false,
});
