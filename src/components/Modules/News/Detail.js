import React from 'react'
import {
  Section,
  Container,
  Heading,
  Content,
  Columns,
  Element
} from 'react-bulma-components'
import {
  newsItemQuery
} from 'lib/graphql'
import Breadcrumb from 'components/Breadcrumb'
import useApolloGql from 'hooks/useApolloGql'
import moment from 'moment'
import newsStyle from './News.module.scss'
/* eslint-disable react/prop-types */
const NewsDetail = ({
  id
}) => {
  const {
    data: {
      newsItem: {
        title,
        date,
        content
      } = {}
    } = {},
    loading
  } = useApolloGql(newsItemQuery, { variables: { id } })
  if (loading) return null
  return (
    <>
      <Breadcrumb
        backgroundColor='light'
        breadcrumbs={[
          { title: '新闻详情' }
        ]}
      />
      <Section
        backgroundColor='white'
        className={newsStyle.detail}
      >
        <Container>
          <Element renderAs='header' mb={6} pb={4} className={newsStyle.header}>
            <Heading
              textAlign='center'
            >{title}
            </Heading>
            <Heading
              mt={1}
              subtitle size={6} textColor='grey' textAlign='center'
            >
              {moment(date).format('YYYY-MM-DD')}
            </Heading>
          </Element>

          <Content
            className={newsStyle.content}
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </Container>
      </Section>
    </>
  )
}
export default NewsDetail
