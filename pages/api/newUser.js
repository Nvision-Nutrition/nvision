
const queries = require('../../db/index.js');


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
  queries.addUser(req, res);
 
   
  
};

export const config = {
  api: {
    externalResolver: true,
  },
};
