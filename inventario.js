const express = require("express");
const app = express();

app.use(express.json());

let inventory = [];

let products = [
  { id: 1, name: "Espada", stock: 10 },
  { id: 2, name: "Escudo", stock: 5 },
  { id: 3, name: "Poción infinita", stock: -1 }
];

app.post("/api/v1/inventory/items", (req, res) => {
  try {
    const { playerId, productId, quantity } = req.body;

    if (!playerId || !productId || quantity === undefined) {
      return res.status(400).json({
        message: "Faltan datos obligatorios"
      });
    }

    const product = products.find(p => p.id === productId);

    if (!product) {
      return res.status(404).json({
        message: "Producto no encontrado"
      });
    }

    const newItem = {
      id: Date.now(),
      playerId,
      productId,
      productName: product.name,
      quantity
    };

    inventory.push(newItem);

    // Descontar stock si aplica
    if (quantity !== -1 && product.stock !== -1) {
      if (product.stock < quantity) {
        return res.status(400).json({
          message: "Stock insuficiente"
        });
      }

      product.stock -= quantity;
    }

    return res.status(201).json({
      message: "Ítem agregado correctamente",
      item: newItem,
      remainingStock: product.stock
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error interno",
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
