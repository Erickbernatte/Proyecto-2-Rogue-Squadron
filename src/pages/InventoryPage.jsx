import { useState } from 'react';
import InventoryGrid from '../components/InventoryGrid/InventoryGrid';
import InventoryToolbar from '../components/InventoryToolbar/InventoryToolbar';
import Pagination from '../components/Pagination/Pagination';
import TransferModal from '../components/TransferModal/TransferModal';
import { useInventory } from '../hooks/useInventory';
import { useGameData } from '../context/GameDataContext';
import './InventoryPage.css';

export default function InventoryPage() {
  const {
    pageItems,
    page,
    totalPages,
    totalItems,
    search,
    availabilityFilter,
    setSearch,
    setAvailabilityFilter,
    goToPage,
    toggleBlock,
    transferProduct,
  } = useInventory();
  const { players, currentUser, transfers } = useGameData();
  const [selectedItem, setSelectedItem] = useState(null);

  const otherPlayers = players.filter((player) => player.id !== currentUser.id);

  return (
    <div className="inv-page">
      <header className="inv-page__header">
        <div>
  <div className="inv-page__subtitle">GESTIÓN DE INVENTARIO</div>
  <h1 className="inv-page__title">Inventario de Ítems</h1>
</div>
        <div className="inv-page__count">Total: <strong>{totalItems}</strong> ítems</div>
      </header>

      <div className="inv-page__summary">
  <div className="summary-card">
    <h3>Disponibilidad</h3>
    <p>Consulta rápida del stock disponible y estado actual de cada ítem.</p>
  </div>
  <div className="summary-card">
    <h3>Estado del ítem</h3>
    <p>Bloquea o desbloquea ítems para controlar su uso dentro del inventario.</p>
  </div>
  <div className="summary-card">
    <h3>Transferencias</h3>
    <p>Envía ítems entre jugadores validando cantidades disponibles.</p>
  </div>
</div>

      <InventoryToolbar
        search={search}
        onSearchChange={setSearch}
        availabilityFilter={availabilityFilter}
        onAvailabilityFilterChange={setAvailabilityFilter}
      />

      <InventoryGrid
        items={pageItems}
        onToggleBlock={toggleBlock}
        onOpenTransfer={setSelectedItem}
      />

      <Pagination page={page} totalPages={totalPages} onPageChange={goToPage} />

      {transfers.length > 0 ? (
        <section className="inv-page__history">
          <h2>Últimas transferencias</h2>
          {transfers.slice(0, 4).map((transfer) => (
            <div key={transfer.id} className="history-item">
              <strong>{transfer.productName}</strong> → {transfer.toPlayer} ({transfer.quantity})
            </div>
          ))}
        </section>
      ) : null}

      {selectedItem ? (
        <TransferModal
          item={selectedItem}
          players={otherPlayers}
          onClose={() => setSelectedItem(null)}
          onTransfer={transferProduct}
        />
      ) : null}
    </div>
  );
}
