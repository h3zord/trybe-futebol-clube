const swaggerAutogen = require('swagger-autogen')();

const doc = {
  info: {
    version: '1.0.0',
    title: 'Trybe Futebol Clube API',
    description: 'Esta documentação é destinada ao projeto Trybe Futebol Clube.',
  },
  host: 'back-end-production-1a4a.up.railway.app',
  basePath: '/',
  schemes: ['https', 'http'],
  consumes: ['application/json'],
  produces: ['application/json'],
  tags: [
    {
      name: 'Login',
      description: 'Endpoints',
    },
    {
      name: 'Team',
      description: 'Endpoints',
    },
    {
      name: 'Match',
      description: 'Endpoints',
    },
    {
      name: 'LeaderBoard',
      description: 'Endpoints',
    },
  ],
  definitions: {
    Login: {
      email: "admin@admin.com",
      password: "secret_admin"
    },
    Team: {
      id: 12,
      teamName: "Palmeiras"
    },
    Teams: [
      {
        id: 1,
        teamName: "Avaí/Kindermann"
      },
    ],
    Match: {
      homeTeam: 1,
      awayTeam: 12,
      homeTeamGoals: 1,
      awayTeamGoals: 6,
      inProgress: true
    },
    Matches: [
      {
        id: 1,
        homeTeam: 16,
        homeTeamGoals: 1,
        awayTeam: 8,
        awayTeamGoals: 1,
        inProgress: false,
        teamHome: {
          teamName: "São Paulo"
        },
        teamAway: {
          teamName: "Grêmio"
        }
      },
    ],
    LeaderBoard: [
      {
        name: "Palmeiras",
        totalPoints: 13,
        totalGames: 5,
        totalVictories: 4,
        totalDraws: 1,
        totalLosses: 0,
        goalsFavor: 17,
        goalsOwn: 5,
        goalsBalance: 12,
        efficiency: "86.67"
      },
    ],
    LeaderBoardHome: [
      {
        name: "Santos",
        totalPoints: 9,
        totalGames: 3,
        totalVictories: 3,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 9,
        goalsOwn: 3,
        goalsBalance: 6,
        efficiency: "100.00"
      },
    ],
    LeaderBoardAway: [
      {
        name: "Palmeiras",
        totalPoints: 6,
        totalGames: 2,
        totalVictories: 2,
        totalDraws: 0,
        totalLosses: 0,
        goalsFavor: 7,
        goalsOwn: 0,
        goalsBalance: 7,
        efficiency: "100.00"
      },
    ],
    InfoUpdateMatch: {
      homeTeamGoals: 2,
      awayTeamGoals: 4
    },
    ValidToken: { // 200
      authorization: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwicGFzc3dvcmQiOiJzZWNyZXRfYWRtaW4ifSwiaWF0IjoxNjc3MDI4Njg3LCJleHAiOjE3NjMzNDIyODd9.7hkBkM1PUqUZ1rmmLMqCfIryM4qWPfgT_3XFU3khFrk"
    },
    AdminRole: { // 200
      role: "admin"
    },
    InvalidTokenError: { // 401
      message: "Token must be a valid token"
    },
    TokenNotFoundError: { // 404
      message: "Token not found"
    },
    InvalidLoginBodyError: { // 401
      message: "Incorrect email or password"
    },
    BodyLoginIncompleteError: { // 400
      message: "All fields must be filled"
    },
    InvalidBodyError: { // 500
      message: 'Invalid body',
    },
    BodyNotFoundError: { // 404
      message: "Body not found"
    },
    IdNotFoundError: { // 400
      message: 'There is no team with such id!',
    },
    EqualTeamsError: { // 422
      message: 'It is not possible to create a match with two equal teams',
    },
    UpdateError: { // 500
      message: "Update error"
    },
    FinishedMessage: { // 200
      message: "Finished"
    },
  },
};

const outputFile = './src/swagger-output.json';
const endpointsFiles = [
  './build/routes/LoginRoutes.js',
  './build/routes/TeamRoutes.js',
  './build/routes/MatchRoutes.js',
  './build/routes/LeaderBoardRoutes.js',
];

swaggerAutogen(outputFile, endpointsFiles, doc).then(async () => {
  // eslint-disable-next-line import/extensions
  await import('./build/app.js'); // Your project's root file
});