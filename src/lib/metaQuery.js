export const EQUAL_TO = 'EQUAL_TO'
export const NOT_EQUAL_TO = 'NOT_EQUAL_TO'
export const GREATER_THAN = 'GREATER_THAN'
export const LESS_THAN = 'LESS_THAN'
export const TYPE_NUMERIC = 'NUMERIC'
export const TYPE_DATE = 'DATE'
export const TYPE_CHAR = 'CHAR'

export function carsQueryCondition (metaConditions = [], offset = 0, size = 20) {
  return {
    metaQuery: {
      metaArray: [
        { compare: NOT_EQUAL_TO, key: 'pics', value: null },
        { compare: NOT_EQUAL_TO, key: 'level_id', value: null },
        { compare: NOT_EQUAL_TO, key: 'buy_price', value: null },
        { compare: NOT_EQUAL_TO, key: 'org_id', value: null },
        ...metaConditions
      ]
    },
    offsetPagination: {
      offset,
      size
    }
  }
}
