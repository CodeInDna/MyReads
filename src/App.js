import React from 'react'
// import * as BooksAPI from './BooksAPI'
import './App.css'
import SearchBooks from './Components/SearchBooks';
import ListBooks from './Components/ListBooks';
import * as BooksAPI from './BooksAPI';
import {Route} from 'react-router-dom';
class BooksApp extends React.Component {
  state = {
    /**
     * TODO: Instead of using this state variable to keep track of which page
     * we're on, use the URL in the browser's address bar. This will ensure that
     * users can use the browser's back and forward buttons to navigate between
     * pages, as well as provide a good URL they can bookmark and share.
     */
    books: []
  }

// get all books
  componentDidMount(){
    BooksAPI.getAll()
    .then(books => {
        this.setState(() => ({
          books
        }))
    })
  }

// update shelf
handleShelfChange = (book, shelf) => {
  book.shelf = shelf;
  this.setState(currentState => ({
    books: currentState.books.filter(b => b.id !== book.id).concat(book)
  }))
  BooksAPI.update(book, shelf)
}

  render() {
    return (
      <div className="app">
        
        <Route path="/" exact
          render={() => (
            <ListBooks books={this.state.books} changeShelf={this.handleShelfChange} />
          )}
        />

        <Route path="/search"
          render={({history}) => (
            <SearchBooks changeShelf={(book, shelf)=> {
              this.handleShelfChange(book, shelf)
              history.push('/')
              }} 
              books={this.state.books}
            />
          )}
        />
      </div>
    )
  }
}

export default BooksApp
