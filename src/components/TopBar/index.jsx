import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";

import "./styles.css";

/**
 * Define TopBar, a React component of Project 4.
 */
function TopBar() {
  // Get the current pathname from React Router's useLocation hook
  const location = useLocation();
  const pathname = location.pathname;

  // Function to extract user ID from the pathname
  const getUserIdFromPathname = (pathname) => {
    const parts = pathname.split("/");
    const userIdIndex = parts.findIndex((part) => part === "users");
    if (userIdIndex !== -1 && userIdIndex + 1 < parts.length) {
      return parts[userIdIndex + 1];
    }
    return null;
  };

  // Determine the app context based on the pathname
  let appContext = "";

  const userId = getUserIdFromPathname(pathname);
  if (userId) {
    appContext = `Photos of User ${userId}`;

  } else if (pathname === "/") {
    appContext = "Home";
  }

  return (
    <AppBar className="topbar-appBar" position="absolute">
      <Toolbar>
        {/* Left side: Your name */}
        <Typography variant="h6" color="inherit" style={{ flexGrow: 1 }}>
          Your Name
        </Typography>
        {/* Right side: App context */}
        <Typography variant="h6" color="inherit">
          {appContext}
        </Typography>
      </Toolbar>
    </AppBar>
  );
}

export default TopBar;
