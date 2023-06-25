
import { Link } from "react-router-dom";


const LineItem = ({ post }) => {
    return (
        <ul className="item">
            <Link to={`/posts/${post.title}`}>Promoje z dnia: {post.created_at}</Link>
        </ul>
    );
};

export default LineItem;