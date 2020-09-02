"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Departamentos",
      [
        {
            "id": 1,
            "nombre": "Casanare",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 2,
            "nombre": "Cundinamarca",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 3,
            "nombre": "Guainía",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 4,
            "nombre": "Meta",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 5,
            "nombre": "Tolima",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 6,
            "nombre": "Antioquia",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 7,
            "nombre": "Chocó",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 8,
            "nombre": "Boyacá",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 9,
            "nombre": "Quindío",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 10,
            "nombre": "Santander",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 11,
            "nombre": "Caquetá",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 12,
            "nombre": "Archipiélago de San Andrés, Providencia y Santa Catalina",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 13,
            "nombre": "Córdoba",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 14,
            "nombre": "Guaviare",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 15,
            "nombre": "Sucre",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 16,
            "nombre": "Arauca",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 17,
            "nombre": "Amazonas",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 18,
            "nombre": "Nariño",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 19,
            "nombre": "Magdalena",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 20,
            "nombre": "Norte de Santander",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 21,
            "nombre": "Risaralda",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 22,
            "nombre": "Vichada",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 23,
            "nombre": "La Guajira",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 24,
            "nombre": "Cesar",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 25,
            "nombre": "Vaupés",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 26,
            "nombre": "Cauca",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 27,
            "nombre": "Putumayo",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 28,
            "nombre": "Caldas",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 29,
            "nombre": "Huila",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 30,
            "nombre": "Valle del Cauca",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 31,
            "nombre": "Bolívar",
            "createdAt": new Date(),
            "updatedAt": new Date()
        },
        {
            "id": 32,
            "nombre": "Atlántico",
            "createdAt": new Date(),
            "updatedAt": new Date()
        }
    ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Departamentos", null, {});
    await queryInterface.sequelize.query(`ALTER SEQUENCE public."Departamentos_id_seq" RESTART WITH 1;`);
  },
};
