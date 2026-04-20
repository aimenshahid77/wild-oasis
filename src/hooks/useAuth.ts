import {
  CreateUser,
  editUser,
  editUserPassword,
  getUser,
  LoginUser,
  LogoutUser,
} from "@/services/apiAuth";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

import { toast } from "sonner";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: CreateUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created succesfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again. ");
    },
  });
  return { mutate, isPending };
}

export function useLoginUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: LoginUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["login-users"] });
      toast.success("User logged in successfully.");
    },
    onError: () => {
      toast.error("Something went wrong. Please try again. ");
    },
  });
  return { mutate, isPending };
}

export function useGetUser() {
  const { data, isLoading } = useQuery({
    queryFn: getUser,
    queryKey: ["get-users"],
  });
  return { data, isLoading };
}

export function useLogoutUser() {
  const { mutate, isPending } = useMutation({
    mutationFn: LogoutUser,
  });

  return { mutate, isPending };
}

export function useEditUser() {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: editUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-users"] });
      toast.success("Update done successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending };
}

export function useEditUserPassword() {
  const queryClient = useQueryClient();
  const { mutate, isPending } = useMutation({
    mutationFn: editUserPassword,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["update-password"] });
      toast.success("Update done successfully.");
    },
    onError: (error: Error) => {
      toast.error(error.message);
    },
  });
  return { mutate, isPending };
}
