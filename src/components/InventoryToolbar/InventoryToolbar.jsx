import './InventoryToolbar.css';

export default function InventoryToolbar({ search, onSearchChange, availabilityFilter, onAvailabilityFilterChange }) {
  return (
    <section className="toolbar">
      <input
        className="toolbar__search"
        type="text"
        placeholder="Buscar ítem"
        value={search}
        onChange={(event) => onSearchChange(event.target.value)}
      />

      <select
        className="toolbar__select"
        value={availabilityFilter}
        onChange={(event) => onAvailabilityFilterChange(event.target.value)}
      >
        <option value="all">Todos</option>
        <option value="available">Disponibles</option>
        <option value="blocked">Bloqueados</option>
        <option value="empty">Sin stock</option>
      </select>
    </section>
  );
}
