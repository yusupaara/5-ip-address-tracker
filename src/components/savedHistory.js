import { Menu, Transition } from '@headlessui/react';
import { Fragment, useEffect, useRef, useState } from 'react';
import locationicon from '../images/location-crosshairs-solid.svg';
import historyicon from '../images/clock-rotate-left-solid.svg';

const links = [
    { href: '/account-settings', label: 'Account settings' },
    { href: '/support', label: 'Support' },
    { href: '/license', label: 'License' },
    { href: '/sign-out', label: 'Sign out' },
  ]
  
export default function SavedHistory() {
  return (
    <div>
        <Menu>
        <div className='absolute flex h-fit p-6 space-x-3 bg-transparent z-50'>
            <Menu.Button className='bg-side-tr10 p-2 rounded-full'>
                <img src={historyicon} alt='location history' className='h-5' />              
            </Menu.Button>
            <Menu.Button className='bg-side-tr10 p-2 rounded-full'>
                <img src={locationicon} alt='your location' className='h-5' />
            </Menu.Button>
        </div>
        <Menu.Items>
        {links.map((link) => (
          /* Use the `active` state to conditionally style the active item. */
          <Menu.Item key={link.href} as={Fragment}>
            {({ active }) => (
              <a
                href={link.href}
                className={`${
                  active ? 'bg-blue-500 text-white' : 'bg-white text-black'
                }`}
              >
                {link.label}
              </a>
            )}
          </Menu.Item>
        ))}
      </Menu.Items>
        </Menu>
    </div>
  )
}
