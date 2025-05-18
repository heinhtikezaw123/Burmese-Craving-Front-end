'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { useRouter } from 'next/navigation';
import { MapAddressInput } from '@/components/ui/MapAddressInput';

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
        openHour: '',
        estOpenTime: '',
        type: '',
        otherInfoFile: null as File | null,
        businessType: 'restaurant',
    });

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

        // TODO: send formData to server or API

        // Redirect to dashboard or another step
        router.push('/dashboard');
    };

    const handleSkip = () => {
        router.push('/dashboard');
    };

    return (
        <div className="max-w-lg mx-auto mt-10 p-6 rounded">
            <h2 className="text-2xl font-bold mb-6">Complete Your Vendor Profile</h2>
            <form onSubmit={handleSubmit}>
                <div className="w-full mb-4">
                    <label className="block text-sm mb-1 font-medium">Business Type</label>
                    <div className="flex gap-4">
                        <label className="flex items-center gap-2">
                            <input type="radio" name="businessType" value="restaurant" className="accent-primary" />
                            Restaurant
                        </label>
                        <label className="flex items-center gap-2">
                            <input type="radio" name="businessType" value="homecook" className="accent-primary" />
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
                <Input
                    label="Opening Hours"
                    name="openHour"
                    value={formData.openHour}
                    onChange={handleChange}
                    placeholder="e.g. 9:00 AM - 9:00 PM"
                />
                <Input
                    label="Estimated Opening Date"
                    name="estOpenTime"
                    type="date"
                    value={formData.estOpenTime}
                    onChange={handleChange}
                />
                <Input
                    label="Vendor Type (e.g. Chinese, Drinks)"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                />
                <Input
                    label="Upload Other Information"
                    name="otherInfoFile"
                    type="file"
                    as="file"
                    onChange={handleChange}
                />

                <div className="mt-6 flex justify-between gap-2">
                    <Button type="submit" label="Submit Info" />
                    <button
                        type="button"
                        className="text-sm whitespace-nowrap text-gray-500 underline hover:text-primary"
                        onClick={handleSkip}
                    >
                        Skip for Now
                    </button>
                </div>
            </form>
        </div>
    );
}
