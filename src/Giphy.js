import React, { Component } from "react";

class Giphy extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: []
		};
	}

	searchChangeHandler = event => {
		this.performSearch(event.target.value);
	};

	performSearch(searchTerm) {
		const url = `https://api.giphy.com/v1/gifs/search?api_key=8t37PiSdO3jpby2k4PRtimDMi7Z1kiqD&q=${searchTerm}&limit=6&offset=0&rating=G&lang=en`;
		fetch(url)
			.then(data => data.json())
			.then(response => {
				let movies = response.data;
				var movieRows = [];
				movies.forEach(movie => {
					const movieRow = (
						<div key={movie.id} style={{display: "inline-block", paddingTop: "40px", paddingLeft: "20px"}}>
							<img alt="poster" src={movie.images.downsized_large.url} style={{width: "500px", height: "300px"}}></img>
                            <p style={{backgroundColor: "red", color: "yellow", fontSize: "30px", fontWeight: "bold"}}>{movie.title}</p>
						</div>
					);
					movieRows.push(movieRow);
				});
				this.setState({ rows: movieRows });
			})
			.catch(error => {
				console.error("Error coming from API:   ", error);
			});
	}

	render() {
		return (
			<div>
				<h1 style={{color: "green"}}>Giphy Search</h1>
				<input
					id="inputField"
                    onChange={this.searchChangeHandler}
                    style={{width: "250px", height: "30px", backgroundColor: "red", color: "yellow", fontSize: "30px", fontWeight: "bold"}}
					></input>
                <br></br>
				{this.state.rows}
			</div>
		);
	}
}

export default Giphy;
