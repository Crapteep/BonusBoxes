import DisplaySingleUserImage from "./DisplaySingleUserImage/DisplaySingleUserImage";

const UserImages = ({ user }) => {
  return (
    <div className="row d-flex justify-content-center">
      <DisplaySingleUserImage image={user.box} />
      <DisplaySingleUserImage image={user.mbox} />
      <DisplaySingleUserImage image={user.gbox} />
    </div>
  );
};

export default UserImages;
