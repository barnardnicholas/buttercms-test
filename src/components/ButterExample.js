import React, { Component } from "react";
import butter from "../buttercms-client";
import "../App.css";

class ButterExample extends Component {
  state = {
    meta: {},
    data: []
  };

  parseHTML(htmlString) {
    return htmlString;
  }

  render() {
    const { meta, data } = this.state;
    return (
      <div className="App">
        <h2>
          ButterCMS Example Request: <br />
          Found {meta.count} result{meta.count > 1 ? "s" : ""} from API:
        </h2>
        <ul>
          {data.map(result => {
            return (
              <li>
                <h3>{result.title}</h3>
                <p>
                  By {result.author.first_name} {result.author.last_name}
                </p>
                <p>Published {result.published}</p>
                <section>{result.body}</section>
              </li>
            );
          })}
        </ul>
      </div>
    );
  }

  componentDidMount() {
    butter.post.list({ page: 1, page_size: 10 }).then(response => {
      console.dir(response.data);
      const { meta, data } = response.data;
      this.setState({ meta, data });
    });
  }
}

export default ButterExample;
