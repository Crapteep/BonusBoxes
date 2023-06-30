import { useQuery } from "react-query";
import axios from "axios";
import { useParams } from "react-router-dom";



const usePostData = () => {
    const { id } = useParams();
    
    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get(
                `http://localhost:8000/posts/${id}`
            )
        return data
        },
        refetchIntervalInBackground: 'true',
    })
}

export default usePostData;