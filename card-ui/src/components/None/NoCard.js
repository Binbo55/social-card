import React from 'react';
import images from '../../assets/images/index';
import './NoCard.css'

function NoCard() {
    return (
        <div className='empty-card'>
            <img className='empty-image' src={images.empty} />
            <div className='empty-title'>No Results Found</div>
            <div className='empty-content'>
                No content matched your criteria. Try searching for something else.
            </div>
        </div>
    )
}

export default NoCard