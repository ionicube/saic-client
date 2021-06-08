import React from 'react'
import {
  Section,
  Container,
  Heading,
  Content,
  Columns,
  Element
} from 'react-bulma-components'
import { newsQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import { flattenEdgesNode } from 'lib/util'
import moment from 'moment'
import Image from 'components/Image'
import Link from 'next/link'
const News = () => {
  const variables = {
    offset: 0,
    size: 6
  }
  const {
    data: {
      news = {}
    } = {}
  } = useApolloGql(newsQuery, { variables })
  const newsList = flattenEdgesNode(news)
  return (
    <Section>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >上汽认证二手车资讯
        </Heading>
        <Columns breakpoint='mobile'>
          {
            newsList.map(({
              id,
              date,
              title,
              featuredImage: {
                node: {
                  sourceUrl
                } = {}
              } = {}
            }) => {
              return (
                <Columns.Column
                  mobile={{ size: 6 }}
                  tablet={{ size: 4 }}
                  key={id}
                >
                  <Link href={`/news/${id}`}>
                    <a>
                      <Image src={sourceUrl} size='5by3' />
                      <Content mt={2}>
                        <Heading size={5} renderAs='h5' mb={2}>{title}</Heading>
                        <Element textSize={7}>{moment(date).format('YYYY-MM-DD')}</Element>
                      </Content>
                    </a>
                  </Link>
                </Columns.Column>
              )
            })
          }
        </Columns>
      </Container>
    </Section>
  )
}
export default News
