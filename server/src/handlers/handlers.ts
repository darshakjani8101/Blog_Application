import {
  GraphQLID,
  GraphQLList,
  GraphQLNonNull,
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLString,
} from "graphql";
import { BlogType, CommentType, UserType } from "../schema/schema";
import User from "../models/User";
import Blog from "../models/Blog";
import Comment from "../models/Comment";
import { Document, startSession } from "mongoose";
import { compareSync, hashSync } from "bcryptjs";

type DocumentType = Document<any, any, any>;

const RootQuery = new GraphQLObjectType({
  name: "RootQuery",
  fields: {
    //get all users
    users: {
      type: GraphQLList(UserType),
      async resolve() {
        try {
          return await User.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get user by id
    user: {
      type: UserType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, { id }) {
        try {
          return await User.findById(id).populate("blogs");
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get all blogs
    blogs: {
      type: GraphQLList(BlogType),
      async resolve() {
        try {
          return await Blog.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get blog by id
    blog: {
      type: BlogType,
      args: { id: { type: GraphQLNonNull(GraphQLID) } },
      async resolve(parent, { id }) {
        try {
          return await Blog.findById(id).populate("user comments");
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //get all comments
    comments: {
      type: GraphQLList(CommentType),
      async resolve() {
        try {
          return await Comment.find();
        } catch (error) {
          return new Error(error);
        }
      },
    },
  },
});

const mutations = new GraphQLObjectType({
  name: "mutations",
  fields: {
    //user signup
    signup: {
      type: UserType,
      args: {
        name: { type: GraphQLNonNull(GraphQLString) },
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { name, email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email });
          if (existingUser) return new Error("User already exist!");
          const encryptedPassword = hashSync(password);
          const user = new User({ name, email, password: encryptedPassword });
          return await user.save();
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //user login
    login: {
      type: UserType,
      args: {
        email: { type: GraphQLNonNull(GraphQLString) },
        password: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { email, password }) {
        let existingUser: DocumentType;
        try {
          existingUser = await User.findOne({ email });
          if (!existingUser) return new Error("User is not registered!");
          const decryptedPassword = compareSync(
            password,
            //@ts-ignore
            existingUser.password
          );
          if (!decryptedPassword) return new Error("Incorrect password!");
          return existingUser;
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //create blog
    addBlog: {
      type: BlogType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
        user: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { title, content, date, user }) {
        let blog: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          blog = new Blog({ title, content, date, user });
          const existingUser = await User.findById(user);
          if (!existingUser) return new Error("User is not registered!");
          //@ts-ignore
          existingUser.blogs.push(blog);
          await existingUser.save({ session });
          return await blog.save({ session });
        } catch (error) {
          return new Error(error);
        } finally {
          await session.commitTransaction();
        }
      },
    },

    //update blog
    updateBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
        title: { type: GraphQLNonNull(GraphQLString) },
        content: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { id, title, content }) {
        let existingBlog: DocumentType;
        try {
          existingBlog = await Blog.findById(id);
          if (!existingBlog) return new Error("Blog does not exist!");
          return await Blog.findByIdAndUpdate(
            id,
            { title, content },
            { new: true }
          );
        } catch (error) {
          return new Error(error);
        }
      },
    },

    //delete blog
    deleteBlog: {
      type: BlogType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingBlog: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          existingBlog = await Blog.findById(id).populate("user");
          //@ts-ignore
          const existingUser = existingBlog.user;
          if (!existingUser || !existingBlog)
            return new Error("User or blog does not exist!");
          existingUser.blogs.pull(existingBlog);
          await existingUser.save({ session });
          return await Blog.findOneAndDelete(existingBlog.id);
        } catch (error) {
          return new Error(error);
        } finally {
          session.commitTransaction();
        }
      },
    },

    //add comment to blog
    addCommentToBlog: {
      type: CommentType,
      args: {
        blog: { type: GraphQLNonNull(GraphQLID) },
        user: { type: GraphQLNonNull(GraphQLID) },
        text: { type: GraphQLNonNull(GraphQLString) },
        date: { type: GraphQLNonNull(GraphQLString) },
      },
      async resolve(parent, { blog, user, text, date }) {
        let comment: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          const existingBlog = await Blog.findById(blog);
          const existingUser = await User.findById(user);
          if (!existingUser || !existingBlog)
            return new Error("User or blog does not exist!");
          comment = new Comment({ text, date, blog, user });
          //@ts-ignore
          existingBlog.comments.push(comment);
          //@ts-ignore
          existingUser.comments.push(comment);
          await existingBlog.save({ session });
          await existingUser.save({ session });
          return await comment.save({ session });
        } catch (error) {
          return new Error(error);
        } finally {
          session.commitTransaction();
        }
      },
    },

    //delete comment from blog
    deleteComment: {
      type: CommentType,
      args: {
        id: { type: GraphQLNonNull(GraphQLID) },
      },
      async resolve(parent, { id }) {
        let existingComment: DocumentType;
        const session = await startSession();
        try {
          session.startTransaction({ session });
          existingComment = await Comment.findById(id);
          if (!existingComment) return new Error("Comment does not exist!");
          //@ts-ignore
          const existingBlog = await Blog.findById(existingComment.blog);
          //@ts-ignore
          const existingUser = await User.findById(existingComment.user);
          if (!existingUser || !existingBlog)
            return new Error("User or blog does not exist!");
          //@ts-ignore
          existingBlog.comments.pull(existingComment);
          //@ts-ignore
          existingUser.comments.pull(existingComment);
          await existingBlog.save({ session });
          await existingUser.save({ session });
          return await Comment.findOneAndDelete(existingComment.id);
        } catch (error) {
          return new Error(error);
        } finally {
          session.commitTransaction();
        }
      },
    },
  },
});

export default new GraphQLSchema({ query: RootQuery, mutation: mutations });
