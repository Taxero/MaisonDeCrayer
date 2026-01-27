# 📘 Hotel Booking Backend – API Routes Documentation

This document describes **all API routes**, their purpose, required authentication, request payloads, and responses.

---

## 🔗 Base URL

```
/api
```

---

# 🔐 AUTHENTICATION APIs

## 1️⃣ Register User

**POST** `/auth/register`

### Purpose

Create a new user account.

### Body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "password": "password123"
}
```

### Success Response (201)

```json
{
  "message": "User registered successfully"
}
```

---

## 2️⃣ Login User

**POST** `/auth/login`

### Purpose

Authenticate user and return JWT token.

### Body

```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Success Response (200)

```json
{
  "token": "JWT_TOKEN",
  "user": {
    "id": "USER_ID",
    "name": "John Doe",
    "role": "USER"
  }
}
```

---

# 🏨 ROOM APIs

## 3️⃣ Get All Active Rooms (Public)

**GET** `/rooms`

### Purpose

Fetch all rooms available for booking.

### Success Response

```json
{
  "count": 2,
  "rooms": [
    {
      "_id": "ROOM_ID",
      "name": "Deluxe Room",
      "pricePerNight": 3000,
      "totalRooms": 5,
      "images": [
        {
          "url": "https://res.cloudinary.com/demo/image/upload/room1.jpg"
        }
      ]
    }
  ]
}
```

---

## 3️⃣ Get Room by id

**GET** `rooms/:roomId`

### Purpose

Fetch detailed information about a specific room.

### Success Response

```json
{
  "room": {
    "_id": "ROOM_ID",
    "name": "Deluxe Room",
    "pricePerNight": 3000,
    "maxGuests": 2,
    "totalRooms": 5,
    "amenities": ["AC", "WiFi"],
    "images": [
      {
        "url": "https://res.cloudinary.com/.../room1.jpg"
      }
    ]
  }
}
```

## 3️⃣ Get All Active Rooms (Public)

**GET** `admin/rooms`

### Purpose

Fetch all rooms active and disable rooms for admin.

### Success Response

```json
{
  "count": 2,
  "rooms": [
    {
      "_id": "ROOM_ID",
      "name": "Deluxe Room",
      "pricePerNight": 3000,
      "totalRooms": 5,
      "images": [
        {
          "url": "https://res.cloudinary.com/demo/image/upload/room1.jpg"
        }
      ],
      "isActive": true
    }
  ]
}
```

---

## 4️⃣ Create Room (Admin)

**POST** `admin/rooms`

### Purpose

Admin creates a new room type.

### Authorization

```
Bearer ADMIN_TOKEN
```

### Body

```json
{
  "name": "Deluxe Room",
  "pricePerNight": 3000,
  "maxGuests": 2,
  "totalRooms": 5,
  "amenities": ["AC", "WiFi"],
  "images": [
    {
      "url": "https://res.cloudinary.com/demo/image/upload/room1.jpg",
      "public_id": "hotel_rooms/room1"
    }
  ]
}
```

### Response (201)

```json
{
  "message": "Room created successfully",
  "room": {}
}
```

---

## 5️⃣ Update Room (Admin)

**PUT** `admin/rooms/:roomId`

### Purpose

Update room details.

### Authorization

```
Bearer ADMIN_TOKEN
```

### Body (Partial Allowed)

```json
{
  "pricePerNight": 3500,
  "amenities": ["AC", "WiFi", "TV"]
}
```

Bearer ADMIN_TOKEN

````

### Body (Partial Allowed)

```json
{
  "pricePerNight": 3500
}
````

---

## 6️⃣ Disable Room (Admin)

**DELETE** `admin/rooms/:roomId`

### Purpose

Disable a room (soft delete).

### Response

```json
{
  "message": "Room disabled successfully"
}
```

---

## 6️⃣➕ Enable Room (Admin)

**PATCH** `admin/rooms/:roomId/enable`

### Purpose

Re-enable a previously disabled room.

### Authorization

```
Bearer ADMIN_TOKEN
```

### Response

```json
{
  "message": "Room enabled successfully"
}
```

---

# 📅 BOOKING APIs

## 7️⃣ Check Room Availability

**POST** `/bookings/check-availability`

### Purpose

Check if rooms are available for selected dates.

### Body

```json
{
  "roomId": "ROOM_ID",
  "checkIn": "2026-02-10",
  "checkOut": "2026-02-12",
  "roomsRequested": 2
}
```

### Response

```json
{
  "available": true,
  "availableRooms": 3
}
```

---

## 8️⃣ Create Booking (User)

**POST** `/bookings/create`

### Purpose

Create a booking in PENDING state.

### Authorization

```
Bearer USER_TOKEN
```

### Body

```json
{
  "roomId": "ROOM_ID",
  "checkIn": "2026-02-10",
  "checkOut": "2026-02-12",
  "roomsBooked": 2
}
```

### Response (201)

```json
{
  "message": "Booking created (pending payment)",
  "booking": {
    "_id": "BOOKING_ID",
    "status": "PENDING",
    "totalAmount": 12000
  }
}
```

## 📄 Get My Bookings (User)

**GET** `/bookings/my`

### Purpose

Fetch bookings created by the logged-in user.

### Authorization

Bearer USER_TOKEN

### Response (201)

```json
{
  "count": 2,
  "bookings": [
    {
      "_id": "BOOKING_ID",
      "status": "CONFIRMED",
      "checkIn": "2026-02-10",
      "checkOut": "2026-02-12",
      "totalAmount": 12000,
      "room": {
        "name": "Deluxe Room"
      },
      "payment": {
        "status": "PAID"
      }
    }
  ]
}
```

## 📄 Get Booking Details (User)

**GET** `/bookings/:bookingId`

### Purpose

Fetch booking details for the logged-in user.

### Authorization

Bearer USER_TOKEN

### Response (201)

```json
{
  "booking": {
    "_id": "BOOKING_ID",
    "status": "CONFIRMED",
    "checkIn": "2026-02-10",
    "checkOut": "2026-02-12",
    "totalAmount": 12000,
    "room": {
      "name": "Deluxe Room",
      "pricePerNight": 3000
    },
    "payment": {
      "status": "PAID",
      "razorpayPaymentId": "pay_xxx"
    }
  }
}
```

---

## 9️⃣ Cancel Booking (User/Admin)

**POST** `/bookings/cancel/:bookingId`

### Purpose

Cancel a confirmed booking.

### Authorization

```
Bearer USER or ADMIN TOKEN
```

### Response

```json
{
  "message": "Booking cancelled successfully"
}
```

---

# 💳 PAYMENT APIs

## 🔟 Create Razorpay Order

**POST** `/payments/create-order`

### Purpose

Create Razorpay payment order for a booking.

### Authorization

```
Bearer USER_TOKEN
```

### Body

```json
{
  "bookingId": "BOOKING_ID"
}
```

### Response

```json
{
  "orderId": "order_xxx",
  "amount": 1200000,
  "currency": "INR",
  "key": "RAZORPAY_KEY_ID",
  "paymentId": "PAYMENT_DB_ID"
}
```

---

## 1️⃣1️⃣ Verify Payment (Frontend)

**POST** `/payments/verify`

### Purpose

Verify Razorpay payment signature.

### Body

```json
{
  "razorpayOrderId": "order_xxx",
  "razorpayPaymentId": "pay_xxx",
  "razorpaySignature": "signature_xxx"
}
```

### Response

```json
{
  "message": "Payment verified & booking confirmed"
}
```

---

# 🔔 WEBHOOK

## 1️⃣2️⃣ Razorpay Webhook

**POST** `/payments/webhook`

### Purpose

Server-to-server payment confirmation (source of truth).

⚠️ Called by Razorpay, not frontend.

### Success ACK

```json
{
  "received": true
}
```

---

# 🧑‍💼 ADMIN DASHBOARD APIs

## 🖼️ ROOM IMAGE MANAGEMENT (Admin)

### ➕ Add Images to Room

**POST** `/rooms/:roomId/images`

```json
{
  "images": [
    {
      "url": "https://res.cloudinary.com/demo/image/upload/room2.jpg",
      "public_id": "hotel_rooms/room2"
    }
  ]
}
```

---

### ❌ Delete Room Image

**DELETE** `/rooms/:roomId/images/:imageId`

---

# 🧑‍💼 ADMIN DASHBOARD APIs

## 1️⃣3️⃣ Get All Bookings (Admin)

**GET** `/admin/bookings`

### Purpose

View all bookings with filters.

### Authorization

```
Bearer ADMIN_TOKEN
```

### Query Params (Optional)

```
?status=CONFIRMED
?from=2026-02-01&to=2026-02-10
```

---

## 1️⃣4️⃣ Get Booking Details (Admin)

**GET** `/admin/bookings/:bookingId`

### Purpose

View complete booking details.

---

# ⚠️ ERROR FORMAT (GLOBAL)

All API errors follow this format:

```json
{
  "success": false,
  "message": "Error message"
}
```

---

## ✅ Notes

- All protected routes require **JWT Bearer Token**
- Admin routes require **ADMIN role**
- Webhook uses raw body & signature verification
- Availability is date-based and dynamic
