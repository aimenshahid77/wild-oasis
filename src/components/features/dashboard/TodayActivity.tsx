import { useNavigate } from "react-router-dom";
import { useTodayActivity } from "@/hooks/useDashboard";
import { useCheckOut } from "@/hooks/useBookings";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
type TodayActivityItem = {
  id: number;
  status: string;
  numNights: number;
  guests: {
    fullName: string;
    countryFlag: string;
    nationality: string;
  } | null;
};

function TodayActivity() {
  const { activities, isLoading } = useTodayActivity();

  if (isLoading)
    return (
      <div className="p-8 text-center text-slate-500 font-medium">
        Loading activity...
      </div>
    );

  return (
    <Card className="flex flex-col gap-4 shadow-md border-slate-200">
      <CardHeader className="pb-2">
        <CardTitle className="text-xl font-bold text-slate-800">
          Today
        </CardTitle>
      </CardHeader>
      <CardContent>
        {activities && activities.length > 0 ? (
          <ul className="flex flex-col gap-1 divide-y divide-slate-100">
            {activities.map((activity: TodayActivityItem) => (
              <TodayItem key={activity.id} activity={activity} />
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-400 py-10 font-medium italic">
            No activity today...
          </p>
        )}
      </CardContent>
    </Card>
  );
}

function TodayItem({ activity }: { activity: TodayActivityItem }) {
  const { id, status, guests, numNights } = activity;
  const navigate = useNavigate();
  const { mutate: checkOut, isPending: isCheckingOut } = useCheckOut();

  if (!guests) return null;
  const isArriving = status === "unconfirmed";

  return (
    <li className="flex items-center gap-4 py-3 first:pt-0 last:pb-0 transition-all hover:bg-slate-50/50 -mx-2 px-2 rounded-lg">
      <Badge
        className={cn(
          "uppercase font-bold tracking-wider px-2 py-0.5 rounded-full text-[9px] w-20 flex justify-center border-none shadow-none",
          isArriving
            ? "bg-emerald-100 text-emerald-700 hover:bg-emerald-200"
            : "bg-rose-100 text-rose-700 hover:bg-rose-200",
        )}
      >
        {isArriving ? "Arriving" : "Departing"}
      </Badge>

      <img
        src={guests.countryFlag}
        alt={`Flag of ${guests.nationality}`}
        className="w-6 h-4 object-cover rounded-sm border border-slate-200 shadow-sm"
      />

      <span className="font-semibold flex-grow text-sm text-slate-700">
        {guests.fullName}
      </span>

      <span className="text-slate-400 text-[10px] font-bold uppercase whitespace-nowrap">
        {numNights} nights
      </span>

      {isArriving ? (
        <Button
          size="xs"
          className="px-4 text-[10px] font-bold uppercase h-7 bg-indigo-600 hover:bg-indigo-700"
          onClick={() => navigate(`/checkin/${id}`)}
        >
          Check In
        </Button>
      ) : (
        <Button
          size="xs"
          variant="outline"
          className="px-4 text-[10px] font-bold uppercase h-7 border-rose-200 text-rose-600 hover:bg-rose-50 hover:text-rose-700"
          onClick={() => checkOut(id)}
          disabled={isCheckingOut}
        >
          {isCheckingOut ? "Status..." : "Check Out"}
        </Button>
      )}
    </li>
  );
}

export default TodayActivity;
