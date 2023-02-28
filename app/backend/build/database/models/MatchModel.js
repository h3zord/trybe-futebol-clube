"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const _1 = __importDefault(require("."));
const TeamModel_1 = __importDefault(require("./TeamModel"));
class MatchModel extends sequelize_1.Model {
}
MatchModel.init({
    id: {
        type: sequelize_1.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    homeTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    homeTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeam: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    awayTeamGoals: {
        type: sequelize_1.INTEGER,
        allowNull: false,
    },
    inProgress: {
        type: sequelize_1.BOOLEAN,
        allowNull: false,
    },
}, {
    underscored: true,
    sequelize: _1.default,
    modelName: 'matches',
    timestamps: false,
});
MatchModel.belongsTo(TeamModel_1.default, { foreignKey: 'homeTeam', as: 'teamHome' });
MatchModel.belongsTo(TeamModel_1.default, { foreignKey: 'awayTeam', as: 'teamAway' });
TeamModel_1.default.hasMany(MatchModel, { foreignKey: 'homeTeam' });
TeamModel_1.default.hasMany(MatchModel, { foreignKey: 'awayTeam' });
exports.default = MatchModel;
//# sourceMappingURL=MatchModel.js.map