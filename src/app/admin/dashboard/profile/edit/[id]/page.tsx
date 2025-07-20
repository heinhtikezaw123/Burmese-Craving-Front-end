'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useGetEndpointQuery, useInvalidateEndpointMutation } from '@/services/apiSlice';
import { endpoints } from '@/services/endpoints';

import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import ImageUpload from '@/components/ui/ImageUpload';
import MultipleSelectDropdown from '@/components/ui/multipleDropdown/MultipleSelectDropdown';
import { MapAddressInput } from '@/components/ui/MapAddressInput';

const vendorTypeOptions = [
    { value: 'Chinese', label: 'Chinese' },
    { value: 'Drinks', label: 'Drinks' },
    { value: 'BBQ', label: 'BBQ' },
    { value: 'Thai', label: 'Thai' },
    { value: 'Myanmar', label: 'Myanmar' },
    { value: 'Indian', label: 'Indian' },
];

const VendorProfileEditForm = () => {
    const router = useRouter();
    const params = useParams();
    const vendorId = params.id as string;
    const { data: vendor, isLoading } = useGetEndpointQuery(`${endpoints.vendors}/${vendorId}`);
    const [updateVendor, { isLoading: isSaving }] = useInvalidateEndpointMutation();

    const [image, setImage] = useState<File | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        halalCertified: false,
        isDelivery: false,
        businessType: 'restaurant',
        types: [] as string[],
        address: '',
        lat: 0,
        lon: 0,
        otherInfoFile: null as File | null,
    });

    useEffect(() => {
        if (vendor) {
            setFormData({
                name: vendor.name || '',
                description: vendor.description || '',
                halalCertified: vendor.halalCertified ?? false,
                isDelivery: vendor.isDelivery ?? false,
                businessType: vendor.businessType || 'restaurant',
                types: vendor.types || [],
                address: vendor.address || '',
                lat: vendor.lat || 0,
                lon: vendor.lon || 0,
                otherInfoFile: null,
            });
            setImage(null);
        }
    }, [vendor]);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, type, checked, value, files } = e.target as any;
        if (type === 'checkbox') {
            setFormData((prev) => ({ ...prev, [name]: checked }));
        } else if (type === 'file') {
            setFormData((prev) => ({ ...prev, [name]: files[0] }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async () => {
        const payload = new FormData();
        payload.append('name', formData.name);
        payload.append('description', formData.description);
        payload.append('halalCertified', String(formData.halalCertified));
        payload.append('isDelivery', String(formData.isDelivery));
        payload.append('businessType', formData.businessType);
        payload.append('types', JSON.stringify(formData.types));
        payload.append('address', formData.address);
        payload.append('lat', String(formData.lat));
        payload.append('lon', String(formData.lon));
        if (image) payload.append('image', image);
        if (formData.otherInfoFile) payload.append('otherInfoFile', formData.otherInfoFile);

        try {
            await updateVendor({ id: vendorId, data: payload }).unwrap();
            router.push('/dashboard');
        } catch (err) {
            console.error('Update error:', err);
        }
    };

    if (isLoading || !vendor) return <p>Loading...</p>;

    return (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-md space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {/* Cover Image */}
                <ImageUpload
                    onChange={setImage}
                    defaultImage={vendor.image}
                    label="Cover Image"
                />

                {/* Form Section */}
                <div className="md:col-span-2">
                    <h3 className="mb-4 font-bold text-xl">Edit Vendor Profile</h3>
                    {/* Business Type */}
                    <div className='mb-4'>
                        <label className="block text-sm font-medium">Business Type</label>
                        <div className="flex gap-4 mt-1">
                            {['restaurant', 'homecook'].map((type) => (
                                <label key={type} className="flex items-center gap-2">
                                    <input
                                        type="radio"
                                        name="businessType"
                                        value={type}
                                        checked={formData.businessType === type}
                                        onChange={handleChange}
                                    />
                                    {type.charAt(0).toUpperCase() + type.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    <div className="space-y-4 mb-4">
                        {/* Name */}
                        <Input
                            label="Vendor Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />

                        {/* Description with live count */}
                        <div>
                            <Input
                                label="Description"
                                name="description"
                                as="textarea"
                                value={formData.description}
                                onChange={handleChange}
                                rows={3}
                                maxLength={500}

                            />
                            <p className="text-right text-xs text-gray-500 mt-1">
                                {formData.description.length} / 500 characters
                            </p>
                        </div>



                        {/* Vendor Types */}
                        <MultipleSelectDropdown
                            label="Vendor Types"
                            options={vendorTypeOptions}
                            selected={formData.types}
                            onChange={(values) =>
                                setFormData((prev) => ({ ...prev, types: values }))
                            }
                        />

                        {/* Address Picker */}
                        <MapAddressInput
                            onSelect={({ address, lat, lon }) =>
                                setFormData((prev) => ({ ...prev, address, lat, lon }))
                            }
                            defaultValue={formData.address}
                        />

                        {/* Halal & Delivery checkboxes */}
                        <div className="flex items-center gap-2">
                            <input
                                id='halaCertified'
                                type="checkbox"
                                name="halalCertified"
                                checked={formData.halalCertified}
                                onChange={handleChange}
                            />
                            <label htmlFor={"halaCertified"} className='cursor-pointer' >Halal Certified</label>
                        </div>
                        <div className="flex items-center gap-2">
                            <input
                                id='isDelivery'
                                type="checkbox"
                                name="isDelivery"
                                checked={formData.isDelivery}
                                onChange={handleChange}
                            />
                            <label htmlFor={"isDelivery"} className='cursor-pointer' >Provides Delivery</label>
                        </div>

                        {/* Additional Info File */}
                        {/* <Input
                            label="Upload Additional Info"
                            name="otherInfoFile"
                            type="file"
                            as="file"
                            onChange={handleChange}
                        /> */}
                    </div>
                </div>
            </div>

            <div className="pt-4 flex justify-end">
                <Button
                    type="button"
                    label={isSaving ? 'Updating...' : 'Update Profile'}
                    onClick={handleSubmit}
                    disabled={isSaving}
                />
            </div>
        </div>
    );
};

export default VendorProfileEditForm;
