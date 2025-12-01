const Friends = () => {
  return (
    <div className="w-full h-screen bg-gray-300 flex">
      {/* LEFT PANEL */}
      <div className="w-1/5 bg-gray-100 border-2 p-4">
      
        <div className="w-4/5 bg-white border-r p-4 ">
        <h2 className="text-xl font-bold mb-6">Profile</h2>
        <ul className="space-y-4">
          <li className="cursor-pointer hover:text-blue-600">My Friends</li>
          <li className="cursor-pointer hover:text-blue-600">Pending Friend Request</li>
          <li className="cursor-pointer hover:text-blue-600">Rejected Friend Request</li>
    
        </ul>
      </div>
      </div>

      {/* MIDDLE PANEL */}
      <div className="w-4/5 p-6 bg-gray-200 overflow-y-auto">
      
      </div>

    </div>
  );
};

export default Friends;
