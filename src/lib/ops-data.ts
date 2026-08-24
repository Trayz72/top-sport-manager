// Additional operational demo datasets for the TOP SPORTS Manager application.
// Everything here is scoped to the manager's assigned facility (FACILITY).

export type Membership = {
  id: string;
  member: string;
  initials: string;
  plan: "Annual Club Pass" | "Quarterly Pass" | "Monthly Pass" | "Corporate Pass" | "Junior Pass";
  sport: string;
  start: string;
  expiry: string;
  status: "Active" | "Expiring soon" | "Expired" | "Paused";
  visitsUsed: number;
  visitsIncluded: number | "Unlimited";
  lastVisit: string;
  maskedPhone: string;
  benefits: string[];
};

export const memberships: Membership[] = [
  {
    id: "mp1",
    member: "John Smith",
    initials: "JS",
    plan: "Annual Club Pass",
    sport: "Tennis",
    start: "12 Apr 2025",
    expiry: "11 Apr 2026",
    status: "Active",
    visitsUsed: 168,
    visitsIncluded: "Unlimited",
    lastVisit: "Today, 6:10 PM",
    maskedPhone: "99**^^^^^^52",
    benefits: ["Unlimited court access", "10% café discount", "Guest pass ×4"],
  },
  {
    id: "mp2",
    member: "Priya Nair",
    initials: "PN",
    plan: "Quarterly Pass",
    sport: "Badminton",
    start: "01 Jun 2025",
    expiry: "31 Aug 2025",
    status: "Expiring soon",
    visitsUsed: 34,
    visitsIncluded: 40,
    lastVisit: "Yesterday, 7:00 AM",
    maskedPhone: "98**^^^^^^17",
    benefits: ["40 court visits", "Locker allotment"],
  },
  {
    id: "mp3",
    member: "Arjun Desai",
    initials: "AD",
    plan: "Monthly Pass",
    sport: "Cricket",
    start: "05 Aug 2025",
    expiry: "04 Sep 2025",
    status: "Active",
    visitsUsed: 9,
    visitsIncluded: 16,
    lastVisit: "21 Aug, 8:00 PM",
    maskedPhone: "97**^^^^^^08",
    benefits: ["16 net sessions", "Equipment hire included"],
  },
  {
    id: "mp4",
    member: "Meera Shah",
    initials: "MS",
    plan: "Junior Pass",
    sport: "Swimming",
    start: "15 Jan 2025",
    expiry: "14 Jul 2025",
    status: "Expired",
    visitsUsed: 52,
    visitsIncluded: 60,
    lastVisit: "12 Jul, 5:30 PM",
    maskedPhone: "96**^^^^^^41",
    benefits: ["Junior coaching batch", "Pool access before 6 PM"],
  },
  {
    id: "mp5",
    member: "Rahul Verma",
    initials: "RV",
    plan: "Corporate Pass",
    sport: "Football",
    start: "01 Mar 2025",
    expiry: "28 Feb 2026",
    status: "Active",
    visitsUsed: 76,
    visitsIncluded: "Unlimited",
    lastVisit: "Today, 7:45 AM",
    maskedPhone: "95**^^^^^^30",
    benefits: ["Corporate turf slots", "Priority weekend booking"],
  },
  {
    id: "mp6",
    member: "Kavita Iyer",
    initials: "KI",
    plan: "Quarterly Pass",
    sport: "Tennis",
    start: "10 Jul 2025",
    expiry: "09 Oct 2025",
    status: "Paused",
    visitsUsed: 12,
    visitsIncluded: 40,
    lastVisit: "02 Aug, 6:00 PM",
    maskedPhone: "94**^^^^^^88",
    benefits: ["40 court visits", "2 coaching sessions"],
  },
  {
    id: "mp7",
    member: "Sanjay Patel",
    initials: "SP",
    plan: "Annual Club Pass",
    sport: "Badminton",
    start: "20 Feb 2025",
    expiry: "19 Feb 2026",
    status: "Active",
    visitsUsed: 121,
    visitsIncluded: "Unlimited",
    lastVisit: "22 Aug, 9:00 PM",
    maskedPhone: "93**^^^^^^64",
    benefits: ["Unlimited court access", "Locker allotment"],
  },
  {
    id: "mp8",
    member: "Ananya Rao",
    initials: "AR",
    plan: "Monthly Pass",
    sport: "Swimming",
    start: "18 Jul 2025",
    expiry: "17 Aug 2025",
    status: "Expired",
    visitsUsed: 15,
    visitsIncluded: 16,
    lastVisit: "16 Aug, 6:30 AM",
    maskedPhone: "92**^^^^^^19",
    benefits: ["16 pool sessions"],
  },
];

export type AttendanceRecord = {
  id: string;
  member: string;
  initials: string;
  booking: string;
  sport: string;
  coach: string;
  facility: string;
  session: string;
  checkIn: string | null;
  status: "Checked in" | "Attended" | "Not checked in" | "No-show" | "Cancelled";
  date: string;
  note?: string;
};

export const attendance: AttendanceRecord[] = [
  {
    id: "at1",
    member: "John Smith",
    initials: "JS",
    booking: "BK-2418",
    sport: "Tennis",
    coach: "Vikram Singh",
    facility: "Court 1",
    session: "6:00–7:00 PM",
    checkIn: "5:52 PM",
    status: "Checked in",
    date: "Today",
  },
  {
    id: "at2",
    member: "Priya Nair",
    initials: "PN",
    booking: "BK-2419",
    sport: "Badminton",
    coach: "Neha Kulkarni",
    facility: "Court 4",
    session: "7:00–8:00 AM",
    checkIn: "6:58 AM",
    status: "Attended",
    date: "Today",
  },
  {
    id: "at3",
    member: "Arjun Desai",
    initials: "AD",
    booking: "BK-2421",
    sport: "Cricket",
    coach: "Imran Shaikh",
    facility: "Net 2",
    session: "8:00–9:00 PM",
    checkIn: null,
    status: "Not checked in",
    date: "Today",
  },
  {
    id: "at4",
    member: "Meera Shah",
    initials: "MS",
    booking: "BK-2409",
    sport: "Swimming",
    coach: "Ritu Sharma",
    facility: "Pool Lane 3",
    session: "5:30–6:30 PM",
    checkIn: null,
    status: "No-show",
    date: "Today",
    note: "Front desk called; no response.",
  },
  {
    id: "at5",
    member: "Rahul Verma",
    initials: "RV",
    booking: "BK-2402",
    sport: "Football",
    coach: "Imran Shaikh",
    facility: "Turf A",
    session: "7:00–8:30 AM",
    checkIn: "6:49 AM",
    status: "Attended",
    date: "Today",
  },
  {
    id: "at6",
    member: "Kavita Iyer",
    initials: "KI",
    booking: "BK-2425",
    sport: "Tennis",
    coach: "Vikram Singh",
    facility: "Court 2",
    session: "9:00–10:00 PM",
    checkIn: null,
    status: "Cancelled",
    date: "Today",
    note: "Cancelled by Admin — coach unavailable.",
  },
  {
    id: "at7",
    member: "Sanjay Patel",
    initials: "SP",
    booking: "BK-2398",
    sport: "Badminton",
    coach: "Neha Kulkarni",
    facility: "Court 5",
    session: "8:00–9:00 PM",
    checkIn: "7:55 PM",
    status: "Attended",
    date: "Yesterday",
  },
  {
    id: "at8",
    member: "Ananya Rao",
    initials: "AR",
    booking: "BK-2395",
    sport: "Swimming",
    coach: "Ritu Sharma",
    facility: "Pool Lane 1",
    session: "6:30–7:30 AM",
    checkIn: null,
    status: "No-show",
    date: "Yesterday",
  },
];

export type Resource = {
  id: string;
  name: string;
  type: "Locker" | "Parking" | "Equipment room" | "Studio" | "Other";
  status: "Available" | "Occupied" | "Reserved" | "Maintenance" | "Unavailable";
  availability: string;
  current?: string;
  next?: string;
  maintenance: string;
};

export const resources: Resource[] = [
  {
    id: "r1",
    name: "Locker Bank A (01–40)",
    type: "Locker",
    status: "Occupied",
    availability: "12 of 40 free",
    current: "28 lockers allotted to members",
    next: "Daily reset 11:30 PM",
    maintenance: "Serviced 12 Aug 2025",
  },
  {
    id: "r2",
    name: "Locker Bank B (41–80)",
    type: "Locker",
    status: "Available",
    availability: "31 of 40 free",
    current: "9 lockers in use",
    next: "Daily reset 11:30 PM",
    maintenance: "Serviced 12 Aug 2025",
  },
  {
    id: "r3",
    name: "Basement Parking",
    type: "Parking",
    status: "Occupied",
    availability: "8 of 60 bays free",
    current: "Evening peak",
    next: "Clears after 10:00 PM",
    maintenance: "No open tickets",
  },
  {
    id: "r4",
    name: "Visitor Parking",
    type: "Parking",
    status: "Reserved",
    availability: "Reserved for event guests",
    current: "Summer Slam registrations",
    next: "Open to members from 9:00 PM",
    maintenance: "No open tickets",
  },
  {
    id: "r5",
    name: "Equipment Store",
    type: "Equipment room",
    status: "Available",
    availability: "Open 06:00 – 22:30",
    current: "Attendant on duty",
    next: "Stock audit Fri 28 Aug",
    maintenance: "No open tickets",
  },
  {
    id: "r6",
    name: "Fitness Studio",
    type: "Studio",
    status: "Maintenance",
    availability: "Closed until 26 Aug",
    current: "Flooring replacement",
    next: "Reopens 26 Aug, 6:00 AM",
    maintenance: "Vendor visit scheduled by Admin",
  },
  {
    id: "r7",
    name: "Shower Block 2",
    type: "Other",
    status: "Unavailable",
    availability: "Out of service",
    current: "Plumbing repair",
    next: "Estimate pending from Admin",
    maintenance: "Ticket MT-118 open",
  },
];

export type ClubEvent = {
  id: string;
  name: string;
  sport: string;
  date: string;
  time: string;
  location: string;
  capacity: number;
  registrations: number;
  status: "Upcoming" | "Registrations open" | "Fully booked" | "Completed" | "Cancelled";
  description: string;
  organiser: string;
};

export const events: ClubEvent[] = [
  {
    id: "ev1",
    name: "Summer Slam Tennis Open",
    sport: "Tennis",
    date: "30 Aug 2025",
    time: "8:00 AM – 6:00 PM",
    location: "Courts 1–3",
    capacity: 48,
    registrations: 41,
    status: "Registrations open",
    description:
      "Singles knockout across three age brackets. Courts 1–3 blocked for the full day; regular bookings paused by Admin.",
    organiser: "TOP SPORTS Admin Desk",
  },
  {
    id: "ev2",
    name: "Junior Badminton Camp",
    sport: "Badminton",
    date: "02 Sep 2025",
    time: "4:00 PM – 6:00 PM",
    location: "Courts 4–6",
    capacity: 30,
    registrations: 30,
    status: "Fully booked",
    description: "Five-day skills camp for under-14 members led by Coach Neha Kulkarni.",
    organiser: "Coaching Department",
  },
  {
    id: "ev3",
    name: "Corporate Football Night",
    sport: "Football",
    date: "06 Sep 2025",
    time: "7:00 PM – 11:00 PM",
    location: "Turf A",
    capacity: 80,
    registrations: 52,
    status: "Upcoming",
    description: "Eight-team 5-a-side league for corporate pass holders. Café extended to midnight.",
    organiser: "TOP SPORTS Admin Desk",
  },
  {
    id: "ev4",
    name: "Swim Time Trials",
    sport: "Swimming",
    date: "14 Sep 2025",
    time: "6:00 AM – 9:00 AM",
    location: "Main Pool",
    capacity: 40,
    registrations: 12,
    status: "Registrations open",
    description: "Timed 50m and 100m trials for the inter-club squad selection.",
    organiser: "Coaching Department",
  },
  {
    id: "ev5",
    name: "Independence Day Cricket Sixes",
    sport: "Cricket",
    date: "15 Aug 2025",
    time: "9:00 AM – 5:00 PM",
    location: "Main Ground",
    capacity: 96,
    registrations: 96,
    status: "Completed",
    description: "Twelve-team sixes tournament. Final attendance 96 players, 180+ spectators.",
    organiser: "TOP SPORTS Admin Desk",
  },
];

export type Announcement = {
  id: string;
  title: string;
  category: "Facility" | "Timing" | "Maintenance" | "Coaching" | "General";
  date: string;
  preview: string;
  body: string;
  status: "Published" | "Expired";
  author: string;
};

export const announcements: Announcement[] = [
  {
    id: "an1",
    title: "Court 3 closed for resurfacing",
    category: "Maintenance",
    date: "22 Aug 2025",
    preview: "Court 3 will remain closed from 25–27 August for synthetic resurfacing.",
    body:
      "Court 3 will be closed from Monday 25 August to Wednesday 27 August for synthetic resurfacing. Affected bookings have been moved to Courts 1 and 2 by the Admin desk. Please direct member queries to the front desk and do not accept new bookings for Court 3 during this window.",
    status: "Published",
    author: "TOP SPORTS Admin Desk",
  },
  {
    id: "an2",
    title: "Revised holiday timings — Ganesh Chaturthi",
    category: "Timing",
    date: "20 Aug 2025",
    preview: "The centre will operate 07:00 AM – 09:00 PM on 27 August.",
    body:
      "On account of Ganesh Chaturthi, the centre will operate on reduced hours (07:00 AM – 09:00 PM) on Wednesday 27 August. Café service closes at 08:30 PM. Coaching batches after 8:00 PM stand rescheduled by Admin.",
    status: "Published",
    author: "TOP SPORTS Admin Desk",
  },
  {
    id: "an3",
    title: "New advanced badminton programme",
    category: "Coaching",
    date: "18 Aug 2025",
    preview: "A new advanced batch starts 1 September, Tue/Thu 7:00–8:30 PM.",
    body:
      "An advanced badminton programme for intermediate and above players begins on 1 September. Batches run Tuesday and Thursday, 7:00–8:30 PM on Courts 5 and 6 with Coach Neha Kulkarni. Registration is handled centrally by Admin.",
    status: "Published",
    author: "Coaching Department",
  },
  {
    id: "an4",
    title: "Pool water treatment cycle",
    category: "Facility",
    date: "12 Aug 2025",
    preview: "Main pool was unavailable 14 August, 6:00 AM – 12:00 PM.",
    body:
      "The main pool underwent its quarterly water treatment cycle on 14 August between 6:00 AM and 12:00 PM. Normal swimming sessions resumed the same afternoon.",
    status: "Expired",
    author: "Facility Operations",
  },
  {
    id: "an5",
    title: "Member ID mandatory at entry",
    category: "General",
    date: "05 Aug 2025",
    preview: "All members must present a digital or physical club ID at the entry desk.",
    body:
      "With immediate effect, all members must present a digital or physical club ID at the entry desk before check-in. Guests must be accompanied by the sponsoring member. Please brief the front-desk team at the start of every shift.",
    status: "Published",
    author: "TOP SPORTS Admin Desk",
  },
];

export type LostFoundItem = {
  id: string;
  item: string;
  kind: "Lost" | "Found";
  date: string;
  location: string;
  description: string;
  status: "Reported" | "Found" | "Claimed" | "Resolved";
  reportedBy: string;
  photo?: string;
};

export const lostFound: LostFoundItem[] = [
  {
    id: "lf1",
    item: "Yonex badminton racket",
    kind: "Found",
    date: "22 Aug 2025",
    location: "Court 5",
    description: "Black and lime Yonex Astrox racket left in the corner rack after the evening batch.",
    status: "Found",
    reportedBy: "Front desk",
  },
  {
    id: "lf2",
    item: "Blue water bottle",
    kind: "Found",
    date: "22 Aug 2025",
    location: "Café seating",
    description: "1L blue steel bottle with a dented cap. Held at the café counter.",
    status: "Claimed",
    reportedBy: "Café staff",
  },
  {
    id: "lf3",
    item: "Car keys with red tag",
    kind: "Lost",
    date: "21 Aug 2025",
    location: "Basement parking",
    description: "Member reported losing car keys with a red leather tag somewhere between parking and Turf A.",
    status: "Reported",
    reportedBy: "Member (masked: 98**^^^^^^17)",
  },
  {
    id: "lf4",
    item: "Prescription glasses",
    kind: "Found",
    date: "19 Aug 2025",
    location: "Locker Bank A",
    description: "Thin brown-framed glasses in a grey case. Stored in the lost & found cabinet.",
    status: "Resolved",
    reportedBy: "Housekeeping",
  },
  {
    id: "lf5",
    item: "Navy training jacket",
    kind: "Found",
    date: "17 Aug 2025",
    location: "Turf A dugout",
    description: "Size M navy jacket, no name tag. Awaiting claim for 30 days before handover to Admin.",
    status: "Found",
    reportedBy: "Ground staff",
  },
];

export type Product = {
  id: string;
  name: string;
  category: "Apparel" | "Equipment" | "Accessories" | "Nutrition";
  price: number;
  stock: number;
  status: "In stock" | "Low stock" | "Out of stock";
  soldToday: number;
};

export const products: Product[] = [
  { id: "pr1", name: "TOP SPORTS Club Tee", category: "Apparel", price: 899, stock: 42, status: "In stock", soldToday: 6 },
  { id: "pr2", name: "Training Shorts", category: "Apparel", price: 1099, stock: 8, status: "Low stock", soldToday: 3 },
  { id: "pr3", name: "Tennis Grip Tape (3x)", category: "Accessories", price: 349, stock: 66, status: "In stock", soldToday: 11 },
  { id: "pr4", name: "Shuttlecock Tube", category: "Equipment", price: 1299, stock: 0, status: "Out of stock", soldToday: 0 },
  { id: "pr5", name: "Steel Water Bottle 1L", category: "Accessories", price: 799, stock: 25, status: "In stock", soldToday: 4 },
  { id: "pr6", name: "Electrolyte Sachets (10x)", category: "Nutrition", price: 499, stock: 5, status: "Low stock", soldToday: 9 },
  { id: "pr7", name: "Cricket Batting Gloves", category: "Equipment", price: 2499, stock: 14, status: "In stock", soldToday: 1 },
  { id: "pr8", name: "Club Cap", category: "Apparel", price: 649, stock: 31, status: "In stock", soldToday: 2 },
];

export type MerchOrder = {
  id: string;
  member: string;
  items: string;
  amount: number;
  time: string;
  mode: "Online" | "Cash";
  status: "Paid" | "Pending" | "Refunded";
};

export const merchOrders: MerchOrder[] = [
  { id: "MO-1182", member: "John Smith", items: "Club Tee ×1, Grip Tape ×2", amount: 1597, time: "6:20 PM", mode: "Online", status: "Paid" },
  { id: "MO-1181", member: "Rahul Verma", items: "Electrolyte Sachets ×2", amount: 998, time: "5:44 PM", mode: "Cash", status: "Paid" },
  { id: "MO-1180", member: "Kavita Iyer", items: "Steel Bottle ×1", amount: 799, time: "4:10 PM", mode: "Online", status: "Refunded" },
  { id: "MO-1179", member: "Sanjay Patel", items: "Training Shorts ×1", amount: 1099, time: "1:35 PM", mode: "Online", status: "Paid" },
  { id: "MO-1178", member: "Priya Nair", items: "Club Cap ×1, Grip Tape ×1", amount: 998, time: "11:02 AM", mode: "Cash", status: "Pending" },
];

export type EquipmentItem = {
  id: string;
  name: string;
  category: string;
  total: number;
  inUse: number;
  condition: "Good" | "Needs check" | "Damaged";
  location: string;
  status: "Available" | "Occupied" | "Maintenance";
};

export const equipment: EquipmentItem[] = [
  { id: "eq1", name: "Tennis ball baskets", category: "Tennis", total: 12, inUse: 7, condition: "Good", location: "Equipment Store", status: "Available" },
  { id: "eq2", name: "Ball machine", category: "Tennis", total: 2, inUse: 2, condition: "Good", location: "Court 1", status: "Occupied" },
  { id: "eq3", name: "Badminton net sets", category: "Badminton", total: 6, inUse: 4, condition: "Good", location: "Courts 4–6", status: "Available" },
  { id: "eq4", name: "Bowling machine", category: "Cricket", total: 1, inUse: 0, condition: "Needs check", location: "Net 2", status: "Maintenance" },
  { id: "eq5", name: "Training cones (set)", category: "General", total: 20, inUse: 9, condition: "Good", location: "Equipment Store", status: "Available" },
  { id: "eq6", name: "Pool kickboards", category: "Swimming", total: 24, inUse: 11, condition: "Damaged", location: "Pool deck", status: "Maintenance" },
];

export type ActivityEntry = {
  id: string;
  activity: string;
  detail: string;
  time: string;
  facility: string;
  reference: string;
  status: "Cancelled" | "Rescheduled" | "Maintenance" | "Updated" | "Info";
  actor: string;
};

export const activityLog: ActivityEntry[] = [
  {
    id: "ac1",
    activity: "Booking cancelled by Admin",
    detail: "Evening tennis coaching on Court 2 was cancelled because the coach was marked unavailable.",
    time: "Today, 4:12 PM",
    facility: "Court 2",
    reference: "BK-2425",
    status: "Cancelled",
    actor: "Admin desk",
  },
  {
    id: "ac2",
    activity: "Facility marked unavailable",
    detail: "Shower Block 2 was taken offline for plumbing repair. Ticket MT-118 raised by Admin.",
    time: "Today, 1:30 PM",
    facility: "Shower Block 2",
    reference: "MT-118",
    status: "Maintenance",
    actor: "Admin desk",
  },
  {
    id: "ac3",
    activity: "Booking rescheduled",
    detail: "Cricket net session moved from Net 1 to Net 2 at the member's request, approved by Admin.",
    time: "Today, 11:05 AM",
    facility: "Net 2",
    reference: "BK-2421",
    status: "Rescheduled",
    actor: "Admin desk",
  },
  {
    id: "ac4",
    activity: "Payment status changed",
    detail: "Pending online payment for badminton court booking was confirmed as paid.",
    time: "Today, 9:48 AM",
    facility: "Court 5",
    reference: "PAY-8841",
    status: "Updated",
    actor: "Payment gateway",
  },
  {
    id: "ac5",
    activity: "Coach marked unavailable",
    detail: "Coach Vikram Singh marked on leave for the evening slots of 23 August.",
    time: "Yesterday, 8:20 PM",
    facility: "Courts 1–3",
    reference: "CO-004",
    status: "Info",
    actor: "Admin desk",
  },
  {
    id: "ac6",
    activity: "Maintenance scheduled",
    detail: "Fitness Studio flooring replacement scheduled 24–26 August. Studio bookings paused.",
    time: "21 Aug, 6:00 PM",
    facility: "Fitness Studio",
    reference: "MT-115",
    status: "Maintenance",
    actor: "Admin desk",
  },
  {
    id: "ac7",
    activity: "Operational update",
    detail: "Courts 1–3 blocked on 30 August for the Summer Slam Tennis Open.",
    time: "20 Aug, 3:15 PM",
    facility: "Courts 1–3",
    reference: "EV-001",
    status: "Info",
    actor: "Admin desk",
  },
];
