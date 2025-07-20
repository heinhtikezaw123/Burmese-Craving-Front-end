'use client';
import React, { useState } from "react";

type OpenHour = {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
};

type OperatingDetailsProps = {
    openHours: OpenHour[];
    today: string;
};

const OperatingDetails = ({ openHours, today }: OperatingDetailsProps) => {
    // Combine related state for clarity
    const [closedToday, setClosedToday] = useState(false);
    const [closeNote, setCloseNote] = useState('');
    const [isEditingNote, setIsEditingNote] = useState(false);

    // Handlers
    const handleMarkClosedClick = () => setIsEditingNote(true);
    const handleCancel = () => {
        setIsEditingNote(false);
        setCloseNote('');
    };
    const handleConfirm = () => {
        if (!closeNote.trim()) return;
        setClosedToday(true);
        setIsEditingNote(false);
    };
    const handleUndo = () => {
        setClosedToday(false);
        setCloseNote('');
    };

    return (
        <section className="sm:col-span-3 mt-4">
            <h3 className="text-lg font-semibold mb-2">Operating Details</h3>

            {/* Closed Today Toggle */}
            <div className="mb-4">
                {!closedToday && !isEditingNote && (
                    <button
                        onClick={handleMarkClosedClick}
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                        aria-label="Mark vendor as closed today"
                    >
                        Mark as Closed Today
                    </button>
                )}

                {isEditingNote && (
                    <div className="mt-2 flex items-center gap-2">
                        <input
                            type="text"
                            placeholder="Reason for closing..."
                            className="flex-grow border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary"
                            value={closeNote}
                            onChange={(e) => setCloseNote(e.target.value)}
                            aria-label="Reason for closing today"
                            autoFocus
                        />
                        <button
                            onClick={handleConfirm}
                            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
                            disabled={!closeNote.trim()}
                            aria-disabled={!closeNote.trim()}
                        >
                            Confirm
                        </button>
                        <button
                            onClick={handleCancel}
                            className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                        >
                            Cancel
                        </button>
                    </div>
                )}

                {closedToday && !isEditingNote && (
                    <div className="text-red-700 font-semibold flex items-center gap-4">
                        Closed Today{closeNote && ` — Note: ${closeNote}`}
                        <button
                            onClick={handleUndo}
                            className="text-sm text-blue-600 underline hover:text-blue-700"
                            aria-label="Undo closed today status"
                        >
                            Undo
                        </button>
                    </div>
                )}
            </div>

            {/* Open Hours List */}
            <div className="divide-y divide-gray-200 rounded border border-gray-100">
                {openHours.map((day, idx) => {
                    const isToday = day.day === today;
                    const closedForToday = isToday && closedToday;

                    return (
                        <div
                            key={day.day}
                            className={`flex justify-between items-center px-5 py-3 text-sm
                ${isToday ? 'bg-primary/10 font-semibold' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
                            aria-current={isToday ? 'date' : undefined}
                        >
                            <span className="capitalize text-gray-700 w-1/3">{day.day}</span>

                            {closedForToday ? (
                                <span className="text-red-600 font-semibold" aria-live="polite">
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
        </section>
    );
};

export default OperatingDetails;
