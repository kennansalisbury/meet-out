import React, {useState} from 'react'
import {Button} from 'reactstrap'
import JoinMeetButton from './JoinMeetButton'
import LeaveMeetButton from './LeaveMeetButton'
import Delete from './Delete'
import moment from 'moment'
import { Decoded } from '../App';
import { MeetForCalendar } from './Content';
// import { DefaultMeetForCalendar } from './Calendar'
import { Redirect } from 'react-router-dom'

interface ModalFooterBodyProps {
    user: Decoded | null,
    currentMeet: MeetForCalendar
    updateMeet: (currentMeet: MeetForCalendar | null) => void
    toggle: () => void
  }
  
const MeetModalFooter: React.FC<ModalFooterBodyProps> = props => {
    
    let [referRedirect, setReferRedirect] = useState('')

    const handleMeet = () => {
        //update the current meet
        props.updateMeet(props.currentMeet)
        setReferRedirect('edit')
    }

    const toShowPage = () => {
        props.updateMeet(props.currentMeet)
        setReferRedirect('show')
    }

    if (referRedirect === 'edit') {
        return (
            <Redirect to='/edit' />
        )
    } else if (referRedirect === 'show') {
    return (
        <Redirect to='/show' />
        )
    }

    let joinButton = <JoinMeetButton toggle={props.toggle} user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>
    let editButton = <Button onClick={handleMeet} size="sm" color="primary" className={'mr-1'}>Edit</Button>
    let cancelButton = <Delete meet={props.currentMeet} updateMeet={props.updateMeet}/>
    let leaveButton = <LeaveMeetButton toggle={props.toggle} user={props.user} currentMeet={props.currentMeet} updateMeet={props.updateMeet}/>
    let viewAllDetailsButton = <Button onClick={toShowPage} size="sm" color="primary" className={'m-1'}>View Full Details</Button>

    let showButtons: JSX.Element[]
    if(props.currentMeet.myPrivateMeet || props.currentMeet.myPublicMeet) {
        showButtons = [viewAllDetailsButton, editButton, cancelButton]
    } else if(!props.currentMeet.myPublicMeet && props.currentMeet.attending) {
        showButtons = [viewAllDetailsButton, leaveButton]
    } else {
        showButtons = [viewAllDetailsButton, joinButton]
    }


    return (
        <div>
            
            {showButtons}
                {/* <Button color="primary" onClick={toggle}>Do Something</Button>
                <Button color="secondary" onClick={toggle}>Cancel</Button> */}

        </div>
    )
}


export default MeetModalFooter