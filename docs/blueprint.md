# **App Name**: CitaFacil

## Core Features:

- User Authentication: Allow users to register and log in securely using Firebase Auth, to manage personal settings and booking.
- Appointment Booking: Enable users to select a date and time using a date/time picker and write a reason for their appointment, directly updating the app's state.
- Appointment Submission: Store appointment details (date, time, reason) locally in the app upon submission, without remote storage.
- Scheduled Notification Generation: Generate a reminder notification for the user 15 minutes prior to the appointment time; scheduling is simulated, without connection to external push services.
- Appointment History Display: Display a list of the user's appointments, fetched from the app's internal state; list updates when the user creates/modifies an appointment.

## Style Guidelines:

- Primary color: Light blue (#ADD8E6) to create a sense of serenity and calm.
- Background color: Very light blue (#E0F2F7), for a calm and airy backdrop.
- Accent color: Dark blue (#00008B), used sparingly to highlight calls to action and key information.
- Font: 'Inter', sans-serif, for both headers and body text, ensuring readability and a modern aesthetic.  Note: currently only Google Fonts are supported.
- Use clear and simple icons related to appointment management, such as a calendar, clock, and pencil.
- Maintain a clean and structured layout to prevent clutter and promote an intuitive user experience.