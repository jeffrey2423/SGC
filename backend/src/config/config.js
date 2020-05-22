module.exports = {
    API_PORT: 4000,
    USER: "root",
    HOST: "localhost",
    DATABASE: "sgc",
    PASS: "MdtsJ4uHCJK4HJf",
    PORTBD:  5432,
    SECRET_KEY:  "sgc_api",

    application: {
        cors: {
            server: [
                {
                    origin: "*", //servidor que deseas "localhost:3000" que consuma o (*) en caso que sea acceso libre
                    credentials: true
                }
            ]
        }

    }
}