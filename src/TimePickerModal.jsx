// TimePickerModal.jsx - Separate reusable component
import React, { useState, useEffect } from 'react';

const TimePickerModal = ({
    isOpen,
    currentTime,
    onSelectTime,
    onClose,
    title = "Select Time",
    subtitle = null
}) => {
    const [selectedHour, setSelectedHour] = useState(12);
    const [selectedMinute, setSelectedMinute] = useState('00');
    const [selectedPeriod, setSelectedPeriod] = useState('AM');

    useEffect(() => {
        if (isOpen && currentTime) {
            const timeParts = currentTime.split(' ');
            if (timeParts.length === 2) {
                const [time, period] = timeParts;
                const [hour, minute] = time.split(':');
                setSelectedHour(parseInt(hour));
                setSelectedMinute(minute);
                setSelectedPeriod(period);
            }
        }
    }, [isOpen, currentTime]);

    const handleConfirm = () => {
        const formattedTime = `${selectedHour}:${selectedMinute} ${selectedPeriod}`;
        console.log('TimePickerModal: Confirming time:', formattedTime);

        // Call the onSelectTime callback
        if (onSelectTime) {
            onSelectTime(formattedTime);
        }

        // Close the modal
        if (onClose) {
            onClose();
        }
    };

    const handleCancel = () => {
        console.log('TimePickerModal: Cancelling time selection');
        if (onClose) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const hours = Array.from({ length: 12 }, (_, i) => i + 1);
    const minutes = ['00', '15', '30', '45'];
    const periods = ['AM', 'PM'];

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-2xl w-full max-w-lg">
                {/* Header */}
                <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <div>
                        <h3 className="text-xl font-bold text-gray-800">{title}</h3>
                        {subtitle && (
                            <p className="text-sm text-gray-600">{subtitle}</p>
                        )}
                    </div>
                    <button
                        onClick={handleCancel}
                        className="text-gray-500 hover:text-gray-700 text-2xl"
                    >
                        ×
                    </button>
                </div>

                <div className="p-6">
                    {/* Time Pickers */}
                    <div className="grid grid-cols-3 gap-6 mb-6">
                        {/* Hour */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Hour</h4>
                            <div className="grid grid-cols-2 gap-2 max-h-60 overflow-y-auto">
                                {hours.map((hour) => (
                                    <button
                                        key={hour}
                                        onClick={() => setSelectedHour(hour)}
                                        className={`p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedHour === hour
                                                ? 'bg-blue-500 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {hour}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Minutes */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Minutes</h4>
                            <div className="space-y-3">
                                {minutes.map((minute) => (
                                    <button
                                        key={minute}
                                        onClick={() => setSelectedMinute(minute)}
                                        className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedMinute === minute
                                                ? 'bg-green-500 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        :{minute}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Period */}
                        <div>
                            <h4 className="text-lg font-semibold text-gray-800 mb-4 text-center">Period</h4>
                            <div className="space-y-3">
                                {periods.map((period) => (
                                    <button
                                        key={period}
                                        onClick={() => setSelectedPeriod(period)}
                                        className={`w-full p-3 rounded-xl font-medium shadow-lg hover:shadow-xl transform hover:scale-105 transition-all ${selectedPeriod === period
                                                ? 'bg-purple-500 text-white'
                                                : 'bg-gray-100 text-gray-800 hover:bg-gray-200'
                                            }`}
                                    >
                                        {period}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Selected Time Preview */}
                    <div className="text-center mb-6">
                        <div className="text-2xl font-bold text-gray-800 mb-2">
                            {selectedHour}:{selectedMinute} {selectedPeriod}
                        </div>
                        <p className="text-gray-600">Selected Time</p>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                        <button
                            onClick={handleCancel}
                            className="flex-1 bg-gray-200 text-gray-800 py-3 rounded-xl font-bold hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleConfirm}
                            className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors"
                        >
                            Confirm Time
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TimePickerModal;