import React from 'react';
import { Component } from 'react';
import ApiContext from '../ApiContext';
import PropTypes from 'prop-types';

class AddNote extends Component {
  constructor(props) {
    super(props);
    this.state = {
      noteName: '',
      noteContent: '',
      targetFolderId: '',
    };
  }

  static contextType = ApiContext;

  handleSubmit(e) {
    e.preventDefault();
    const { addNote } = this.context;
    const modified = new Date().toISOString();

    fetch('http://localhost:9000/api/notes', {
      method: 'POST',
      body: JSON.stringify({
        note_name: this.state.noteName,
        date_modified: modified,
        folderId: this.state.targetFolderId,
        content: this.state.noteContent,
      }),
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error('Something went wrong, could not add new note');
        }
        return res.json();
      })
      .then((data) => {
        addNote(data);
        this.setState({
          noteName: '',
          noteContent: '',
          targetFolderId: '',
        });
        this.props.history.goBack();
      })
      .catch((err) => {
        alert(err);
      });
  }

  updateNote(newNoteName) {
    this.setState({ noteName: newNoteName });
  }

  updateContent(newContent) {
    this.setState({
      noteContent: newContent,
    });
  }

  updateTargetFolder(newTargetFolder) {
    this.setState({
      targetFolderId: newTargetFolder,
    });
  }

  render() {
    const { folders } = this.context;

    const selectOptions = folders.map((folder, i) => {
      return (
        <option key={i} value={folder.id}>
          {folder.name}
        </option>
      );
    });

    const error = this.state.error ? (
      <div className='error'>{this.state.error}</div>
    ) : (
      ''
    );

    return (
      <div className='AddNote'>
        <form className='newNoteForm' onSubmit={(e) => this.handleSubmit(e)}>
          <fieldset>
            <legend>Create a New Note</legend>
            <label htmlFor='noteName'>Enter your note name here:</label>
            <br />
            <input
              type='text'
              name='noteName'
              id='noteName'
              value={this.state.noteName}
              onChange={(e) => this.updateNote(e.target.value)}
            />
            <br />
            <label htmlFor='noteContent'>Note Text:</label>
            <br />
            <textarea
              id='noteContent'
              name='noteContent'
              rows='6'
              cols='40'
              value={this.state.noteContent}
              onChange={(e) => this.updateContent(e.target.value)}
            />
            <br />
            <label htmlFor='targetFolder'>Select a folder</label>
            <br />
            <select
              name='targetFolder'
              id='targetFolder'
              onChange={(e) => this.updateTargetFolder(e.target.value)}
            >
              <option value={''}> --- </option> {selectOptions}{' '}
            </select>
            <br />
            <button
              type='submit'
              disabled={
                !(this.state.noteName.length > 0) ||
                !(this.state.noteContent.length > 0) ||
                !(this.state.targetFolderId.length > 0)
              }
            >
              Add New Note
            </button>
          </fieldset>
        </form>
        <button onClick={() => this.props.history.goBack()}>Cancel</button>
      </div>
    );
  }
}

AddNote.propTypes = {
  history: PropTypes.object,
  goback: PropTypes.func,
};

export default AddNote;
