import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Dashboard } from "./components/Dashboard";
import { VideoLibrary } from "./components/VideoLibrary";
import { VideoPlayer } from "./components/VideoPlayer";
import { AITutor } from "./components/AITutor";
import { ProgressPage } from "./components/Progress";
import { Profile } from "./components/Profile";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import LiveChat from "./components/live-chat";
import { ProtectedRoute } from "./components/ProtectedRoute";

export const router = createBrowserRouter([
  {
    path: "/login",
    element: <Login />,
  },
  {
    path: "/signup",
    element: <Signup />,
  },
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      { index: true, element: <Dashboard /> },
      { path: "library", element: <VideoLibrary /> },
      { path: "video/:id", element: <VideoPlayer /> },
      { path: "tutor", element: <AITutor /> },
      { path: "live-chat", element: <LiveChat /> },
      { path: "progress", element: <ProgressPage /> },
      { path: "profile", element: <Profile /> },
    ],
  },
]);