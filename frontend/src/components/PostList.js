import LineItem from "./LineItem";

const PostList = ({ postList }) => {
  return (
    <ul className="container">
      {postList.map((post) => (
        <LineItem key={post.id} post={post} />
      ))}
    </ul>
  );
};

export default PostList;
