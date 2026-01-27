import { motion, AnimatePresence } from 'motion/react';
import { useState, useMemo } from 'react';
import { Check } from 'lucide-react';

// Mock reserved time slots (in a real app, this would come from backend)
const mockReservedSlots = {
  '2026-01-25': ['18:00', '19:00', '20:00'],
  '2026-01-26': ['19:00', '20:00'],
  '2026-01-27': ['18:00', '21:00'],
};

const timeSlots = [
  '12:00', '13:00', '14:00', '15:00', '16:00', 
  '17:00', '18:00', '19:00', '20:00', '21:00', '22:00'
];

const guestOptions = [1, 2, 3, 4, 5, 6, 7, 8];

// Calendar Component
function Calendar({ selectedDate, onDateSelect }: { selectedDate: string; onDateSelect: (date: string) => void }) {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const daysInMonth = useMemo(() => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Actual days
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  }, [currentMonth]);

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"];

  const goToPreviousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const goToNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const formatDateString = (date: Date) => {
    return date.toISOString().split('T')[0];
  };

  const canGoPrevious = currentMonth > new Date(today.getFullYear(), today.getMonth());
  const canGoNext = currentMonth < new Date(maxDate.getFullYear(), maxDate.getMonth());

  return (
    <div className="bg-white p-6 md:p-8 shadow-xl">
      {/* Month Navigation */}
      <div className="flex items-center justify-between mb-6">
        <button
          type="button"
          onClick={goToPreviousMonth}
          disabled={!canGoPrevious}
          className={`p-2 ${canGoPrevious ? 'text-[#2C2C2C] hover:text-[#D32F2F]' : 'text-[#4A4A4A]/20 cursor-not-allowed'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        <h3 
          className="text-2xl font-black italic text-[#2C2C2C]"
          style={{ fontFamily: "'Playfair Display', serif" }}
        >
          {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
        </h3>
        
        <button
          type="button"
          onClick={goToNextMonth}
          disabled={!canGoNext}
          className={`p-2 ${canGoNext ? 'text-[#2C2C2C] hover:text-[#D32F2F]' : 'text-[#4A4A4A]/20 cursor-not-allowed'}`}
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      {/* Day Headers */}
      <div className="grid grid-cols-7 gap-2 mb-3">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center text-sm font-medium text-[#4A4A4A] py-2">
            {day}
          </div>
        ))}
      </div>

      {/* Calendar Days */}
      <div className="grid grid-cols-7 gap-2">
        {daysInMonth.map((date, index) => {
          if (!date) {
            return <div key={`empty-${index}`} />;
          }

          const dateString = formatDateString(date);
          const isPast = date < today;
          const isFuture = date > maxDate;
          const isDisabled = isPast || isFuture;
          const isSelected = dateString === selectedDate;
          const isToday = date.getTime() === today.getTime();

          return (
            <button
              key={dateString}
              type="button"
              onClick={() => !isDisabled && onDateSelect(dateString)}
              disabled={isDisabled}
              className={`
                aspect-square flex items-center justify-center text-sm font-medium transition-all
                ${isDisabled 
                  ? 'text-[#4A4A4A]/20 cursor-not-allowed' 
                  : isSelected
                    ? 'bg-[#D32F2F] text-white shadow-lg scale-110'
                    : 'bg-[#FAF8F5] text-[#2C2C2C] hover:bg-[#D32F2F] hover:text-white hover:scale-105'
                }
                ${isToday && !isSelected ? 'ring-2 ring-[#D32F2F] ring-offset-2' : ''}
              `}
            >
              {date.getDate()}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function ReservationPage() {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [guests, setGuests] = useState(2);
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isConfirmed, setIsConfirmed] = useState(false);

  // Check if time slot is reserved
  const isTimeReserved = (time: string) => {
    if (!selectedDate) return false;
    return mockReservedSlots[selectedDate as keyof typeof mockReservedSlots]?.includes(time) || false;
  };

  // Format date for display
  const formatDate = (dateString: string) => {
    if (!dateString) return '';
    const date = new Date(dateString + 'T00:00:00');
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setIsSubmitting(false);
    setIsConfirmed(true);
  };

  const canSubmit = selectedDate && selectedTime && name && phone;

  if (isConfirmed) {
    return (
      <div className="min-h-screen bg-[#FAF8F5] flex items-center justify-center px-6 py-20">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl w-full"
        >
          <div className="bg-white p-10 md:p-14 lg:p-16 shadow-2xl text-center">
            <div className="mb-8">
              <div className="w-20 h-20 bg-[#D32F2F] rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-white" strokeWidth={3} />
              </div>
              <h1 
                className="text-5xl md:text-6xl lg:text-7xl font-black italic text-[#2C2C2C] leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Confirmed
              </h1>
              <p className="text-xl text-[#4A4A4A] font-light">
                We look forward to welcoming you.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-8 space-y-4 text-left mb-8">
              <div className="flex justify-between items-center">
                <span className="text-[#4A4A4A]">Date</span>
                <span className="font-medium text-[#2C2C2C]">{formatDate(selectedDate)}</span>
              </div>
              <div className="h-px bg-[#2C2C2C]/10" />
              <div className="flex justify-between items-center">
                <span className="text-[#4A4A4A]">Time</span>
                <span className="font-medium text-[#2C2C2C]">{selectedTime}</span>
              </div>
              <div className="h-px bg-[#2C2C2C]/10" />
              <div className="flex justify-between items-center">
                <span className="text-[#4A4A4A]">Guests</span>
                <span className="font-medium text-[#2C2C2C]">{guests} {guests === 1 ? 'person' : 'people'}</span>
              </div>
              <div className="h-px bg-[#2C2C2C]/10" />
              <div className="flex justify-between items-center">
                <span className="text-[#4A4A4A]">Name</span>
                <span className="font-medium text-[#2C2C2C]">{name}</span>
              </div>
            </div>

            <p className="text-sm text-[#4A4A4A] mb-8">
              A confirmation has been sent to {phone}
            </p>

            <button
              onClick={() => window.location.href = '/'}
              className="px-10 py-4 bg-[#2C2C2C] text-white font-medium hover:bg-[#D32F2F] transition-colors"
            >
              Return Home
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
      <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-black italic text-[#2C2C2C] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Reserve a Table
          </h1>
          <p className="text-xl md:text-2xl text-[#4A4A4A] font-light">
            Book your experience at Fuoco — simple and fast.
          </p>
        </motion.div>

        {/* Step-by-step Flow */}
        <form onSubmit={handleSubmit} className="space-y-12">
          {/* Step 1: Date Selection */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold">
                1
              </div>
              <h2 className="text-3xl font-bold text-[#2C2C2C]">
                Select a Date
              </h2>
            </div>
            
            <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
            
            {selectedDate && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 text-lg text-[#4A4A4A] font-light"
              >
                ✓ {formatDate(selectedDate)}
              </motion.p>
            )}
          </motion.div>

          {/* Step 2: Time Selection */}
          <AnimatePresence>
            {selectedDate && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold">
                    2
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C2C2C]">
                    Choose a Time
                  </h2>
                </div>

                <div className="bg-white p-6 md:p-8 shadow-xl">
                  <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                    {timeSlots.map((time) => {
                      const reserved = isTimeReserved(time);
                      const selected = selectedTime === time;
                      
                      return (
                        <button
                          key={time}
                          type="button"
                          onClick={() => !reserved && setSelectedTime(time)}
                          disabled={reserved}
                          className={`
                            py-4 px-4 text-center font-medium transition-all rounded-sm
                            ${reserved 
                              ? 'bg-[#FAF8F5] text-[#4A4A4A]/30 cursor-not-allowed line-through' 
                              : selected
                                ? 'bg-[#D32F2F] text-white shadow-lg scale-105'
                                : 'bg-[#FAF8F5] text-[#2C2C2C] hover:bg-[#D32F2F] hover:text-white hover:scale-105'
                            }
                          `}
                        >
                          {time}
                        </button>
                      );
                    })}
                  </div>
                  <div className="mt-6 flex items-center gap-6 text-sm text-[#4A4A4A]">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FAF8F5]"></div>
                      <span>Available</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 bg-[#FAF8F5] opacity-50"></div>
                      <span>Reserved</span>
                    </div>
                  </div>
                </div>

                {selectedTime && (
                  <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mt-4 text-lg text-[#4A4A4A] font-light"
                  >
                    ✓ {selectedTime}
                  </motion.p>
                )}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 3: Number of Guests */}
          <AnimatePresence>
            {selectedTime && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold">
                    3
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C2C2C]">
                    Number of Guests
                  </h2>
                </div>

                <div className="bg-white p-6 md:p-8 shadow-xl">
                  <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                    {guestOptions.map((num) => (
                      <button
                        key={num}
                        type="button"
                        onClick={() => setGuests(num)}
                        className={`
                          aspect-square flex items-center justify-center text-lg font-bold transition-all rounded-sm
                          ${guests === num
                            ? 'bg-[#D32F2F] text-white shadow-lg scale-110'
                            : 'bg-[#FAF8F5] text-[#2C2C2C] hover:bg-[#D32F2F] hover:text-white hover:scale-105'
                          }
                        `}
                      >
                        {num}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 text-lg text-[#4A4A4A] font-light"
                >
                  ✓ {guests} {guests === 1 ? 'guest' : 'guests'}
                </motion.p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Step 4: Guest Information */}
          <AnimatePresence>
            {guests && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-[#D32F2F] text-white flex items-center justify-center font-bold">
                    4
                  </div>
                  <h2 className="text-3xl font-bold text-[#2C2C2C]">
                    Your Details
                  </h2>
                </div>

                <div className="bg-white p-6 md:p-8 shadow-xl space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                      Full Name
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                      placeholder="Marco Rossi"
                      className="w-full px-5 py-4 text-lg bg-[#FAF8F5] focus:bg-white border-2 border-transparent focus:border-[#D32F2F] focus:outline-none transition-all placeholder:text-[#4A4A4A]/40"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-[#4A4A4A] mb-3">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-5 py-4 text-lg bg-[#FAF8F5] focus:bg-white border-2 border-transparent focus:border-[#D32F2F] focus:outline-none transition-all placeholder:text-[#4A4A4A]/40"
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Reservation Summary */}
          <AnimatePresence>
            {canSubmit && (
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.6 }}
                className="bg-[#2C2C2C] p-8 md:p-10 text-white"
              >
                <h3 
                  className="text-3xl font-black italic mb-6"
                  style={{ fontFamily: "'Playfair Display', serif" }}
                >
                  Your Reservation
                </h3>
                <div className="space-y-4 text-lg">
                  <div className="flex justify-between">
                    <span className="text-white/70">Date</span>
                    <span className="font-medium">{formatDate(selectedDate)}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between">
                    <span className="text-white/70">Time</span>
                    <span className="font-medium">{selectedTime}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between">
                    <span className="text-white/70">Guests</span>
                    <span className="font-medium">{guests} {guests === 1 ? 'person' : 'people'}</span>
                  </div>
                  <div className="h-px bg-white/20" />
                  <div className="flex justify-between">
                    <span className="text-white/70">Name</span>
                    <span className="font-medium">{name}</span>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Submit Button */}
          <AnimatePresence>
            {canSubmit && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="pt-4"
              >
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`
                    w-full py-6 text-xl font-medium transition-all
                    ${isSubmitting
                      ? 'bg-[#4A4A4A] text-white cursor-wait'
                      : 'bg-[#D32F2F] text-white hover:bg-[#B71C1C] hover:scale-[1.02] transform'
                    }
                  `}
                >
                  {isSubmitting ? 'Confirming Your Reservation...' : 'Confirm Reservation'}
                </button>

                <p className="text-center text-sm text-[#4A4A4A] mt-6">
                  Your reservation will be confirmed instantly via phone.
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </form>
      </div>
    </div>
  );
}
