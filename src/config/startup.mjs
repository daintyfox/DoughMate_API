// Little script to prepare the program for first use.
// ask for running port
// ask for database connection url
// DB ip
// DB port
// DB name
// DB username
// DB password
// Generate the jwt keys
// Create the .env file
// force sync db
// Populate permissions
// Create a default 'admin' Role
// Give all permissions to the 'admin' role
// Create a admin user and assign the admin role
// await User.create({ username: 'admin', password: 'admin' });

/**
// Delete the current permission table
await Permission.sync({ force: true });
// Repupulate the role table with up to date permissions
permissions.forEach(async (name) => {
  await Permission.create({ name });
});
*/
