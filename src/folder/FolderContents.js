import React from 'react'
import { format } from 'date-fns'
import { Link, Redirect } from 'react-router-dom'
import APIContext from '../APIContext'
import { getNotes, BASE_URL } from '../GlobalFuncs'
import PropTypes from 'prop-types'

export default class FolderContents extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        },
        onDeleteNote: () => {}
    }
    //pass the folders and notes
    static contextType = APIContext

    render() { 
        const { notes=[] } = this.context
        const { folderId } = this.props.match.params
        const handleClickDelete = e => {
            e.preventDefault()
            fetch(`${BASE_URL}/notes/${e.target.name}`, {
              method: 'DELETE',
              headers: {
                'content-type': 'application/json'
              },
            })
              .then(res => {
                if (!res.ok)
                  return res.json().then(e => Promise.reject(e))
                return res.json()
              })
              .then(() => {
                this.context.deleteNote(e.target.name)
              })
              .catch(error => {
                console.error({ error })
              })
        }
        const displayNotes = () => {
            const notesToShow = getNotes(notes, folderId)
            return notesToShow.map(note => {
                return (
                    <li key={note.id} className='note'>
                        {/* add link to note */}
                        <h2><Link to={`/note/${note.id}`}>{note.name}</Link></h2>
                        <p>Date modified: {format(new Date(note.modified), 'MM/dd/yyyy')}</p>
                        <button type="button" name={note.id} onClick={handleClickDelete}>Delete Note</button>
                    </li>
                )
            })
        }
        if (getNotes(notes, folderId) !== ' ') {
        return (
            <ul>
                <li><button type="button" className="add-note-btn" onClick={e => this.props.history.push('/new-note')}>Add Note</button></li>
                {displayNotes()}
            </ul>
        )}
        return (<Redirect to={'/'}/>)
    }
} 

FolderContents.propTypes = {
  match: PropTypes.object.isRequired,
  onDeleteNote: PropTypes.func,
}