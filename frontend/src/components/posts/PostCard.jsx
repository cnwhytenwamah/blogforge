import {
  LuCalendarDays,
  LuPencil,
  LuTrash2,
  LuArrowUpRight,
} from "react-icons/lu";

const PostCard = ({ post, onView, onEdit, onDelete }) => {
  return (
    <article className="post-card">
      <div className="post-card-content">
        <div className="post-meta">
          <span className="post-status">
            Published
          </span>

          <span className="post-date">
            <LuCalendarDays />
            {new Date(post.createdAt).toLocaleDateString()}
          </span>
        </div>

        <h3>{post.title}</h3>

        <p>
          {post.content.length > 140
            ? `${post.content.substring(0, 140)}...`
            : post.content}
        </p>

        <div className="post-card-footer">
          <div className="post-author">
            <div className="mini-avatar">
              {post.author?.name
                ?.split(" ")
                .map((name) => name[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <span>{post.author?.name || "Unknown Author"}</span>
          </div>

          <div className="post-actions">
            <button
              type="button"
              onClick={() => onEdit(post.id)}
              aria-label={`Edit ${post.title}`}
            >
              <LuPencil />
            </button>

            <button
              type="button"
              onClick={() => onDelete(post)}
              aria-label={`Delete ${post.title}`}
            >
              <LuTrash2 />
            </button>

            <button
              type="button"
              className="view-post"
              onClick={() => onView(post.id)}
              aria-label={`View ${post.title}`}
            >
              <LuArrowUpRight />
            </button>
          </div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;