import React from 'react'
const RBCForwardRef = Component => React.forwardRef((props, ref) => <Component domRef={ref} {...props} />)
export default RBCForwardRef
