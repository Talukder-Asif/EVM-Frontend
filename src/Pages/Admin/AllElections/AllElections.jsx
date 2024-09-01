import useAllElections from "../../../Hooks/useAllElections";

const AllElections = () => {
    const [Elections, isElectionLoading, refetch] = useAllElections();
    console.log(Elections)
    return (
        <div>
            abc
        </div>
    );
};

export default AllElections;