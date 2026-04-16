import './InventoryCard.css';

export default function InventoryCard({ item, onToggleBlock, onOpenTransfer }) {
  const isAvailable = item.availableQty > 0 && !item.isBlocked;

  return (
    <article className="inv-card">
      <div className="inv-card__topline" data-rarity={item.rarity} />

      <div className="inv-card__art" data-type={item.type}>
        <div className="inv-card__mana">{item.mana}</div>
        <div className="inv-card__qty">x{item.qty}</div>
        <div className="inv-card__icon">{item.icon ?? '🎴'}</div>
      </div>

      <div className="inv-card__info">
        <div>
          <h3 className="inv-card__name">{item.name}</h3>
          <p className="inv-card__desc">{item.description}</p>
        </div>

        <div className="inv-card__meta">
          <span>{item.type}</span>
          <span>{item.rarity}</span>
        </div>

        <div className="inv-card__status">
          <span className={`badge ${isAvailable ? 'badge--ok' : 'badge--warn'}`}>
            {isAvailable ? 'Disponible' : item.isBlocked ? 'Bloqueado' : 'Sin stock'}
          </span>
          <span className="badge">Disponibles: {item.availableQty}</span>
        </div>

        <div className="inv-card__actions">
          <button type="button" onClick={() => onToggleBlock(item.id)}>
            {item.isBlocked ? 'Desbloquear' : 'Bloquear'}
          </button>
          <button
            type="button"
            onClick={() => onOpenTransfer(item)}
            disabled={item.isBlocked || item.availableQty === 0}
          >
            Transferir
          </button>
        </div>
      </div>
    </article>
  );
}
