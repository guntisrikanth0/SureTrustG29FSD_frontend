import react from 'react';
import PostCard from '../components/Post';
import axios from 'axios';

const Profile = () => {
  const [image, setImage] = react.useState<File | null>(null);
  const [profile, setProfile] = react.useState<any>(null);
  const [loading, setLoading] = react.useState(true);
  const [error, setError] = react.useState("");

  const myPosts = [
    {
      profilePhoto: "https://randomuser.me/api/portraits/men/32.jpg",
      userName: "John Doe",
      caption: "Enjoying the sunny weather!",
      likes: 120,
      comments: 15,
      postImage:
        "https://img.freepik.com/free-vector/night-landscape-with-lake-mountains-trees-coast-vector-cartoon-illustration-nature-scene-with-coniferous-forest-river-shore-rocks-moon-stars-dark-sky_107791-8253.jpg?semt=ais_hybrid&w=740&q=80",
    },
    {
      profilePhoto: "https://randomuser.me/api/portraits/women/44.jpg",
      userName: "Jane Smith",
      caption: "Delicious homemade meal.",
      likes: 95,
      comments: 8,
      postImage:
        "https://images.unsplash.com/photo-1485470733090-0aae1788d5af?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8d2FsbHBhcGVyJTIwNGt8ZW58MHx8MHx8fDA%3D",
    }
  ];

  react.useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setError("No token found. Please login again.");
          setLoading(false);
          return;
        }

        const res = await axios.get("http://localhost:5000/api/user/me", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProfile(res.data);
        setLoading(false);
      } catch (err: any) {
        setError("Failed to load profile.");
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleProfilePic = async () => {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Not logged in");
      return;
    }

    const formData = new FormData();
    if (image) formData.append("profilePic", image);

    try {
      const res = await axios.post(
        "http://localhost:5000/api/user/uploadProfilePic",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Profile picture updated successfully!");

      setProfile((prev: any) => ({
        ...prev,
        user: {
          ...prev.user,
          profilePic: res.data.user.profilePic,
        }
      }));

      setImage(null);
    } catch (error: any) {
      alert(error.response?.data?.message || "Failed to upload");
    }
  };

  if (loading) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  if (error || !profile) {
    return (
      <p className="text-center text-red-600 mt-10">
        {error || "Failed to load profile."}
      </p>
    );
  }

  return (
    <>
      <div className="w-full h-screen bg-gray-200 flex">

        <div className="w-1/5 bg-white border-r p-4">
          <h2 className="text-xl font-bold mb-6">Profile</h2>
          <ul className="space-y-4">
            <li className="cursor-pointer hover:text-blue-600">My Posts</li>
            <li className="cursor-pointer hover:text-blue-600">Liked Posts</li>
            <li className="cursor-pointer hover:text-blue-600">Deleted Posts</li>
            <li className="cursor-pointer hover:text-blue-600">Settings</li>
          </ul>
        </div>

        <div className="w-3/5 p-4 space-y-4 overflow-y-auto h-screen">

          <div className="bg-white rounded-xl shadow p-6 mb-6">
            <div className="flex items-center space-x-4">

              <img
                src={
                  profile.user.profilePic ||
                  "https://cdn-icons-png.flaticon.com/512/847/847969.png"
                }
                alt="Profile"
                className="w-24 h-24 rounded-full border-4 border-blue-600 hover:scale-105 transition-transform object-cover"
              />

              <input
                type="file"
                accept="image/png, image/jpeg"
                onChange={(e) =>
                  setImage(e.target.files ? e.target.files[0] : null)
                }
              />

              <button
                onClick={handleProfilePic}
                className="bg-blue-600 text-white px-4 py-1 rounded-lg"
              >
                Change profile pic
              </button>

              <div>
                <h1 className="text-2xl font-bold">{profile.user.name}</h1>
                <p className="text-gray-600">{profile.user.email}</p>
                <p className="text-gray-600">Friends: {profile.counts.friends}</p>
                <p className="text-gray-600">
                  Pending: {profile.counts.pendingRequests}
                </p>
              </div>
            </div>
          </div>

          <div className="items-center flex flex-col gap-y-3">
            {myPosts.map((post, index) => (
              <PostCard
                key={index}
                profilePhoto={post.profilePhoto}
                userName={post.userName}
                caption={post.caption}
                likes={post.likes}
                comments={post.comments}
                postImage={post.postImage}
              />
            ))}
          </div>

        </div>
      </div>
    </>
  );
};

export default Profile;
