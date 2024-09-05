import useDepartment from "../../../Hooks/useDepartment";

const Voters = () => {
  const [Department, isDepartmentLoading, refetch] = useDepartment();
  console.log(Department);
  return (
    <div className="join join-vertical w-full">
      {Department?.map((department, i) => (
        <div
          key={i}
          className="collapse collapse-arrow join-item border-base-300 border"
        >
          <input type="radio" name="my-accordion-4" defaultChecked />
          <div className="collapse-title text-xl font-medium">
            Department Of {department.department}
          </div>
          <div className="collapse-content">
            <div className="flex gap-3 flex-wrap justify-evenly">
            {
                department?.batch.map((b,j)=>(
                    <button className=" px-4 py-2 bg-[#002a3f] text-white rounded" key={j}>{b}</button>
                ))
            }
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Voters;
