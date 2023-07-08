import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const URL = process.env.REACT_APP_API_URL

const usePostData = () => {
    const makePostKey = id => ['post', id];
    const { id } = useParams();

    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get(
                `${URL}/posts/${id}`
            )
        return data
        },

        queryKey: makePostKey(id),
        refetchIntervalInBackground: true,
        refetchOnWindowFocus: true,
        
    })
}

export default usePostData;