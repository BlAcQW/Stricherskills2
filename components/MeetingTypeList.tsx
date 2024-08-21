"use client"
import Image from 'next/image'
import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast } from "@/components/ui/use-toast"


const MeetingTypeList = () => {
    
    const router = useRouter();
    const [meetingState, setMeetingState] = useState<'isScheduleMeeting' | 'isJoiningMeeting' | 'isInstantMeeting' | undefined>();
    const [values,setValues] = useState({
        dateTime:new Date(),
       description :"",
       link:"" 
    })
    const [callDetails, setCallDetails] = useState<Call>();
    const { toast } = useToast();
    const {user} =useUser();
    const client =useStreamVideoClient();
    const creaeMeeting = async() => { 
        if(!client||!user) return;
        try {
            if(!values.dateTime){
                toast({title: "Please select Date and Time", })
                return;
            }
            const id =crypto.randomUUID();
            const call=client.call('default' ,id)
            
            if(!call) throw new  Error('falled to create call')

             const startAt=   values.dateTime.toISOString() ||new Date(Date.now()).toISOString();
             const description =values.description || "instant Meeting";

             await call.getOrCreate({
                data :{
                    starts_at:startAt,
                    custom :{
                        description
                    }
                }
             })
             setCallDetails(call);
             if(!values.description){
                router.push(`/meeting/${call.id}`)
             }
             toast({title: "Meeting Created", })
        } catch (error) {
            console.log(error);
            toast({
                title: "Failed to create Meeting",
                
              })
        }
    }
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