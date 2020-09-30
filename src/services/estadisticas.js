const { usuarioService } = require("../services/usuario");
const { tiendaService } = require("../services/tienda");
const _Rol = require("../constants/roles");
const { Op } = require("sequelize");

const service = {
  async obtenerTotales() {
    try {
      const totalUsuarios = await usuarioService.contarUsuarioPorParametros([{ IdRol: { [Op.ne]: _Rol.AdministradorID } }]);
      const totalVendedores = await usuarioService.contarUsuarioPorParametros([{ IdRol: _Rol.VendedorID }]);
      const totalCompradores = await usuarioService.contarUsuarioPorParametros([{ IdRol: _Rol.CompradorID }]);
      const totalTiendas = await tiendaService.contarTiendaPorParametros();

      const totales = {
        totalUsuarios,
        totalVendedores,
        totalCompradores,
        totalTiendas
      };

      return totales;
    } catch (error) {
      return `Error ${error}`;
    }
  },
  
};

module.exports.estadisticasService = service;
