// types/navigation.ts

export type SelectedRoom = {
    roomId: string;
    count: number;
    roomDetails: {
      name: string;
      price: number;
    };
  };
  
  export type RootStackParamList = {
    'welcome1': undefined;
    'login': undefined;
    'register': undefined;
    'register2': undefined;
    'collection-screen': undefined;
    'add-new-collection-screen': undefined;
    'personal-information-screen': undefined;
    'notifications-screen': undefined;
    'chat-board-screen': undefined;
    'chat-screen': undefined;
    'main-screen': undefined;
    'payment-method-screen': {locationId: string, totalPrice: string};
    'add-new-payment-method-screen': undefined;
    'reservation-required-screen': { selectedRoomsData: SelectedRoom[] ,locationId: string};
    'available-room-screen': { id: string; checkinDate: string; checkoutDate: string };
    'detail-screen': { id: string };
    'detail-booking-screen': {bookingId: string};
  };
  