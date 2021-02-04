import React from 'react'
import { format } from 'date-fns'
import { BASE_URL } from '../GlobalFuncs'
import PropTypes from 'prop-types'
import APIContext from '../APIContext'

import PostError from '../PostError'

export default class AddNote extends React.Component {
    state= {
        name: {
            value: '',
            touched: false
        },
        content: {
            value: '',
            touched: false
        },
        folder: {
            value: '',
            touched: false
        }
    }
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            goBack: ()=>{}
        },
    }
    //pass the folders and notes
    static contextType = APIContext

    validateName() {
        const name = this.state.name.value.trim()
        if (name.length === 0) {
            return "Name is required"
        }
    }
    updateName(name) {
        this.setState({ name: { value: name, touched: true } });
    }
    validateContent() {
        const name = this.state.name.value.trim()
        if (name.length === 0) {
            return "Name is required"
        }
    }
    updateContent(content) {
        this.setState({ content: { value: content, touched: true } });
    }
    updateFolder(id) {
        this.setState({ folder: { value: id, touched: true } });
    }

    render() {
        const { folders=[] } = this.context
        const now = format(new Date(), 'yyyy-MM-dd') + 'T00:00:00.000Z'
        console.log(now)
        const handleSubmitNote = e => {
            e.preventDefault()
            console.log(this.state.name.value)
            fetch(`${BASE_URL}/notes`, {
              method: 'POST',
              headers: {
                'content-type': 'application/json'
              },
              body: JSON.stringify({ name: this.state.name.value, modified: now, folderId: this.state.folder.value, content: this.state.content.value})
            })
              .then(res => {
                if (!res.ok)
                  throw new Error('Cannot add this note')
                return res.json()
              })
              .then((data) => {
                this.context.getStateUpdate()
                this.props.history.goBack()
              })
              .catch(error => {
                console.error({ error })
              })
        }
        const folderOptions = () => {
            return folders.map(folder => {
                return <option key={folder.id} value={folder.id}>{folder.name}</option>
            })
        }
        return (
            <PostError>
                <section className="addNewNote">
                    <form className="new-note-form" onSubmit={e => handleSubmitNote(e)}>
                        <h2>Create a New Note</h2>
                        <label htmlFor="folder-input">Name:</label>
                        <input 
                            type="text"
                            id="name-input"
                            onChange={e => this.updateName(e.target.value)}
                        ></input>
                        <p className="errors">{this.state.name.touched ? this.validateName() : ''}</p>
                        <label htmlFor="content-input">Note:</label>
                        <textarea
                            type="text"
                            id="content-input"
                            onChange={e => this.updateContent(e.target.value)}
                            rows={20}
                        ></textarea>
                        <label htmlFor="folder-selection">Folder:</label>
                        <select
                            id="folder-selection"
                            onChange={e => this.updateFolder(e.target.value)}
                        >
                            {folderOptions()}
                        </select>
                        <button 
                            className="submit-note"
                            type="submit"
                            disabled={
                                this.validateName()
                            }
                        >Add Note</button>
                    </form>
                </section>
            </PostError>
        )
    }
}

AddNote.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}