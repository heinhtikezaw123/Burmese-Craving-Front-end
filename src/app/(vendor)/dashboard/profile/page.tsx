"use client";

import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "@/store";
import { useGetEndpointQuery } from "@/services/apiSlice";
import { endpoints } from "@/services/endpoints";
import { FaStar, FaRegClock } from "react-icons/fa";
import Link from "next/link";

const VendorProfilePage = () => {
    const [isClosedToday, setIsClosedToday] = React.useState(false);
    const [closeNote, setCloseNote] = React.useState('');
    const [showCloseInput, setShowCloseInput] = React.useState(false);

    const vendorId = useSelector((state: RootState) => state.auth.userData?.id);
    const { data: vendor, isLoading, error } = useGetEndpointQuery(`${endpoints.vendors}/1`);

    useEffect(() => {
        console.log("vendor detail", vendorId);
    }, [vendorId]);

    const today = new Date().toLocaleDateString("en-US", { weekday: "long" }).toLowerCase();

    if (isLoading) return <div>Loading vendor profile...</div>;
    if (error || !vendor) return <div>Error loading vendor data.</div>;

    return (
        <div className="p-4 sm:p-6 max-w-4xl mx-auto">
            <div className="bg-white rounded-xl shadow-md p-5 pt-10 relative">
                <div className="absolute top-2 right-3 w-full flex justify-end items-center">
                    <Link href={`profile/edit/${vendor.id}`} className="pb-4 hover:text-primary hover:underline">Edit Profile</Link>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">

                    {/* Business Overview */}
                    <div className="sm:col-span-2">
                        {vendor.halalCertified !== undefined && (
                            <p className="text-sm mb-3">
                                <span className={`inline-block px-2 py-1 rounded text-white text-xs ${vendor.halalCertified ? 'bg-green-600' : 'bg-gray-400'}`}>
                                    {vendor.halalCertified ? 'Halal Certified' : 'Not Halal Certified'}
                                </span>
                            </p>
                        )}
                        <h2 className="text-2xl font-bold mb-2">{vendor.name}</h2>

                        {vendor.types?.length > 0 && (
                            <div className="mb-3 flex flex-wrap gap-2">
                                {vendor.types.map((type: string, idx: number) => (
                                    <span key={idx} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                                        {type}
                                    </span>
                                ))}
                            </div>
                        )}
                        <div className="flex items-center gap-2 mb-2">
                            <FaRegClock className="text-gray-600" />
                            <span className="text-gray-800 text-sm">{vendor.deliveryTime}</span>
                        </div>
                        {/* <p className="text-sm text-gray-600 mb-2">Distance: {vendor.distance} km</p> */}

                        <div className="flex items-center gap-1 text-orange-500 text-sm mb-3">
                            {Array(5).fill(0).map((_, i) => (
                                <FaStar key={i} className={i < vendor.rating ? 'text-orange-500' : 'text-gray-300'} />
                            ))}
                            <span className="ml-1 text-gray-700">({vendor.rating})</span>
                        </div>

                        {/* Description */}
                        <div className="">
                            <p className="text-gray-800 text-sm">{vendor.description}</p>
                            <div className="mt-2 text-sm">
                                <a href="#" className="text-green-600">Reviews ({vendor.reviews})</a>
                            </div>
                        </div>
                    </div>

                    {/* Image */}
                    <div className="sm:col-span-1">
                        <img src={vendor.image} alt={vendor.name} className="w-full aspect-square object-cover rounded" />
                    </div>

                    {/* Contact & Location */}
                    <div className="sm:col-span-3 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Contact & Location</h3>
                        <p className="text-gray-700 mb-1">{vendor.address}</p>
                        <a href={vendor.mapLink} target="_blank" rel="noopener noreferrer" className="text-orange-500 text-sm mb-2 inline-block">
                            See On Map
                        </a>
                    </div>

                    {/* Operating Details */}
                    <div className="sm:col-span-3 mt-4">
                        <h3 className="text-lg font-semibold mb-2">Operating Details</h3>

                        <div className="mb-4">
                            {!isClosedToday ? (
                                <button
                                    onClick={() => setShowCloseInput(true)}
                                    className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Mark as Closed Today
                                </button>
                            ) : (
                                <div className="text-red-600 font-semibold">
                                    Closed Today{closeNote && ` — Note: ${closeNote}`}
                                    <button
                                        onClick={() => {
                                            setIsClosedToday(false);
                                            setCloseNote('');
                                            setShowCloseInput(false);
                                        }}
                                        className="ml-3 text-sm text-blue-600 underline"
                                    >
                                        Undo
                                    </button>
                                </div>
                            )}

                            {showCloseInput && !isClosedToday && (
                                <div className="mt-2">
                                    <input
                                        type="text"
                                        placeholder="Reason for closing..."
                                        className="border rounded px-2 py-1 mr-2"
                                        value={closeNote}
                                        onChange={(e) => setCloseNote(e.target.value)}
                                    />
                                    <button
                                        onClick={() => {
                                            setIsClosedToday(true);
                                            setShowCloseInput(false);
                                        }}
                                        className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                                        disabled={!closeNote.trim()}
                                    >
                                        Confirm
                                    </button>
                                    <button
                                        onClick={() => setShowCloseInput(false)}
                                        className="ml-2 px-3 py-1 bg-gray-300 rounded hover:bg-gray-400"
                                    >
                                        Cancel
                                    </button>
                                </div>
                            )}
                        </div>


                        {vendor.openHours.map((day: any, index: number) => {
                            const isToday = day.day === today;
                            const closedForToday = isToday && isClosedToday;

                            return (
                                <div
                                    key={day.day}
                                    className={`flex justify-between items-center px-4 py-2 text-sm ${isToday ? 'bg-primary/10 font-semibold' : index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                                >
                                    <span className="capitalize text-gray-700 w-1/3">{day.day}</span>
                                    {closedForToday ? (
                                        <span className="text-red-600 font-semibold">
                                            Currently Closed{closeNote && ` — ${closeNote}`}
                                        </span>
                                    ) : day.isClosed ? (
                                        <span className="text-red-500 font-medium">Closed</span>
                                    ) : (
                                        <span className="text-gray-800">{day.open} - {day.close}</span>
                                    )}
                                </div>
                            );
                        })}


                    </div>



                    {/* Confidential Files */}
                    {vendor.confidential_files && vendor.confidential_files.length > 0 && (
                        <div className="sm:col-span-3 mt-4">
                            <h3 className="text-lg font-semibold mb-2">Confidential Files</h3>
                            <ul className="list-disc list-inside text-sm text-gray-700">
                                {vendor.confidential_files.map((file: string, index: number) => (
                                    <li key={index}>
                                        <a href={file} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                                            View file {index + 1}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    )}

                </div>
            </div>
        </div>
    );
};

export default VendorProfilePage;