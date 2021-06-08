import React from 'react'
import propTypes from 'prop-types'
const Loading = ({
  children
}) => {
  return (
    <div className='loading'>
      <div className='ball-clip-rotate'>
        <div />
      </div>
      {children}
      {/* language=CSS */}
      <style jsx>{`
        .loading {
          background-color: rgba(255, 255, 255, .2);
          height: 100vh;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          z-index: 150;
          position: fixed;
          left: 0;
          top: 0;
          width: 100vw;
        }
        .ball-clip-rotate > div {
          border-radius: 100%;
          margin: 2px;
          -webkit-animation-fill-mode: both;
                  animation-fill-mode: both;
          border: 2px solid #002d59;
          border-bottom-color: transparent;
          height: 26px;
          width: 26px;
          background: transparent !important;
          display: inline-block;
          -webkit-animation: rotate 0.75s 0s linear infinite;
                  animation: rotate 0.75s 0s linear infinite; }

        @keyframes rotate {
          0% {
            -webkit-transform: rotate(0deg) scale(1);
                    transform: rotate(0deg) scale(1); }
          50% {
            -webkit-transform: rotate(180deg) scale(0.9);
                    transform: rotate(180deg) scale(0.9); }
          100% {
            -webkit-transform: rotate(360deg) scale(1);
                    transform: rotate(360deg) scale(1); } }
      `}
      </style>
    </div>
  )
}
Loading.propTypes = {
  children: propTypes.oneOfType([
    propTypes.node,
    propTypes.string,
    propTypes.object
  ])
}
export default Loading
