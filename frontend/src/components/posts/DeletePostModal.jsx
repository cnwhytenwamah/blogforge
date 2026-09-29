import {
  LuCircleAlert,
  LuLoaderCircle,
  LuTrash2,
  LuX,
} from "react-icons/lu";

const DeletePostModal = ({
  post,
  deleting,
  onCancel,
  onConfirm,
}) => {
  if (!post) {
    return null;
  }

  return (
    <div
      className="delete-modal-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !deleting) {
          onCancel();
        }
      }}
    >
      <section
        className="delete-modal"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="delete-modal-title"
        aria-describedby="delete-modal-description"
      >
        <button
          type="button"
          className="delete-modal-close"
          onClick={onCancel}
          disabled={deleting}
          aria-label="Close confirmation dialog"
        >
          <LuX />
        </button>

        <div className="delete-modal-icon">
          <LuCircleAlert />
        </div>

        <span className="eyebrow">Confirm Deletion</span>

        <h2 id="delete-modal-title">Delete this post?</h2>

        <p id="delete-modal-description">
          You are about to permanently delete this post:
        </p>

        <div className="delete-modal-post-title">
          {post.title}
        </div>

        <p className="delete-modal-warning">
          This action cannot be undone.
        </p>

        <div className="delete-modal-actions">
          <button
            type="button"
            className="secondary-button"
            onClick={onCancel}
            disabled={deleting}
          >
            Cancel
          </button>

          <button
            type="button"
            className="danger-button"
            onClick={onConfirm}
            disabled={deleting}
          >
            {deleting ? (
              <>
                <LuLoaderCircle className="button-spinner" />
                Deleting...
              </>
            ) : (
              <>
                <LuTrash2 />
                Delete Post
              </>
            )}
          </button>
        </div>
      </section>
    </div>
  );
};

export default DeletePostModal;