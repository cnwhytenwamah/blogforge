import { LuFileText, LuLayoutDashboard, LuPenLine, LuSettings, LuX,} from "react-icons/lu";
import { NavLink } from "react-router-dom";

const Sidebar = ({ isOpen, onClose }) => {
  const navItems = [
    {
      label: "Dashboard",
      path: "/",
      icon: LuLayoutDashboard,
    },
    {
      label: "Posts",
      path: "/posts",
      icon: LuFileText,
    },
    {
      label: "Create Post",
      path: "/posts/create",
      icon: LuPenLine,
    },
    {
      label: "Settings",
      path: "/settings",
      icon: LuSettings,
    },
  ];

  return (
    <>
      {isOpen && (
        <div
          className="sidebar-overlay"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside className={`sidebar ${isOpen ? "sidebar-open" : ""}`}>
        <div className="sidebar-top">
          <div className="sidebar-brand">
            <div className="brand-mark">B</div>

            <div className="brand-text">
              <strong>BlogForge</strong>
              <span>Content Studio</span>
            </div>
          </div>

          <button
            type="button"
            className="sidebar-close"
            onClick={onClose}
            aria-label="Close navigation"
          >
            <LuX />
          </button>
        </div>

        <nav className="sidebar-nav">
          <span className="sidebar-section-title">Workspace</span>

          {navItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                end={item.path === "/"}
                className={({ isActive }) =>
                  isActive ? "sidebar-link active" : "sidebar-link"
                }
                onClick={onClose}
              >
                <Icon />
                <span>{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <div className="sidebar-user">
            <div className="user-avatar">CN</div>

            <div className="user-info">
              <strong>Clinton Nwamah</strong>
              <span>Administrator</span>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;