import React from 'react'
import Hero from 'components/Hero'
import Breadcrumb from 'components/Breadcrumb'
/* eslint-disable react/prop-types */
const Page = ({
  children,
  breadcrumbs,
  back,
  heroProps
}) => {
  return (
    <>
      <Hero {...heroProps} />
      {
        breadcrumbs && <Breadcrumb back={back} breadcrumbs={breadcrumbs} />
      }
      {children}
    </>
  )
}
export default Page
