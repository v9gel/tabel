const dbConfig = {
  user: process.env.NODE_ORACLEDB_USER || "admin",

  password: process.env.NODE_ORACLEDB_PASSWORD || "xF08aNKj5jLbE6AwjDMR",

  connectString:
    process.env.NODE_ORACLEDB_CONNECTIONSTRING ||
    "database-1.czy3pep6xaul.us-east-2.rds.amazonaws.com:1521:DATABASE",

  externalAuth: process.env.NODE_ORACLEDB_EXTERNALAUTH ? true : false
};

export default dbConfig;
// jdbc:oracle:thin:@database-1.czy3pep6xaul.us-east-2.rds.amazonaws.com:1521:DATABASE
