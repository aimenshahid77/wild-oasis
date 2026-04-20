import CabinFilters from "../features/cabins/CabinFilters";
import CabinsTable from "../features/cabins/CabinsTable";

const Cabins = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <div className="flex items-center justify-between">
        {" "}
        <h1 className="text-3xl font-bold">All Cabins</h1>
        <CabinFilters />
      </div>
      <CabinsTable />
    </div>
  );
};

export default Cabins;
