import { useQuery } from "react-query";
import axios from "axios";

const URL = process.env.REACT_APP_API_URL;

const useUsernamesData = () => {
  return useQuery({
    queryFn: async () => {
      const { data } = await axios.get(`${URL}/accounts`);
      return data;
    },
  });
};

export default useUsernamesData;