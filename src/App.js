import React from 'react'
import { Route, Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'
import Search from './Search'
import './App.css'

class BooksApp extends React.Component {
	state = {
		books: []
	}

	componentDidMount() {
		BooksAPI.getAll()
		.then( books => { this.setState({ books }) })
	}

	changeShelf = (book, shelf) => {
		BooksAPI.update(book, shelf).then( () => {
			const books = this.state.books.map( newBook => {
				if (newBook.id === book.id) {
					newBook.shelf = shelf;
				};
				return newBook;
			});

			if (books.filter( newBook => newBook.id === book.id ).length === 0) {
				book.shelf = shelf;
				books.push(book);
			}

			this.setState({ books });
		});
	}

	render() {
		return (
			<div className="app">

			<Route exact path='/' render={() => (
				<div className="list-books">
					<div className="list-books-title">
						<h1>My<span className='title-right'>Reads</span></h1>
					</div>
					<div className="list-books-content">
						<div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Currently Reading</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.state.books.filter( (book) => book.shelf === 'currentlyReading')
										.map( (book) => 
											<Book book={book} changeShelf={this.changeShelf} key={book.id} /> 
										)}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Want to Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
									{this.state.books.filter( (book) => book.shelf === 'wantToRead')
										.map( (book) => 
											<Book book={book} changeShelf={this.changeShelf} key={book.id} /> 
										)}
									</ol>
								</div>
							</div>
							<div className="bookshelf">
								<h2 className="bookshelf-title">Read</h2>
								<div className="bookshelf-books">
									<ol className="books-grid">
										{this.state.books.filter( (book) => book.shelf === 'read')
											.map( (book) => 
												<Book book={book} changeShelf={this.changeShelf} key={book.id}/> 
										)}
									</ol>
								</div>
							</div>
						</div>
					</div>
					<div className="open-search">
						<Link to='/search'>Find a Book</Link>
					</div>
				</div>
				
			)} />

			<Route path='/search' render={ () => (
				<Search booksList={this.state.books} changeShelf={this.changeShelf} />	
			)} />
			</div>
		)
	}
}

export default BooksApp