import React from 'react';
import { ApartmentCard } from './ApartmentCard';

export function Apartments({apartments, owner, roomHash, onDeleteApartment, onViewApartment  }) {

  return (
    <div className='appartamenti'>
      {apartments.map(apartment => (
        <ApartmentCard
          key={apartment._id}
          owner={owner}
          name={apartment.name}
          description={apartment.description}
          roomHash={roomHash}
          apartmentId={apartment._id}
          onDelete={onDeleteApartment}
          onViewApartment={onViewApartment}
        />
      ))}
    </div>
  );
}
