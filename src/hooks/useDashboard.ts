import { getCabinsCount, getDashboardData, getStaysTodayActivity } from "@/services/apiDashboard";
import { useQuery } from "@tanstack/react-query";

export function useDashboardData(days : number) {
  const { data: dashboard, isLoading } = useQuery({
    queryFn: ()=>  getDashboardData(days),
    queryKey: ["dashboard", days],
  });
  return { dashboard, isLoading };
}

export function useCabinsCount() {
  const { data: cabinsCount, isLoading } = useQuery({
    queryFn: getCabinsCount,
    queryKey: ["cabinsCount"],
  });
  return { cabinsCount, isLoading };
}

export function useTodayActivity() {
  const { isLoading, data: activities } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["today-activity"],
  });

  return { activities, isLoading };
}



