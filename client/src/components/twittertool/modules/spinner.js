import React from 'react';

export const Spinner = props => {
    return (
      <div
        className="preloader-wrapper small active"
        style={{
        top: '10px',
        marginLeft: '5px',
        display: (props.loading === "tweet-parser" ? 'inline-block' : 'none')
      }}>
        <div className="spinner-layer spinner-blue-only">
          <div className="circle-clipper left">
            <div className="circle"></div>
          </div><div className="gap-patch">
            <div className="circle"></div>
          </div><div className="circle-clipper right">
            <div className="circle"></div>
          </div>
        </div>
      </div>
    )
  }

