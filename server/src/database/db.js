import { createConnection } from "mysql2/promise";

const db = createConnection({
  host: "localhost",
  user: "root",
  password: "soytk",
  port: 3306,
  database: "my_contacts",
});

export default db;
