import {useEffect, useState} from 'react'
import PropTypes from "prop-types";

const Toggleable = (props) => {
    const [visible, setVisible] = useState(props.show)

    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    useEffect(
        () => {
            setVisible(props.show)
        },
        [props.show]
    )

    const toggleVisibility = () => {
        const newVisible = !visible
        props.setShowCreateForm(newVisible)
    }

    return (
        <div>
            <div style={hideWhenVisible}>
                <button onClick={toggleVisibility} id={`${props.buttonLabel.replace(" ", "-")}-button`}>{props.buttonLabel}</button>
            </div>
            <div style={showWhenVisible}>
                {props.children}
                <button onClick={toggleVisibility}>cancel</button>
            </div>
        </div>
    )
}

Toggleable.propTypes = {
    buttonLabel: PropTypes.string.isRequired,
    show: PropTypes.bool.isRequired,
    setShowCreateForm: PropTypes.func.isRequired
}

export default Toggleable