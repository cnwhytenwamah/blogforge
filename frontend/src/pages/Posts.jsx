import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowDownUp, LuCheck, LuFileText, LuPlus, LuRefreshCw, LuSearch, LuX,} from "react-icons/lu";

import Layout from "../components/layout/Layout";
import PostCard from "../components/posts/PostCard";
import DeletePostModal from "../components/posts/DeletePostModal";
import { deletePost, getPosts } from "../services/api";

const Posts = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [postToDelete, setPostToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

 const fetchPosts = async (isRefresh = false) => {
  try {
    if (isRefresh) {
      setRefreshing(true);
    } else {
      setLoading(true);
    }

    setError("");

    const response = await getPosts();

    setPosts(response.data || []);
  } catch (err) {
    setError(
      err.response?.data?.message ||
        "Unable to load posts. Please try again."
    );
  } finally {
    setLoading(false);
    setRefreshing(false);
  }
};

  useEffect(() => {
    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedSearch = searchTerm.trim().toLowerCase();

    const filtered = posts.filter((post) => {
      if (!normalizedSearch) {
        return true;
      }

      const title = post.title?.toLowerCase() || "";
      const content = post.content?.toLowerCase() || "";
      const author = post.author?.name?.toLowerCase() || "";
      const authorEmail = post.author?.email?.toLowerCase() || "";

      return (
        title.includes(normalizedSearch) ||
        content.includes(normalizedSearch) ||
        author.includes(normalizedSearch) ||
        authorEmail.includes(normalizedSearch)
      );
    });

    return [...filtered].sort((a, b) => {
      const firstDate = new Date(a.createdAt).getTime();
      const secondDate = new Date(b.createdAt).getTime();

      return sortOrder === "newest"
        ? secondDate - firstDate
        : firstDate - secondDate;
    });
  }, [posts, searchTerm, sortOrder]);

  const handleEdit = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/posts/${id}`);
  };

  const handleDelete = (id) => {
    const selectedPost = posts.find(
      (post) => String(post.id) === String(id)
    );

    if (!selectedPost) {
      return;
    }

    setError("");
    setSuccess("");
    setPostToDelete(selectedPost);
  };

  const handleCancelDelete = () => {
    if (deleting) {
      return;
    }

    setPostToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!postToDelete || deleting) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await deletePost(postToDelete.id);

      setPosts((previousPosts) =>
        previousPosts.filter(
          (post) =>
            String(post.id) !== String(postToDelete.id)
        )
      );

      setSuccess(
        `"${postToDelete.title}" was deleted successfully.`
      );

      setPostToDelete(null);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          "Unable to delete this post. Please try again."
      );

      setPostToDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <div className="posts-page">
        <div className="page-header">
          <div>
            <span className="eyebrow">Content Library</span>

            <h1>All Posts</h1>

            <p>
              Manage, search, and organize all your BlogForge content.
            </p>
          </div>

          <div className="page-header-actions">
            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/posts/create")}
            >
              <LuPlus />
              New Post
            </button>

            <div className="page-header-icon">
              <LuFileText />
            </div>
          </div>
        </div>

        {success && (
          <div
            className="posts-feedback posts-feedback-success"
            role="status"
          >
            <LuCheck />

            <span>{success}</span>

            <button
              type="button"
              onClick={() => setSuccess("")}
              aria-label="Dismiss success message"
            >
              <LuX />
            </button>
          </div>
        )}

        {error && (
          <div
            className="posts-feedback posts-feedback-error"
            role="alert"
          >
            <span>{error}</span>

            <button
              type="button"
              onClick={() => setError("")}
              aria-label="Dismiss error message"
            >
              <LuX />
            </button>
          </div>
        )}

        <div className="posts-toolbar">
          <div className="posts-search">
            <LuSearch />

            <input
              type="search"
              value={searchTerm}
              onChange={(event) =>
                setSearchTerm(event.target.value)
              }
              placeholder="Search posts, content or authors..."
              aria-label="Search posts"
            />
          </div>

          <div className="posts-toolbar-actions">
            <div className="posts-sort">
              <LuArrowDownUp />

              <select
                value={sortOrder}
                onChange={(event) =>
                  setSortOrder(event.target.value)
                }
                aria-label="Sort posts"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
              </select>
            </div>

            <button
              type="button"
              className="refresh-button"
              onClick={() => fetchPosts(true)}
              disabled={loading || refreshing || deleting}
              aria-label="Refresh posts"
              title="Refresh posts"
            >
              <LuRefreshCw
                className={loading || refreshing ? "button-spinner" : ""}
              />
            </button>
          </div>
        </div>

        {!loading && !error && (
          <div className="posts-result-bar">
            <span>
              {filteredPosts.length}{" "}
              {filteredPosts.length === 1
                ? "post"
                : "posts"}{" "}
              found
            </span>

            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
              >
                Clear search
              </button>
            )}
          </div>
        )}

        {loading && (
          <div className="state-card">
            <div className="loading-spinner"></div>

            <h3>Loading posts</h3>

            <p>Fetching your content from BlogForge.</p>
          </div>
        )}

        {!loading && error && posts.length === 0 && (
          <div className="state-card error-state">
            <h3>Unable to load posts</h3>

            <p>{error}</p>

            <button
              type="button"
              className="primary-button"
              onClick={fetchPosts}
            >
              <LuRefreshCw />
              Try Again
            </button>
          </div>
        )}

        {!loading &&
          posts.length > 0 &&
          filteredPosts.length === 0 && (
            <div className="state-card">
              <div className="empty-state-icon">
                <LuFileText />
              </div>

              <h3>No posts found</h3>

              <p>Try a different search term.</p>
            </div>
          )}

        {!loading && posts.length === 0 && !error && (
          <div className="state-card">
            <div className="empty-state-icon">
              <LuFileText />
            </div>

            <h3>No posts yet</h3>

            <p>
              Your posts will appear here once you create them.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={() => navigate("/posts/create")}
            >
              Create Your First Post
            </button>
          </div>
        )}

        {!loading &&
          !error &&
          filteredPosts.length > 0 && (
            <div className="posts-grid">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onView={handleView}
                  onEdit={handleEdit}
                  onDelete={handleDelete}
                />
              ))}
            </div>
          )}
      </div>

      <DeletePostModal
        post={postToDelete}
        deleting={deleting}
        onCancel={handleCancelDelete}
        onConfirm={handleConfirmDelete}
      />
    </Layout>
  );
};

export default Posts;