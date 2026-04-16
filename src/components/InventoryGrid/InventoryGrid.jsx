import InventoryCard from '../InventoryCard/InventoryCard';
import './InventoryGrid.css';

export default function InventoryGrid({ items, onToggleBlock, onOpenTransfer }) {
  if (!items.length) {
    return <div className="inv-grid__state">No hay ítems para mostrar.</div>;
  }

  return (
    <div className="inv-grid">
      {items.map((item) => (
        <InventoryCard
          key={item.id}
          item={item}
          onToggleBlock={onToggleBlock}
          onOpenTransfer={onOpenTransfer}
        />
      ))}
    </div>
  );
}
