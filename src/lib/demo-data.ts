// Demo dataset for the TOP SPORTS Manager application.
// All records are scoped to a single assigned facility (data scoping is
// simulated here and must be enforced by the backend later).

export const FACILITY = {
  id: "fac-ahm-01",
  name: "TOP SPORTS — Ahmedabad Sports Centre",
  shortName: "Ahmedabad Sports Centre",
  city: "Ahmedabad, Gujarat",
  hours: "06:00 AM – 11:00 PM",
};

export const MANAGER = {
  name: "Rohan Mehta",
  role: "Facility Manager",
  initials: "RM",
  employeeId: "TS-MGR-1042",
  since: "March 2023",
  facility: FACILITY.name,
  maskedPhone: "99**^^^^^^52",
  reportsTo: "TOP SPORTS Admin Desk",
};

export type Status =
  | "Confirmed"
  | "Completed"
  | "Cancelled"
  | "Pending"
  | "No-show"
  | "In progress";

export type CourtStatus = "Available" | "Occupied" | "Maintenance";

export type Court = {
  id: string;
  name: string;
  sport: string;
  surface: string;
  status: CourtStatus;
  current?: string;
  currentSlot?: string;
  next?: string;
  nextSlot?: string;
  note?: string;
  utilization: number;
  openHours: string;
};

export const courts: Court[] = [
  {
    id: "c1",
    name: "Court 1",
    sport: "Tennis",
    surface: "Synthetic hard",
    status: "Occupied",
    current: "Group Tennis Clinic",
    currentSlot: "6:00–7:00 PM",
    next: "Personal Tennis Coaching",
    nextSlot: "7:00–8:00 PM",
    utilization: 82,
    openHours: "06:00 – 23:00",
  },
  {
    id: "c2",
    name: "Court 2",
    sport: "Tennis",
    surface: "Clay",
    status: "Available",
    next: "Personal Tennis Coaching",
    nextSlot: "6:00–7:00 PM",
    utilization: 64,
    openHours: "06:00 – 23:00",
  },
  {
    id: "c3",
    name: "Court 3",
    sport: "Badminton",
    surface: "Wooden",
    status: "Maintenance",
    note: "Flooring re-polish scheduled by Admin until 9:00 PM",
    utilization: 12,
    openHours: "06:00 – 23:00",
  },
  {
    id: "c4",
    name: "Court 4",
    sport: "Badminton",
    surface: "Synthetic",
    status: "Occupied",
    current: "Junior Badminton Batch",
    currentSlot: "6:30–7:30 PM",
    next: "Open Play",
    nextSlot: "8:00–9:00 PM",
    utilization: 91,
    openHours: "06:00 – 23:00",
  },
  {
    id: "c5",
    name: "Court 5",
    sport: "Box Cricket",
    surface: "Turf",
    status: "Available",
    next: "Corporate Box Cricket",
    nextSlot: "9:00–10:00 PM",
    utilization: 55,
    openHours: "06:00 – 23:00",
  },
];

export type Booking = {
  id: string;
  member: string;
  service: string;
  sport: string;
  coach: string;
  date: string;
  day: "Today" | "Tomorrow" | "This Week" | "Past";
  time: string;
  duration: string;
  facility: string;
  status: Status;
  payment: "Paid" | "Pending" | "Failed" | "Refunded";
  amount: number;
  mode: "Online" | "Cash";
  maskedPhone: string;
  notes?: string;
};

export const bookings: Booking[] = [
  {
    id: "TSB-24817",
    member: "John Smith",
    service: "Personal Tennis Coaching",
    sport: "Tennis",
    coach: "Alex Morgan",
    date: "23 Aug 2026",
    day: "Today",
    time: "06:00 PM",
    duration: "60 min",
    facility: "Court 2",
    status: "Confirmed",
    payment: "Paid",
    amount: 2000,
    mode: "Online",
    maskedPhone: "99**^^^^^^52",
  },
  {
    id: "TSB-24818",
    member: "Sarah Patel",
    service: "Group Tennis Clinic",
    sport: "Tennis",
    coach: "Sarah Wilson",
    date: "23 Aug 2026",
    day: "Today",
    time: "06:00 PM",
    duration: "60 min",
    facility: "Court 1",
    status: "In progress",
    payment: "Paid",
    amount: 1200,
    mode: "Online",
    maskedPhone: "98**^^^^^^17",
  },
  {
    id: "TSB-24819",
    member: "David Shah",
    service: "Junior Badminton Batch",
    sport: "Badminton",
    coach: "David Lee",
    date: "23 Aug 2026",
    day: "Today",
    time: "06:30 PM",
    duration: "60 min",
    facility: "Court 4",
    status: "In progress",
    payment: "Pending",
    amount: 900,
    mode: "Cash",
    maskedPhone: "97**^^^^^^08",
  },
  {
    id: "TSB-24820",
    member: "Emma Wilson",
    service: "Badminton Skill Session",
    sport: "Badminton",
    coach: "Emma Taylor",
    date: "23 Aug 2026",
    day: "Today",
    time: "07:30 PM",
    duration: "45 min",
    facility: "Court 4",
    status: "Confirmed",
    payment: "Paid",
    amount: 1500,
    mode: "Online",
    maskedPhone: "96**^^^^^^41",
  },
  {
    id: "TSB-24821",
    member: "Rahul Desai",
    service: "Corporate Box Cricket",
    sport: "Box Cricket",
    coach: "—",
    date: "23 Aug 2026",
    day: "Today",
    time: "09:00 PM",
    duration: "60 min",
    facility: "Court 5",
    status: "Confirmed",
    payment: "Pending",
    amount: 3500,
    mode: "Cash",
    maskedPhone: "90**^^^^^^73",
  },
  {
    id: "TSB-24810",
    member: "Priya Nair",
    service: "Personal Tennis Coaching",
    sport: "Tennis",
    coach: "Alex Morgan",
    date: "23 Aug 2026",
    day: "Today",
    time: "08:00 AM",
    duration: "60 min",
    facility: "Court 1",
    status: "Completed",
    payment: "Paid",
    amount: 2000,
    mode: "Online",
    maskedPhone: "93**^^^^^^26",
  },
  {
    id: "TSB-24811",
    member: "Karan Joshi",
    service: "Fitness & Conditioning",
    sport: "Fitness",
    coach: "Sarah Wilson",
    date: "23 Aug 2026",
    day: "Today",
    time: "09:00 AM",
    duration: "45 min",
    facility: "Court 5",
    status: "No-show",
    payment: "Paid",
    amount: 1100,
    mode: "Online",
    maskedPhone: "95**^^^^^^64",
  },
  {
    id: "TSB-24812",
    member: "Neha Kapoor",
    service: "Group Tennis Clinic",
    sport: "Tennis",
    coach: "Sarah Wilson",
    date: "23 Aug 2026",
    day: "Today",
    time: "10:00 AM",
    duration: "60 min",
    facility: "Court 2",
    status: "Cancelled",
    payment: "Refunded",
    amount: 1200,
    mode: "Online",
    maskedPhone: "99**^^^^^^30",
    notes: "Cancelled by member 3 hours before slot.",
  },
  {
    id: "TSB-24830",
    member: "John Smith",
    service: "Personal Tennis Coaching",
    sport: "Tennis",
    coach: "Alex Morgan",
    date: "24 Aug 2026",
    day: "Tomorrow",
    time: "07:00 AM",
    duration: "60 min",
    facility: "Court 2",
    status: "Confirmed",
    payment: "Paid",
    amount: 2000,
    mode: "Online",
    maskedPhone: "99**^^^^^^52",
  },
  {
    id: "TSB-24831",
    member: "Aditi Rao",
    service: "Badminton Skill Session",
    sport: "Badminton",
    coach: "Emma Taylor",
    date: "24 Aug 2026",
    day: "Tomorrow",
    time: "06:30 PM",
    duration: "45 min",
    facility: "Court 4",
    status: "Confirmed",
    payment: "Pending",
    amount: 1500,
    mode: "Cash",
    maskedPhone: "94**^^^^^^11",
  },
  {
    id: "TSB-24840",
    member: "David Shah",
    service: "Junior Badminton Batch",
    sport: "Badminton",
    coach: "David Lee",
    date: "26 Aug 2026",
    day: "This Week",
    time: "06:30 PM",
    duration: "60 min",
    facility: "Court 4",
    status: "Confirmed",
    payment: "Paid",
    amount: 900,
    mode: "Online",
    maskedPhone: "97**^^^^^^08",
  },
  {
    id: "TSB-24841",
    member: "Meera Iyer",
    service: "Fitness & Conditioning",
    sport: "Fitness",
    coach: "Sarah Wilson",
    date: "27 Aug 2026",
    day: "This Week",
    time: "07:00 AM",
    duration: "45 min",
    facility: "Court 5",
    status: "Confirmed",
    payment: "Paid",
    amount: 1100,
    mode: "Online",
    maskedPhone: "98**^^^^^^88",
  },
];

export const todaysBookings = bookings.filter((b) => b.day === "Today");

export type Coach = {
  id: string;
  name: string;
  initials: string;
  sport: string;
  services: string[];
  todaySessions: number;
  upcomingSessions: number;
  availability: "On duty" | "Off duty" | "On leave";
  shift: string;
  experience: string;
  rating: number;
  utilization: number;
};

export const coaches: Coach[] = [
  {
    id: "co1",
    name: "Alex Morgan",
    initials: "AM",
    sport: "Tennis",
    services: ["Personal Tennis Coaching", "Advanced Match Play"],
    todaySessions: 5,
    upcomingSessions: 12,
    availability: "On duty",
    shift: "06:00 AM – 02:00 PM",
    experience: "9 years",
    rating: 4.8,
    utilization: 86,
  },
  {
    id: "co2",
    name: "Sarah Wilson",
    initials: "SW",
    sport: "Tennis / Fitness",
    services: ["Group Tennis Clinic", "Fitness & Conditioning"],
    todaySessions: 4,
    upcomingSessions: 9,
    availability: "On duty",
    shift: "08:00 AM – 04:00 PM",
    experience: "6 years",
    rating: 4.6,
    utilization: 74,
  },
  {
    id: "co3",
    name: "David Lee",
    initials: "DL",
    sport: "Badminton",
    services: ["Junior Badminton Batch", "Doubles Strategy"],
    todaySessions: 6,
    upcomingSessions: 15,
    availability: "On duty",
    shift: "02:00 PM – 10:00 PM",
    experience: "11 years",
    rating: 4.9,
    utilization: 92,
  },
  {
    id: "co4",
    name: "Emma Taylor",
    initials: "ET",
    sport: "Badminton",
    services: ["Badminton Skill Session"],
    todaySessions: 3,
    upcomingSessions: 7,
    availability: "Off duty",
    shift: "04:00 PM – 10:00 PM",
    experience: "4 years",
    rating: 4.5,
    utilization: 58,
  },
];

export type Member = {
  id: string;
  name: string;
  initials: string;
  sport: string;
  membership: "Annual" | "Quarterly" | "Monthly" | "Day pass";
  totalBookings: number;
  lastVisit: string;
  upcoming?: string;
  services: string[];
  facilityUsage: string;
  status: "Active" | "Inactive";
};

export const members: Member[] = [
  {
    id: "m1",
    name: "John Smith",
    initials: "JS",
    sport: "Tennis",
    membership: "Annual",
    totalBookings: 64,
    lastVisit: "23 Aug 2026",
    upcoming: "24 Aug 2026 · 07:00 AM · Court 2",
    services: ["Personal Tennis Coaching"],
    facilityUsage: "Court 1, Court 2",
    status: "Active",
  },
  {
    id: "m2",
    name: "Sarah Patel",
    initials: "SP",
    sport: "Tennis",
    membership: "Quarterly",
    totalBookings: 28,
    lastVisit: "23 Aug 2026",
    upcoming: "25 Aug 2026 · 06:00 PM · Court 1",
    services: ["Group Tennis Clinic"],
    facilityUsage: "Court 1",
    status: "Active",
  },
  {
    id: "m3",
    name: "David Shah",
    initials: "DS",
    sport: "Badminton",
    membership: "Monthly",
    totalBookings: 41,
    lastVisit: "23 Aug 2026",
    upcoming: "26 Aug 2026 · 06:30 PM · Court 4",
    services: ["Junior Badminton Batch"],
    facilityUsage: "Court 3, Court 4",
    status: "Active",
  },
  {
    id: "m4",
    name: "Emma Wilson",
    initials: "EW",
    sport: "Badminton",
    membership: "Annual",
    totalBookings: 52,
    lastVisit: "23 Aug 2026",
    upcoming: "23 Aug 2026 · 07:30 PM · Court 4",
    services: ["Badminton Skill Session"],
    facilityUsage: "Court 4",
    status: "Active",
  },
  {
    id: "m5",
    name: "Rahul Desai",
    initials: "RD",
    sport: "Box Cricket",
    membership: "Day pass",
    totalBookings: 6,
    lastVisit: "18 Aug 2026",
    upcoming: "23 Aug 2026 · 09:00 PM · Court 5",
    services: ["Corporate Box Cricket"],
    facilityUsage: "Court 5",
    status: "Active",
  },
  {
    id: "m6",
    name: "Priya Nair",
    initials: "PN",
    sport: "Tennis",
    membership: "Quarterly",
    totalBookings: 19,
    lastVisit: "23 Aug 2026",
    services: ["Personal Tennis Coaching"],
    facilityUsage: "Court 1",
    status: "Active",
  },
  {
    id: "m7",
    name: "Karan Joshi",
    initials: "KJ",
    sport: "Fitness",
    membership: "Monthly",
    totalBookings: 11,
    lastVisit: "23 Aug 2026",
    services: ["Fitness & Conditioning"],
    facilityUsage: "Court 5",
    status: "Inactive",
  },
  {
    id: "m8",
    name: "Neha Kapoor",
    initials: "NK",
    sport: "Tennis",
    membership: "Monthly",
    totalBookings: 23,
    lastVisit: "20 Aug 2026",
    services: ["Group Tennis Clinic"],
    facilityUsage: "Court 2",
    status: "Active",
  },
];

export type Service = {
  id: string;
  name: string;
  sport: string;
  duration: string;
  rate: number;
  provider: string;
  availability: "Available" | "Fully booked" | "Limited";
  status: "Active" | "Paused";
  bookedToday: number;
};

export const services: Service[] = [
  {
    id: "s1",
    name: "Personal Tennis Coaching",
    sport: "Tennis",
    duration: "60 min",
    rate: 2000,
    provider: "Alex Morgan",
    availability: "Available",
    status: "Active",
    bookedToday: 6,
  },
  {
    id: "s2",
    name: "Group Tennis Clinic",
    sport: "Tennis",
    duration: "60 min",
    rate: 1200,
    provider: "Sarah Wilson",
    availability: "Limited",
    status: "Active",
    bookedToday: 9,
  },
  {
    id: "s3",
    name: "Junior Badminton Batch",
    sport: "Badminton",
    duration: "60 min",
    rate: 900,
    provider: "David Lee",
    availability: "Fully booked",
    status: "Active",
    bookedToday: 14,
  },
  {
    id: "s4",
    name: "Badminton Skill Session",
    sport: "Badminton",
    duration: "45 min",
    rate: 1500,
    provider: "Emma Taylor",
    availability: "Available",
    status: "Active",
    bookedToday: 5,
  },
  {
    id: "s5",
    name: "Fitness & Conditioning",
    sport: "Fitness",
    duration: "45 min",
    rate: 1100,
    provider: "Sarah Wilson",
    availability: "Available",
    status: "Active",
    bookedToday: 4,
  },
  {
    id: "s6",
    name: "Corporate Box Cricket",
    sport: "Box Cricket",
    duration: "60 min",
    rate: 3500,
    provider: "Facility",
    availability: "Limited",
    status: "Active",
    bookedToday: 4,
  },
];

export type Payment = {
  id: string;
  bookingId: string;
  member: string;
  service: string;
  amount: number;
  mode: "Cash" | "Online";
  status: "Completed" | "Pending" | "Failed";
  time: string;
};

export const payments: Payment[] = [
  {
    id: "TXN-90211",
    bookingId: "TSB-24810",
    member: "Priya Nair",
    service: "Personal Tennis Coaching",
    amount: 2000,
    mode: "Online",
    status: "Completed",
    time: "08:05 AM",
  },
  {
    id: "TXN-90212",
    bookingId: "TSB-24811",
    member: "Karan Joshi",
    service: "Fitness & Conditioning",
    amount: 1100,
    mode: "Online",
    status: "Completed",
    time: "09:02 AM",
  },
  {
    id: "TXN-90218",
    bookingId: "TSB-24817",
    member: "John Smith",
    service: "Personal Tennis Coaching",
    amount: 2000,
    mode: "Online",
    status: "Completed",
    time: "05:41 PM",
  },
  {
    id: "TXN-90219",
    bookingId: "TSB-24818",
    member: "Sarah Patel",
    service: "Group Tennis Clinic",
    amount: 1200,
    mode: "Cash",
    status: "Completed",
    time: "05:52 PM",
  },
  {
    id: "TXN-90220",
    bookingId: "TSB-24819",
    member: "David Shah",
    service: "Junior Badminton Batch",
    amount: 900,
    mode: "Cash",
    status: "Pending",
    time: "06:20 PM",
  },
  {
    id: "TXN-90221",
    bookingId: "TSB-24821",
    member: "Rahul Desai",
    service: "Corporate Box Cricket",
    amount: 3500,
    mode: "Cash",
    status: "Pending",
    time: "06:35 PM",
  },
  {
    id: "TXN-90222",
    bookingId: "TSB-24820",
    member: "Emma Wilson",
    service: "Badminton Skill Session",
    amount: 1500,
    mode: "Online",
    status: "Failed",
    time: "06:44 PM",
  },
];

export const revenueToday = {
  total: 42500,
  cash: 18500,
  online: 24000,
  pending: 8400,
  failed: 1500,
  transactions: 63,
};

export const hourlyRevenue = [
  { hour: "6 AM", revenue: 2400 },
  { hour: "8 AM", revenue: 5200 },
  { hour: "10 AM", revenue: 3800 },
  { hour: "12 PM", revenue: 2100 },
  { hour: "2 PM", revenue: 3300 },
  { hour: "4 PM", revenue: 6400 },
  { hour: "6 PM", revenue: 10600 },
  { hour: "8 PM", revenue: 8700 },
];

export const bookingsByHour = [
  { hour: "6 AM", bookings: 4 },
  { hour: "8 AM", bookings: 7 },
  { hour: "10 AM", bookings: 3 },
  { hour: "12 PM", bookings: 2 },
  { hour: "2 PM", bookings: 4 },
  { hour: "4 PM", bookings: 6 },
  { hour: "6 PM", bookings: 11 },
  { hour: "8 PM", bookings: 5 },
];

export const weeklyBookings = [
  { day: "Mon", bookings: 34, completed: 30 },
  { day: "Tue", bookings: 38, completed: 35 },
  { day: "Wed", bookings: 41, completed: 37 },
  { day: "Thu", bookings: 36, completed: 33 },
  { day: "Fri", bookings: 45, completed: 41 },
  { day: "Sat", bookings: 52, completed: 49 },
  { day: "Sun", bookings: 42, completed: 38 },
];

export const utilizationByCourt = courts.map((c) => ({
  court: c.name,
  utilization: c.utilization,
}));

export const popularServices = [
  { name: "Junior Badminton Batch", value: 34 },
  { name: "Personal Tennis Coaching", value: 27 },
  { name: "Group Tennis Clinic", value: 19 },
  { name: "Fitness & Conditioning", value: 12 },
  { name: "Corporate Box Cricket", value: 8 },
];

export type CafeOrder = {
  id: string;
  customer: string;
  items: { name: string; qty: number; price: number }[];
  amount: number;
  status: "Pending" | "Preparing" | "Completed" | "Cancelled";
  time: string;
  mode: "Cash" | "Online";
};

export const cafeOrders: CafeOrder[] = [
  {
    id: "CAF-3391",
    customer: "John Smith",
    items: [
      { name: "Electrolyte Drink", qty: 2, price: 120 },
      { name: "Protein Bar", qty: 1, price: 180 },
    ],
    amount: 420,
    status: "Completed",
    time: "05:58 PM",
    mode: "Online",
  },
  {
    id: "CAF-3392",
    customer: "Sarah Patel",
    items: [{ name: "Cold Coffee", qty: 1, price: 160 }],
    amount: 160,
    status: "Preparing",
    time: "06:12 PM",
    mode: "Cash",
  },
  {
    id: "CAF-3393",
    customer: "David Shah",
    items: [
      { name: "Grilled Sandwich", qty: 1, price: 220 },
      { name: "Lemon Iced Tea", qty: 2, price: 110 },
    ],
    amount: 440,
    status: "Pending",
    time: "06:24 PM",
    mode: "Cash",
  },
  {
    id: "CAF-3394",
    customer: "Emma Wilson",
    items: [{ name: "Fruit Bowl", qty: 1, price: 190 }],
    amount: 190,
    status: "Completed",
    time: "06:31 PM",
    mode: "Online",
  },
  {
    id: "CAF-3395",
    customer: "Rahul Desai",
    items: [{ name: "Masala Chai", qty: 4, price: 60 }],
    amount: 240,
    status: "Cancelled",
    time: "06:40 PM",
    mode: "Cash",
  },
  {
    id: "CAF-3396",
    customer: "Meera Iyer",
    items: [
      { name: "Protein Shake", qty: 1, price: 260 },
      { name: "Banana", qty: 2, price: 30 },
    ],
    amount: 320,
    status: "Preparing",
    time: "06:47 PM",
    mode: "Online",
  },
];

export const cafeSnapshot = {
  orders: cafeOrders.length,
  sales: cafeOrders
    .filter((o) => o.status !== "Cancelled")
    .reduce((s, o) => s + o.amount, 0),
  pending: cafeOrders.filter((o) => o.status === "Pending").length,
  cancelled: cafeOrders.filter((o) => o.status === "Cancelled").length,
};

export type Notification = {
  id: string;
  title: string;
  detail: string;
  category: "Booking" | "Facility" | "Coach" | "Payment" | "Café" | "System";
  severity: "Critical" | "Important" | "Info";
  time: string;
  read: boolean;
};

export const notifications: Notification[] = [
  {
    id: "n1",
    title: "Booking conflict detected",
    detail:
      "Two bookings appear to overlap on Court 2 at 6:00 PM (TSB-24817 and a walk-in slot hold).",
    category: "Booking",
    severity: "Critical",
    time: "10 min ago",
    read: false,
  },
  {
    id: "n2",
    title: "Court 3 under maintenance",
    detail:
      "Flooring re-polish is in progress on Court 3 and the court stays blocked until 9:00 PM.",
    category: "Facility",
    severity: "Important",
    time: "42 min ago",
    read: false,
  },
  {
    id: "n3",
    title: "Payment failed",
    detail:
      "Online payment of ₹1,500 for booking TSB-24820 (Emma Wilson) failed at the gateway.",
    category: "Payment",
    severity: "Critical",
    time: "1 hr ago",
    read: false,
  },
  {
    id: "n4",
    title: "Coach unavailable tomorrow",
    detail:
      "Emma Taylor is marked off duty for the 4:00 PM – 10:00 PM shift tomorrow.",
    category: "Coach",
    severity: "Important",
    time: "2 hrs ago",
    read: true,
  },
  {
    id: "n5",
    title: "Booking cancelled",
    detail:
      "Neha Kapoor cancelled the 10:00 AM Group Tennis Clinic on Court 2. Refund processed by Admin.",
    category: "Booking",
    severity: "Info",
    time: "5 hrs ago",
    read: true,
  },
  {
    id: "n6",
    title: "Café order cancelled",
    detail: "Order CAF-3395 (₹240) was cancelled at the counter.",
    category: "Café",
    severity: "Info",
    time: "6 hrs ago",
    read: true,
  },
  {
    id: "n7",
    title: "Scheduled maintenance reminder",
    detail:
      "Quarterly net replacement for Court 4 is planned for 30 Aug 2026 by the Admin operations team.",
    category: "System",
    severity: "Info",
    time: "Yesterday",
    read: true,
  },
];

export type ScheduleEvent = {
  id: string;
  court: string;
  start: number; // hour, 24h
  duration: number; // hours
  title: string;
  member: string;
  coach: string;
  status: Status | "Maintenance";
  bookingId?: string;
};

export const scheduleDay: ScheduleEvent[] = [
  {
    id: "e1",
    court: "Court 1",
    start: 8,
    duration: 1,
    title: "Personal Tennis Coaching",
    member: "Priya Nair",
    coach: "Alex Morgan",
    status: "Completed",
    bookingId: "TSB-24810",
  },
  {
    id: "e2",
    court: "Court 5",
    start: 9,
    duration: 1,
    title: "Fitness & Conditioning",
    member: "Karan Joshi",
    coach: "Sarah Wilson",
    status: "No-show",
    bookingId: "TSB-24811",
  },
  {
    id: "e3",
    court: "Court 1",
    start: 18,
    duration: 1,
    title: "Group Tennis Clinic",
    member: "Sarah Patel",
    coach: "Sarah Wilson",
    status: "In progress",
    bookingId: "TSB-24818",
  },
  {
    id: "e4",
    court: "Court 2",
    start: 18,
    duration: 1,
    title: "Personal Tennis Coaching",
    member: "John Smith",
    coach: "Alex Morgan",
    status: "Confirmed",
    bookingId: "TSB-24817",
  },
  {
    id: "e5",
    court: "Court 4",
    start: 18,
    duration: 1,
    title: "Junior Badminton Batch",
    member: "David Shah",
    coach: "David Lee",
    status: "In progress",
    bookingId: "TSB-24819",
  },
  {
    id: "e6",
    court: "Court 4",
    start: 19,
    duration: 1,
    title: "Badminton Skill Session",
    member: "Emma Wilson",
    coach: "Emma Taylor",
    status: "Confirmed",
    bookingId: "TSB-24820",
  },
  {
    id: "e7",
    court: "Court 3",
    start: 17,
    duration: 4,
    title: "Maintenance — flooring re-polish",
    member: "—",
    coach: "—",
    status: "Maintenance",
  },
  {
    id: "e8",
    court: "Court 5",
    start: 21,
    duration: 1,
    title: "Corporate Box Cricket",
    member: "Rahul Desai",
    coach: "—",
    status: "Confirmed",
    bookingId: "TSB-24821",
  },
];

export const weekLoad = [
  { day: "Mon 24", slots: 34, capacity: 60 },
  { day: "Tue 25", slots: 38, capacity: 60 },
  { day: "Wed 26", slots: 41, capacity: 60 },
  { day: "Thu 27", slots: 36, capacity: 60 },
  { day: "Fri 28", slots: 45, capacity: 60 },
  { day: "Sat 29", slots: 52, capacity: 60 },
  { day: "Sun 30", slots: 42, capacity: 60 },
];

export const inr = (n: number) =>
  "₹" + n.toLocaleString("en-IN", { maximumFractionDigits: 0 });
