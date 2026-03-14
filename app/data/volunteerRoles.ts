export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
  shifts: { name: string; start: string; end: string }[];
  note?: string;
}

export const volunteerRoles: VolunteerRole[] = [
  {
    id: "set-up",
    title: "Set-Up",
    description:
      "As a Set-Up Volunteer, you'll play a vital role in transforming Tempe's streets into a vibrant, car-free community space. Your hands-on energy and teamwork will help bring the event to life before the first attendee arrives.",
    shifts: [{ name: "Set-Up", start: "8:00 AM", end: "9:30 AM" }],
    responsibilities: [
      "Help position traffic barricades, cones, and directional signage along the route to ensure safety and clear wayfinding.",
      "Assist vendors, partners, and activations teams with arranging tables, tents, and equipment in designated areas.",
      "Help set up water stations, bike valet areas, and other attendee resources.",
      "Work closely with event staff to execute the site layout plan efficiently and on schedule.",
      "Start the day with a positive attitude — your work sets the tone for the entire experience!",
    ],
  },
  {
    id: "tear-down",
    title: "Tear-Down",
    description:
      "As a Tear-Down Volunteer, you'll help wrap up the event by restoring the streets and leaving the community better than we found it. This role is perfect for reliable volunteers who take pride in a job well done from start to finish.",
    shifts: [{ name: "Tear-Down", start: "3:00 PM", end: "4:30 PM" }],
    responsibilities: [
      "Remove barricades, cones, signage, and temporary infrastructure in coordination with event staff.",
      "Assist vendors, partners, and activations teams with packing up equipment, tables, and tents.",
      "Help collect and consolidate materials from water stations, bike valet areas, and other attendee resources.",
      "Ensure the route and activity areas are cleared of trash and recyclables, leaving the space clean.",
      "Take direction from organizers to ensure all materials are properly stored or returned.",
    ],
  },
  {
    id: "bike-valet",
    title: "Bike Valet",
    description:
      "As a Bike Valet, you'll provide a secure and efficient bike parking service for attendees, ensuring their bikes are safe while they enjoy the event. Your attention to detail will help create a stress-free experience for participants.",
    shifts: [
      { name: "Morning", start: "9:30 AM", end: "12:30 PM" },
      { name: "Afternoon", start: "12:00 PM", end: "3:00 PM" },
    ],
    responsibilities: [
      "Welcome cyclists warmly and guide them through the valet process.",
      "Assign tickets to bikes and park them securely in the designated area.",
      "Quickly and efficiently return bikes to participants upon request.",
      "Keep the bike parking area organized and ensure its security.",
      "Share information about the benefits of biking and encourage participants to continue using bikes for daily transportation.",
    ],
  },
  {
    id: "bike-parade-marshal",
    title: "Bike Parade Marshal",
    description:
      "As a Bike Parade Marshal, you'll ride alongside participants during the Open Streets Tempe Bike Parade, keeping the energy high and ensuring everyone has a safe and enjoyable experience. This is a great role for confident cyclists who love engaging with people on the go.",
    shifts: [{ name: "Parade", start: "9:30 AM", end: "11:00 AM" }],
    note: "Marshals should be comfortable riding at a relaxed, variable pace and are encouraged to carry a basic bike repair kit (patch kit, pump, tire levers).",
    responsibilities: [
      "Ride the parade route alongside participants, maintaining awareness of the group's pace and spacing.",
      "Keep a watchful eye at key crossing points, helping participants navigate safely through the route.",
      "Answer questions, offer encouragement, and help riders of all ages and abilities feel confident on the route.",
      "Assist participants with minor issues such as flat tires or basic bike adjustments to keep the ride moving smoothly.",
      "Report any safety concerns, incidents, or bottlenecks to event organizers or Route Coordinators promptly.",
    ],
  },
];
