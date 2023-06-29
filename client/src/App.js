import "./App.css";
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AuthProvider } from "./features/auth/AuthContext";
import Layout from "./shared/components/Layout";
import Login from "./features/auth/Login";
import ProtectedRoute from "./features/auth/ProtectedRoute";
import ProfileSelector from "./features/auth/ProfileSelector";
import Home from "./features/events/Home";
import AddEventsPage from "./features/events/AddEventsPage";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/profile-select" element={<ProfileSelector />} />
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/form"
              element={
                <Layout>
                  <AddEventsPage />
                </Layout>
              }
            />
          </Routes>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
