import { HashRouter as Router, Routes, Route, Outlet } from "react-router";
import { publicRoutes } from "./routes";
import { NoResult } from "./components/ui";
import DefaultLayout from "./layouts/DefaultLayout";

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
        </Routes>
      </Router>
    </>
  );
}
