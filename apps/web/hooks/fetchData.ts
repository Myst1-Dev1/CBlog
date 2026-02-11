'use client';

import { useEffect } from "react";
import { usePostStore } from "./posts/usePostStore";
import { useUserStore } from "./user/useUserStore";
import Cookie from 'js-cookie';
import { redirect, usePathname } from "next/navigation";

export function FetchData() {
  const fetchPostData = usePostStore((state) => state.fetchPostData);
  const fetchUserData = useUserStore((state) => state.fetchUserData);
  const fetchAllUsers = useUserStore((state) => state.fetchAllUsers);

  const pathname = usePathname();

  const token = Cookie.get('user');

  if (!token && pathname === '/perfil') {
    return redirect('/');
  }

  useEffect(() => {
    fetchPostData();
    fetchUserData();
    fetchAllUsers();
  }, []);

  return null;
}
