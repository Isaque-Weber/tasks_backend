import { createPool } from 'mysql2/promise';

const db = createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

const createTasksTable = `
    CREATE TABLE IF NOT EXISTS tasks (
        id CHAR(36) PRIMARY KEY,
        name VARCHAR(255) UNIQUE NOT NULL,
        cost FLOAT NOT NULL,
        date VARCHAR(50) NOT NULL,
        \`order\` INT UNIQUE NOT NULL AUTO_INCREMENT,
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );
`;

async function initializeDatabase() {
    try {
        await db.execute(createTasksTable);
        console.log("Banco de dados inicializado com sucesso!");
    } catch (error) {
        console.error("Erro ao criar a tabela 'tasks':", error);
    }
}

(async function () {
    await initializeDatabase();
})();

export default db;
