import { useMemo, useState } from 'react';
import { useGameData } from '../context/GameDataContext';

const PAGE_SIZE = 8;

export function useInventory() {
  const { myProducts, toggleBlock, transferProduct } = useGameData();
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [availabilityFilter, setAvailabilityFilter] = useState('all');

  const filteredItems = useMemo(() => {
    return myProducts.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
      const isAvailable = item.availableQty > 0 && !item.isBlocked;

      if (availabilityFilter === 'available' && !isAvailable) return false;
      if (availabilityFilter === 'blocked' && !item.isBlocked) return false;
      if (availabilityFilter === 'empty' && item.availableQty > 0) return false;

      return matchesSearch;
    });
  }, [availabilityFilter, myProducts, search]);

  const totalItems = filteredItems.length;
  const totalPages = Math.max(1, Math.ceil(totalItems / PAGE_SIZE));
  const safePage = Math.min(Math.max(page, 1), totalPages);

  const pageItems = useMemo(() => {
    const start = (safePage - 1) * PAGE_SIZE;
    return filteredItems.slice(start, start + PAGE_SIZE);
  }, [filteredItems, safePage]);

  function goToPage(nextPage) {
    setPage(Math.min(Math.max(nextPage, 1), totalPages));
  }

  function handleSearch(value) {
    setPage(1);
    setSearch(value);
  }

  function handleAvailabilityFilter(value) {
    setPage(1);
    setAvailabilityFilter(value);
  }

  return {
    items: filteredItems,
    pageItems,
    page: safePage,
    totalPages,
    totalItems,
    isLoading: false,
    isError: false,
    search,
    availabilityFilter,
    goToPage,
    setSearch: handleSearch,
    setAvailabilityFilter: handleAvailabilityFilter,
    toggleBlock,
    transferProduct,
  };
}
