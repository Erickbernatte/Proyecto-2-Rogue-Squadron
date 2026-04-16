import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import AppLayout from './pages/AppLayout';
import InventoryPage from './pages/InventoryPage';
import AccountPage from './pages/AccountPage';
import CommentsPage from './pages/CommentsPage';
import PlayPage from './pages/PlayPage';
import MissionsPage from './pages/MissionsPage';
import TournamentPage from './pages/TournamentPage';
import AuctionsPage from './pages/AuctionsPage';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Navigate to="/inventory" replace />} />
          <Route path="/inventory" element={<InventoryPage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/comments" element={<CommentsPage />} />
          <Route path="/play" element={<PlayPage />} />
          <Route path="/missions" element={<MissionsPage />} />
          <Route path="/tournament" element={<TournamentPage />} />
          <Route path="/auctions" element={<AuctionsPage />} />
          <Route path="*" element={<div style={{ padding: 24, color: '#d4c9a8' }}>404</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
