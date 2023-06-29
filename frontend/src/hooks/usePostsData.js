import { useQuery } from 'react-query'
import axios from 'axios';

const usePostsData = () => {
    return useQuery({
        queryFn: async () => {
            const { data } = await axios.get(
                'http://localhost:8000/posts'
        )
        return data
        },
        refetchOnWindowFocus: 'true'
        
    })
}

export default usePostsData;