import { useState } from 'react';
import './TransferModal.css';

export default function TransferModal({ item, players, onClose, onTransfer }) {
  const [targetPlayerId, setTargetPlayerId] = useState(players[0]?.id ?? '');
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  function handleSubmit(event) {
    event.preventDefault();
    const result = onTransfer({ productId: item.id, targetPlayerId, quantity: Number(quantity) });
    setMessage(result.message);
    if (result.success) {
      setTimeout(onClose, 700);
    }
  }

  return (
    <div className="modal-backdrop">
      <div className="modal-card">
        <div className="modal-card__header">
          <h3>Transferir {item.name}</h3>
          <button type="button" className="modal-card__close" onClick={onClose}>✕</button>
        </div>

        <form className="modal-card__form" onSubmit={handleSubmit}>
          <label>
            Jugador destino
            <select value={targetPlayerId} onChange={(event) => setTargetPlayerId(event.target.value)}>
              {players.map((player) => (
                <option key={player.id} value={player.id}>{player.name}</option>
              ))}
            </select>
          </label>

          <label>
            Cantidad
            <input
              type="number"
              min="1"
              max={item.availableQty}
              value={quantity}
              onChange={(event) => setQuantity(event.target.value)}
            />
          </label>

          {message ? <p className="modal-card__message">{message}</p> : null}

          <button type="submit" className="modal-card__submit">Confirmar transferencia</button>
        </form>
      </div>
    </div>
  );
}
