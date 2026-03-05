import { items } from "./items.js";

function buscarItems(query) {
  const q = query.toLowerCase().trim();

  if (q.length < 4) {
    console.log("Debes escribir al menos 4 caracteres");
    return;
  }

  const resultados = items.filter(item =>
    item.nombre.toLowerCase().includes(q) ||
    item.tipo.toLowerCase().includes(q) ||
    item.habilidad.toLowerCase().includes(q)
  );

  if (resultados.length === 0) {
    console.log("No hay resultados");
  } else {
    console.log("Resultados encontrados:");
    console.table(resultados);
  }
}

// pruebas
buscarItems("espa");
buscarItems("cura");
buscarItems("xxxx");