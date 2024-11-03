import { useParams } from "react-router-dom";

const ProfilePage = () => {
  const { id: profileId } = useParams();
  return (
    <div>
      <h1>Profile page - {profileId}</h1>
    </div>
  );
};

export default ProfilePage;
