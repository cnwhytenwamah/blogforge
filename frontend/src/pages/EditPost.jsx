import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LuArrowLeft, LuCheck, LuFileText, LuLoaderCircle, LuSave,} from "react-icons/lu";

import Layout from "../components/layout/Layout";
import api from "../services/api";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
  });

  const [authors, setAuthors] = useState([]);

  const [loadingPost, setLoadingPost] = useState(true);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoadingPost(true);
        setError("");

        const response = await api.get(`/posts/${id}`);

        const post = response.data.data;

        setFormData({
          title: post.title || "",
          content: post.content || "",
          authorId: post.authorId ? String(post.authorId) : "",
        });
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load this post. Please try again."
        );
      } finally {
        setLoadingPost(false);
      }
    };

    fetchPost();
  }, [id]);

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoadingAuthors(true);

        const response = await api.get("/users");

        setAuthors(response.data.data || []);
      } catch (err) {
        setError(
          err.response?.data?.message ||
            "Unable to load authors. Please try again."
        );
      } finally {
        setLoadingAuthors(false);
      }
    };

    fetchAuthors();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));

    if (error) setError("");
    if (success) setSuccess("");
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!formData.title.trim()) {
      setError("Please enter a post title.");
      return;
    }

    if (!formData.content.trim()) {
      setError("Please enter your post content.");
      return;
    }

    if (!formData.authorId) {
      setError("Please select an author.");
      return;
    }

    try {
      setSubmitting(true);
      setError("");
      setSuccess("");

      await api.put(`/posts/${id}`, {
        title: formData.title.trim(),
        content: formData.content.trim(),
        authorId: Number(formData.authorId),
      });

      setSuccess("Post updated successfully.");

      setTimeout(() => {
        navigate("/posts");
      }, 800);
    } catch (err) {
      const validationErrors = err.response?.data?.errors;

      if (validationErrors?.length) {
        setError(validationErrors[0].message);
      } else {
        setError(
          err.response?.data?.message ||
            "Unable to update the post. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

  if (loadingPost) {
    return (
      <Layout>
        <div className="state-card">
          <div className="loading-spinner"></div>
          <h3>Loading post</h3>
          <p>Fetching the post details from BlogForge.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="create-post-page">
        <div className="create-post-header">
          <div>
            <button
              type="button"
              className="back-button"
              onClick={() => navigate("/posts")}
            >
              <LuArrowLeft />
              Back to Posts
            </button>

            <div className="page-heading">
              <span className="eyebrow">Content Studio</span>
              <h1>Edit Post</h1>
              <p>
                Update your post content and keep your BlogForge library
                current.
              </p>
            </div>
          </div>
        </div>

        {error && !formData.title && (
          <div className="state-card error-state">
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
        )}

        {formData.title && (
          <form className="post-editor-card" onSubmit={handleSubmit}>
            <div className="editor-card-header">
              <div className="editor-icon">
                <LuFileText />
              </div>

              <div>
                <h2>Edit Post Details</h2>
                <p>
                  Make your changes and save the updated version.
                </p>
              </div>
            </div>

            {error && (
              <div className="form-alert form-alert-error">
                {error}
              </div>
            )}

            {success && (
              <div className="form-alert form-alert-success">
                <LuCheck />
                {success}
              </div>
            )}

            <div className="form-group">
              <label htmlFor="title">Post Title</label>

              <input
                id="title"
                name="title"
                type="text"
                value={formData.title}
                onChange={handleChange}
                placeholder="Enter an engaging post title..."
                maxLength={255}
                disabled={submitting}
              />

              <span className="input-helper">
                {formData.title.length}/255 characters
              </span>
            </div>

            <div className="form-group">
              <label htmlFor="authorId">Author</label>

              <select
                id="authorId"
                name="authorId"
                value={formData.authorId}
                onChange={handleChange}
                disabled={loadingAuthors || submitting}
              >
                <option value="">
                  {loadingAuthors
                    ? "Loading authors..."
                    : "Select an author"}
                </option>

                {authors.map((author) => (
                  <option key={author.id} value={author.id}>
                    {author.name} - {author.email}
                  </option>
                ))}
              </select>
            </div>

            <div className="form-group">
              <div className="content-label-row">
                <label htmlFor="content">Content</label>

                <span>
                  {formData.content.length} characters
                </span>
              </div>

              <textarea
                id="content"
                name="content"
                value={formData.content}
                onChange={handleChange}
                placeholder="Start writing your post..."
                rows={16}
                disabled={submitting}
              />
            </div>

            <div className="editor-actions">
              <button
                type="button"
                className="secondary-button"
                onClick={() => navigate("/posts")}
                disabled={submitting}
              >
                Cancel
              </button>

              <button
                type="submit"
                className="primary-button"
                disabled={submitting || loadingAuthors}
              >
                {submitting ? (
                  <>
                    <LuLoaderCircle className="button-spinner" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <LuSave />
                    Save Changes
                  </>
                )}
              </button>
            </div>
          </form>
        )}
      </div>
    </Layout>
  );
};

export default EditPost;