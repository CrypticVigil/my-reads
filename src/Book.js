import React, { Component } from 'react'

class Book extends Component {
	selectChange = (value) => {
		const { changeShelf, book } = this.props;
		changeShelf(book, value);
	}

	render() {
		const { book } = this.props;

		const thumbnail = book.imageLinks ? book.imageLinks.thumbnail : '';

		return (
			<li>
			<div className="book">
			<div className="book-top">
			<div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url( ${thumbnail} )` }}></div>
			<div className="book-shelf-changer">
				<select value={book.shelf ? book.shelf : 'none'} onChange={event => this.selectChange(event.target.value)}>
				<option value="move" disabled>Move to...</option>
				<option value="currentlyReading">Currently Reading</option>
				<option value="wantToRead">Want to Read</option>
				<option value="read">Read</option>
				<option value="none">None</option>
				</select>
			</div>
			</div>
			<div className="book-title">{book.title}</div>
			<div className="book-authors">{book.authors && book.authors.join(', ')}</div>
			</div>
			</li>
		);
	}
}

export default Book;