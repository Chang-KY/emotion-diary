import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
// import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import type {ReactNode} from "react";

const queryClient = new QueryClient();

const TanstackProvider = ({children}: { children: ReactNode }) => {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/*<ReactQueryDevtools/>*/}
    </QueryClientProvider>
  );
};

export default TanstackProvider;