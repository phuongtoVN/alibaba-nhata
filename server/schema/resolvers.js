const { AuthenticationError } = require('apollo-server-express');
const { User, Book } = require('../models'); // Assuming you have Mongoose models for User and Book
const { signToken } = require('../utils/auth');

const resolvers = {
  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findOne({ _id: context.user._id })
          .populate('savedBooks')
          .exec();
        return userData;
      }
      throw new AuthenticationError('Not logged in');
    },
  },
  Mutation: {
    login: async (parent, { email, password }) => {
      // Implement your login logic here
      const user = await User.findOne({ email });
      
      if (!user) {
        throw new AuthenticationError('Invalid email or password.');
      }

      const correctPassword = await user.isCorrectPassword(password);
      
      if (!correctPassword) {
        throw new AuthenticationError('Invalid email or password.');
      }

      // Perform any additional login logic if needed
      
      // Return the user and a token if needed
      const token = signToken(user);/* Generate token here (use signToken or any other method) */;
      return { token, user };
    },
    addUser: async (parent, { username, email, password }) => {
      // Implement your addUser logic here
      const userExists = await User.findOne({ email });
      
      if (userExists) {
        throw new AuthenticationError('User already exists with this email.');
      }

      const user = await User.create({ username, email, password });
      
      // Perform any additional user creation logic if needed
      
      // Return the user and a token if needed
      const token = signToken(user);/* Generate token here (use signToken or any other method) */;
      return { token, user };
    },
    saveBook: async (
      parent,
      { authors, description, title, bookId, image, link },
      context
    ) => {
      if (context.user) {
        const newBook = await Book.create({
          authors,
          description,
          title,
          bookId,
          image,
          link,
        });

        await User.findByIdAndUpdate(
          context.user._id,
          { $push: { savedBooks: newBook._id } },
          { new: true }
        );

        return await User.findOne({ _id: context.user._id })
          .populate('savedBooks')
          .exec();
      }
      throw new AuthenticationError('You need to be logged in to save a book.');
    },
    removeBook: async (parent, { bookId }, context) => {
      if (context.user) {
        await Book.findByIdAndRemove(bookId);

        return await User.findByIdAndUpdate(
          context.user._id,
          { $pull: { savedBooks: bookId } },
          { new: true }
        )
          .populate('savedBooks')
          .exec();
      }
      throw new AuthenticationError(
        'You need to be logged in to remove a book.'
      );
    },
  },
};

module.exports = resolvers;
