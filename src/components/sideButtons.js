import locationicon from '../images/location-crosshairs-solid.svg';
import historyicon from '../images/clock-rotate-left-solid.svg';

export default function SideButton({setCurrentLocation, openModal}) {

  return (
    <div>
        <div className='absolute flex h-fit w-full justify-between md:w-fit md:justify-start p-6 space-x-3 bg-transparent z-30'>
            <button className='side-action p-2' onClick={openModal}>
                <img src={historyicon} alt='location history' className='h-5' />
                <span className='tooltip'>IP location history</span>             
            </button>
            <button className='side-action p-2' onClick={setCurrentLocation}>
                <img src={locationicon} alt='your location' className='h-5' />
                <span className='tooltip'>Your current location</span>
            </button>
        </div>
    </div>
  )
}
