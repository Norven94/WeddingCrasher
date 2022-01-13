import React from 'react'

const ProgressBar = ({ completed }) => {

    const progressContainer = {
        height: 20,
        width: '100%',
        backgroundColor: '#707070',
        borderRadius: 50,  
        boxShadow: '1px 1px 4px #00000050'
    }

    const doneStyles = {
        height: '100%',
        width: `${completed}%`,
        backgroundColor: '#FF9B9B',
        borderRadius: 'inherit',
        textAlign: 'right',
        transition: 'width 1s ease-in-out',
    }

    const completedSpan = {
        padding: 5,
        color: '#fff',
        fontWeight: 'bold',
    }

    return (
        <div style={progressContainer}>
            <div style={doneStyles}>
                <span style={completedSpan}>{`${completed}%`}</span>
            </div>
        </div>
    );
}

export default ProgressBar
