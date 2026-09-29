import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LuArrowLeft, LuCheck, LuFileText, LuLoaderCircle, LuSend,} from "react-icons/lu";

import Layout from "../components/layout/Layout";
import api from "../services/api";

const CreatePost = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    title: "",
    content: "",
    authorId: "",
  });

  const [authors, setAuthors] = useState([]);
  const [loadingAuthors, setLoadingAuthors] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    const fetchAuthors = async () => {
      try {
        setLoadingAuthors(true);
        setError("");

        const response = await api.get("/users");

        setAuthors(response.data.data || []);

        if (response.data.data?.length > 0) {
          setFormData((previous) => ({
            ...previous,
            authorId: String(response.data.data[0].id),
          }));
        }
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

    if (error) {
      setError("");
    }

    if (success) {
      setSuccess("");
    }
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

      await api.post("/posts", {
        title: formData.title.trim(),
        content: formData.content.trim(),
        authorId: Number(formData.authorId),
      });

      setSuccess("Post created successfully.");

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
            "Unable to create the post. Please try again."
        );
      }
    } finally {
      setSubmitting(false);
    }
  };

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

              <h1>Create a New Post</h1>

              <p>
                Write and publish your next piece of content with BlogForge.
              </p>
            </div>
          </div>
        </div>

        <form className="post-editor-card" onSubmit={handleSubmit}>
          <div className="editor-card-header">
            <div className="editor-icon">
              <LuFileText />
            </div>

            <div>
              <h2>Post Details</h2>
              <p>Give your post a clear title and engaging content.</p>
            </div>
          </div>

          {error && <div className="form-alert form-alert-error">{error}</div>}

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
                {loadingAuthors ? "Loading authors..." : "Select an author"}
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

              <span>{formData.content.length} characters</span>
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
                  Publishing...
                </>
              ) : (
                <>
                  <LuSend />
                  Publish Post
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </Layout>
  );
};

export default CreatePost;