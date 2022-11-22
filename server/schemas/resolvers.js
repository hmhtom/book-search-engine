const { Book, User } = require("../models");
const { AuthenticationError } = require("apollo-server-express");
const { signToken } = require("../utils/auth");

const resolvers = {
  Query: {
    user: async (parent, { username }) => {
      const user = await User.findOne({ username: username });
      return user;
    },
    me: async (parent, args, context) => {
      if (context.user) {
        return User.findOne({ _id: context.user._id });
      }
      throw new AuthenticationError("You need to be logged in.");
    },
  },

  Mutation: {
    addUser: async (parent, { username, email, password }) => {
      const user = await User.create({ username, email, password });
      const token = signToken(user);
      return { token, user };
    },

    login: async (parent, { email, password }) => {
      const user = await User.findOne({
        email: email,
      });

      if (!user) {
        throw new AuthenticationError("User not found.");
      }

      const correctPW = await user.isCorrectPassword(password);

      if (!correctPW) {
        throw new AuthenticationError("Incorrect credentials.");
      }

      const token = signToken(user);

      return { token, user };
    },

    saveBook: async (
      parent,
      { username, title, authors, description, bookId, image, link }
    ) => {
      return User.findOneAndUpdate(
        { username: username },
        {
          $addToSet: {
            savedBooks: { title, authors, description, bookId, image, link },
          },
        },
        { new: true, runValidators: true }
      );
    },

    deleteBook: async (parent, { username, bookId }) => {
      return User.findOneAndUpdate(
        { username: username },
        { $pull: { savedBooks: { bookId: bookId } } },
        { new: true }
      );
    },
  },
};

module.exports = resolvers;
