import { lazy, Suspense } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Route, Switch, Router as WouterRouter } from "wouter";
import { Toaster } from "./components/ui/toaster";
import { TooltipProvider } from "./components/ui/tooltip";
import Home from "./pages/Home";
import Services from "./pages/Services";
import ServiceDetail from "./pages/ServiceDetail";
import FAQPage from "./pages/FAQPage";
import BookkeepingGuide from "./pages/BookkeepingGuide";
import NotFound from "./pages/not-found";

const PayInvoice = lazy(() => import("./pages/PayInvoice"));

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60_000,
      refetchOnWindowFocus: false,
      retry: 1,
    },
  },
});

function PayInvoiceRoute() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background text-foreground">
          Loading payment portal...
        </div>
      }
    >
      <PayInvoice />
    </Suspense>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />

      <Route path="/services" component={Services} />

      <Route path="/services/:slug" component={ServiceDetail} />
      <Route path="/faq" component={FAQPage} />
<Route
  path="/guides/bookkeeping-south-africa"
  component={BookkeepingGuide}
/>
      <Route path="/pay" component={PayInvoiceRoute} />
  <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;