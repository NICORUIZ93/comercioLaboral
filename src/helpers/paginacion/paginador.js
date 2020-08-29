
const paginarDatos = (data, pagina, limite) => {
  const { count: totalItems, rows: datos } = data;
  const paginaActual = pagina ? +pagina : 0;
  const totalPaginas = Math.ceil(totalItems / limite);

  return { totalItems, datos, totalPaginas, paginaActual };
};

const obtenerPaginacion = (pagina, tamano) => {
    const limit = tamano ? +tamano : 3;
    const offset = pagina ? pagina * limit : 0;
  
    return { limit, offset };
};

module.exports = {
    paginarDatos,
    obtenerPaginacion,
}