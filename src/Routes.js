import Home from "./pages/home";

export const routes = [
  { path: "/", component: Home },
  { path: "/:type/:name", component: Home },
  { path: "/#!/:type/:name", component: Home },
  { path: "*", redirect: "/" }
];
