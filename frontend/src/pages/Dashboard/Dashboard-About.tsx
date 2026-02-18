//@ts-nocheck
import React from 'react'
import { useDispatch, useSelector, } from 'react-redux'
import { Map, MapMarker, MarkerContent, MarkerTooltip, MarkerPopup } from '@/components/ui/map';
import { milliTOdate } from '@/utils/dateHandle';

export default function DashboardAbout() {
    const dashboard_Info = useSelector((state) => state.dashController.dashboardInfo)
    const location_Info = useSelector((state) => state.dashController.locationData)
    console.log(location_Info);
    return (
        <div>
            <h3 className=' font-bold text-2xl my-4'>About</h3>
            <p className=' font-light'>Welcome to [Gym Name], where excuses don't burn calories—determination does. Whether you are looking to lift heavy, smash personal records, or start your fitness journey, our state-of-the-art facility is designed to help you build the strongest version of yourself. Featuring top-tier strength equipment, 24/7 access, and elite personal training.</p>

            <h3 className='font-bold  text-xl my-3'>contact</h3>
            <ul>
                <li><span className='font-bold text-sm'>PhoneNO:</span> 131313121</li>
                <li><span className='font-bold text-sm'>Facebook:</span> <a className=' text-blue-500' href="https://www.facebook.com/">https://www.facebook.com/</a></li>
            </ul>
            <h3 className='font-bold text-qxl my-3'>Loaction</h3>
            <div>
                <div className='w-full h-12 px-5 flex items-center rounded-md border border-indigo-600 text-white bg-gray-800 font-medium' >Address: Dgzfdf, HJHGHJ, kgkhgdkshj</div>
                <div className='w-full h-70 mt-6 rounded-md border border-indigo-600'>
                    <Map center={[location_Info.longitude, location_Info.latitude]} zoom={12} >
                        <MapMarker
                            key={location_Info._id}
                            longitude={location_Info.longitude}
                            latitude={location_Info.latitude}
                        >
                            <MarkerContent>
                                <div className="size-4 rounded-full bg-primary border-2 border-white shadow-lg" />
                            </MarkerContent>
                            <MarkerTooltip>{location_Info.companyName}</MarkerTooltip>
                            <MarkerPopup>
                                <div className=" relative space-y-1 w-80">
                                    <button className=' absolute right-0 top-0 py-1 px-3 ml-1 rounded-sm cursor-pointer bg-cyan-800 text-white'>ADD+</button>
                                    <section className=' w-full flex flex-row items-center'>
                                        <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg" alt="card_dp" className=' w-10 h-10 rounded-full ' />
                                        <h2 className=' mx-2 font-bold text-[15px]'>{location_Info.companyName}</h2>
                                    </section>
                                    <section className=' w-full'>
                                        <span className=' py-1 px-2 text-[10px] rounded-[2px] bg-gray-600 text-white'>GYM</span>
                                        <p className=' my-1.5 font-extralight text-[10px] leading-3 tracking-[1px] text-gray-600 line-clamp-2'> Welcome to [Gym Name], where excuses don't burn calories </p>
                                    </section>
                                    <section className=' w-full flex justify-end'>
                                        <button className='py-1 px-3 rounded-sm cursor-pointer bg-cyan-800 text-white'>Dashboard</button>
                                        <button className='py-1 px-3 ml-1 rounded-sm cursor-pointer bg-cyan-800 text-white'>--</button>
                                    </section>
                                </div>
                            </MarkerPopup>
                        </MapMarker>
                    </Map>
                </div>
            </div>
            <h3 className='font-bold text-2xl my-3'>More Info</h3>
            <ul>
                <li ><span className='font-bold text-sm'>Employess: </span>{dashboard_Info.employees}</li>
                <li ><span className='font-bold text-sm'>ExperienceFrom: </span> {(() => {
                    return (dashboard_Info.startedOrg.split("-").reverse().join("/"));
                })()} </li>
                {/* <li ><span className='font-bold text-sm'>Joinned: </span>{milliTOdate(dashboard_Info?.created)}</li> */}
            </ul>

        </div>
    )
}
