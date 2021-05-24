import { useQuery } from "react-query";
import request from '@/utils/request'

export const useUser = () => {
  return useQuery(["users"], () =>
    request("/user")
  );
}