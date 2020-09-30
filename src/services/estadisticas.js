const { usuarioService } = require("../services/usuario");
const { tiendaService } = require("../services/tienda");
const { productoService } = require("../services/producto");
const _Rol = require("../constants/roles");
const { Op } = require("sequelize");

const service = {
  async obtenerTotales() {
    try {
      const totalUsuarios = await usuarioService.contarUsuarioPorParametros([{ IdRol: { [Op.ne]: _Rol.AdministradorID } }]);
      const totalVendedores = await usuarioService.contarUsuarioPorParametros([{ IdRol: _Rol.VendedorID }]);
      const totalCompradores = await usuarioService.contarUsuarioPorParametros([{ IdRol: _Rol.CompradorID }]);
      const totalEmpleados = await usuarioService.contarUsuarioPorParametros([{ IdRol: _Rol.EmpleadoID }]);
      const totalProductos = await productoService.contarProductoPorParametros();
      const totalTiendas = await tiendaService.contarTiendaPorParametros();

      const totales = {
        totalUsuarios,
        totalVendedores,
        totalCompradores,
        totalEmpleados,
        totalTiendas,
        totalProductos
      };

      return totales;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  async obtenerTotalesProductosPorTienda(idTienda) {
    try {
      const productos = await productoService.obtenerProductosPorTienda(idTienda);
      const totalProductos = productos.length;

      return { totalProductos };
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.estadisticasService = service;
