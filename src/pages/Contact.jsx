import React, { useState } from 'react';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock, 
  Send, 
  MessageSquare, 
  HelpCircle, 
  CheckCircle, 
  ChevronDown,
  Truck
} from 'lucide-react';
import { useToast } from '../context/ToastContext';

export const Contact = () => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: 'Workshop Inquiry',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [openFaq, setOpenFaq] = useState(0);

  const faqs = [
    {
      q: 'Where does the MakerSpace on Wheels van park during a school visit?',
      a: 'Our 24-foot mobile lab van parks in a standard school bus loading bay, visitor parking slot, or courtyard. We only need space equivalent to two regular car stalls with flat ground.'
    },
    {
      q: 'Do you require power from our school building?',
      a: 'Our van carries a 10 kWh lithium battery bank capable of powering all 12+ 3D printers and ventilation independently! However, if a standard 120V outdoor outlet is available, we can plug in as a supplementary feed.'
    },
    {
      q: 'Are the 3D printer fumes safe for middle-school students?',
      a: 'Absolutely. We print exclusively with 100% bio-based cornstarch PLA and PETG filament (zero toxic ABS or VOCs). Furthermore, our van interior is equipped with commercial HEPA and activated carbon air scrubber units.'
    },
    {
      q: 'Do students keep their physical 3D prints?',
      a: 'Yes! Every enrolled student takes home their completed CAD project on the very same day, along with an official Maker Certificate.'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      showToast('Please fill in all contact fields.', 'error');
      return;
    }
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      showToast('Thank you! Our mobile lab coordinator will respond within 24 hours.', 'success');
      setFormData({ name: '', email: '', subject: 'Workshop Inquiry', message: '' });
    }, 600);
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest px-3 py-1 rounded-full bg-cyan-950/60 border border-cyan-800/50 inline-flex items-center gap-1.5">
            <MessageSquare className="w-3.5 h-3.5" />
            Connect With Fleet Dispatch
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            We Are Here to <span className="gradient-text">Help Your School</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
            Have questions regarding curriculum alignment, bus parking requirements, grant funding assistance, or district scheduling? Reach out to our mobile team.
          </p>
        </div>

        {/* Contact Info & Form Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-6">
              <h3 className="text-xl font-bold text-white">Direct Communications</h3>
              
              <div className="space-y-4 text-xs sm:text-sm text-slate-300">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dispatch Hotline</p>
                    <p className="text-slate-400">+1 (800) 555-MAKER / +1 (555) 382-9102</p>
                    <p className="text-[11px] text-slate-500">Mon - Fri, 7:00 AM - 5:30 PM EST</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-orange-500/20 text-orange-400 flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Curriculum & Booking Email</p>
                    <p className="text-cyan-400 font-mono">dispatch@makerspaceonwheels.org</p>
                    <p className="text-[11px] text-slate-500">Guaranteed response within 1 business day</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">Mobile Fleet HQ & Maintenance Depot</p>
                    <p className="text-slate-400">Hub 1: 420 Innovation Way, Science Park, District 7</p>
                  </div>
                </div>
              </div>

              {/* Service regions */}
              <div className="pt-4 border-t border-slate-800 space-y-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400">Current Mobile Van Service Territory</h4>
                <div className="flex flex-wrap gap-1.5">
                  {['Metro Tri-County Area', 'Valley STEM Cluster', 'Northern District Schools', 'East County Charter District'].map(t => (
                    <span key={t} className="text-[11px] px-2.5 py-1 rounded-lg bg-slate-800 text-cyan-300 font-medium border border-slate-700">
                      ✓ {t}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 rounded-3xl glass-card border border-slate-800 space-y-4">
              <h3 className="text-xl font-bold text-white mb-2">Send an Inquiry to Our Coordinators</h3>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Dr. Robert Vance"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">School / Organization Email *</label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    placeholder="educator@school.edu"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Inquiry Type</label>
                <select
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                >
                  <option value="Workshop Inquiry">Book a School Workshop Residency</option>
                  <option value="Curriculum Customization">Customizing Curriculum for Our Grade Level</option>
                  <option value="Grant & Funding Assistance">Title I / STEM Grant Funding Assistance</option>
                  <option value="Media or Partnership">Press, Media or District Partnership</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Message *</label>
                <textarea
                  rows={4}
                  required
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  placeholder="Tell us about your school, student cohort size, and any specific goals..."
                  className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl font-bold text-xs sm:text-sm bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition flex items-center justify-center gap-2 shadow-glow"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Send Message to Dispatch</span>
                  </>
                )}
              </button>
            </form>
          </div>

        </div>

        {/* FAQ Section */}
        <div className="max-w-3xl mx-auto space-y-6">
          <div className="text-center space-y-2">
            <h3 className="text-2xl font-bold text-white flex items-center justify-center gap-2">
              <HelpCircle className="w-6 h-6 text-cyan-400" />
              <span>Frequently Asked Questions</span>
            </h3>
            <p className="text-xs sm:text-sm text-slate-400">Quick answers regarding parking, power, safety, and school logistics.</p>
          </div>

          <div className="space-y-3">
            {faqs.map((faq, idx) => (
              <div
                key={idx}
                className="rounded-2xl glass-card border border-slate-800 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-xs sm:text-sm font-bold text-white hover:text-cyan-400 transition"
                >
                  <span>{faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${openFaq === idx ? 'rotate-180 text-cyan-400' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-300 leading-relaxed border-t border-slate-800/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

