import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import * as BooksAPI from './BooksAPI'
import Book from './Book'

class Search extends Component {
	state = {
		query: '',
		books: [],
		booksFound: false
	}

	updateQuery = (query) => {
		this.setState({ query });

		BooksAPI.search(query)
		.then( books => {
			if (books && !books.error) {
				this.setState({ books, booksFound: true })
			} else {
				this.setState({ books: [], booksFound: false })
			}
		});
	}

	render() {
		const setBook = (book) => {
			for (const b of this.props.booksList) {
				if (b.id === book.id) {
					book.shelf = b.shelf;
				}
			}
			return <Book book={book} changeShelf={this.props.changeShelf} key={book.id} />
		}

		return (
			<div className="search-books">
				<div className="search-books-bar">
					<Link className="close-search" to='/'>Close</Link>
					<div className="search-books-input-wrapper">
						<input
							value={this.state.query}
							type="text"
							placeholder="Search by title or author"
							onChange={ event => this.updateQuery(event.target.value) }
						/>
					</div>
				</div>
				<div className="search-books-results">
					<ol className="books-grid">
						{this.state.booksFound ? (
							this.state.books.map(setBook)
							// this.state.books.map( (book) => 
								// for (const b in this.props.booksList) {
								// 	if (b.id === book.id) {
								// 		book.shelf = b.shelf;
								// 	}
								// }
								// <Book
								// 	book={book}
								// 	changeShelf={this.props.changeShelf}
								// 	key={book.id}
								// /> )
							
						) : (
							<div>No books found.</div>
						)}
					</ol>
				</div>
			</div>
		);
	}
}

export default Search;