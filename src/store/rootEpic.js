import { combineEpics } from 'redux-observable'
import uiEpics from './ui/epics'
export default combineEpics(...[
  ...uiEpics
])
