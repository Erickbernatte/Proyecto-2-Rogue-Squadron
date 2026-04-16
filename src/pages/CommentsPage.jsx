import CommentBoard from '../components/CommentBoard/CommentBoard';
import { useGameData } from '../context/GameDataContext';

export default function CommentsPage() {
  const { comments, currentUser, deleteOwnComment } = useGameData();

  return (
    <section style={{ padding: '2rem 0', display: 'grid', gap: '1rem' }}>
      <div style={{ border: '1px solid #252840', borderRadius: 14, background: '#0f1018', padding: '1rem' }}>
        <div style={{ color: '#8a8070', fontSize: 12, letterSpacing: '0.2em', textTransform: 'uppercase' }}>
          CENTRO DE COMENTARIOS
        </div>
        <h1 style={{ margin: '0.3rem 0 0', color: '#c9a84c' }}>
          Gestión de Comentarios
        </h1>
        <p style={{ marginBottom: 0, color: '#cfd7ea' }}>
          Administra tus comentarios y elimina únicamente los que te pertenecen.
        </p>
      </div>

      <CommentBoard
        comments={comments}
        currentUserId={currentUser.id}
        onDeleteOwnComment={deleteOwnComment}
      />
    </section>
  );
}
