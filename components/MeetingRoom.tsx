import { cn } from '@/lib/utils'
import { CallControls, CallParticipantsList, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import {useState} from 'react'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { LayoutList } from 'lucide-react'
type CallLayoutType = 'grid' |'speaker-left' | 'speaker-right'

const MeetingRoom = () => {

const [layout, setlayout] = useState<CallLayoutType>('speaker-left')

const [showParticipant, setShowParticipant] = useState(false)

const CallLayout =() =>{
  switch (layout) {
    case 'grid':
      return <PaginatedGridLayout/>
    case 'speaker-right':
      return <SpeakerLayout participantsBarPosition='left'/>
     default :
        return <SpeakerLayout participantsBarPosition='right'/>  
    
  }
}
  return (
    <section className='relative h-full w-full overflow-hidden pt-4 text-white'>
      <div className='relative flex size-full items-center justify-center'>
        <div className='flex size-full max-w-[1000px] items-center '>

        <CallLayout/>
        </div>
        <div className={cn('h-[calc(100vh-86px)] hidden ml-2',{'show-block':showParticipant})}>
          <CallParticipantsList onClose={() => {setShowParticipant(false)}}/>
        </div>
      </div>
      <div className='fixed bottom-0 flex w-full items-center justify-center gap-5'>
        <CallControls />

        {/* <Menu>
          <div className='flex items-center'>
          <MenuButton className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList size={20} className='text-white'/>
            </MenuButton>
          </div>
      
      <MenuItems anchor="bottom" className='border-dark-1 bg-dark-1 text-white'>
        {['Grid','Speaker-Left' ,'Speaker-Right'].
        map((item,index) =>(
            <div key={index}>
                <MenuItem>
                {item}
                </MenuItem>
            </div>
        ))}
      </MenuItems>
    </Menu> */}
     <Menu>
     <div className='flex items-center'>
          <MenuButton className='cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]'>
            <LayoutList size={20} className='text-white'/>
            </MenuButton>
          </div>
      <MenuItems anchor="bottom" className='border-dark-1 bg-dark-1 text-white'>
          
      </MenuItems>
    </Menu>
      </div>
    </section>
  )
}

export default MeetingRoom