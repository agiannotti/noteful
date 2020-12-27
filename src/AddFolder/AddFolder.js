import React from "react";
import { Component } from "react";
import ApiContext from "../ApiContext";
import PropTypes from "prop-types";
import "./AddFolder.css";

class AddFolder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      folderName: "",
    };
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const { addFolder } = this.context;

    fetch("http://localhost:9090/folders", {
      method: "POST",
      body: JSON.stringify({ name: this.state.folderName }),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Something went wrong, could not add new folder");
        }
        return res.json();
      })
      .then((data) => {
        addFolder(data);
        this.setState({ folderName: "" });
        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  updateFolder(newFolderName) {
    this.setState({ folderName: newFolderName });
  }

  render() {
    const error = this.state.error ? (
      <div className="error">{this.state.error}</div>
    ) : (
      ""
    );

    return (
      <div className="AddFolder">
        <form className="newFolderForm" onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>Create a New Folder</legend>
            <label htmlFor="folderName">Enter your folder name here:</label>
            <br />
            <input
              type="text"
              name="folderName"
              id="folderName"
              value={this.state.folderName}
              onChange={(e) => this.updateFolder(e.target.value)}
            />
            <br />
            <button
              type="submit"
              disabled={!(this.state.folderName.length > 0)}
            >
              Add New Folder
            </button>
          </fieldset>
        </form>
        <button onClick={() => this.props.history.goBack()}>Cancel</button>
      </div>
    );
  }
}

AddFolder.propTypes = {
  history: PropTypes.object,
};

export default AddFolder;
