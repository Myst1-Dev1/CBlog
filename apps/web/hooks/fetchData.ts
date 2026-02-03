'use client';

import { useEffect } from "react";
import { usePostStore } from "./posts/usePostStore";
import { useUserStore } from "./user/useUserStore";

export function FetchData() {
  const fetchPostData = usePostStore((state) => state.fetchPostData);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);

  useEffect(() => {
    fetchPostData();
    fetchUserData();
    fetchAllUsers();
  }, []);

  return null;
}
