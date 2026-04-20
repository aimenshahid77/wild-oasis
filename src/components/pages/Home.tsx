import DashboardFilter from "../features/dashboard/DashboardFilter";
import FourCards from "../features/dashboard/FourCards";
import { useBookingParams } from "@/hooks/useBookingParams";
import { useDashboardData } from "@/hooks/useDashboard";
import TodayActivity from "../features/dashboard/TodayActivity";
import StayDurationChart from "../features/dashboard/StayDurationChart";
import SalesChart from "../features/dashboard/SalesChart";

const Home = () => {
  const { day } = useBookingParams();
  const { dashboard, isLoading } = useDashboardData(day);

  if (isLoading) return null;
  if (!dashboard) return null;

  return (
    <div className="flex flex-col gap-8 bg-slate-50 min-h-screen p-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <DashboardFilter />
      </div>

      <FourCards />
      <div className="grid grid-cols-2 gap-6">
        <TodayActivity />
        <StayDurationChart dashboard={dashboard} />
      </div>
      <SalesChart dashboard={dashboard} day={day} />
    </div>
  );
};

export default Home;
