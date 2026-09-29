import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { LuArrowLeft, LuCalendarDays, LuClock3, LuFileText, LuMail, LuPencil, LuTrash2,} from "react-icons/lu";

import Layout from "../components/layout/Layout";
import DeletePostModal from "../components/posts/DeletePostModal";
import { deletePost, getPostById } from "../services/api";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [deleteTarget, setDeleteTarget] = useState(null);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getPostById(id);

        setPost(response.data);
      } catch (err) {
        console.error(err);

        setError(
          err.response?.data?.message ||
            "Unable to load this post. Please try again."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleEdit = () => {
    navigate(`/posts/edit/${id}`);
  };

  const handleDelete = () => {
    setDeleteTarget(post);
  };

  const handleConfirmDelete = async () => {
    if (!deleteTarget) {
      return;
    }

    try {
      setDeleting(true);
      setError("");

      await deletePost(deleteTarget.id);

      navigate("/posts");
    } catch (err) {
      console.error(err);

      setError(
        err.response?.data?.message ||
          "Unable to delete this post. Please try again."
      );
    } finally {
      setDeleting(false);
    }
  };

  const formatDate = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatDateTime = (date) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleString("en-NG", {
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "numeric",
      minute: "2-digit",
    });
  };

  if (loading) {
    return (
      <Layout>
        <div className="state-card">
          <div className="loader" />
          <h3>Loading post</h3>
          <p>Fetching the post details from BlogForge.</p>
        </div>
      </Layout>
    );
  }

  if (error && !post) {
    return (
      <Layout>
        <div className="state-card error-state">
          <LuFileText />

          <h3>Unable to load post</h3>

          <p>{error}</p>

          <button
            type="button"
            className="primary-button"
            onClick={() => navigate("/posts")}
          >
            <LuArrowLeft />
            Back to Posts
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="post-details-page">
        <div className="post-details-header">
          <button
            type="button"
            className="back-button"
            onClick={() => navigate("/posts")}
          >
            <LuArrowLeft />
            Back to Posts
          </button>

          <div className="post-details-actions">
            <button
              type="button"
              className="secondary-button"
              onClick={handleEdit}
            >
              <LuPencil />
              Edit Post
            </button>

            <button
              type="button"
              className="danger-button"
              onClick={handleDelete}
            >
              <LuTrash2 />
              Delete
            </button>
          </div>
        </div>

        {error && (
          <div className="form-alert form-alert-error">
            {error}
          </div>
        )}

        <article className="post-details-card">
          <div className="post-details-top">
            <span className="post-status">Published</span>

            <span className="post-details-id">
              Post #{post.id}
            </span>
          </div>

          <h1>{post.title}</h1>

          <div className="post-details-meta">
            <div className="post-author-details">
              <div className="post-author-avatar">
                {post.author?.name
                  ?.split(" ")
                  .map((part) => part[0])
                  .join("")
                  .slice(0, 2)
                  .toUpperCase() || "AU"}
              </div>

              <div>
                <strong>{post.author?.name || "Unknown Author"}</strong>

                <span>
                  <LuMail />
                  {post.author?.email || "No email available"}
                </span>
              </div>
            </div>

            <div className="post-date-details">
              <div>
                <LuCalendarDays />

                <span>
                  <small>Published</small>
                  {formatDate(post.createdAt)}
                </span>
              </div>

              <div>
                <LuClock3 />

                <span>
                  <small>Last updated</small>
                  {formatDateTime(post.updatedAt)}
                </span>
              </div>
            </div>
          </div>

          <div className="post-content-divider" />

          <div className="post-details-content">
            {post.content
              .split("\n")
              .map((paragraph, index) => (
                <p key={index}>
                  {paragraph || "\u00A0"}
                </p>
              ))}
          </div>
        </article>
      </div>

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

export default PostDetails;