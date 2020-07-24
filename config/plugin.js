'use strict';

/** @type Egg.EggPlugin */
module.exports = {

  passport: {
    enable: true,
    package: 'egg-passport',
  },

  mongoose: {
    enable: true,
    package: 'egg-mongoose',
  },

  validate: {
    enable: true,
    package: 'egg-validate',
  },

  cors: {
    enable: true,
    package: 'egg-cors',
  },
};
