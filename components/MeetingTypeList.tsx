"use client"
import Image from 'next/image'
import { useState } from 'react'
import HomeCard from './HomeCard'
import { useRouter } from 'next/navigation'
import MeetingModel from './MeetingModel'
import { useUser } from '@clerk/nextjs'
import { Call, useStreamVideoClient } from '@stream-io/video-react-sdk'
import { useToast,  } from "@/components/ui/use-toast"
import { Textarea } from '@/components/ui/textarea'
import ReactDatePicker from 'react-datepicker'


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
    const meetingLink =`${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`
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
             {!callDetails ?(
                <MeetingModel
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Create Meeting"
                handleClick={creaeMeeting} >

                    <div className='flex flex-col gap-2.5'>
                        <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Add a Description
                        </label>
                        <Textarea className='border-none bg-dark-3 focus-visible:ring-0 focus-visible:ring-offset-0' onChange={(e)=>{setValues({...values,description : e.target.value})}}/>

                    </div>
                    <div className='flex w-full flex-col gap-2.5'>
                    <label className='text-base text-normal leading-[22px] text-sky-2'>
                            Set Date and Time
                        </label>
                        <ReactDatePicker 
                        selected={values.dateTime}
                        onChange={(date)=>setValues({...values, dateTime:date!})}
                        showTimeSelect
                        timeFormat='HH:mm'
                        timeIntervals={15}
                        timeCaption='time'
                        dateFormat='MMM d, yyyy h:mm aa'
                        className='w-full rounded bg-dark-3 p-2 focus:outline-none'
                        />

                    </div>
                </MeetingModel>
             ) : (
                <MeetingModel
                isOpen={meetingState === 'isScheduleMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Meeting Created"
                className="text-center"
                
                handleClick={ () =>{
                   navigator.clipboard.writeText(meetingLink);
                    toast({title :'Link copied'})
                }}
                image= "/icons/checked.svg"
                buttonIcon='/icons/copy.svg'
                buttonText="copy meeting Link"

                 />
             )}
            <MeetingModel
                isOpen={meetingState === 'isInstantMeeting'}
                onClose={() => setMeetingState(undefined)}
                title="Start instant Meeting"
                className="text-center"
                buttonText="Start Meeting"
                handleClick={creaeMeeting} />

        </section>
    )
}

export default MeetingTypeList