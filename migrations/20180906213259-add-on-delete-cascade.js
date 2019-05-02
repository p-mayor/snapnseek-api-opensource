"use strict";

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `ALTER TABLE guesses 
      DROP CONSTRAINT "guesses_userId_fkey",
      ADD CONSTRAINT "guesses_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES users(id) 
        ON DELETE CASCADE;

      ALTER TABLE likes
      DROP CONSTRAINT "likes_userId_fkey",
      ADD CONSTRAINT "likes_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES users(id)
        ON DELETE CASCADE;

      ALTER TABLE likes
      DROP CONSTRAINT "likes_guessId_fkey",
      ADD CONSTRAINT "likes_guessId_fkey"
        FOREIGN KEY ("guessId")
        REFERENCES guesses(id)
        ON DELETE CASCADE;`
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.sequelize.query(
      `ALTER TABLE guesses
      DROP CONSTRAINT "guesses_userId_fkey",
      ADD CONSTRAINT "guesses_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES users(id);

      ALTER TABLE likes
      DROP CONSTRAINT "likes_userId_fkey",
      ADD CONSTRAINT "likes_userId_fkey"
        FOREIGN KEY ("userId")
        REFERENCES users(id);
      
      ALTER TABLE likes
      DROP CONSTRAINT "likes_guessId_fkey",
      ADD CONSTRAINT "likes_guessId_fkey"
        FOREIGN KEY ("guessId")
        REFERENCES guesses(id);`
    );
  }
};
