"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const schema_1 = require("../schema/schema");
const User_1 = __importDefault(require("../models/User"));
const Blog_1 = __importDefault(require("../models/Blog"));
const Comment_1 = __importDefault(require("../models/Comment"));
const mongoose_1 = require("mongoose");
const bcryptjs_1 = require("bcryptjs");
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQuery",
    fields: {
        //get all users
        users: {
            type: (0, graphql_1.GraphQLList)(schema_1.UserType),
            async resolve() {
                try {
                    return await User_1.default.find();
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //get user by id
        user: {
            type: schema_1.UserType,
            args: { id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                try {
                    return await User_1.default.findById(id).populate("blogs");
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //get all blogs
        blogs: {
            type: (0, graphql_1.GraphQLList)(schema_1.BlogType),
            async resolve() {
                try {
                    return await Blog_1.default.find();
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //get blog by id
        blog: {
            type: schema_1.BlogType,
            args: { id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) } },
            async resolve(parent, { id }) {
                try {
                    return await Blog_1.default.findById(id).populate("user comments");
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //get all comments
        comments: {
            type: (0, graphql_1.GraphQLList)(schema_1.CommentType),
            async resolve() {
                try {
                    return await Comment_1.default.find();
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
    },
});
const mutations = new graphql_1.GraphQLObjectType({
    name: "mutations",
    fields: {
        //user signup
        signup: {
            type: schema_1.UserType,
            args: {
                name: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            async resolve(parent, { name, email, password }) {
                let existingUser;
                try {
                    existingUser = await User_1.default.findOne({ email });
                    if (existingUser)
                        return new Error("User already exist!");
                    const encryptedPassword = (0, bcryptjs_1.hashSync)(password);
                    const user = new User_1.default({ name, email, password: encryptedPassword });
                    return await user.save();
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //user login
        login: {
            type: schema_1.UserType,
            args: {
                email: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                password: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            async resolve(parent, { email, password }) {
                let existingUser;
                try {
                    existingUser = await User_1.default.findOne({ email });
                    if (!existingUser)
                        return new Error("User is not registered!");
                    const decryptedPassword = (0, bcryptjs_1.compareSync)(password, 
                    //@ts-ignore
                    existingUser.password);
                    if (!decryptedPassword)
                        return new Error("Incorrect password!");
                    return existingUser;
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //create blog
        addBlog: {
            type: schema_1.BlogType,
            args: {
                title: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                user: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            async resolve(parent, { title, content, date, user }) {
                let blog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    blog = new Blog_1.default({ title, content, date, user });
                    const existingUser = await User_1.default.findById(user);
                    if (!existingUser)
                        return new Error("User is not registered!");
                    //@ts-ignore
                    existingUser.blogs.push(blog);
                    await existingUser.save({ session });
                    return await blog.save({ session });
                }
                catch (error) {
                    return new Error(error);
                }
                finally {
                    await session.commitTransaction();
                }
            },
        },
        //update blog
        updateBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
                title: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                content: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            async resolve(parent, { id, title, content }) {
                let existingBlog;
                try {
                    existingBlog = await Blog_1.default.findById(id);
                    if (!existingBlog)
                        return new Error("Blog does not exist!");
                    return await Blog_1.default.findByIdAndUpdate(id, { title, content }, { new: true });
                }
                catch (error) {
                    return new Error(error);
                }
            },
        },
        //delete blog
        deleteBlog: {
            type: schema_1.BlogType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingBlog;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    existingBlog = await Blog_1.default.findById(id).populate("user");
                    //@ts-ignore
                    const existingUser = existingBlog.user;
                    if (!existingUser || !existingBlog)
                        return new Error("User or blog does not exist!");
                    existingUser.blogs.pull(existingBlog);
                    await existingUser.save({ session });
                    return await Blog_1.default.findOneAndDelete(existingBlog.id);
                }
                catch (error) {
                    return new Error(error);
                }
                finally {
                    session.commitTransaction();
                }
            },
        },
        //add comment to blog
        addCommentToBlog: {
            type: schema_1.CommentType,
            args: {
                blog: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
                user: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
                text: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
                date: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLString) },
            },
            async resolve(parent, { blog, user, text, date }) {
                let comment;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    const existingBlog = await Blog_1.default.findById(blog);
                    const existingUser = await User_1.default.findById(user);
                    if (!existingUser || !existingBlog)
                        return new Error("User or blog does not exist!");
                    comment = new Comment_1.default({ text, date, blog, user });
                    //@ts-ignore
                    existingBlog.comments.push(comment);
                    //@ts-ignore
                    existingUser.comments.push(comment);
                    await existingBlog.save({ session });
                    await existingUser.save({ session });
                    return await comment.save({ session });
                }
                catch (error) {
                    return new Error(error);
                }
                finally {
                    session.commitTransaction();
                }
            },
        },
        //delete comment from blog
        deleteComment: {
            type: schema_1.CommentType,
            args: {
                id: { type: (0, graphql_1.GraphQLNonNull)(graphql_1.GraphQLID) },
            },
            async resolve(parent, { id }) {
                let existingComment;
                const session = await (0, mongoose_1.startSession)();
                try {
                    session.startTransaction({ session });
                    existingComment = await Comment_1.default.findById(id);
                    if (!existingComment)
                        return new Error("Comment does not exist!");
                    //@ts-ignore
                    const existingBlog = await Blog_1.default.findById(existingComment.blog);
                    //@ts-ignore
                    const existingUser = await User_1.default.findById(existingComment.user);
                    if (!existingUser || !existingBlog)
                        return new Error("User or blog does not exist!");
                    //@ts-ignore
                    existingBlog.comments.pull(existingComment);
                    //@ts-ignore
                    existingUser.comments.pull(existingComment);
                    await existingBlog.save({ session });
                    await existingUser.save({ session });
                    return await Comment_1.default.findOneAndDelete(existingComment.id);
                }
                catch (error) {
                    return new Error(error);
                }
                finally {
                    session.commitTransaction();
                }
            },
        },
    },
});
exports.default = new graphql_1.GraphQLSchema({ query: RootQuery, mutation: mutations });
//# sourceMappingURL=handlers.js.map