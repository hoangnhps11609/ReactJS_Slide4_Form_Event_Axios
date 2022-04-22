import axios from "axios";
import React, { Component } from "react";

export class PictureSearch extends Component {
  state = {
    query: "",
    results: [],
  };
  handleInputChanged = (event) => {
    const { value } = event.target;
    this.setState({ query: value });
    // console.log(event.target);
    // console.log(this.state);
  };

  onSearchSubmit = async (event) => {
    event.preventDefault();

    const { query } = this.state;

    const response = await axios.get("https://api.unsplash.com/search/photos", {
      params: { query },
      headers: {
        Authorization: "Client-ID o9zbbwkz4EwLgWVkW65BVzNO9sFSypgQYy1hJ_GFk7M",
      },
    });
    console.log(response.data.results);

    const newResults = response.data.results.map((item) => {
      return {
        id: item.id,
        altDescription: item.alt_description,
        smallUrl: item.urls.small,
      };
    });
    this.setState({ results: newResults });
  };

  render() {
    return (
      <div>
        <div className="ui segment container" style={{ marginTop: 50 }}>
          <form className="ui form" onSubmit={this.onSearchSubmit}>
            <div className="field">
              <div className="ui icon input">
                <input
                  type="text"
                  placeholder="Search picture...."
                  onChange={this.handleInputChanged}
                />
                <i className="search icon" />
              </div>
            </div>
          </form>
        </div>
        <div className="ui divider" />
        <div className="ui four column grid container">
          {this.state.results.length > 0 &&
            this.state.results.map((item) => (
              <div key={item.id} className="column">
                <div className="ui card">
                  <div className="image">
                    <img src={item.smallUrl} alt={item.altDescription} />
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    );
  }
}

export default PictureSearch;
