import { Switch, Route, Router as WouterRouter } from "wouter";
import HomePage from "./pages/HomePage";
import BookPage from "./pages/BookPage";
import ConfirmationPage from "./pages/ConfirmationPage";
import AdminPage from "./pages/AdminPage";
import AdminDashboardPage from "./pages/AdminDashboardPage";

function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-teal-50">
      <div className="text-center">
        <p className="text-6xl font-display font-semibold text-teal-600 mb-2">404</p>
        <p className="text-slate-500 mb-4">Page not found</p>
        <a href="/" className="btn-brand text-white px-6 py-2.5 rounded-xl text-sm font-semibold">Go Home</a>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={HomePage} />
      <Route path="/book" component={BookPage} />
      <Route path="/confirmation" component={ConfirmationPage} />
      <Route path="/admin" component={AdminPage} />
      <Route path="/admin/dashboard" component={AdminDashboardPage} />
      <Route component={NotFound} />
    </Switch>
  );
}

export default function App() {
  return (
    <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
      <Router />
    </WouterRouter>
  );
}
