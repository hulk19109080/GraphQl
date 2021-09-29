import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import {
  getAuthorsQuery,
  addBookMutation,
  getBooksQuery,
} from "../queries/queries";

const AddBook = () => {
  const {
    loading: loadingAuthors,
    error: errorAuthors,
    data: dataAuthors,
  } = useQuery(getAuthorsQuery);
  const [addBook, { bookData }] = useMutation(addBookMutation);
  const [name, setName] = useState("");
  const [genre, setGenre] = useState("");
  const [authorId, setAuthorId] = useState("");
  loadingAuthors ? console.log("loading") : console.log(dataAuthors);

  const displayAuthors = () => {
    if (loadingAuthors) {
      return <option disabled>Loading Authors...</option>;
    } else if (errorAuthors) {
      return <option disabled>Something went wrong</option>;
    } else {
      return dataAuthors.authors.map((author) => {
        return (
          <option key={author.id} value={author.id}>
            {author.name}
          </option>
        );
      });
    }
  };

  const submitForm = (e) => {
    e.preventDefault();
    console.log(name + "  " + genre + "  " + authorId);
    addBook({
      variables: {
        name: name,
        genre: genre,
        authorId: authorId,
      },
      refetchQueries: [
        {
          query: getBooksQuery,
        },
      ],
    });
  };

  return (
    <div className="container">
      <form onSubmit={submitForm}>
        <div class="form-group">
          <label>Book name:</label>
          <input
            class="form-control"
            type="text"
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label>Genre:</label>
          <input
            class="form-control"
            type="text"
            onChange={(e) => setGenre(e.target.value)}
          />
        </div>

        <div class="form-group">
          <label>Author:</label>
          <select
            class="form-control"
            onChange={(e) => setAuthorId(e.target.value)}
          >
            <option>Select author</option>
            {displayAuthors()}
          </select>
        </div>

        <button className="btn btn-success">+ Add Author</button>
      </form>
    </div>
  );
};

export default AddBook;
