'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/Input';

interface MapAddressInputProps {
    onSelect: (place: { address: string; lat: number; lon: number }) => void;
}

export const MapAddressInput = ({ onSelect }: MapAddressInputProps) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState<any[]>([]);

    useEffect(() => {
        if (query.length < 3) return;

        const delay = setTimeout(() => {
            fetch(
                `https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
                    query
                )}&limit=5&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
            )
                .then((res) => res.json())
                .then((data) => setResults(data.features || []));
        }, 400);

        console.log(`https://api.geoapify.com/v1/geocode/autocomplete?text=${encodeURIComponent(
            query
        )}&limit=5&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`)

        return () => clearTimeout(delay);
    }, [query]);

    const handleSelect = (place: any) => {
        const { formatted, lat, lon } = place.properties;
        setQuery(formatted);
        setResults([]);
        onSelect({ address: formatted, lat, lon });
    };

    return (
        <div className="relative mb-4">
            <Input
                label="Vendor Address"
                placeholder="Search address..."
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            {results.length > 0 && (
                <ul className="absolute z-10 w-full bg-white border rounded mt-1 shadow max-h-48 overflow-auto text-sm">
                    {results.map((place) => (
                        <li
                            key={place.place_id}
                            className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                            onClick={() => handleSelect(place)}
                        >
                            {place.properties.formatted}
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};
