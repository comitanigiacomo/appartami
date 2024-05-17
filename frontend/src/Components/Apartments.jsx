import React from 'react';
import { ApartmentCard } from './ApartmentCard';

export function Apartments({ apartments }) {
    return (
        <div className='appartamenti'>
            {apartments.map(apartment => (
                <ApartmentCard
                    key={apartment._id}
                    name={apartment.name}
                    description={apartment.description}
                />
            ))}
        </div>
    );
}