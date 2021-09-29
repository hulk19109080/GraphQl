const graphql = require("graphql");
// const _ = require("lodash");
const Book = require("../Modal/Book");
const Author = require("../Modal/Author");

//definition of schema
//of data ,their relationship and mutation
//and how to query these objects

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
  GraphQLNonNull,
} = graphql;

//this helps us to to define
//exactly how the data of us will look like
//the fields should be function multiple types in that case
// helps in refenerencing and knowing them to one other
//root queries -> query that occur while we jump from
//frontend to backend or we can say the default query
const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      genre: { type: GraphQLString },
      author: {
          type: AuthorType,
          resolve(parent, args) {
              console.log(parent)
              // return _.find(authors, { id: parent.authorId })
              return Author.findById(parent.authorId)
          }
      }
  })
})
//resolve function is responsible for grabbing and returnng data
//parent play a imp role
//parent means old data user request

// return _.find(authors, { id: parent.authorId });

// if we do without making field as a  function then unable to fetch in server
//as both will say another is not defined like book say author and author say book
// making function lead whole code to run the excecute


const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
      id: { type: GraphQLID },
      name: { type: GraphQLString },
      age: { type: GraphQLInt },
      books: {
          type: new GraphQLList(BookType),
          resolve(parent, args) {
              // return _.filter(books, { authorId: parent.id })
              return Book.find({ authorId: parent.id })
          }
      }
  })
})


//this fields not require to be wrapped in
//es6 function
//agruments define the base on which our query will occur
//resolve ->helps us in getting the data thats is queried
//from db /other source

// const books = [
//   { name: "name of the rishabh", id: "1", authorId: "1" },
//   { name: "the rishabh", id: "2", authorId: "2" },
//   { name: "name of hitesg", id: "3", authorId: "3" },
//   { name: "name of hverma", id: "4", authorId: "3" },
//   { name: "name of hamirpur", id: "5", authorId: "2" },
//   { name: "name of harami", id: "6", authorId: "3" },
// ];
//each book have an author and each author
//have the books so now the books are attached by author id
// const authors = [
//   { name: "rishbah verma", age: 44, id: "1" },
//   { name: "aryan verma", age: 44, id: "2" },
//   { name: "naitik verma", age: 44, id: "3" },
// ];

// const RootQuery = new GraphQLObjectType({
//   name: "RootQueryType",
//   fields: {
//     book: {
//       type: BookType,
//       args: { id: { type: GraphQLID } },

//       //graphqlid means integer but even then we can use id as string that will also work
//       //now how we can find book with id as string but searching as id of type id
//       //

//       resolve(parent, args) {
//         //code to get data from db/other source
//         //return books.find(book=>book.id==args.id)
//         return Book.findById(args.id);

//         //will be as the string already

//         // return _.find(books, { id: args.id });
//       },
//     },
//     //author rootquery

//     author: {
//       type: AuthorType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         // return _.find(authors, { id: args.id });
//         return Author.findById(args.id);
//       },
//     },

//     //listing all the books

//     books: {
//       type: new GraphQLList(BookType),
//       resolve(parent, args) {
//         // return books
//         return Book.find({});
//       },
//     },
//     authors: {
//       type: new GraphQLList(AuthorType),
//       resolve(parent, args) {
//         // return authors
//         return Author.find({});
//       },
//     },
//   },
// });


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
      book: {
          type: BookType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              //code to get data from db / other source
              // console.log(typeof(args.id)) //still a string
              // return _.find(books, { id: args.id })
              return Book.findById(args.id)
          }
      },
      author: {
          type: AuthorType,
          args: { id: { type: GraphQLID } },
          resolve(parent, args) {
              // return _.find(authors, { id: args.id })
              return Author.findById(args.id)
          }
      },
      books: {
          type: new GraphQLList(BookType),
          resolve(parent, args) {
              // return books
              return Book.find({})
          }
      },
      authors: {
          type: new GraphQLList(AuthorType),
          resolve(parent, args) {
              // return authors
              return Author.find({})
          }
      }
  }
})



//Mutation-> are the methods to update delete edit the data
//Root query-> to fetch the data
// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     //addAuthor is a mutaion to adding the author in db
//     addAuthor: {
//       type: AuthorType,
//       //which type of object is this
//       args: {
//         //how much arguments have to pass to get this

//         name: { type: new GraphQLNonNull(GraphQLString) },
//         age: { type: new GraphQLNonNull(GraphQLInt) },
//       },
//       resolve(parent, args) {
//         //creation of new  and assigning
//         let author = new Author({
//           name: args.name,
//           age: args.age,
//         });
//         return author.save();
//       },
//     },
//     addBook: {
//       type: BookType,
//       args: {
//         //nonnull->make sure it as necessary parameter
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         genre: { type: new GraphQLNonNull(GraphQLString) },
//         authorId: { type: new GraphQLNonNull(GraphQLID) },
//       },
//       resolve(parents, args) {
//         let book = new Book({
//           name: args.name,
//           genre: args.genre,
//           authorId: args.authorId,
//         });
//         return book.save();
//       },
//     },
//   },
// });
const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
      addAuthor: {
          type: AuthorType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              age: { type: new GraphQLNonNull(GraphQLInt) }
          },
          resolve(parent, args) {
              let author = new Author({
                  name: args.name,
                  age: args.age
              })
              return author.save()
          }
      },
      addBook: {
          type: BookType,
          args: {
              name: { type: new GraphQLNonNull(GraphQLString) },
              genre: { type: new GraphQLNonNull(GraphQLString) },
              authorId: { type: new GraphQLNonNull(GraphQLID) }
          },
          resolve(parent, args) {
              let book = new Book({
                  name: args.name,
                  genre: args.genre,
                  authorId: args.authorId
              })
              return book.save()
          }
      }
  }
})


module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
