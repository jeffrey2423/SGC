module.exports = {
    API_PORT: process.env.API_PORT || 4000,
    USER: process.env.USER || "postgres",
    HOST: process.env.HOST || "localhost",
    DATABASE: process.env.DATABASE || "sgc",
    PASS: process.env.PASS || "root",
    PORTBD: process.env.PORTBD || 5432,
    PORTSERVER: process.env.PORTSERVER || 5000,
    SECRET_KEY: process.env.SECRET_KEY || "sgc_api",
    COLABORADOR: 1,
    ADMINISTRADOR: 2,
    BASE_URL: "http://localhost:4000/"

}