export const flattenEdgesNode = ({
  edges = []
} = {}) => edges.map(({ node }) => node)

export const numberTo10K = (number) => (number / 10000).toFixed(2)
