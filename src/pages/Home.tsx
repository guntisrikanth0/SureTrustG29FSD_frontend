import React, { useState } from "react";
import PostCard from "../components/Post";
import axios from "axios";
import { baseUrl } from "../baseUrl";
import { Link } from "react-router-dom";

// {
//     "friends": [
//         {
//             "_id": "691f315c3fc2a314dec44345",
//             "email": "pk2@gmail.com"
//         }
//     ]
// }
interface Friend {
  _id: string;
  name: string;
  email: string;
  profilePic?: string;
}

const Home = () => {
  const [text, setText] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [friends, setFriends] = useState<Friend[]>([]);
  const [leftSidebarOpen, setLeftSidebarOpen] = useState(false);
  const [posts, setPosts] = useState([
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
    },
  ]);

  // -------------------------------
  // CREATE POST FUNCTION
  // -------------------------------
  const handleCreatePost = async () => {
    if (!text.trim()) {
      alert("Post text is required");
      return;
    }

    const token = localStorage.getItem("token");
    if (!token) {
      alert("You are not logged in");
      return;
    }

    const formData = new FormData();
    formData.append("text", text);
    if (image) {
      formData.append("image", image);
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/post/create",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Backend returns { post }
      const newPostFromDB = res.data.post;

      // Add new post to the top of feed
      setPosts([
        {
          profilePhoto: "https://i.pravatar.cc/150?img=11",
          userName: "You",
          caption: newPostFromDB.text,
          likes: 0,
          comments: 0,
          postImage: newPostFromDB.image || "",
        },
        ...posts,
      ]);

      // Reset fields
      setText("");
      setImage(null);
    } catch (error: any) {
      console.log(error);
      alert(error.response?.data?.message || "Failed to create post");
    }
  };

  const fetchFriends = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return;
      const res = await axios.get(`${baseUrl}/friendrequest/getFriends`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFriends(res.data.friends);

      console.log(res.data.friends);
    } catch (error) {
      // Handle/log error if needed
      console.error("Failed to fetch friends", error);
    }
  };

  React.useEffect(() => {
    fetchFriends();
  }, []);

  return (
 <div className="w-full min-h-screen bg-linear-to-br from-gray-50 to-gray-100 flex relative">
      {/* MOBILE HAMBURGER BUTTON */}
      <button
        onClick={() => setLeftSidebarOpen(!leftSidebarOpen)}
        className="lg:hidden fixed top-20 left-4 z-50 w-12 h-12 bg-linear-to-r from-red-600 to-rose-500 rounded-full shadow-lg flex items-center justify-center text-white"
      >
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          {leftSidebarOpen ? (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          ) : (
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          )}
        </svg>
      </button>

      {/* MOBILE OVERLAY */}
      {leftSidebarOpen && (
        <div
          className="lg:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40 mt-2"
          onClick={() => setLeftSidebarOpen(false)}
        />
      )}

      {/* LEFT SIDEBAR */}
      <div
        className={`
          fixed lg:static inset-y-0 left-0 z-40
          w-64 bg-white border-r border-gray-200 p-4 shadow-lg mt-13
          transform transition-transform duration-300 ease-in-out
          ${leftSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
          overflow-y-auto
        `}
      >
        <div className="space-y-2">
          <Link to="/profile" onClick={() => setLeftSidebarOpen(false)}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Profile</span>
            </div>
          </Link>

          <Link to="/notification" onClick={() => setLeftSidebarOpen(false)}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-amber-400 to-yellow-600 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform relative">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">5</span>
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Notifications</span>
            </div>
          </Link>

          <Link to="/friends" onClick={() => setLeftSidebarOpen(false)}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Friends</span>
            </div>
          </Link>

          <Link to="/settings" onClick={() => setLeftSidebarOpen(false)}>
            <div className="flex items-center gap-3 p-3 rounded-xl hover:bg-linear-to-r hover:from-red-50 hover:to-rose-50 transition-all duration-300 group cursor-pointer">
              <div className="w-10 h-10 bg-linear-to-br from-gray-600 to-gray-800 rounded-full flex items-center justify-center text-white shadow-md group-hover:scale-110 transition-transform">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <span className="font-semibold text-gray-700 group-hover:text-red-600 transition-colors">Settings</span>
            </div>
          </Link>

          {/* MOBILE FRIENDS SECTION */}
          <div className="lg:hidden mt-6 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-bold text-gray-800">Friends</h3>
              <span className="text-xs bg-linear-to-r from-red-600 to-rose-500 text-white px-2 py-1 rounded-full font-semibold">
                {friends?.length || 0}
              </span>
            </div>
            <div className="space-y-2">
              {friends && friends.length > 0 ? (
                friends.map((friend) => (
                  <Link key={friend._id} to={`/friend/${friend._id}`} onClick={() => setLeftSidebarOpen(false)}>
                    <div className="bg-linear-to-r from-white to-gray-50 hover:from-red-50 hover:to-rose-50 p-2 rounded-xl border border-gray-100 hover:border-red-200 transition-all duration-300 cursor-pointer group">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            src={friend.profilePic || "https://via.placeholder.com/40"}
                            alt={friend.name}
                            className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-red-200 transition-all"
                          />
                          <div className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-500 rounded-full border-2 border-white"></div>
                        </div>
                        <p className="font-semibold text-sm text-gray-800 group-hover:text-red-600 transition-colors">
                          {friend.name}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-gray-500 text-sm text-center py-4">No friends yet</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* CENTER FEED */}
      <div className="flex-1 p-4 md:p-6 overflow-y-auto lg:mr-80">
        {/* CREATE POST CARD */}
        <div className="bg-white rounded-2xl p-4 md:p-5 shadow-lg mb-6 border border-gray-100">
          <div className="flex items-center gap-3 md:gap-4">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-linear-to-br from-red-500 to-rose-500 rounded-full flex items-center justify-center shadow-md flex-shrink-0">
              <span className="text-white font-bold text-base md:text-lg">U</span>
            </div>

            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="What's on your mind?"
              className="flex-1 bg-gray-50 border-2 border-gray-200 rounded-full px-4 md:px-5 py-2 md:py-3 text-sm md:text-base text-gray-700 placeholder-gray-400 focus:outline-none focus:border-red-500 focus:ring-2 focus:ring-red-200 transition-all"
            />
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mt-4 pt-4 border-t border-gray-100 gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <label className="flex items-center gap-2 px-3 md:px-4 py-2 bg-red-50 text-red-600 rounded-full cursor-pointer hover:bg-red-100 transition-all group">
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs md:text-sm font-semibold">Photo</span>
                <input
                  type="file"
                  accept="image/png, image/jpeg"
                  onChange={(e) =>
                    setImage(e.target.files ? e.target.files[0] : null)
                  }
                  className="hidden"
                />
              </label>

              <button className="flex items-center gap-2 px-3 md:px-4 py-2 bg-amber-50 text-amber-600 rounded-full hover:bg-amber-100 transition-all group">
                <svg className="w-4 h-4 md:w-5 md:h-5 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span className="text-xs md:text-sm font-semibold hidden sm:inline">Feeling</span>
              </button>
            </div>

            <button
              onClick={handleCreatePost}
              className="w-full sm:w-auto bg-linear-to-r from-red-600 to-rose-500 hover:from-red-700 hover:to-rose-600 text-white font-semibold py-2 md:py-2.5 px-5 md:px-6 rounded-full transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 text-sm md:text-base"
            >
              Post
            </button>
          </div>
        </div>

        {/* POSTS FEED */}
        <div className="space-y-4 md:space-y-6">
          {posts.map((post, index) => (
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

      {/* RIGHT SIDEBAR - FRIENDS (DESKTOP ONLY) */}
      <div className="hidden lg:block fixed right-0 top-16 bottom-0 w-80 bg-white border-l border-gray-200 p-5 shadow-sm overflow-y-auto">
        <div className="flex items-center justify-between mb-5">
          <h2 className="text-xl font-bold text-gray-800">Friends</h2>
          <span className="text-xs bg-linear-to-r from-red-600 to-rose-500 text-white px-3 py-1 rounded-full font-semibold">
            {friends?.length || 0}
          </span>
        </div>

        <div className="space-y-3">
          {friends && friends.length > 0 ? (
            friends.map((friend) => (
              <Link key={friend._id} to={`/friend/${friend._id}`}>
                <div className="bg-linear-to-r from-white to-gray-50 hover:from-red-50 hover:to-rose-50 p-3 rounded-xl border border-gray-100 hover:border-red-200 transition-all duration-300 cursor-pointer group shadow-sm hover:shadow-md">
                  <div className="flex items-center gap-3">
                    <div className="relative">
                      <img
                        src={friend.profilePic || "https://via.placeholder.com/40"}
                        alt={friend.name}
                        className="w-12 h-12 rounded-full object-cover ring-2 ring-gray-100 group-hover:ring-red-200 transition-all"
                      />
                      <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-white"></div>
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-800 group-hover:text-red-600 transition-colors">
                        {friend.name}
                      </p>
                      <p className="text-xs text-gray-500">Active now</p>
                    </div>
                    <svg className="w-5 h-5 text-gray-400 group-hover:text-red-600 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-3 flex items-center justify-center">
                <svg className="w-10 h-10 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <p className="text-gray-500 text-sm">No friends yet</p>
              <p className="text-gray-400 text-xs mt-1">Start connecting with people!</p>
            </div>
          )}
        </div>
      </div>
    </div>

  );
};

export default Home;
