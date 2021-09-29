import React from "react";
import { getBookQuery } from "../queries/queries";
import { useQuery } from "@apollo/client";

const BookDetails = (props) => {
  const { loading, error, data } = useQuery(getBookQuery, {
    variables: {
      id: props.bookId,
    },
  });
  // console.log(data ? data.book : null)

  const displayBookDetails = () => {
    if (!loading) {
      const { book } = data;
      if (book) {
        return (
          <div className="container">
            <hr />
            <h3>{book.name}</h3>
            <h4>{book.genre}</h4>
            <h5>{book.author.name}</h5>
            <p>All books by this author</p>
            <ul className="other-books">
              {book.author.books.map((item) => {
                return (
                  <a key={item.id} href="#">
                    {item.name}
                  </a>
                );
              })}
            </ul>
            <hr />
          </div>
        );
      }
    }
  };

  return <div className="container">{displayBookDetails()}</div>;
};

export default BookDetails;
