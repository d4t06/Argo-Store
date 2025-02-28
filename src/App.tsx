import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router";
import { protectedRoutes, publicRoutes } from "./routes";
import { Loading } from "./components/ui";
import NotFoundPage from "./pages/NotFound";
import { ReactNode } from "react";
import GlobalLayout from "./layouts/GlobalLayout";
import { useAuth } from "./stores/AuthContext";

function RequireAuth() {
  const { user, loading } = useAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
}

function OutletLayout({ children }: { children: ReactNode }) {
  return children;
}

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="*" element={<NotFoundPage />} />

          {publicRoutes.map((route, index) => {
            const Page = route.component;
            const Layout = route.layout || OutletLayout;

            return (
              <Route
                key={index}
                path={route.path}
                element={
                  <Layout>
                    <Page />
                  </Layout>
                }
              />
            );
          })}

          <Route element={<GlobalLayout />}>
            <Route element={<RequireAuth />}>
              {protectedRoutes.map((route, index) => {
                const Page = route.component;
                const Layout = route.layout ?? OutletLayout;

                return (
                  <Route
                    key={index}
                    path={route.path}
                    element={
                      <Layout>
                        <Page />
                      </Layout>
                    }
                  />
                );
              })}
            </Route>
          </Route>
        </Routes>
      </Router>
    </>
  );
}
