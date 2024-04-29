import { useQuery } from "react-query";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const usePostsData = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/items`);
      return data;
    },
    refetchIntervalInBackground: true,
    refetchOnWindowFocus: true,
  });
};

export default usePostsData;
