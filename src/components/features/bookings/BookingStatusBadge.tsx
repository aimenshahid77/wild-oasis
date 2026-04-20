type Status = string;

const statusStyles: Record<string, string> = {
  unconfirmed: "bg-red-100 text-red-700 border border-red-300",
  "checked-in": "bg-blue-100 text-blue-700 border border-blue-300",
  "checked-out": "bg-green-100 text-green-700 border border-green-300",
};

export default function BookingStatusBadge({ status }: { status: Status }) {
  const styles =
    statusStyles[status.toLowerCase()] ?? "bg-muted text-muted-foreground";

  return (
    <span
      className={`px-2 py-1 rounded-full text-xs font-semibold uppercase tracking-wide ${styles}`}
    >
      {status}
    </span>
  );
}
