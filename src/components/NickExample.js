import React, { Component } from "react";
import butter from "../buttercms-client-nick";
import * as api from "../api";
import "../App.css";

class NickExample extends Component {
  state = {
    meta: {},
    restaurants: [],
    addNewData: {
      name: "",
      cuisine: "Burgers",
      description: ""
    }
  };

  fetchAllRestaurants = () => {
    api.getAllRestaurants().then(({ meta, restaurants }) => {
      this.setState({ meta, restaurants });
    });
  };

  addRestaurant = () => {
    console.log("addRestaurant");
    const { restaurants } = this.state;
    const { name, cuisine, description } = this.state.addNewData;
    api.generateUid().then(newUid => {
      const data = {
        key: "restaurants",
        status: "published",
        fields: [
          {
            name,
            cuisine,
            description,
            uid: newUid
          }
        ]
      };
      api
        .postRestaurant(data)
        .then(response => {
          alert(`Sucessfully added the ${cuisine} restaurant ${name}`);
          this.setState({
            restaurants: [...restaurants, { name, description, cuisine }]
          });
        })
        .catch(err => {
          console.log("ERROR", err);
        });
    });
  };

  handleChange = ({ target }) => {
    this.setState(currentState => {
      const { addNewData, ...keys } = currentState;
      addNewData[target.id] = target.value;
      return { ...keys, addNewData };
    });
  };

  handleSubmit = event => {
    event.preventDefault();
    const { name, cuisine, description } = this.state;
    this.addRestaurant({ name, cuisine, description });
  };

  render() {
    const { meta, restaurants } = this.state;
    const { name, cuisine, description } = this.state.addNewData;
    return (
      <div className="App">
        <h2>
          Nicks Example Request: <br />
          Found {meta.count} result{meta.count > 1 ? "s" : ""} from Restaurants
        </h2>
        <ul>
          {restaurants.map(restaurant => {
            return (
              <li key={restaurant.uid}>
                <h3>{restaurant.name}</h3>
                <p>
                  <strong>Cuisine:</strong> {restaurant.cuisine}
                </p>
                <p>
                  <strong>Description:</strong> {restaurant.description}
                </p>
              </li>
            );
          })}
        </ul>
        <form onSubmit={this.handleSubmit}>
          <h3>Add a Restaurant</h3>
          <label>
            Name:
            <input
              type="text"
              onChange={this.handleChange}
              id="name"
              value={name}
            ></input>
          </label>
          <br />
          <label>
            Cuisine:
            <select id="cuisine" onChange={this.handleChange} value={cuisine}>
              <option value="Burgers">Burgers</option>
              <option value="Pizza">Pizza</option>
              <option value="Pov food">Pov food</option>
              <option value="Mexican">Mexican</option>
              <option value="Indian">Indian</option>
            </select>
          </label>
          <br />
          <label>
            Description:
            <textarea
              id="description"
              onChange={this.handleChange}
              value={description}
            ></textarea>
          </label>
          <br />
          <button>Submit</button>
        </form>
      </div>
    );
  }

  componentDidMount() {
    // butter.content.retrieve(["restaurants"]).then(response => {
    //   // console.log("restaurants response:", response);
    //   const { meta } = response.data;
    //   const { restaurants } = response.data.data;
    //   this.setState({ meta, restaurants });
    // });
    this.fetchAllRestaurants();
  }
}

export default NickExample;
