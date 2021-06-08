import React from 'react'
import { useRouter } from 'next/router'
import VehicleDetail from 'components/Modules/Vehicles/Detail'
const CarDetail = () => {
  const router = useRouter()
  const {
    query: { id }
  } = router
  return (
    <VehicleDetail id={id} />
  )
}
export default CarDetail
