import { LuMenu, LuSearch, LuBell, LuPlus,} from "react-icons/lu";

import { useNavigate } from "react-router-dom";

const Header = ({ onMenuClick }) => {
  const navigate = useNavigate();

  const handleNewPost = () => {
    navigate("/posts/create");
  };

  return (
    <header className="topbar">
      <button
        type="button"
        className="mobile-menu"
        onClick={onMenuClick}
        aria-label="Open navigation"
      >
        <LuMenu />
      </button>

      <div className="topbar-search">
        <LuSearch />

        <input
          type="search"
          placeholder="Search posts..."
          aria-label="Search posts"
        />

        <span className="search-shortcut">⌘ K</span>
      </div>

      <div className="topbar-actions">
        <button
          type="button"
          className="icon-button"
          aria-label="Notifications"
        >
          <LuBell />
          <span className="notification-dot" />
        </button>

        <button
          type="button"
          className="new-post-button"
          onClick={handleNewPost}
        >
          <LuPlus />
          <span>New Post</span>
        </button>
      </div>
    </header>
  );
};

export default Header;