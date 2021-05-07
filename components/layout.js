export default function Layout(props) {
  return (
    <div className="flex flex-col w-full ">
      <main className="  mx-auto max-w-screen-2xl w-full  ">
        {props.children}
      </main>
    </div>
  );
}
