/** @format */
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";

type Props = {
  children: React.ReactNode;
};
const queryClient = new QueryClient();

export function LayoutContainer({ children }: Props) {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
