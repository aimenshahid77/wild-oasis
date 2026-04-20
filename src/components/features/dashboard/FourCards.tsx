import { useBookingParams } from "@/hooks/useBookingParams";
import { useCabinsCount, useDashboardData } from "@/hooks/useDashboard";
import { BarChart, Briefcase, Calendar, DollarSign } from "lucide-react";

function FourCards() {
  const { day } = useBookingParams();
  const { dashboard, isLoading: isLoadingDashboard } = useDashboardData(day);
  const { cabinsCount, isLoading: isLoadingCabins } = useCabinsCount();

  if (isLoadingDashboard || isLoadingCabins) return <div>....isloading</div>;

  if (!dashboard || cabinsCount === undefined || cabinsCount === null)
    return null;

  const totalBookings = dashboard.length;
  const totalSales = dashboard.reduce(
    (sum, booking) => sum + booking.totalPrice,
    0,
  );
  const checkIns = dashboard.filter(
    (booking) => booking.status === "checked-in",
  ).length;

  // Calculate occupancy rate
  const totalOccupiedNights = dashboard.reduce(
    (acc, cur) => acc + cur.numNights,
    0,
  );
  const occupationRate =
    Math.round((totalOccupiedNights / (day * (cabinsCount || 1))) * 100) + "%";

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <div className="bg-white border-0 shadow-sm rounded-lg p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
          <Briefcase size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] uppercase font-bold text-muted-foreground/60 tracking-wider">Bookings</p>
          <p className="text-2xl font-bold text-slate-700">{totalBookings}</p>
        </div>
      </div>

      <div className="bg-white border-0 shadow-sm rounded-lg p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center text-green-600">
          <DollarSign size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] uppercase font-bold text-muted-foreground/60 tracking-wider">Sales</p>
          <p className="text-2xl font-bold text-slate-700">${totalSales.toLocaleString()}</p>
        </div>
      </div>

      <div className="bg-white border-0 shadow-sm rounded-lg p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
          <Calendar size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] uppercase font-bold text-muted-foreground/60 tracking-wider">Check Ins</p>
          <p className="text-2xl font-bold text-slate-700">{checkIns}</p>
        </div>
      </div>

      <div className="bg-white border-0 shadow-sm rounded-lg p-5 flex items-center gap-5">
        <div className="w-14 h-14 rounded-full bg-yellow-100 flex items-center justify-center text-yellow-600">
          <BarChart size={24} />
        </div>
        <div className="flex flex-col">
          <p className="text-[11px] uppercase font-bold text-muted-foreground/60 tracking-wider">Occupancy Rate</p>
          <p className="text-2xl font-bold text-slate-700">{occupationRate}</p>
        </div>
      </div>
    </div>
  );
}

export default FourCards;
