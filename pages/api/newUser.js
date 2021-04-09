
const queries = require('../../db/index.js');
const argon2 = require('argon2');

export default async (req, res) => {
  // shape data
  const user = req.body;
  user.password = user.password1;
  delete user.password1;
  delete user.password2;
  user.phone = Number(user.phone);
  user.waterGoal = Number(user.waterGoal);
  user.weightGoal = Number(user.weightGoal);
  user.calorieGoal = Number(user.calorieGoal);
  // add the user
  try {
    // best hashing on the npm market baby, SHA2 / blake2 with a work function to slow down the gpu kids brute force churning
    const hash = await argon2.hash(user.password);
    user.password = hash;
    queries.addUser(req, res);
  } catch (err) {
    console.error('hashing function fail')
  }
};

export const config = {
  api: {
    externalResolver: true,
  },
};
