import React, { useState } from 'react';
import { X, Calendar, Users, Building, Mail, Phone, CheckCircle, Sparkles, Clock, Layers } from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const BookingModal = ({ isOpen, onClose, workshop, defaultDate = '' }) => {
  const { showToast } = useToast();
  const [formData, setFormData] = useState({
    schoolName: '',
    contactPerson: '',
    email: '',
    phone: '',
    studentsCount: '30',
    preferredDate: defaultDate || '2026-11-28',
    workshopTitle: workshop?.title || 'Introduction to 3D Printing',
    specialNotes: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingRef, setBookingRef] = useState('');

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.schoolName || !formData.contactPerson || !formData.email || !formData.phone) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.createBooking({
        ...formData,
        workshopTitle: workshop?.title || formData.workshopTitle
      });

      setIsSubmitting(false);
      setIsSuccess(true);
      setBookingRef(res.booking?.id || 'BK-1099');

      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      showToast('Lab visit booked successfully! Confirmation email dispatched.', 'success');
    } catch {
      setIsSubmitting(false);
      showToast('Booking failed. Please try again or call dispatch.', 'error');
    }
  };

  const handleClose = () => {
    setIsSuccess(false);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
      <div 
        className="relative w-full max-w-xl bg-slate-900 border border-slate-700/80 rounded-2xl shadow-2xl p-6 sm:p-8 overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Glow corner */}
        <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

        <button
          onClick={handleClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {isSuccess ? (
          <div className="text-center py-6 space-y-4">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-2xl font-bold text-white">Workshop Reserved!</h3>
              <p className="text-sm text-slate-300 mt-1">
                Booking Reference: <strong className="text-cyan-400 font-mono">{bookingRef}</strong>
              </p>
              <p className="text-xs text-slate-400 max-w-sm mx-auto mt-2">
                We have notified our Mobile Lab Dispatch team for <span className="text-white font-medium">{formData.schoolName}</span>. You will receive an itinerary confirmation within 24 hours.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-slate-800/80 border border-slate-700/60 text-left text-xs text-slate-300 space-y-1.5">
              <div className="flex justify-between">
                <span className="text-slate-400">Program:</span>
                <span className="font-semibold text-white">{workshop?.title || formData.workshopTitle}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Scheduled Date:</span>
                <span className="font-semibold text-cyan-300">{formData.preferredDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Capacity:</span>
                <span className="font-semibold text-white">{formData.studentsCount} Students</span>
              </div>
            </div>

            <button
              onClick={handleClose}
              className="w-full py-2.5 rounded-xl font-semibold text-sm bg-gradient-to-r from-cyan-500 to-blue-600 text-slate-950 shadow-glow hover:brightness-110 transition"
            >
              Done & Return to Catalog
            </button>
          </div>
        ) : (
          <div>
            <div className="mb-6">
              <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800/60 uppercase tracking-wider inline-flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                Mobile Van Booking
              </span>
              <h3 className="text-2xl font-extrabold text-white mt-2">
                Book Workshop: {workshop?.title || 'Mobile STEM Lab'}
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Our fully equipped 3D printing & digital fabrication van travels directly to your school bus zone.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    School Name *
                  </label>
                  <div className="relative">
                    <Building className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="text"
                      name="schoolName"
                      required
                      value={formData.schoolName}
                      onChange={handleChange}
                      placeholder="e.g. Lincoln Middle School"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Lead Educator / Contact *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    required
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Robert Vance"
                    className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Contact Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="educator@school.edu"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 000-0000"
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Estimated Student Count
                  </label>
                  <div className="relative">
                    <Users className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <select
                      name="studentsCount"
                      value={formData.studentsCount}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    >
                      <option value="15-20">15 - 20 Students (1 Cohort)</option>
                      <option value="25-30">25 - 30 Students (Standard Class)</option>
                      <option value="35-50">35 - 50 Students (Double Cohort)</option>
                      <option value="60+">60+ Students (Full Grade Level)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-slate-300 mb-1">
                    Target Visit Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3 top-2.5 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      name="preferredDate"
                      required
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className="w-full bg-slate-950/80 border border-slate-700 rounded-xl pl-9 pr-3 py-2 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-slate-300 mb-1">
                  Special Notes or Parking Details
                </label>
                <textarea
                  name="specialNotes"
                  rows={2}
                  value={formData.specialNotes}
                  onChange={handleChange}
                  placeholder="e.g. Van can park near Gym Door #3; need standard 120V exterior outlet if available."
                  className="w-full bg-slate-950/80 border border-slate-700 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
                />
              </div>

              <div className="pt-2 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={handleClose}
                  className="px-4 py-2 rounded-xl text-xs sm:text-sm font-medium text-slate-400 hover:text-white hover:bg-slate-800 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 active:scale-95 transition disabled:opacity-60 flex items-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-3.5 h-3.5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                      <span>Reserving Van...</span>
                    </>
                  ) : (
                    <>
                      <Calendar className="w-4 h-4" />
                      <span>Confirm Workshop Booking</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

