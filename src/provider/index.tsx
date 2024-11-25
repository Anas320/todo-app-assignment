"use client";
import React from "react";
import { Query, QueryClient, QueryClientProvider } from "react-query";

function Provider({ children }: { children: React.ReactNode }) {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}

export default Provider;
