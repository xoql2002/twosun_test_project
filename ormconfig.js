"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const user_entity_1 = require("./src/entities/user.entity");
const post_entity_1 = require("./src/entities/post.entity");
const category_entity_1 = require("./src/entities/category.entity");
const comment_entity_1 = require("./src/entities/comment.entity");
const like_entity_1 = require("./src/entities/like.entity");
const config = {
    type: "mysql",
    host: process.env.DB_HOST || "localhost",
    port: Number(process.env.DB_PORT || 3306),
    username: process.env.DB_USERNAME || "test",
    password: process.env.DB_PASSWORD || "test",
    database: process.env.DB_DATABASE || "twosun_project",
    synchronize: true,
    logging: true,
    entities: [user_entity_1.User, post_entity_1.Post, category_entity_1.Category, comment_entity_1.Comment, like_entity_1.Like],
};
exports.default = config;
//# sourceMappingURL=ormconfig.js.map