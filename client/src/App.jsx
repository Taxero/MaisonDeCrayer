import { BrowserRouter, Routes, Route, ScrollRestoration } from "react-router-dom";
import Home from "./pages/Home";
import Rooms from "./pages/Rooms";
import RoomDetails from "./pages/RoomDetails";
import Gallery from "./pages/Gallery";
import Contact from "./pages/Contact";
import Navbar from "./components/Navbar";
import Booking from "./pages/Booking";
import Payment from "./pages/Payment";
import PaymentSuccess from "./pages/PaymentSuccess";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProtectedRoute from "./components/ProtectedRoute";
import MyBookings from "./pages/MyBookings";
import AdminRoute from "./components/AdminRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminBookings from "./pages/admin/AdminBookings";
import AdminRooms from "./pages/admin/AdminRooms";
import AdminRoomForm from "./pages/admin/AdminRoomForm";
import AdminRoomImages from "./pages/admin/AdminRoomImages";
import Footer from "./components/Footer";
import ScrollToTop from "./components/ScrollToTop"
import AdminLayout from "./pages/admin/AdminLayout";
import AdminMessages from "./pages/admin/AdminMessages";
import AdminCheckIn from "./pages/admin/AdminCheckIn";
import EventPayment from "./pages/EventPayment";
import EventPaymentSuccess from "./pages/EventPaymentSuccess";
import NotFound from "./pages/NotFound";

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/rooms" element={<Rooms />} />
        <Route path="/rooms/:id" element={<RoomDetails />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />} />

        <Route element={<ProtectedRoute />}>
          <Route path="/booking/:roomId" element={<Booking />} />
          <Route path="/payment/:bookingId" element={<Payment />} />
          <Route path="/event-payment/:bookingId" element={<EventPayment />} />
          <Route path="/payment-success/:bookingId" element={<PaymentSuccess />} />
          <Route path="/event-payment-success/:bookingId" element={<EventPaymentSuccess />} />
          <Route path="/my-bookings" element={<MyBookings />} />
        </Route>

        <Route element={<AdminRoute />}>
          <Route element={<AdminLayout />}>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/bookings" element={<AdminBookings />} />
            <Route path="/admin/messages" element={<AdminMessages />} />
            <Route path="/admin/rooms" element={<AdminRooms />} />
            <Route path="/admin/rooms/new" element={<AdminRoomForm />} />
            <Route path="/admin/rooms/edit/:roomId" element={<AdminRoomForm />} />
            <Route path="/admin/rooms/:roomId/images" element={<AdminRoomImages />} />
            <Route path="/admin/checkin" element={<AdminCheckIn />} />
          </Route>
        </Route>

      </Routes>
      <Footer />
    </BrowserRouter>
  );
};

export default App;
