export default function Picklist(props) {
  const { label, name, options, setSelected, value } = props;
  // console.log(options);
  return (
    <div className="flex w-full justify-between items-center mt-4">
      <div
        className={`" text-gray-500 font-bold mr-10 " ${
          label ? "w-1/2" : "hidden"
        }`}
      >
        <label htmlFor={name}>{label}</label>
      </div>
      <div className={`${label ? "w-1/2" : "w-full"}`}>
        <select
          options={options}
          value={value}
          className="input-box "
          onChange={(e) => {
            console.log("on change trigered", e.target.value);
            setSelected(e.target.value);
          }}
        >
          {options?.map((option) => (
            <option key={option.description} value={option.id}>
              {option.description}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
