import React from 'react';
import BookList from './components/BookList'
import AddBook from './components/AddBook'
import { ApolloClient, InMemoryCache,ApolloProvider } from '@apollo/client';
// Apollo Client Setup
const client = new ApolloClient({
  // same as the GraphQl server URI set in the backend
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <div className="container">
        <h1>My Reading List</h1>
        <BookList />
        <AddBook/>
      </div>
    </ApolloProvider>
  );
}

export default App;

//apolloclient->this ensure the end point two which the queries have to be made
//apolloprovider-> this make sure the enject the data from server into our application