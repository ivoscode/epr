export default function LinksComp(props) {
  console.log(props);
  return (
    <div className="bg-pink-700 h-full">
      <div>{props.data.title}</div>
    </div>
  );
}
