import React, { useState } from 'react'
import {
  Section,
  Container,
  Heading,
  Content,
  Columns,
  Element, Tabs
} from 'react-bulma-components'
import Button from 'components/Button'
import Link from 'next/link'
import Image from 'next/image'
import { faqQuery } from 'lib/graphql'
import useApolloGql from 'hooks/useApolloGql'
import { flattenEdgesNode } from 'lib/util'
const Faq = () => {
  const {
    data: {
      faqs = {}
    } = {}
  } = useApolloGql(faqQuery)
  const allFaqs = flattenEdgesNode(faqs)
  const [activeTab, setActiveTab] = useState(0)
  const currentFaqs = flattenEdgesNode(allFaqs[activeTab]?.faqs)
  return (
    <Section>
      <Container>
        <Heading
          textAlign='center'
          mb={6}
        >上汽认证二手车常见问答
        </Heading>
        <Tabs align='center'>
          {
            allFaqs.map(({ name }, index) => {
              return (
                <Tabs.Tab
                  key={index}
                  active={activeTab === index}
                  onClick={() => setActiveTab(index)}
                >{name}
                </Tabs.Tab>
              )
            })
          }
        </Tabs>
        <Columns gap={5}>
          {
            currentFaqs.map(({
              title,
              content,
              id
            }) => (
              <Columns.Column key={id} size={6}>
                <Heading size={6} renderAs='h6' mb={2}>{title}</Heading>
                <Element dangerouslySetInnerHTML={{ __html: content }} textSize={7} />
              </Columns.Column>
            ))
          }

        </Columns>
      </Container>
    </Section>
  )
}
export default Faq
