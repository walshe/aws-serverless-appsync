import React, { useState, useEffect } from "react";
import { API, graphqlOperation } from 'aws-amplify';
import { withAuthenticator, AmplifySignOut } from '@aws-amplify/ui-react';
import { getBookById } from "./graphql/queries/book";
import { onCreateBook } from "./graphql/subscriptions/book";
import './App.css';
import { toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css";

toast.configure()

function App() {

  const [book, setBook] = useState(null);

  //runs one time when the application loads
  useEffect(() => {
    //debugger
    const subscription = API.graphql(graphqlOperation(onCreateBook)).subscribe({
      next: (result) => {
        //debugger
        console.log(result);
        toast("New Book Added!")
        const newBook = result.value.data.onCreateBook;
        //debugger
        setBook(newBook)
      }
    });

  }, [])

  const getBook = async () => {
    // make a call to appsync apim- graphqlOperation  
    // const book = await API.graphql(graphqlOperation(getBookById, { id: "97d97d2d-87b6-4e81-97da-8a63a1f8ae9f" }));

    // use API.graphql for IAM_IAM authMode!
    const book = await API.graphql({
      query: getBookById,
      variables: { id: "97d97d2d-87b6-4e81-97da-8a63a1f8ae9f" },
      authMode: 'AWS_IAM'
    });

    setBook(book.data.getBookById);
  }

  const viewBook = () => {
    if (book) {
      return (<article>
        <h3>{book.title}</h3>
        <p>{book.description}</p>
        <p>{book.author}</p>
        <h4>{book.price}</h4>
      </article>)
    }
  }



  return (

    <div>
      <AmplifySignOut />
      <section className="book-section">
        My App
        <button onClick={() => getBook()}>Get book details</button>
        <hr />
        {viewBook()}
      </section>
    </div>
  );
}

export default withAuthenticator(App); //turn off to test the unauthenticated IAM role
//export default App;
