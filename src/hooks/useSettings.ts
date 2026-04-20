import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getSettings, updateSettings } from "@/services/apiSettings";
import { toast } from "sonner";

export function useSettings (){
    const {data: settings, isLoading} = useQuery({
        queryKey: ["settings"],
        queryFn: getSettings,
    })
    return {settings, isLoading}
}

export function useUpdateSettings() {
    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: (newSettings: {minBookingLength: number, maxBookingLength: number, maxGuestsPerBooking: number, breakfastPrice: number}) => updateSettings(newSettings),
        onSuccess: () => {
            toast.success("Settings successfully updated");
            queryClient.invalidateQueries({ queryKey: ["settings"] });
        },
        onError: (err: Error) => toast.error(err.message),
    });
    return { mutate, isPending };
}