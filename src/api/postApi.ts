import { baseUrl } from "../baseUrl";

export const getDeletedPosts = async (page = 1, limit = 10) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(
    `${baseUrl}/post/deletedposts?page=${page}&limit=${limit}`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to fetch deleted posts");
  }

  return await response.json();
};

export const restorePost = async (postId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(
    `${baseUrl}/post/restore/${postId}`,
    {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to restore post");
  }

  return await response.json();
};

export const deletePost = async (postId: string) => {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const response = await fetch(
    `${baseUrl}/post/${postId}`,   // ✅ FIXED
    {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  if (!response.ok) {
    throw new Error("Failed to delete post");
  }

  return await response.json();
};
