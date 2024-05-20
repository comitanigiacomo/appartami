import React from 'react';
import { ApartmentCard } from './ApartmentCard';

export function Apartments({ apartments, roomHash, onDeleteApartment }) {
  return (
    <div className='appartamenti'>
      {apartments.map(apartment => (
        <ApartmentCard
          key={apartment._id}
          name={apartment.name}
          description={apartment.description}
          roomHash={roomHash}
          apartmentId={apartment._id}
          onDelete={onDeleteApartment}
        />
      ))}
    </div>
  );
}
