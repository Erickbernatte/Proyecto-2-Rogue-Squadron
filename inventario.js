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

function addItemToInventory(body) {
  const validationError = validateRequestBody(body);

  if (validationError) {
    return {
      success: false,
      status: 400,
      message: validationError
    };
  }

  const { playerId, productId, quantity } = body;
  const product = findProductById(productId);

  if (!product) {
    return {
      success: false,
      status: 404,
      message: "Producto no encontrado."
    };
  }

  const shouldDiscountStock = quantity !== -1 && product.stock !== -1;

  if (shouldDiscountStock) {
    if (product.stock < quantity) {
      return {
        success: false,
        status: 400,
        message: "Stock insuficiente para completar la compra."
      };
    }

    product.stock -= quantity;
  }

  const newInventoryItem = buildInventoryItem(playerId, product, quantity);
  inventory.push(newInventoryItem);

  return {
    success: true,
    status: 201,
    message: "Ítem agregado al inventario del jugador correctamente.",
    data: {
      item: newInventoryItem,
      remainingStock: product.stock
    }
  };
}

// PRUEBAS
console.log("=== Compra normal ===");
console.log(addItemToInventory({
  playerId: 1,
  productId: 1,
  quantity: 2
}));

console.log("=== Producto infinito ===");
console.log(addItemToInventory({
  playerId: 2,
  productId: 3,
  quantity: -1
}));

console.log("=== Stock insuficiente ===");
console.log(addItemToInventory({
  playerId: 3,
  productId: 2,
  quantity: 10
}));

console.log("=== Inventario final ===");
console.log(inventory);

console.log("=== Productos finales ===");
console.log(products);
