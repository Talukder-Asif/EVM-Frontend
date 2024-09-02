import Swal from "sweetalert2";
import useAllElections from "../../../Hooks/useAllElections";
import useAxios from "../../../Hooks/useAxios";

const AllElections = () => {
  const [Elections, isElectionLoading, refetch] = useAllElections();
  const axiosPublic = useAxios();
  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosPublic.delete(`/election/${id}`).then((res) => {
          if (res?.data?.acknowledged) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your file has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  const handleUpdate = (election,e) => {
    const updateData = {
        electionName: election.electionName,
        date: election.date,
        departments: election.departments,
        details: election.details,
        candidate: election.candidate,
        voter: election.voter,
        status: e,
        imageURL: election.imageURL,
      };
      axiosPublic.put(`/element/${election._id}`, updateData)
      .then(res => {
        if(res.data.modifiedCount > 0){
            Swal.fire({
                title: "Updated!",
                text: `${election.electionName}'s status Updated`,
                icon: "success",
              });
              refetch();
        };
      })
  };

  if (isElectionLoading) return <div>Loading...</div>;
  return (
    <div>
      <div className="overflow-x-auto">
        <table className="table">
          {/* head */}
          <thead>
            <tr>
              <th></th>
              <th>Name Of Election</th>
              <th>Department</th>
              <th>Status</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {/* row 1 */}

            {Elections?.map((election, i) => (
              <tr key={i}>
                <th>{i + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img
                          src={election?.imageURL}
                          alt={election?.electionName}
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{election?.electionName}</div>
                      <div className="text-sm opacity-50">{election?.date}</div>
                    </div>
                  </div>
                </td>
                <td>{election?.departments.map((d) => `${d} `)}</td>

                <td>
                  <select
                    className="select border-[#002a3f]"
                    defaultValue={election?.status}
                    name="status"
                    onChange={(e) => {
                      Swal.fire({
                        title: "Are you sure?",
                        text: `Do you want to Update status`,
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "#3085d6",
                        cancelButtonColor: "#d33",
                        confirmButtonText: "Yes, update it!",
                      }).then((result) => {
                        if (result.isConfirmed) {
                            handleUpdate(election,e.target.value);
                        }
                      });
                    }}
                  >
                    <option
                      className={
                        election?.status === "Ongoing" ? "hidden" : null
                      }
                    >
                      Ongoing
                    </option>
                    <option
                      className={election?.status === "END" ? "hidden" : null}
                    >
                      END
                    </option>
                    <option
                      className={
                        election?.status === "Upcoming" ? "hidden" : null
                      }
                    >
                      Upcoming
                    </option>
                  </select>
                </td>

                <td>
                  <button
                    onClick={() => handleDelete(election._id)}
                    className="text-white py-2 px-5 hover:bg-red-700 rounded bg-red-600 duration-300"
                  >
                    X
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllElections;
