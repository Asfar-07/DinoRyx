import { Map, MapMarker, MapControls, MarkerContent, MarkerTooltip, MarkerPopup } from '../ui/map';
import { GoLinkExternal } from "react-icons/go";
import { MdAddCircleOutline } from "react-icons/md";
// import { useRef, useEffect, useState } from 'react';
// import { handleLocation } from '@/features/location/locationService';

export default function MainLocation() {
    // const locations = [
    //     {
    //         id: 1,
    //         name: "Empire State Building",
    //         lng: -73.9857,
    //         lat: 40.7484,
    //     },
    //     {
    //         id: 2,
    //         name: "Central Park",
    //         lng: -73.9654,
    //         lat: 40.7829,
    //     },
    //     { id: 3, name: "Times Square", lng: -73.9855, lat: 40.758 },
         
    // ];
    type Location=[{_id:number,companyName:string,address:string,latitude:number,longitude:number}] | []
    const locations:Location=[{_id:1,companyName:"Demo Fitness",address:"20 W 34th St, New York, NY 10001",latitude:40.7484,longitude:-73.9857}]
    // const [locations, setLocations]=useState<Location>([]);
    // const hasFetched = useRef<boolean>(false);

    // useEffect(()=>{
    //     if(hasFetched.current) return;
    //     hasFetched.current=true;
    //     handleLocation.getAllLocation().then((response)=>{
    //         setLocations(response);
    //     });
    // },[])
    return (
        <div style={{ width: "100%", height: "100vh" }}>
            {/* <aside className=' w-70 h-full fixed top-0 left-0 z-50  bg-(--secondary-bg-color) border-r-2'></aside> */}
            <main className=' w-full h-full'>
                <div className=' w-full h-full'>
                    <Map center={[-73.98, 40.76]} zoom={12}>
                        <MapControls
                        position='bottom-right'
                        showLocate
                        showZoom
                        showCompass>

                        </MapControls>
                        {locations.map((location) => (
                            <MapMarker
                                key={location._id}
                                latitude={location.latitude}
                                longitude={location.longitude}>
                                <MarkerContent>

                                </MarkerContent>
                                <MarkerTooltip>{location.companyName}</MarkerTooltip>
                                <MarkerPopup>
                                    <div className=" relative space-y-1 w-80">
                                        <button className=' absolute right-0 top-0 py-1 px-3 ml-1 rounded-sm inline cursor-pointer bg-cyan-800 text-white'><MdAddCircleOutline /></button>
                                        <section className=' w-full flex flex-row items-center'>
                                            <img src="https://www.shutterstock.com/image-vector/default-avatar-profile-icon-social-600nw-1906669723.jpg" alt="card_dp" className=' w-10 h-10 rounded-full ' />
                                            <h2 className=' mx-2 font-bold text-[15px]'>{location.companyName}</h2>
                                        </section>
                                        <section className=' w-full'>
                                            <span className=' py-1 px-2 text-[10px] rounded-[2px] bg-gray-600 text-white'>GYM</span>
                                            <p className=' my-1.5 font-extralight text-[10px] leading-3 tracking-[1px] text-gray-600 line-clamp-2'> Welcome to Demo Fitness, where excuses don't burn calories </p>
                                        </section>
                                        <section className=' w-full flex justify-end'>
                                            <button className='py-1 px-3 rounded-sm cursor-pointer bg-cyan-800 text-white'>Dashboard</button>
                                            <button className='py-1 px-3 ml-1 rounded-sm cursor-pointer font-bold bg-cyan-800 text-white'><GoLinkExternal /></button>
                                        </section>
                                    </div>
                                </MarkerPopup>
                            </MapMarker>
                        ))
                        }
                    </Map>
                </div>
            </main>
        </div>
    )
}
