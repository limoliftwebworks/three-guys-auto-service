import { NextResponse } from 'next/server'

const SERVICES = {
  collision: ['collision', 'accident', 'crash', 'hit', 'wreck'],
  dent: ['dent', 'ding', 'door ding', 'bumper'],
  paint: ['paint', 'scratch', 'color', 'repaint', 'scratched'],
  headlight: ['headlight', 'light', 'foggy', 'dim', 'yellow'],
  general: ['estimate', 'quote', 'cost', 'price', 'much', 'help', 'fix', 'repair']
}

// Available time slots (you can adjust these)
const AVAILABLE_HOURS = [9, 10, 11, 13, 14, 15, 16] // 9 AM to 4 PM, excluding lunch
const BOOKING_STATES = {
  INITIAL: 'initial',
  PROBLEM_SHARED: 'problem_shared',
  READY_TO_BOOK: 'ready_to_book',
  DATE_SELECTED: 'date_selected',
  TIME_SELECTED: 'time_selected',
  NAME_PROVIDED: 'name_provided',
  PHONE_PROVIDED: 'phone_provided',
  CONFIRMED: 'confirmed'
} as const

interface BookingDetails {
  state: typeof BOOKING_STATES[keyof typeof BOOKING_STATES];
  service?: string;
  problem?: string;
  date?: string;
  time?: string;
  name?: string;
  phone?: string;
}

function getAvailableDates(): string[] {
  const dates = []
  const today = new Date()
  
  for (let i = 1; i <= 14; i++) {
    const date = new Date(today)
    date.setDate(today.getDate() + i)
    if (date.getDay() !== 0 && date.getDay() !== 6) {
      const month = (date.getMonth() + 1).toString().padStart(2, '0')
      const day = date.getDate().toString().padStart(2, '0')
      const year = date.getFullYear()
      dates.push(`${month}/${day}/${year}`)
    }
  }
  return dates
}

function getAvailableTimes(): string[] {
  return AVAILABLE_HOURS.map(hour => {
    return hour < 12 ? `${hour}:00 AM` : `${hour === 12 ? 12 : hour - 12}:00 PM`
  })
}

function getEmpathyResponse(problem: string): string {
  const problemLower = problem.toLowerCase()
  
  // Check for collision-related terms
  if (SERVICES.collision.some(term => problemLower.includes(term))) {
    return "I'm so sorry to hear about your accident. That must be really stressful.  Would you like to schedule a time for us to take a look at your car?"
  }
  
  // Check for dent-related terms
  if (SERVICES.dent.some(term => problemLower.includes(term))) {
    return "Those unexpected dents and dings can be really frustrating. Don't worry - our skilled technicians are experts at making them disappear."
  }
  
  // Check for paint-related terms
  if (SERVICES.paint.some(term => problemLower.includes(term))) {
    return "Paint damage can be really upsetting, especially on a car you care about. Our paint specialists will make sure to match your color perfectly."
  }
  
  // Check for headlight-related terms
  if (SERVICES.headlight.some(term => problemLower.includes(term))) {
    return "Foggy or dim headlights can be both annoying and unsafe. We'll get those lights crystal clear and bright again for you."
  }
  
  // General response for other terms
  if (SERVICES.general.some(term => problemLower.includes(term))) {
    return "We can help get your car back to perfect condition."
  }

  return "We can help get your car back to perfect condition."
}

async function getResponse(message: string, bookingDetails?: BookingDetails): Promise<{ 
  content: string; 
  updatedBooking?: BookingDetails;
  options?: string[];
}> {
  const msg = message.toLowerCase()

  // Handle general conversation if not in booking flow
  if (!bookingDetails || !bookingDetails.state) {
    // Check for common greetings
    if (msg.match(/^(hi|hello|hey|greetings|good (morning|afternoon|evening))/)) {
      return {
        content: "Hello! 👋 I'm here to help with your vehicle repair needs. How can I assist you today?",
        updatedBooking: { state: BOOKING_STATES.INITIAL }
      }
    }

    // Check for common questions about the business
    if (msg.includes('hours') || msg.includes('open') || msg.includes('close')) {
      return {
        content: "We're open Monday through Friday from 8:00 AM to 5:00 PM. We're closed on weekends.",
        updatedBooking: { state: BOOKING_STATES.INITIAL }
      }
    }

    if (msg.includes('location') || msg.includes('address') || msg.includes('where')) {
      return {
        content: "We're located at 123 Main Street, Atlanta, GA 30301. Would you like directions?",
        updatedBooking: { state: BOOKING_STATES.INITIAL }
      }
    }

    if (msg.includes('price') || msg.includes('cost') || msg.includes('how much')) {
      return {
        content: "Prices vary depending on the type of repair needed. We offer free estimates - would you like to schedule one?",
        updatedBooking: { state: BOOKING_STATES.INITIAL }
      }
    }

    if (msg.includes('insurance') || msg.includes('claim')) {
      return {
        content: "Yes, we work with most major insurance companies. We can help you with the claims process and handle direct billing with your insurance provider.",
        updatedBooking: { state: BOOKING_STATES.INITIAL }
      }
    }

    // If the message contains any service-related keywords, start the booking process
    if (SERVICES.collision.some(term => msg.includes(term)) ||
        SERVICES.dent.some(term => msg.includes(term)) ||
        SERVICES.paint.some(term => msg.includes(term)) ||
        SERVICES.headlight.some(term => msg.includes(term)) ||
        SERVICES.general.some(term => msg.includes(term))) {
      const empathyResponse = getEmpathyResponse(msg)
      const isCollision = SERVICES.collision.some(term => msg.includes(term))
      return {
        content: isCollision ? empathyResponse : `${empathyResponse} Would you like to schedule an appointment?`,
        updatedBooking: { state: BOOKING_STATES.PROBLEM_SHARED, problem: msg },
        options: ['Yes, schedule an appointment']
      }
    }

    // Default response for general conversation
    return {
      content: "I'm here to help with your vehicle repair needs. You can ask me about our services, hours, location, or schedule an appointment. What would you like to know?",
      updatedBooking: { state: BOOKING_STATES.INITIAL }
    }
  }

  // If we're in the middle of a booking process
  switch (bookingDetails.state) {
    case BOOKING_STATES.INITIAL:
      const empathyResponse = getEmpathyResponse(msg)
      return {
        content: `${empathyResponse} Would you like to schedule an appointment?`,
        updatedBooking: { ...bookingDetails, problem: msg, state: BOOKING_STATES.PROBLEM_SHARED },
        options: ['Yes, schedule an appointment']
      }

    case BOOKING_STATES.PROBLEM_SHARED:
      if (msg.includes('yes') || msg.includes('schedule')) {
        const dates = getAvailableDates()
        return {
          content: "Great! Let's get you scheduled. Please select your preferred date:",
          updatedBooking: { ...bookingDetails, state: BOOKING_STATES.READY_TO_BOOK },
          options: dates
        }
      }
      return {
        content: "No problem! If you change your mind or have any questions, feel free to ask. You can also reach us directly at (770) 495-0050.",
        updatedBooking: bookingDetails
      }

    case BOOKING_STATES.READY_TO_BOOK:
      const selectedDate = msg.match(/\d{1,2}\/\d{1,2}\/\d{4}/)
      if (selectedDate) {
        const times = getAvailableTimes()
        return {
          content: `Perfect! Please select your preferred time for ${selectedDate[0]}:`,
          updatedBooking: { ...bookingDetails, date: selectedDate[0], state: BOOKING_STATES.DATE_SELECTED },
          options: times
        }
      }
      const dates = getAvailableDates()
      return {
        content: "Please select a date from the options below:",
        updatedBooking: bookingDetails,
        options: dates
      }

    case BOOKING_STATES.DATE_SELECTED:
      const selectedTime = msg.match(/\d{1,2}:00\s*(AM|PM)/i)
      if (selectedTime) {
        return {
          content: "Great! Could I get your name for the appointment?",
          updatedBooking: { ...bookingDetails, time: selectedTime[0], state: BOOKING_STATES.TIME_SELECTED }
        }
      }
      const times = getAvailableTimes()
      return {
        content: "Please select a time from the options below:",
        updatedBooking: bookingDetails,
        options: times
      }

    case BOOKING_STATES.TIME_SELECTED:
      if (msg.length > 2) {
        return {
          content: "Thanks! Last thing - what's the best phone number to reach you at?",
          updatedBooking: { ...bookingDetails, name: message, state: BOOKING_STATES.NAME_PROVIDED }
        }
      }
      return {
        content: "Could you please provide your full name?",
        updatedBooking: bookingDetails
      }

    case BOOKING_STATES.NAME_PROVIDED:
      const phone = msg.replace(/\D/g, '')
      if (phone.length >= 10) {
        try {
          const response = await fetch('/api/calendar', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              ...bookingDetails,
              phone,
              service: 'Vehicle Repair'
            }),
          })

          if (!response.ok) {
            return {
              content: "I apologize, but there was an issue scheduling your appointment. Please call us directly at (770) 495-0050.",
              updatedBooking: bookingDetails
            }
          }

          return {
            content: `Perfect! You're all set! Here's your appointment details:\n\nDate: ${bookingDetails.date}\nTime: ${bookingDetails.time}\nName: ${bookingDetails.name}\n\nI've sent a confirmation email with these details. If you need to make any changes, just call us at (770) 495-0050.\n\nWe look forward to taking care of your car!`,
            updatedBooking: { ...bookingDetails, phone, state: BOOKING_STATES.CONFIRMED }
          }
        } catch (error) {
          console.error('Booking error:', error)
          return {
            content: "I apologize, but there was an issue scheduling your appointment. Please call us directly at (770) 495-0050.",
            updatedBooking: bookingDetails
          }
        }
      }
      return {
        content: "Please provide a valid phone number (10 digits).",
        updatedBooking: bookingDetails
      }
  }

  // Initial problem description
  const empathyResponse = getEmpathyResponse(msg)
  return {
    content: `${empathyResponse}\n\nWould you like to schedule a time for us to take a look at your car? We'll provide a free estimate and make sure you're taken care of.`,
    updatedBooking: { state: BOOKING_STATES.PROBLEM_SHARED, problem: msg }
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    
    if (!body.message || typeof body.message !== 'string') {
      return NextResponse.json({ error: 'Message is required and must be a string' }, { status: 400 })
    }

    const { content, updatedBooking, options } = await getResponse(body.message, body.bookingDetails)
    return NextResponse.json({ 
      content,
      bookingDetails: updatedBooking,
      options
    })

  } catch (error) {
    console.error('Chat error:', error)
    return NextResponse.json({
      content: "I apologize, but I'm experiencing a technical issue. Please try again or contact us directly at (770) 495-0050.",
      error: true
    }, { status: 500 })
  }
} 