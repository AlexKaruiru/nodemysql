import colors from 'colors';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import users from './data/users.js';
import User from './models/userModel.js';

dotenv.config();

connectDB();

const importData = async () => {
	try {
	  const sequelize = connectDB(); 
	  await sequelize.sync({ force: true });
	  await User.bulkCreate(users);
  
	  console.log(`Data imported`.green.inverse);
	  process.exit();
	} catch (err) {
	  console.error(`${err}`.red.inverse);
	  process.exit(1);
	}
  };
  

const destroyData = async () => {
  try {
    await User.destroy({ where: {} });

    console.log(`Data destroyed`.red.inverse);
    process.exit();
  } catch (err) {
    console.error(`${err}`.red.inverse);
    process.exit(1);
  }
};

if (process.argv[2] === '-d') {
  destroyData();
} else {
  importData();
}
