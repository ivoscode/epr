import { data } from "autoprefixer";

export default function ImageComp(props) {
  return (
    <div className="bg-gray-700 h-full">
      <img src={data.src} />
    </div>
  );
}
