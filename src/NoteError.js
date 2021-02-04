import React from 'react'
import PropTypes from 'prop-types'

export default class NoteError extends React.Component {
    state = {
        hasError: false
    }
    static getDerivedStateFromError(error) {
        return {hasError:true}
    }
    render() {
        if (this.state.hasError) {
            return <h2>This note or list of notes could not be displayed.</h2>
        }
        return this.props.children
    }
}


NoteError.propTypes = {
    children: PropTypes.element
}