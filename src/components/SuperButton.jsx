import React from 'react'

const SuperButton = ({title, onClick, className, type, loading}) => {
    return (
        <button className={`${className} superButton`} onClick={onClick} type={type} disabled={loading}>
            {title}
        </button>
    )
}

export default SuperButton