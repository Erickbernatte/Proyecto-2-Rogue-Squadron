import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/inventory', label: 'Mi Inventario' },
  { to: '/account', label: 'Crear Producto' },
  { to: '/comments', label: 'Comentarios' },
  { to: '/play', label: 'Jugar online' },
  { to: '/missions', label: 'Misiones' },
  { to: '/auctions', label: 'Subasta' },
];

export default function Navbar() {
  return (
    <header className="nb">
      <div className="nb__inner">
        <div className="nb__brand">
          <span className="nb__logo">⚔️</span>
          <span className="nb__title">Nexus Battles V</span>
        </div>

        <nav className="nb__nav" aria-label="Navegación principal">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) => `nb__link ${isActive ? 'is-active' : ''}`}
            >
              {link.label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}
