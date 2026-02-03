// app/providers.tsx
'use client';

import { FetchData } from "../hooks/fetchData";
import { Notifications } from "../hooks/notifications";

export function Providers() {
  return (
    <>
      <FetchData />
      <Notifications />
    </>
  );
}
