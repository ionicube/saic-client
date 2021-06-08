import React from 'react'
import Image from 'next/image'
import {
  Section,
  Container,
  Heading
} from 'react-bulma-components'
import PropTypes from 'prop-types'
import classNames from 'classnames'
import heroStyle from './H.module.scss'
/* eslint-disable react/prop-types */
const Hero = ({
  classname,
  cover,
  title,
  autoHieght = false,
  centered = false,
  children
}) => {
  return (
    <Section className={classNames(
      heroStyle.section,
      {
        [heroStyle.ah]: autoHieght,
        [heroStyle.centered]: centered
      },
      classname
    )}
    >
      {
        cover && (
          <Image
            src={cover}
            layout='fill'
            objectFit='cover'
            objectPosition='center'
          />
        )
      }
      <Container>
        {
          title && (
            <Heading
              textColor='white'
              className={heroStyle.title}
            >{title}
            </Heading>
          )
        }
        {children}
      </Container>
    </Section>
  )
}

Hero.propTypes = {
  cover: PropTypes.string,
  classname: PropTypes.string
}
export default Hero
