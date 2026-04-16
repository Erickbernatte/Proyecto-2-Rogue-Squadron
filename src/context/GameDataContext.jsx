import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { currentUser, initialComments, initialProducts, players } from '../data/mockData';

const STORAGE_KEY = 'rogue-squadron-demo-state';
const GameDataContext = createContext(null);

function buildInitialState() {
  return {
    products: initialProducts,
    comments: initialComments,
    transfers: [],
  };
}

export function GameDataProvider({ children }) {
  const [state, setState] = useState(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : buildInitialState();
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const myProducts = useMemo(
    () => state.products.filter((product) => product.ownerId === currentUser.id),
    [state.products]
  );

  function createProduct(payload) {
    const newProduct = {
      id: `prod-${Date.now()}`,
      ownerId: currentUser.id,
      qty: Number(payload.qty),
      availableQty: Number(payload.qty),
      isBlocked: false,
      ...payload,
    };

    setState((prev) => ({
      ...prev,
      products: [newProduct, ...prev.products],
    }));

    return newProduct;
  }

  function toggleBlock(productId) {
    let updatedProduct = null;

    setState((prev) => ({
      ...prev,
      products: prev.products.map((product) => {
        if (product.id !== productId) return product;
        updatedProduct = { ...product, isBlocked: !product.isBlocked };
        return updatedProduct;
      }),
    }));

    return updatedProduct;
  }

  function transferProduct({ productId, targetPlayerId, quantity }) {
    const qtyToTransfer = Number(quantity);
    const targetPlayer = players.find((player) => player.id === targetPlayerId);
    let response = { success: false, message: 'No se pudo transferir el ítem.' };

    setState((prev) => {
      const sourceProduct = prev.products.find((product) => product.id === productId);

      if (!sourceProduct) {
        response = { success: false, message: 'El ítem no existe.' };
        return prev;
      }

      if (sourceProduct.isBlocked) {
        response = { success: false, message: 'El ítem está bloqueado y no se puede transferir.' };
        return prev;
      }

      if (qtyToTransfer <= 0) {
        response = { success: false, message: 'La cantidad debe ser mayor que 0.' };
        return prev;
      }

      if (qtyToTransfer > sourceProduct.availableQty) {
        response = { success: false, message: 'No hay disponibilidad suficiente para transferir.' };
        return prev;
      }

      const nextProducts = prev.products.flatMap((product) => {
        if (product.id !== productId) return [product];

        const remainingQty = product.qty - qtyToTransfer;
        const remainingAvailable = product.availableQty - qtyToTransfer;

        const sourceUpdated = {
          ...product,
          qty: remainingQty,
          availableQty: Math.max(remainingAvailable, 0),
        };

        const transferredCopy = {
          ...product,
          id: `prod-${Date.now()}-${targetPlayerId}`,
          ownerId: targetPlayerId,
          qty: qtyToTransfer,
          availableQty: qtyToTransfer,
          isBlocked: false,
        };

        return remainingQty > 0 ? [sourceUpdated, transferredCopy] : [transferredCopy];
      });

      const transferRecord = {
        id: `tr-${Date.now()}`,
        productId,
        productName: sourceProduct.name,
        fromPlayer: currentUser.name,
        toPlayer: targetPlayer?.name ?? 'Jugador',
        quantity: qtyToTransfer,
        createdAt: new Date().toLocaleString(),
      };

      response = {
        success: true,
        message: `Transferencia realizada a ${transferRecord.toPlayer}.`,
      };

      return {
        ...prev,
        products: nextProducts,
        transfers: [transferRecord, ...prev.transfers],
      };
    });

    return response;
  }

  function deleteOwnComment(commentId) {
    let deleted = false;

    setState((prev) => ({
      ...prev,
      comments: prev.comments.filter((comment) => {
        const shouldDelete = comment.id === commentId && comment.authorId === currentUser.id;
        if (shouldDelete) deleted = true;
        return !shouldDelete;
      }),
    }));

    return deleted;
  }

  const value = {
    currentUser,
    players,
    products: state.products,
    myProducts,
    comments: state.comments,
    transfers: state.transfers,
    createProduct,
    toggleBlock,
    transferProduct,
    deleteOwnComment,
  };

  return <GameDataContext.Provider value={value}>{children}</GameDataContext.Provider>;
}

export function useGameData() {
  const context = useContext(GameDataContext);

  if (!context) {
    throw new Error('useGameData debe usarse dentro de GameDataProvider');
  }

  return context;
}
