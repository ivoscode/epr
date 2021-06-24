export default function BtnMain(props) {
  //Default type is button, on form need to add prop type='submit
  //Hide button by passing hidden={true}
  const { children, type, hidden, style, ...rest } = props;

  return (
    <button
      {...rest}
      type={type || "button"}
      className={` bg-gray-700 hover:bg-gray-900 px-3 py-2 rounded-md text-white font-semibold tracking-widest hover:shadow-2xl ${style}   ${
        hidden ? "hidden" : "inline-block"
      }`}
    >
      {children}
    </button>
  );
}
