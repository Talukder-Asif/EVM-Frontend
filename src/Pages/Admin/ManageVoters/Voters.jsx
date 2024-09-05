import { MdDeleteOutline, MdOutlineSettings } from "react-icons/md";
import useDepartment from "../../../Hooks/useDepartment";

const Voters = () => {
  const [Department, isDepartmentLoading, refetch] = useDepartment();

  return (
    <div>
    <div className="flex justify-between flex-wrap my-5">
        <div><h3 className="text-2xl font-semibold">List Of voters</h3></div>
        <button className="btn btn-primary">Add new Voters</button>
    </div>
              <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Department</th>
              <th>Program</th>
              <th className="text-center">Batch</th>
              <th className="text-center">Button</th>
            </tr>
          </thead>
          <tbody>            
            
          {
  Department?.map((e, index) => (
    <tr className="hover" key={index}>
      <th>{index + 1}</th>
      <td>{e?.department}</td>
      <td>{e?.program}</td>
      <td className="text-center">{e?.batch.map(e=> `${e} `)}</td>
      <td className="text-center">
      <button className="text-white mx-1 bg-[#002a3f] w-auto py-1 px-4 text-2xl rounded hover:bg-[#2ec4b6] hover:text-[#002a3f] duration-300"><MdOutlineSettings /></button>

      <button className="text-white mx-1 bg-red-600 w-auto py-1 px-4 text-2xl rounded hover:bg-red-700 duration-300"><MdDeleteOutline /></button>
      </td>
    </tr>
  ))
}
          </tbody>
        </table>

      </div>
    </div>
  );
};

export default Voters;
