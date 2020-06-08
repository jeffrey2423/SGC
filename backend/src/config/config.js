module.exports = {
    API_PORT: 4000,
    USER: "ajbdjkeftkcalj",
    HOST: "ec2-52-7-39-178.compute-1.amazonaws.com",
    DATABASE: "d4micudr3p8mi9",
    PASS: "c498ab738a6e3ee72ac456e7a5104d83c0fa9f9d844d94bca93ef026f9329434",
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