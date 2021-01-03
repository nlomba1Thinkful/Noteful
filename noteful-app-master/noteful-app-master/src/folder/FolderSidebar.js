import React from 'react';
import { Link } from 'react-router-dom';
import APIContext from '../APIContext'
import PropTypes from 'prop-types'

export default class FolderSidebar extends React.Component {
    //pass the params
    static defaultProps = {
        match: {
            params: {}
        },
        history: {
            push: {}
        }
    }
    //pass the folders and notes
    static contextType = APIContext
    render() {
        const { folders=[] } = this.context
        const { folderId } = this.props.match.params
        const showFolders = () => {
            return folders.map(folder => {
                return folderId === folder.id
                    ? <li className='activeFolder'><Link key={folder.id} to={`/folder/${folder.id}`}>{folder.name}</Link></li>
                    : <li><Link key={folder.id} to={`/folder/${folder.id}`}>{folder.name}</Link></li>
            })
        }
        return (
            <ul>
                {showFolders()}
                <li><button type="button" className="add-folder-btn" onClick={e => this.props.history.push('/new-folder')}>Add Folder</button></li>
            </ul>
        )
    }
}

FolderSidebar.propTypes = {
    match: PropTypes.object.isRequired,
    history: PropTypes.object.isRequired,
}