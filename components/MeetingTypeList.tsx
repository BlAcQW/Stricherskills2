"use client"
import Image from 'next/image'
import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'

const MeetingTypeList = () => {
    const creaeMeeting = () => { }
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>()
    return (
        <section className='grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4'>
            <HomeCard
                img="/icons/add-meeting.svg"
                title="New Meeting"
                description="Start a New Meeting"
                handleClick={() => setMeetingState('isInstantMeeting')}
                className='bg-orange-1' />

            <HomeCard
                img="/icons/join-meeting.svg"
                title="join Meeting"
                description="Plan your Meeting"
                handleClick={() => setMeetingState('isJoiningMeeting')}
                className='bg-blue-1' />

            <HomeCard
                img="/icons/schedule.svg"
                title=" Schedule Recordings "
                description=" Plan your meetings"
                handleClick={() => setMeetingState('isScheduleMeeting')}
                className='bg-purple-1' />

            <HomeCard
                img="/icons/recordings.svg"
                title="View Recordings"
                description="Check your Recordings"
                handleClick={() => router.push('/recordings')}
                className='bg-yellow-1' />

            <MeetingModel
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={creaeMeeting} />

        </section>
    )
}

export default MeetingTypeList