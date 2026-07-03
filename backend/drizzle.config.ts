/**@type {import('drizzle-kit').Config} */


module.exports = {
    schema: './src/schema.js',
    out: './drizzle/migrations',
    dbCredentials: {
        url: './sqlite.db'
    },
    dialect: 'sqlite',
};
