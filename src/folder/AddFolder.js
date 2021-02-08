import React from "react";
import { BASE_URL } from "../GlobalFuncs";
import APIContext from "../APIContext";
import PropTypes from "prop-types";

import PostError from "../PostError";

export default class AddFolder extends React.Component {
  state = {
    name: {
      value: "",
      touched: false,
    },
  };
  static defaultProps = {
    match: {
      params: {},
    },
    history: {
      goBack: () => {},
    },
    onAddFolder: () => {},
  };
  //pass the folders and notes
  static contextType = APIContext;

  validateName() {
    const name = this.state.name.value.trim();
    if (name.length === 0) {
      return "Name is required";
    } else if (this.context.folders.find((folder) => folder.name === name)) {
      return "Name must be unique";
    }
  }
  updateName(name) {
    this.setState({ name: { value: name, touched: true } });
  }

  render() {
    const handleSubmitFolder = (e) => {
      e.preventDefault();
      console.log(this.state.name.value);
      fetch(`${BASE_URL}/folders`, {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ folder_name: this.state.name.value }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("Cannot add this folder");
          return res.json();
        })
        .then((data) => {
          this.context.getStateUpdate();
          this.props.history.goBack();
        })
        .catch((error) => {
          console.error({ error });
        });
    };
    return (
      <PostError>
        <section className="addNewFolder">
          <form
            className="new-folder-form"
            onSubmit={(e) => handleSubmitFolder(e)}
          >
            <h2>Create a New Folder</h2>
            <label htmlFor="folder-input">Folder name:</label>
            <input
              type="text"
              id="folder-input"
              onChange={(e) => this.updateName(e.target.value)}
            ></input>
            <button type="submit" disabled={this.validateName()}>
              Add folder
            </button>
            <p className="errors">
              {this.state.name.touched ? this.validateName() : ""}
            </p>
          </form>
        </section>
        '
      </PostError>
    );
  }
}

AddFolder.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onAddFolder: PropTypes.func,
};
