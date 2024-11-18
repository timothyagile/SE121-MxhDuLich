import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

type UserContextType = {
  userId: string | null;
  setUserId: (id: string) => void;
  logout: () => void;
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider = ({ children }: { children: ReactNode }) => {
    console.log("Rendering UserProvider");
  const [userId, setUserIdState] = useState<string | null>(null);

  const setUserId = async (id: string) => {
    setUserIdState(id);
    await AsyncStorage.setItem('userId', id); // Lưu vào AsyncStorage
  };

  const logout = async () => {
    setUserIdState(null);
    await AsyncStorage.removeItem('userId'); // Xóa khỏi AsyncStorage
  };

  useEffect(() => {
    const loadUserId = async () => {
      const storedUserId = await AsyncStorage.getItem('userId');
      if (storedUserId) {
        setUserIdState(storedUserId);
      }
    };

    loadUserId();
  }, []);

  return (
    <UserContext.Provider value={{ userId, setUserId, logout }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};
