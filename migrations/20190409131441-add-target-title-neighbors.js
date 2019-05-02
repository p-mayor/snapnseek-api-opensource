"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            `ALTER TABLE targets ADD COLUMN "title" VARCHAR(100) NOT NULL;
            ALTER TABLE targets ADD COLUMN "neighborhood" VARCHAR(1) NOT NULL`
        )
    },

    down: (queryInterface, Sequelize) => {
        // WARNING: this will delete all data from the users about column
        return queryInterface.sequelize.query(
            `ALTER TABLE targets DROP COLUMN "title";
            ALTER TABLE targets DROP COLUMN "neighborhood"`
        )
    }
}
