import {
  HashRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router";
import { protectedRoutes, publicRoutes } from "./routes";
import { Loading, NoResult } from "./components/ui";
import DefaultLayout from "./layouts/DefaultLayout";
import usePersistAuth from "./hooks/usePersistAuth";

function RequireAuth() {
  const { user, loading } = usePersistAuth();

  if (loading) return <Loading />;

  if (!user) return <Navigate to={"/login"} />;

  return <Outlet />;
}

export default function App() {
  return (
    <>
      <Router basename="/">
        <Routes>
          <Route path="*" element={<NoResult />} />

          {publicRoutes.map((route, index) => {
            const Page = route.component;
            let Layout;
            if (route.layout) Layout = route.layout;
            else Layout = DefaultLayout;

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

          <Route element={<RequireAuth />}>
            {protectedRoutes.map((route, index) => {
              const Page = route.component;
              let Layout;
              if (route.layout) Layout = route.layout;
              else Layout = DefaultLayout;

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
        </Routes>
      </Router>
    </>
  );
}
