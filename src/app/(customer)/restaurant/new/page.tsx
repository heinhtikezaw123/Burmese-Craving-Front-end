// src/app/(customer)/restaurants/new/page.tsx
interface Props {
    searchParams: {
        lng?: string;
        lat?: string;
        vertical?: string;
    };
}

export default function RestaurantListPage({ searchParams }: Props) {
    const { lng, lat, vertical } = searchParams;

    return (
        <main className="p-4">
            <h1 className="text-xl font-bold">Nearby Restaurants</h1>
            <p>Longitude: {lng}</p>
            <p>Latitude: {lat}</p>
            <p>Category: {vertical}</p>
            {/* You can fetch restaurants using these values */}
        </main>
    );
}
