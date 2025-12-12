import React, { useState, useEffect } from 'react';
import PostCard from '../components/Post';
import { useParams } from 'react-router-dom';

const FriendProfile = () => {
const {_id} = useParams();

  // Fetch Profile on mount
  useEffect(() => {
 alert(_id);
  }, []);

  // Fetch MyPosts on mount or when needed
  useEffect(() => {

  }, []);

  // Handle profile picture upload


  
  return (
    <div className="w-full h-screen bg-gray-200 flex">
      {/* left pannel */}
    <div className="w-1/5 bg-white border-r p-4">
    
     </div>
    {/* middle panel */}
    <div className="w-3/5 p-4 space-y-4 overflow-y-auto h-screen">
    {/* profile header */}
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <div className="flex items-center space-x-4">
      <h1>{_id}</h1>
       
          </div>
        </div>

        <div className="items-center flex flex-col gap-y-3">
        
        </div>
      </div>
    </div>
  );
};

export default FriendProfile;
