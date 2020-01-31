import React, { useState } from 'react'
import {MeetForCalendar} from './Content'
import { Button, Container } from 'reactstrap'
import { PromiseProvider } from 'mongoose'

interface DeleteProps {
    meet: MeetForCalendar,
    updateMeet: (currentMeet: MeetForCalendar | null) => void
}

const Delete: React.FC<DeleteProps> = props => {

    const deleteMeet = () => {
        props.updateMeet(props.meet)
        console.log('set the current meet to this one')
        console.log(props.meet._id)

        let token = localStorage.getItem('userToken')

        fetch(`${process.env.REACT_APP_SERVER_URL}/meet/${props.meet._id}`, {
            method: 'DELETE',
            body: JSON.stringify(props.meet._id),
            headers: {
            'Content-Type': 'application/json',
            // 'Authorization': `Bearer ${token}`
            }
        })
        .then( (response: Response) => {
            response.json().then(result => {
            if (response.ok) {
                console.log('Response ok')
                console.log('deleted')
            } else {
                // Error
                console.log('error')
            }
            })
            .catch( (err: Error) => console.log(err))
        })
        .catch( (err: Error) => {
            console.log('Error', err)
        })


    }

    return (
        <Button size="sm" color="danger" onClick={deleteMeet}>Delete</Button>
    )
}

export default Delete