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
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Fcasa.png?alt=media&token=493e6267-c8d4-49ab-bebb-e81dabd3eebf"
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
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Ftren-de-juguete.png?alt=media&token=efa628eb-28d4-4da4-8d12-94206834ba27"
        },
        {
          id:5,
          nombre: "Moda",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Fmoda.png?alt=media&token=34f5ab66-367d-4891-9dbb-ec5e1ac279bd"
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
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Flicor.png?alt=media&token=1e901ec7-8153-48a3-8915-b12de9038142"
        },
        {
          id:12,
          nombre: "Tecnología",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Fordenador-portatil.png?alt=media&token=e4427e59-8898-4e94-b1a4-feaad9f4c12c"
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
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Fdiamante.png?alt=media&token=63635ef1-4516-4643-bd42-14bae852b4b8"
        },
        {
          id:17,
          nombre: "Deportes",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Ffutbol.png?alt=media&token=374a9d08-e320-46c9-84f1-ab5d7b263724"
        },
        {
          id:18,
          nombre: "Eléctricos",
          IdPadre: 17,
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          imagen: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Felectrodomesticos.png?alt=media&token=f1f60bc4-02e2-47aa-b2eb-99eeba4b06bb"
        },
        {
          id:19,
          nombre: "Animales",
          estado: true,
          createdAt: new Date(),
          updatedAt: new Date(),
          url: "https://firebasestorage.googleapis.com/v0/b/lamejorferia-32065.appspot.com/o/img%2Ftrato-de-perro.png?alt=media&token=64c7ccd6-e5ed-48a1-8d3c-f9a40e343e64"
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
