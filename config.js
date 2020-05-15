module.exports = {
    ENV: process.env.NODE_ENV || 'development',
    PORT: process.env.PORT || 3000,
    URL: process.env.BASE_URL || 'http://localhost:3000',
    MONGODB_URI: process.env.MONGODB_URI || 'mongodb+srv://Liimmaa:chiomaihuoma1.@cluster0-wvps7.mongodb.net/test',
    JWT_SECRET:process.env.JWT_SECRET || 'chiomaihuoma1.'
  };