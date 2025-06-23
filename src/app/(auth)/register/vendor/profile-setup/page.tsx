'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { MapAddressInput } from '@/components/ui/MapAddressInput';

const daysOfWeek = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];

type DayHour = {
    day: string;
    open: string;
    close: string;
    isClosed: boolean;
};

const initialHours: DayHour[] = daysOfWeek.map((day) => ({
    day,
    open: '',
    close: '',
    isClosed: false,
}));

export default function ProfileSetup() {
    const router = useRouter();

    const [geoData, setGeoData] = useState({
        address: '',
        lat: 0,
        lon: 0,
    });

    const [formData, setFormData] = useState({
        address: '',
        halalCertified: false,
        isDelivery: false,
        type: '',
        otherInfoFile: null as File | null,
        businessType: 'restaurant',
    });

    const [openHours, setOpenHours] = useState<DayHour[]>(initialHours);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value, type, checked, files } = e.target as any;

        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...formData,
            ...geoData,
            openHours,
        };

        console.log('Submit payload:', payload);

        router.push('/dashboard');
    };

    return (
        <div className="max-w-lg mx-auto my-10 p-6 rounded">
            <h2 className="text-2xl font-bold mb-6">Complete Your Vendor Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="w-full mb-4">
                    <label className="block text-sm mb-1 font-medium">Business Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="businessType"
                                value="restaurant"
                                checked={formData.businessType === 'restaurant'}
                                onChange={handleChange}
                                className="accent-primary"
                            />
                            Restaurant
                        </label>
                        <label className="flex items-center gap-2">
                            <input
                                type="radio"
                                name="businessType"
                                value="homecook"
                                checked={formData.businessType === 'homecook'}
                                onChange={handleChange}
                                className="accent-primary"
                            />
                            Home Cook
                        </label>
                    </div>
                </div>

                <MapAddressInput
                    onSelect={({ address, lat, lon }) =>
                        setGeoData({ address, lat, lon })
                    }
                />

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        name="halalCertified"
                        checked={formData.halalCertified}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Halal Certified?</label>
                </div>

                <div className="flex items-center gap-2 mb-4">
                    <input
                        type="checkbox"
                        name="isDelivery"
                        checked={formData.isDelivery}
                        onChange={handleChange}
                    />
                    <label className="text-sm">Provides Delivery?</label>
                </div>

                <div className="mb-6 hidden">
                    <h4 className="font-semibold mb-2">Opening Hours Per Day</h4>
                    <div className="space-y-3">
                        {openHours.map((entry, idx) => (
                            <div key={entry.day} className="flex items-center gap-3">
                                <div className="capitalize w-24">{entry.day}</div>

                                <input
                                    type="checkbox"
                                    checked={entry.isClosed}
                                    onChange={(e) => {
                                        const updated = [...openHours];
                                        updated[idx].isClosed = e.target.checked;
                                        if (e.target.checked) {
                                            updated[idx].open = '';
                                            updated[idx].close = '';
                                        }
                                        setOpenHours(updated);
                                    }}
                                />
                                <span className="text-sm">Closed</span>

                                {!entry.isClosed && (
                                    <>
                                        <input
                                            type="time"
                                            value={entry.open}
                                            onChange={(e) => {
                                                const updated = [...openHours];
                                                updated[idx].open = e.target.value;
                                                setOpenHours(updated);
                                            }}
                                            className="border p-1 rounded text-sm"
                                        />
                                        <span>to</span>
                                        <input
                                            type="time"
                                            value={entry.close}
                                            onChange={(e) => {
                                                const updated = [...openHours];
                                                updated[idx].close = e.target.value;
                                                setOpenHours(updated);
                                            }}
                                            className="border p-1 rounded text-sm"
                                        />
                                    </>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                <div className="mb-4">
                    <Input
                        label="Vendor Type (e.g. Chinese, Drinks)"
                        name="type"
                        value={formData.type}
                        onChange={handleChange}
                    />
                </div>

                <div className="mb-4">
                    <Input
                        label="Upload Other Information"
                        name="otherInfoFile"
                        type="file"
                        as="file"
                        onChange={handleChange}
                    />
                </div>

                <div className="mt-6 flex justify-end gap-2">
                    <Button type="submit" label="Submit Info" />
                </div>
            </form>
        </div>
    );
}
