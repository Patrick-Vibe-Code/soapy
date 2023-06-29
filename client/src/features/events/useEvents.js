import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const fetchEvents = async () => {
  const { data } = await axios.get("/api/events");
  return [...data].reverse();
};

const createEvent = async (payload) => {
  const { data } = await axios.post("/api/events", payload);
  return data;
};

const updateEvent = async ({ id, payload }) => {
  const { data } = await axios.put(`/api/events/${id}`, payload);
  return data;
};

export const useEvents = () =>
  useQuery({ queryKey: ["events"], queryFn: fetchEvents });

export const useCreateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
};

export const useUpdateEvent = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateEvent,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["events"] }),
  });
};
