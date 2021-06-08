import * as types from './actionTypes'
import { mergeMap } from 'rxjs/operators'
import { ofType } from 'redux-observable'

const sendErrorLogEpic = (action$, state$) => action$.pipe(
  ofType(types.HAS_ERROR),
  mergeMap((action) => {})
)
export default [
  sendErrorLogEpic
]
