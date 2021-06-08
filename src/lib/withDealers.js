import withGraphQL from './withGraphQL'
import {
  dealersQuery
} from './graphql'
import { flattenEdgesNode } from './util'

export default function withDealers (Component) {
  return withGraphQL(dealersQuery, ({
    dealers = {}
  }) => {
    return {
      dealers: flattenEdgesNode(dealers).sort(({ Dealer: { order } }, { Dealer: { order: order2 } }) => order - order2)
    }
  })(Component)
}
