import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import { LuFileText, LuUsers, LuActivity, LuPlus, LuCheck, LuX,} from "react-icons/lu";

import Layout from "../components/layout/Layout";
import StatCard from "../components/ui/StatCard";
import PostCard from "../components/posts/PostCard";
import DeletePostModal from "../components/posts/DeletePostModal";
import { deletePost, getPosts, getUsers, getHealthStatus,} from "../services/api";

const Dashboard = () => {
  const navigate = useNavigate();

  const [posts, setPosts] = useState([]);
  const [success, setSuccess] = useState("");
  const [authors, setAuthors] = useState([]);
  const [authorsError, setAuthorsError] = useState("");
  const [postsError, setPostsError] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [apiStatus, setApiStatus] = useState("checking");

  

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      setPostsError("");
      setAuthorsError("");
      setError("");
      setApiStatus("checking");

      const [postsResult, usersResult, healthResult] =
        await Promise.allSettled([
          getPosts(),
          getUsers(),
          getHealthStatus(),
        ]);

      if (postsResult.status === "fulfilled") {
        setPosts(postsResult.value.data || []);
      } else {
        console.error("Posts request failed:", postsResult.reason);
        setPosts([]);
        setPostsError("Unable to load posts. Please try again.");
      }

      if (usersResult.status === "fulfilled") {
        setAuthors(usersResult.value.data || []);
      } else {
        console.error("Users request failed:", usersResult.reason);
        setAuthors([]);
        setAuthorsError("Unable to load authors.");
      }

      if (healthResult.status === "fulfilled") {
        setApiStatus(
          healthResult.value.status === "online"
            ? "online"
            : "offline"
        );
      } else {
        console.error(
          "Health check failed:",
          healthResult.reason
        );

        setApiStatus("offline");
      }
    } catch (err) {
      console.error(err);

      setPostsError("Unable to load dashboard data.");
      setApiStatus("offline");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDashboardData();
  }, []);

  const handleCreatePost = () => {
    navigate("/posts/create");
  };

  const handleEdit = (id) => {
    navigate(`/posts/edit/${id}`);
  };

  const handleView = (id) => {
    navigate(`/posts/${id}`);
  };

  
  const handleDelete = (post) => {
    setError("");
    setSuccess("");
    setDeleteTarget(post);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget || deleting) {
      return;
    }

    try {
      setDeleting(true);
      setError("");
      setSuccess("");

      await deletePost(deleteTarget.id);

      setPosts((previousPosts) =>
        previousPosts.filter(
          (post) =>
            String(post.id) !== String(deleteTarget.id)
        )
      );

      setSuccess(
        `"${deleteTarget.title}" was deleted successfully.`
      );

      setDeleteTarget(null);
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to delete the post. Please try again."
      );

      setDeleteTarget(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <Layout>
      <section className="dashboard-header">

        <div>
          <span className="eyebrow">OVERVIEW</span>

          <h2>Good afternoon, Clinton 👋</h2>

          <p>
            Here's what's happening with your content today.
          </p>
        </div>

        <button
          type="button"
          className="primary-button"
          onClick={handleCreatePost}
        >
          <LuPlus />
          Create Post
        </button>
      </section>
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
          <LuX />

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
      <section className="stats-grid">
        <StatCard
          icon={LuFileText}
          label="Total Posts"
          value={posts.length}
          description="Published articles"
        />

        <StatCard
          icon={LuUsers}
          label="Authors"
          value={authorsError ? "—" : authors.length}
          description={
            authorsError
              ? "Unable to load authors"
              : "Active contributors"
          }
        />

        <StatCard
          icon={LuActivity}
          label="API Status"
          value={
            apiStatus === "checking"
              ? "Checking..."
              : apiStatus === "online"
              ? "Online"
              : "Offline"
          }
          description={
            apiStatus === "checking"
              ? "Checking API health"
              : apiStatus === "online"
              ? "API and database healthy"
              : "API or database unavailable"
          }
        />
      </section>

      <section className="posts-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CONTENT</span>
            <h2>Recent Posts</h2>
          </div>

          <button
            type="button"
            className="view-all"
            onClick={() => navigate("/posts")}
          >
            View all
          </button>
        </div>

        {loading && (
          <div className="state-card">
            <div className="loader" />
            <p>Loading your posts...</p>
          </div>
        )}

        {!loading && postsError && (
          <div className="state-card error-state">
            <p>{postsError}</p>

            <button
              type="button"
              className="secondary-button"
              onClick={loadDashboardData}
            >
              Try Again
            </button>
          </div>
        )}

        {!loading && !postsError && posts.length === 0 && (
          <div className="state-card">
            <LuFileText />

            <h3>No posts yet</h3>

            <p>
              Create your first blog post to get started.
            </p>

            <button
              type="button"
              className="primary-button"
              onClick={handleCreatePost}
            >
              <LuPlus />
              Create your first post
            </button>
          </div>
        )}

        {!loading && !postsError && posts.length > 0 && (
          <div className="posts-grid">
            {posts.slice(0, 6).map((post) => (
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
      </section>

      <DeletePostModal
        post={deleteTarget}
        deleting={deleting}
        onCancel={() => {
          if (!deleting) {
            setDeleteTarget(null);
          }
        }}
        onConfirm={handleConfirmDelete}
      />
    </Layout>
  );
};

export default Dashboard;