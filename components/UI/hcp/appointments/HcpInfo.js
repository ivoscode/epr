import {
  ClipboardListIcon,
  UserAddIcon,
  UserRemoveIcon,
} from "@heroicons/react/outline";

export default function HcpInfo({ data, handleRemove }) {
  return (
    <div className=" mt-10  border-2 rounded-md bg-gray-50 shadow-md p-3">
      <table className="table-fixed w-full ">
        <thead>
          <tr className="text-left ">
            <th className=" w-7/12 ">HCP</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, x) => {
            return (
              <tr key={x} className="">
                <td className=" p-1 ">{item.id}</td>
                <td className="flex justify-between  p-1">
                  <button className=" bg-yellow-500 px-3 py-1 rounded-md text-white text-xs font-semibold tracking-widest flex items-center">
                    <ClipboardListIcon className="w-4 h-4 mr-1" />{" "}
                    <span>edit</span>
                  </button>
                  <button
                    onClick={() => {
                      handleRemove(item.id);
                    }}
                    className=" bg-red-500 px-3 py-1 rounded-md text-white text-xs font-semibold tracking-widest flex items-center"
                  >
                    <UserRemoveIcon className="w-4 h-4 mr-1" />
                    <span>remove</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end mr-10 mt-4">
        <button className=" bg-green-800 px-3 py-1 rounded-md text-white text-xs font-semibold tracking-widest flex items-center">
          <UserAddIcon className="w-4 h-4 mr-1" /> <span>add user</span>
        </button>
      </div>
    </div>
  );
}
