import React, { createContext, useContext, useCallback } from "react";
import { useLocalStorage } from "../hooks/useLocalStorage";

const AuthContext = createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  // Use our custom hook to manage user and bookings state with persistence
  const [user, setUser] = useLocalStorage("user", null);
  const [bookings, setBookings] = useLocalStorage("bookings", []);

  // Use useCallback to memoize these functions so they don't cause unnecessary re-renders in consumers
  const login = useCallback(() => {
    // In a real app, this would involve a form and API call.
    // Here, we'll just set a mock user.
    const mockUser = { name: "Juan dela Cruz", email: "juan@example.com" };
    setUser(mockUser);
  }, [setUser]);

  const logout = useCallback(() => {
    setUser(null);
    // Optionally, you could also clear bookings on logout
    // setBookings([]);
  }, [setUser]);

  const addBooking = useCallback(
    (newBooking) => {
      // Add a unique ID to the booking for easy removal
      const bookingWithId = { ...newBooking, id: Date.now() };
      setBookings((prevBookings) => [...prevBookings, bookingWithId]);
    },
    [setBookings]
  );

  const cancelBooking = useCallback(
    (bookingId) => {
      setBookings((prevBookings) =>
        prevBookings.filter((b) => b.id !== bookingId)
      );
    },
    [setBookings]
  );

  const value = {
    user,
    bookings,
    login,
    logout,
    addBooking,
    cancelBooking,
    isAuthenticated: !!user, // A convenient boolean flag
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
