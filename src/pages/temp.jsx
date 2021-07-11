import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { followButtonPressed } from "./userSlice";

export const UserCard = ({ userId }) => {
  const userDispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state) => state.users.users).find(
    (user) => user._id === userId
  );
  const currentUser = useSelector((state) => state.auth.login);
  const textForButton =
    currentUser._id === userId
      ? ""
      : user.followers.includes(currentUser._id)
      ? "Following"
      : "Follow";

  return (
    <div className="m-2 p-1 border border-black-900 relative">
      <div className="flex justify-start">
        <section className="flex flex-col justify-center self-start w-24">
          {user.profile_picture ? (
            <img
              onClick={() => navigate(`/${user.userName}`)}
              src={user.image}
              alt="userDP"
            />
          ) : (
            <span onClick={() => navigate(`/${user.userName}`)}>
              {user.fullName.charAt(0)}
            </span>
          )}
          <button
            onClick={() => userDispatch(followButtonPressed(user._id))}
            className={`border border-blue-900 font-medium  rounded-sm py-0.5 ${
              textForButton === "Following"
                ? "bg-blue-600 text-blue-100 hover:opacity-90"
                : textForButton === "Follow"
                ? "text-blue-900 hover:bg-blue-100"
                : "hidden"
            }`}
          >
            {textForButton}
          </button>
        </section>
        <section className="mx-3 w-full">
          <h1
            onClick={() => navigate(`/${user.userName}`)}
            className="text-2xl font-bold text-blue-900 cursor-pointer hover:underline"
          >
            {user.fullName}
          </h1>
          <h3
            onClick={() => navigate(`/${user.userName}`)}
            className="font-medium text-blue-500 cursor-pointer"
          >
            @{user.userName}
          </h3>
          <p className="break-words w-1/2 sm:w-4/6 md:w-8/12">{user.bio}</p>
          {user.website && (
            <span>
              <i className="fas fa-link text-blue-900"></i>{" "}
              <a href={user.website} target="_blank" rel="noopener noreferrer">
                {user.website}
              </a>
            </span>
          )}
        </section>
      </div>
    </div>
  );
};
