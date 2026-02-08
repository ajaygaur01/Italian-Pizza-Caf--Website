import { motion } from 'motion/react';
import { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Send, CheckCircle2 } from 'lucide-react';

export function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';
      
      const response = await fetch(`${API_URL}/api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to submit form');
      }

      const data = await response.json();
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
        });
      }, 3000);
    } catch (error) {
      console.error('Error submitting form:', error);
      alert(error instanceof Error ? error.message : 'Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: 'Address',
      content: 'Via della Pizza, 123\n00100 Roma, Italy',
    },
    {
      icon: Phone,
      title: 'Phone',
      content: '+39 06 1234 5678',
    },
    {
      icon: Mail,
      title: 'Email',
      content: 'info@fuocopizza.it',
    },
    {
      icon: Clock,
      title: 'Hours',
      content: 'Mon-Sat: 12:00 - 23:00\nSun: 12:00 - 22:00',
    },
  ];

  return (
    <div className="min-h-screen bg-[#FAF8F5] pt-32 pb-20">
      <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-16">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 md:mb-24"
        >
          <h1 
            className="text-6xl md:text-7xl lg:text-8xl font-black italic text-[#2C2C2C] leading-tight mb-6"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Get in Touch
          </h1>
          <p className="text-xl md:text-2xl text-[#4A4A4A] font-light max-w-3xl mx-auto">
            Have a question? Want to share feedback? We'd love to hear from you.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 lg:gap-16">
          {/* Contact Information */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h2 
                className="text-4xl md:text-5xl font-black italic text-[#2C2C2C] mb-8"
                style={{ fontFamily: "'Playfair Display', serif" }}
              >
                Visit Us
              </h2>
              <p className="text-lg text-[#4A4A4A] leading-relaxed mb-8">
                We're located in the heart of Rome, serving authentic Italian pizzas 
                made with passion and tradition. Come experience the warmth of Italian hospitality.
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => {
                const Icon = info.icon;
                return (
                  <motion.div
                    key={info.title}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 + index * 0.1 }}
                    className="flex gap-4"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-[#D32F2F]/10 rounded-full flex items-center justify-center">
                      <Icon className="w-6 h-6 text-[#D32F2F]" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-[#2C2C2C] mb-1">
                        {info.title}
                      </h3>
                      <p className="text-[#4A4A4A] whitespace-pre-line">
                        {info.content}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Map Placeholder */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-8 h-64 bg-[#2C2C2C]/5 rounded-lg overflow-hidden"
            >
              <div className="w-full h-full flex items-center justify-center text-[#4A4A4A]">
                <div className="text-center">
                  <MapPin className="w-12 h-12 mx-auto mb-2 opacity-30" />
                  <p className="text-sm">Map integration placeholder</p>
                </div>
              </div>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white p-8 md:p-10 lg:p-12 shadow-xl"
          >
            <h2 
              className="text-4xl md:text-5xl font-black italic text-[#2C2C2C] mb-8"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Send a Message
            </h2>

            {isSubmitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12"
              >
                <CheckCircle2 className="w-16 h-16 text-[#D32F2F] mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-[#2C2C2C] mb-2">
                  Thank You!
                </h3>
                <p className="text-[#4A4A4A]">
                  We've received your message and will get back to you soon.
                </p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C2C2C]/20 focus:border-[#D32F2F] focus:outline-none transition-colors bg-[#FAF8F5]"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C2C2C]/20 focus:border-[#D32F2F] focus:outline-none transition-colors bg-[#FAF8F5]"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Phone
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C2C2C]/20 focus:border-[#D32F2F] focus:outline-none transition-colors bg-[#FAF8F5]"
                    placeholder="+39 123 456 7890"
                  />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Subject *
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C2C2C]/20 focus:border-[#D32F2F] focus:outline-none transition-colors bg-[#FAF8F5]"
                  >
                    <option value="">Select a subject</option>
                    <option value="general">General Inquiry</option>
                    <option value="reservation">Reservation Question</option>
                    <option value="feedback">Feedback</option>
                    <option value="catering">Catering Inquiry</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#2C2C2C] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-[#2C2C2C]/20 focus:border-[#D32F2F] focus:outline-none transition-colors bg-[#FAF8F5] resize-none"
                    placeholder="Tell us how we can help..."
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-[#D32F2F] text-white py-4 px-8 font-semibold tracking-wider hover:bg-[#B71C1C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      Send Message
                    </>
                  )}
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
