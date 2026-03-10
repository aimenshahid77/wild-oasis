import CabinsTable from "../features/cabins/CabinsTable"

const Cabins = () => {
  return (
    <div className="flex flex-col gap-4 p-8">
      <h1 className="text-3xl font-bold">All Cabins</h1>
      <CabinsTable />
    </div>
  )
}

export default Cabins
