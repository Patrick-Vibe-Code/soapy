import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchStreaks = async () => {
  const { data } = await axios.get("/api/streaks");
  return data;
};

const postCheckin = async (name) => {
  const { data } = await axios.post("/api/checkin", { name });
  return data;
};

export const useStreaks = (options = {}) =>
  useQuery({ queryKey: ["streaks"], queryFn: fetchStreaks, ...options });

export const useCheckin = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: postCheckin,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["streaks"] }),
  });
};
