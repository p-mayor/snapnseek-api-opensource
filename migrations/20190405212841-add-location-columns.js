"use strict"

module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.sequelize.query(
            `ALTER TABLE targets ADD COLUMN "pictureLat" real NOT NULL DEFAULT 0.0; 
            ALTER TABLE targets ADD COLUMN "pictureLong" real NOT NULL DEFAULT 0.0; 
            ALTER TABLE guesses ADD COLUMN "pictureLat" real NOT NULL DEFAULT 0.0; 
            ALTER TABLE guesses ADD COLUMN "pictureLong" real NOT NULL DEFAULT 0.0`
        )
    },

    down: (queryInterface, Sequelize) => {
        // WARNING: this will delete all data from the users about column
        return queryInterface.sequelize.query(
            `ALTER TABLE users DROP COLUMN "pictureLat"; 
            ALTER TABLE users DROP COLUMN "pictureLong"; 
            ALTER TABLE guesses DROP COLUMN "pictureLat"; 
            ALTER TABLE guesses DROP COLUMN "pictureLong"`
        )
    }
}
