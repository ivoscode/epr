import {
  PencilAltIcon,
  TrashIcon,
  UserAddIcon,
} from "@heroicons/react/outline";

export default function ClientInfo({
  data,
  handleRemoveClient,
  showClientSearchModal,
}) {
  return (
    <div className=" mt-10  border-2 rounded-md bg-gray-50 border-gray-100 p-3">
      <table className="table-fixed w-full ">
        <thead>
          <tr className="text-left ">
            <th className=" w-7/12 ">Clients</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {data?.map((item, x) => {
            return (
              <tr key={x} className="">
                <td className=" p-1 ">{item?.client?.description}</td>
                <td className="flex justify-between  p-1">
                  <button className="  px-2 py-2 cursor-pointer rounded-md text-gray-800  ">
                    <span>
                      <PencilAltIcon className="w-5 h-5 " />
                    </span>
                  </button>
                  <button
                    onClick={() => {
                      handleRemoveClient(item.client.id);
                    }}
                    className="  px-2 py-2 cursor-pointer rounded-md text-gray-800 mr-6  "
                  >
                    <span>
                      <TrashIcon className="w-5 h-5 " />
                    </span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="flex justify-end mr-20 mt-4">
        <button
          onClick={showClientSearchModal}
          className=" bg-gray-700 px-3 py-1 rounded-md text-white text-xs font-semibold tracking-widest flex items-center"
        >
          <UserAddIcon className="w-4 h-4 mr-1" /> <span>add client</span>
        </button>
      </div>
    </div>
  );
}
