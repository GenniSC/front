import { Box, LinearProgress, linearProgressClasses } from "@mui/material";
import { varAlpha } from "../theme/styles";
import { Navigate, Outlet, useRoutes } from "react-router-dom";
import { lazy, Suspense } from "react";

//----------------------------------------------------------------------
const HomePage = lazy(() => import("../pages/home/home"));

const SignInPage = lazy(() => import("../pages/login"));
const SignUpPage = lazy(() => import("../pages/cadastro"));
const Page404 = lazy(() => import("../pages/not-found"));

//----------------------------------------------------------------------
const renderFallback = (
  <Box
    display="flex"
    alignItems="center"
    justifyContent="center"
    flex="1 1 auto"
  >
    <LinearProgress
      sx={{
        width: 1,
        maxWidth: 320,
        bgcolor: (theme) =>
          varAlpha(theme.vars.palette.text.primaryChannel, 0.16),
        [`& .${linearProgressClasses.bar}`]: { bgcolor: "text.primary" },
      }}
    />
  </Box>
);

export function Router() {
  return useRoutes([
    {
      element: (
        <Suspense fallback={renderFallback}>
          <Outlet />
        </Suspense>
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
      ],
    },
    {
      path: "login",
      element: <SignInPage />,
    },
    {
      path: "cadastro",
      element: <SignUpPage />,
    },
    {
      path: "404",
      element: <Page404 />,
    },
    {
      path: "*",
      element: <Navigate to="/404" replace />,
    },
    {
      path: "/",
      element: <Navigate to="/login" replace />,
    },
  ]);
}
