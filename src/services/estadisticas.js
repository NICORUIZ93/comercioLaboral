const { usuarioService } = require("../services/usuario");
const { tiendaService } = require("../services/tienda");
const { productoService } = require("../services/producto");
const { pedidoService } = require("../services/pedido");
const { mensajeService } = require("../services/mensaje");
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
  async obtenerTotalesPorTienda(idTienda) {
    try {
      const productos = await productoService.obtenerProductosPorTienda(idTienda);
      const empleados = (await tiendaService.obtenerTienda(idTienda)).empleados;
      const pedidos = await pedidoService.obtenerPedidosPorParametros([{ IdTienda: idTienda }]);
      const mensajes = await mensajeService.obtenerMensajesPorParametros([{ IdTienda: idTienda }]);

      const totalProductos = productos.length;
      const totalEmpleados = empleados.length;
      const totalPedidos = pedidos.length;
      const totalMensajes = mensajes.length;

      return { totalProductos, totalEmpleados, totalPedidos, totalMensajes };
      
    } catch (error) {
      return `Error ${error}`;
    }
  },
};

module.exports.estadisticasService = service;
