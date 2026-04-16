import './CommentBoard.css';

export default function CommentBoard({ comments, currentUserId, onDeleteOwnComment }) {
  return (
    <section className="comment-board">
      {comments.map((comment) => {
        const isOwn = comment.authorId === currentUserId;
        return (
          <article key={comment.id} className="comment-board__item">
            <div>
              <strong>{comment.authorName}</strong>
              <p>{comment.message}</p>
              <small>{comment.createdAt}</small>
            </div>
            {isOwn ? (
              <button type="button" onClick={() => onDeleteOwnComment(comment.id)}>
                Eliminar mi comentario
              </button>
            ) : null}
          </article>
        );
      })}
    </section>
  );
}
