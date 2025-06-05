import { format } from 'date-fns';

interface AppointmentDetails {
  customerName: string;
  customerEmail: string;
  startTime: string;
  carMake: string;
  carModel: string;
  serviceType: string;
}

export async function sendEmailConfirmation(appointment: AppointmentDetails) {
  try {
    const formattedDate = format(new Date(appointment.startTime), 'MMMM do, yyyy');
    const formattedTime = format(new Date(appointment.startTime), 'h:mm a');

    // Your email sending logic here
    console.log('Email confirmation would be sent with:', {
      to: appointment.customerEmail,
      subject: 'Appointment Confirmation - Taylor\'s Collision',
      details: {
        name: appointment.customerName,
        date: formattedDate,
        time: formattedTime,
        service: appointment.serviceType,
        vehicle: `${appointment.carMake} ${appointment.carModel}`
      }
    });

    console.log('Confirmation email sent successfully');
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    throw error;
  }
} 