const express = require("express");
const app = express();

app.use(express.json());

const inventory = [];

const products = [
  { id: 1, name: "Espada", type: "arma", ability: "ataque", stock: 10 },
  { id: 2, name: "Escudo", type: "armadura", ability: "defensa", stock: 5 },
  { id: 3, name: "Poción infinita", type: "consumible", ability: "curación", stock: -1 }
];


function findProductById(productId) {
  return products.find((product) => product.id === productId);
}


function validateRequestBody(body) {
  const { playerId, productId, quantity } = body;

  if (playerId === undefined || productId === undefined || quantity === undefined) {
    return "Los campos playerId, productId y quantity son obligatorios.";
  }

  if (!Number.isInteger(playerId) || playerId <= 0) {
    return "playerId debe ser un entero positivo.";
  }

  if (!Number.isInteger(productId) || productId <= 0) {
    return "productId debe ser un entero positivo.";
  }

  if (!Number.isInteger(quantity)) {
    return "quantity debe ser un número entero.";
  }

  if (quantity === 0) {
    return "quantity no puede ser 0.";
  }

  if (quantity < -1) {
    return "quantity no puede ser menor que -1.";
  }

  return null;
}


function buildInventoryItem(playerId, product, quantity) {
  return {
    inventoryItemId: Date.now(),
    playerId,
    productId: product.id,
    productName: product.name,
    productType: product.type,
    productAbility: product.ability,
    quantity,
    purchasedAt: new Date().toISOString()
  };
}

app.post("/api/v1/inventory/items", (req, res) => {
  try {
    const validationError = validateRequestBody(req.body);

    if (validationError) {
      return res.status(400).json({
        success: false,
        message: validationError
      });
    }

    const { playerId, productId, quantity } = req.body;

    const product = findProductById(productId);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Producto no encontrado."
      });
    }

    const shouldDiscountStock = quantity !== -1 && product.stock !== -1;

    if (shouldDiscountStock) {
      if (product.stock < quantity) {
        return res.status(400).json({
          success: false,
          message: "Stock insuficiente para completar la compra."
        });
      }

      product.stock -= quantity;
    }

    const newInventoryItem = buildInventoryItem(playerId, product, quantity);
    inventory.push(newInventoryItem);

    return res.status(201).json({
      success: true,
      message: "Ítem agregado al inventario del jugador correctamente.",
      data: {
        item: newInventoryItem,
        remainingStock: product.stock
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Ocurrió un error interno al agregar el ítem al inventario.",
      error: error.message
    });
  }
});
