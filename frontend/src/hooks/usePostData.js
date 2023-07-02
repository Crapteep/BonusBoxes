import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";


const URL = process.env.REACT_APP_API_URL

const usePostData = () => {
    const { id } = useParams();

    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get(
                `${URL}/posts/${id}`
            )
        return data
        },
        refetchIntervalInBackground: 'true',
        refetchOnWindowFocus: 'true',
        
    })
}

export default usePostData;