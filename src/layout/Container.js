import React from "react";
import { ToastProvider } from "react-toast-notifications";
import "../styles/layout/container.css";
import AppBar from "./AppBar";
import PageWrapper from "./PageWrapper";

export default function Container() {
  return (
    <div className="container-fluid main-section-container">
      <ToastProvider>
        <PageWrapper />
      </ToastProvider>
    </div>
  );
}
