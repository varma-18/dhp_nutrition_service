"use strict";
// Topic
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("conversations", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      topic: {
        type: Sequelize.STRING,
        defaultValue: "Quick Message",
      },
      providerId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      patientId: {
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      isArchived: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      isDeleted: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("conversations");
  },
};
