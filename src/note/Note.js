import React from "react";
import { Link, Redirect } from "react-router-dom";
import { format } from "date-fns";
import PropTypes from "prop-types";

import { BASE_URL, findNote } from "../GlobalFuncs";

import APIContext from "../APIContext";

export default class Note extends React.Component {
  //pass the params
  static defaultProps = {
    match: {
      params: {},
    },
    history: {
      push: () => {},
    },
    onDeleteNote: () => {},
  };
  //pass the folders and notes
  static contextType = APIContext;

  render() {
    const { notes = [] } = this.context;
    console.log("string", notes);
    const { noteId } = this.props.match.params;
    const handleClickDelete = (e) => {
      e.preventDefault();

      fetch(`${BASE_URL}/notes/${noteId}`, {
        method: "DELETE",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) return res.json().then((e) => Promise.reject(e));
          return res.json();
        })
        .then(() => {
          this.context.deleteNote(noteId);
        })
        .catch((error) => {
          console.error({ error });
        });
    };

    const currentNote = findNote(notes, noteId);
    console.log(notes, noteId);
    if (currentNote) {
      return (
        <section>
          <div className="note">
            <h2>
              <Link to={`/note/${currentNote.id}`}>{currentNote.name}</Link>
            </h2>
            <p>
              Date modified:{" "}
              {format(new Date(currentNote.modified), "MM/dd/yyyy")}
            </p>
            <button type="button" onClick={handleClickDelete}>
              Delete Note
            </button>
          </div>
          <textarea cols="60" rows="20" value={currentNote.content}></textarea>
        </section>
      );
    }
  }
}

Note.propTypes = {
  match: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  onDeleteNote: PropTypes.func,
};
