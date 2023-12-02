import React from "react";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment } from "react";
import backicon from "../images/angle-left-solid.svg";
import deleteicon from "../images/delete-left-solid.svg";

export default function SavedHistory({ isOpen, closeModal, setHistoryLocation }) {
  let ipHistory = JSON.parse(localStorage.getItem("savedData"));

  const handleDelete = (index) => {
    ipHistory.splice(index, 1);
    localStorage.setItem("savedData", JSON.stringify(ipHistory));
    closeModal();
  }

  const handleHistory = (index) => {
    setHistoryLocation(ipHistory[index]);
    closeModal();
  }

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-50" onClose={() => {}}>
          {/* backdrop blur */}
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 sm:backdrop-blur-sm sm:transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition ease-in-out duration-300 transform"
            enterFrom="translate-x-full"
            enterTo="translate-x-0"
            leave="transition ease-in-out duration-300 transform"
            leaveFrom="translate-x-0"
            leaveTo="translate-x-full"
          >
            <Dialog.Panel className="fixed top-0 right-0 w-full h-full bg-white z-30 shadow-xl transition-all font-rubik p-6 overflow-auto">
              <div className="flex flex-col items-center content-center pt-3 divide-y space-y-6">
                <div className="text-2xl font-bold">Recent History</div>
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 text-lg text-gray-500">
                    {ipHistory.map((item, index) => {
                      const flag = `https://flagsapi.com/${item.location.country}/flat/64.png`;
                      return (
                        <div key={index} className="col-span-1 px-6 break-all">
                          <div className="py-3 flex items-center">
                            <img
                              src={flag}
                              alt={`country flag of ${item.location.country}`}
                              className="px-3 border-solid border-2 rounded-lg"
                            />
                            <div className="w-full flex justify-between">
                              <button className="flex flex-col px-3 leading-none" onClick={() => handleHistory(index)}>
                                <div className="text-xl font-normal line-clamp-1 text-black">
                                  {item.ip}
                                </div>
                                <div className="line-clamp-1 text-gray-400">
                                  {item.location.region},{" "}
                                  {item.location.country}
                                </div>
                              </button>
                              <button className="min-w-max" onClick={() => handleDelete(index)}>
                                <img
                                  src={deleteicon}
                                  alt="delete"
                                  className="h-7"
                                />
                              </button>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            </Dialog.Panel>
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="transition transition duration-[400ms]"
            enterFrom="opacity-0 rotate-180"
            enterTo="opacity-100 rotate-0"
            leave="transition ease-in-out duration-200"
            leaveFrom="opacity-100 rotate-0"
            leaveTo="opacity-0 rotate-180"
          >
            <Dialog.Panel className="fixed top-0 left-0 flex h-fit p-6 space-x-3 bg-transparent z-30 transition-all">
              <button className="bg-white rounded-full p-2" onClick={closeModal}>
                <img
                  src={backicon}
                  alt="location history"
                  className="h-5 w-5"
                />
              </button>
            </Dialog.Panel>
          </Transition.Child>
        </Dialog>
      </Transition>
    </>
  );
}
