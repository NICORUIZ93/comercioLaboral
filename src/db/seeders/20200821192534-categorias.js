'use strict';
const { Op } = require("sequelize");

module.exports = {
  up: async (queryInterface, Sequelize) => {

       queryInterface.bulkInsert('Categorias', [{       
          id:1,
          nombre: "Hogar",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:2,
          nombre: "Bebes",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:3,
          nombre: "Belleza y cuidado personal",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:4,
          nombre: "Juguetes y entretenimiento",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:5,
          nombre: "Moda",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:6,
          nombre: "Mujer",
          IdPadre: 5,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:7,
          nombre: "Hombre",
          IdPadre: 5,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:8,
          nombre: "Niño",
          IdPadre: 5,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:9,
          nombre: "Niña",
          IdPadre: 5,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:10,
          nombre: "Bebe",
          IdPadre: 5,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:11,
          nombre: "Bar",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:12,
          nombre: "Tecnología",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:13,
          nombre: "Celulares",
          IdPadre: 12,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:14,
          nombre: "Computadores",
          IdPadre: 12,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:15,
          nombre: "Cámaras",
          IdPadre: 12,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:16,
          nombre: "Relojes y joyería",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:17,
          nombre: "Deportes",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:18,
          nombre: "Eléctricos",
          IdPadre: 17,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:19,
          nombre: "Animales",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:20,
          nombre: "Agro",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:21,
          nombre: "Papelería",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:22,
          nombre: "Librería",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:23,
          nombre: "Artículos para fiestas",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:24,
          nombre: "Electrodomésticos",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:25,
          nombre: "Construcción",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:26,
          nombre: "Industria",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id:27,
          nombre: "Boletas y eventos",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
        }], {});

        await queryInterface.sequelize.transaction(async (transaction) => {
          const tableName = 'Categorias';
          const sequenceColumn = 'id';
    
          const [[{ max }]] = await queryInterface.sequelize.query(`SELECT MAX("${sequenceColumn}") AS max FROM public."${tableName}";`, { transaction });
          await queryInterface.sequelize.query(`ALTER SEQUENCE public."${tableName}_${sequenceColumn}_seq" RESTART WITH ${max + 1};`, { transaction });
        });
       
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Categorias', { id: { [Op.lte]: 27 } }, {});    
  }
};
