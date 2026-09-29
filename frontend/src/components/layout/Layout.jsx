import { useState } from "react";

import Sidebar from "./Sidebar";
import Header from "./Header";

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="app-layout">
      <Sidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <div className="main-wrapper">
        <Header onMenuClick={() => setSidebarOpen(true)} />

        <main className="main-content">
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;