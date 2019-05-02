"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            `ALTER TABLE guesses ADD COLUMN "targetId" INTEGER REFERENCES targets(id)`
        )
    },

    down: (queryInterface, Sequelize) => {
        // WARNING: this will delete all data from the users about column
        return queryInterface.sequelize.query(
            `ALTER TABLE guesses DROP COLUMN "targetId"`
        )
    }
}
