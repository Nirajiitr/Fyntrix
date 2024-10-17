import React from 'react'
import { Card, CardContent, CardFooter } from '../ui/card'
import { Label } from '../ui/label'
import { Button } from '../ui/button'

const AddressCard = ({addressInfo, handleDeleteAddress, handleEditAddress, setSelectedAddress}) => {
  return (
   <Card onClick={()=>setSelectedAddress(addressInfo)} >
      <CardContent className ="grid gap-4 p-4">
        <Label>Address: {addressInfo?.address}</Label>
        <Label>City: {addressInfo?.city}</Label>
        <Label>Pin Code: {addressInfo?.pincode}</Label>
        <Label>Phone Number: {addressInfo?.phone}</Label>
        <Label>Notes: {addressInfo?.notes}</Label>
      </CardContent>
      <CardFooter className="flex justify-between p-3">
       <Button onClick={()=>handleEditAddress(addressInfo)} >Edit</Button>
       <Button onClick={()=>handleDeleteAddress(addressInfo)}>Delete</Button>
      </CardFooter>
   </Card>
  )
}

export default AddressCard