export interface VolunteerRole {
  id: string;
  title: string;
  description: string;
  responsibilities: string[];
}

export const volunteerRoles: VolunteerRole[] = [
  {
    id: "route-coordinator",
    title: "Route Coordinator",
    description:
      "Route Coordinators ensure participants have a safe and enjoyable experience along the Open Streets route. They oversee intersections, provide directions, and help maintain a smooth flow of activity throughout the event.",
    responsibilities: [
      "Guide attendees to activity areas, restrooms, and entry/exit points.",
      "Monitor bike and pedestrian traffic, resolving any minor hazards.",
      "Supervise access points and manage road closures effectively.",
      "Offer assistance and directions to participants as needed.",
      "Report safety concerns or logistical issues to event organizers.",
    ],
  },
  {
    id: "community-ambassador",
    title: "Community Ambassador",
    description:
      "The friendly and welcoming face of the event, Community Ambassadors help attendees navigate the experience while creating a positive and engaging atmosphere. They ensure participants feel informed, supported, and excited to participate.",
    responsibilities: [
      "Greet attendees warmly and share event maps or schedules.",
      "Answer questions about activities, locations, and amenities.",
      "Encourage participation in activities, highlighting unique features.",
      "Promote resources from community organizations and businesses.",
      "Gather attendee feedback to help organizers improve future events.",
    ],
  },
  {
    id: "census-volunteer",
    title: "Census Volunteer",
    description:
      "Census Volunteers play a critical role in gathering the data that tells the story of Open Streets events. By collecting surveys from participants, they provide insights that demonstrate the event's positive impact on the community and inspire future improvements. This role is perfect for those interested in transportation advocacy, data collection, or simply helping to make the event better.",
    responsibilities: [
      "Engage attendees across the route to complete brief, meaningful surveys.",
      "Collect data on behaviors, experiences, and attitudes that highlight the event's impact.",
      "Emphasize how participant feedback supports active transportation advocacy and event planning.",
      "Share how the data will be used to show the event's value, such as encouraging more physical activity, supporting local businesses, and inspiring sustainable transportation habits.",
      "Handle all collected information responsibly and maintain participant confidentiality.",
    ],
  },
  {
    id: "bike-valet",
    title: "Bike Valet",
    description:
      "Bike Valets provide secure and stress-free parking for cyclists attending the event. By keeping the bike parking area organized and efficient, they play a key role in promoting sustainable transportation and ensuring attendees feel confident leaving their bikes in good hands.",
    responsibilities: [
      "Welcome cyclists and guide them through the valet process.",
      "Assign tags and safely park bikes in the designated area.",
      "Retrieve bikes quickly and efficiently when participants are ready to leave.",
      "Maintain the security and organization of the bike parking zone.",
      "Share information about biking benefits and local cycling resources.",
    ],
  },
  {
    id: "activations-facilitator",
    title: "Activations Facilitator",
    description:
      "Activations Facilitators bring energy and life to the event by supporting activities, performances, and workshops. They create engaging spaces that inspire participants to explore, connect, and enjoy all that Open Streets has to offer.",
    responsibilities: [
      "Assist with the setup, operation, and tear-down of activity zones.",
      "Encourage participation by providing demonstrations or instructions.",
      "Coordinate with performers and activity leaders to stay on schedule.",
      "Keep activity areas organized, safe, and welcoming for attendees.",
      "Promote the event's mission by connecting activities to its broader goals.",
    ],
  },
  {
    id: "set-up-and-tear-down-crew",
    title: "Set-Up and Tear-Down Crew",
    description:
      "Set-Up and Tear-Down volunteers are the backbone of the event, helping to transform the streets into a welcoming, car-free community space and ensuring everything is packed up smoothly afterward. From placing barricades and setting up activity zones to dismantling booths and clearing the route, this role is perfect for hands-on volunteers who love seeing a project come to life.",
    responsibilities: [
      "Assist with setting up tents, tables, signage, and activity stations before the event begins.",
      "Help place barricades and traffic control equipment to ensure a safe route.",
      "Dismantle and pack up event infrastructure after the event concludes.",
      "Maintain an organized and efficient workflow during set-up and tear-down.",
    ],
  },
  {
    id: "bike-rodeo-volunteer",
    title: "Bike Rodeo Volunteer",
    description:
      "Bike Rodeo Volunteers create a fun, supportive environment where young cyclists can develop essential riding skills and confidence. Following the League of American Bicyclists' Youth Cycling curriculum, these volunteers guide children through interactive stations in a safe, closed course setting. This role is perfect for those who enjoy working with kids and have a passion for promoting lifelong cycling habits and road safety.",
    responsibilities: [
      "Guide young riders through skill-building stations (starting, stopping, turning, etc.) in a closed parking lot course.",
      "Demonstrate proper cycling techniques and provide encouraging feedback to build confidence.",
      "Ensure safety protocols are followed and assist with helmet fittings and basic bike adjustments.",
      "Create an engaging, positive atmosphere that makes learning bike skills fun and memorable.",
      "Help set up and maintain the various skill stations throughout the event.",
    ],
  },
];
