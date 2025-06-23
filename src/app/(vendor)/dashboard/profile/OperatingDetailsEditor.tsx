'use client';
import React, { useState } from 'react';

type OpenHour = {
  day: string;
  open: string;
  close: string;
  isClosed: boolean;
};

type OperatingDetailsEditorProps = {
  openHours: OpenHour[];
  today: string;
  onChange: (updatedHours: OpenHour[]) => void; // callback to update parent state
};

const OperatingDetailsEditor = ({ openHours, today, onChange }: OperatingDetailsEditorProps) => {
  const [hours, setHours] = useState<OpenHour[]>(openHours);
  const [closedToday, setClosedToday] = useState(false);
  const [closeNote, setCloseNote] = useState('');
  const [isEditingNote, setIsEditingNote] = useState(false);

  // Handle toggling closed today + note (same as before)
  const handleMarkClosedClick = () => setIsEditingNote(true);
  const handleCancelCloseNote = () => {
    setIsEditingNote(false);
    setCloseNote('');
  };
  const handleConfirmCloseNote = () => {
    if (!closeNote.trim()) return;
    setClosedToday(true);
    setIsEditingNote(false);
  };
  const handleUndoCloseToday = () => {
    setClosedToday(false);
    setCloseNote('');
  };

  // Handle openHours updates for a day field
  const updateDay = (index: number, field: keyof OpenHour, value: string | boolean) => {
    const updatedHours = [...hours];
    updatedHours[index] = {
      ...updatedHours[index],
      [field]: value,
    };

    // If closing or opening toggled, clear times if closed
    if (field === 'isClosed' && value === true) {
      updatedHours[index].open = '';
      updatedHours[index].close = '';
    }
    onChange(updatedHours);
    setHours(updatedHours);
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
              onClick={handleConfirmCloseNote}
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
              disabled={!closeNote.trim()}
              aria-disabled={!closeNote.trim()}
            >
              Confirm
            </button>
            <button
              onClick={handleCancelCloseNote}
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
              onClick={handleUndoCloseToday}
              className="text-sm text-blue-600 underline hover:text-blue-700"
              aria-label="Undo closed today status"
            >
              Undo
            </button>
          </div>
        )}
      </div>

      {/* Editable open hours */}
      <div className="divide-y divide-gray-200 rounded border border-gray-100">
        {hours.map((day, idx) => {
          const isToday = day.day === today;
          const closedForToday = isToday && closedToday;

          return (
            <div
              key={day.day}
              className={`flex flex-wrap justify-between items-center px-5 py-3 text-sm gap-2
                ${isToday ? 'bg-primary/10 font-semibold' : idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}`}
              aria-current={isToday ? 'date' : undefined}
            >
              <span className="capitalize text-gray-700 w-1/4">{day.day}</span>

              {closedForToday ? (
                <span className="text-red-600 font-semibold" aria-live="polite">
                  Currently Closed{closeNote && ` — ${closeNote}`}
                </span>
              ) : (
                <>
                  <label className="flex items-center gap-1 w-1/4">
                    <input
                      type="checkbox"
                      checked={day.isClosed}
                      onChange={(e) => updateDay(idx, 'isClosed', e.target.checked)}
                      aria-label={`Mark ${day.day} as closed`}
                    />
                    <span className="select-none">Closed</span>
                  </label>

                  {/* If not closed, show time inputs */}
                  {!day.isClosed && (
                    <>
                      <input
                        type="time"
                        value={day.open}
                        onChange={(e) => updateDay(idx, 'open', e.target.value)}
                        className="border rounded px-2 py-1 w-1/5"
                        aria-label={`Opening time for ${day.day}`}
                        required={!day.isClosed}
                      />
                      <span className="mx-1">-</span>
                      <input
                        type="time"
                        value={day.close}
                        onChange={(e) => updateDay(idx, 'close', e.target.value)}
                        className="border rounded px-2 py-1 w-1/5"
                        aria-label={`Closing time for ${day.day}`}
                        required={!day.isClosed}
                      />
                    </>
                  )}
                </>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default OperatingDetailsEditor;
