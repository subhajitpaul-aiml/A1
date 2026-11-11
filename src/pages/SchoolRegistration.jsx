import React, { useState } from 'react';
import { 
  Building, 
  MapPin, 
  User, 
  Mail, 
  Phone, 
  Users, 
  Calendar, 
  Layers, 
  Truck, 
  CheckCircle, 
  AlertCircle, 
  Sparkles,
  Info
} from 'lucide-react';
import confetti from 'canvas-confetti';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const SchoolRegistration = () => {
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    schoolName: '',
    schoolAddress: '',
    district: '',
    contactPerson: '',
    roleTitle: 'Principal',
    email: '',
    phone: '',
    studentsCount: '30',
    gradeLevels: 'Grade 7',
    preferredWorkshop: 'Introduction to 3D Printing',
    preferredDate: '',
    backupDate: '',
    parkingAvailable: true,
    powerAccess: 'Standard 120V Outlet Available',
    specialRequirements: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState(null);

  const validate = () => {
    const newErrors = {};
    if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
    if (!formData.schoolAddress.trim()) newErrors.schoolAddress = 'School address is required';
    if (!formData.contactPerson.trim()) newErrors.contactPerson = 'Contact name is required';
    if (!formData.email.trim() || !formData.email.includes('@')) newErrors.email = 'Valid email is required';
    if (!formData.phone.trim() || formData.phone.length < 7) newErrors.phone = 'Valid phone number is required';
    if (!formData.preferredDate) newErrors.preferredDate = 'Please select a preferred visit date';
    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validate();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      showToast('Please fix highlighted form errors.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await api.createBooking({
        schoolName: formData.schoolName,
        schoolAddress: formData.schoolAddress,
        contactPerson: formData.contactPerson,
        email: formData.email,
        phone: formData.phone,
        workshopTitle: formData.preferredWorkshop,
        studentsCount: formData.studentsCount,
        date: formData.preferredDate,
        backupDate: formData.backupDate,
        specialNotes: formData.specialRequirements
      });

      setIsSubmitting(false);
      setSubmissionSuccess({
        bookingId: res.booking?.id || 'BK-2026',
        ...formData
      });

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });

      showToast('School visit registration submitted! Official confirmation sent.', 'success');
    } catch {
      setIsSubmitting(false);
      showToast('Registration failed. Please try again.', 'error');
    }
  };

  return (
    <div className="py-12 sm:py-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Header */}
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-orange-400 uppercase tracking-widest px-3 py-1 rounded-full bg-orange-950/60 border border-orange-800/50 inline-flex items-center gap-1.5">
            <Truck className="w-3.5 h-3.5" />
            School Partnership Portal
          </span>
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Schedule a <span className="gradient-text-orange">Mobile Maker Van Visit</span>
          </h1>
          <p className="text-slate-300 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            Register your middle school for an on-site fabrication residency. Our mobile van team arrives with 3D printers, design software, and materials ready to ignite student innovation.
          </p>
        </div>

        {submissionSuccess ? (
          <div className="p-8 sm:p-10 rounded-3xl glass-card border border-emerald-500/40 text-center space-y-6">
            <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto shadow-glow">
              <CheckCircle className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
                Registration Confirmed!
              </h2>
              <p className="text-sm text-cyan-300 font-mono">
                Booking ID: <strong>{submissionSuccess.bookingId}</strong>
              </p>
              <p className="text-sm text-slate-300 max-w-lg mx-auto">
                Thank you, <strong className="text-white">{submissionSuccess.contactPerson}</strong>. We have allocated Mobile Lab Unit 1 for <strong className="text-white">{submissionSuccess.schoolName}</strong> on <strong className="text-white">{submissionSuccess.preferredDate}</strong>.
              </p>
            </div>

            <div className="max-w-md mx-auto p-4 rounded-2xl bg-slate-900 border border-slate-700/80 text-left text-xs text-slate-300 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-400">Workshop:</span>
                <span className="font-semibold text-white">{submissionSuccess.preferredWorkshop}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Student Cohort:</span>
                <span className="font-semibold text-white">{submissionSuccess.studentsCount} Students ({submissionSuccess.gradeLevels})</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Contact Email:</span>
                <span className="font-semibold text-cyan-300">{submissionSuccess.email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Status:</span>
                <span className="font-semibold text-amber-300">Pending Dispatch Route Confirmation</span>
              </div>
            </div>

            <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
              <button
                onClick={() => setSubmissionSuccess(null)}
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-bold text-xs sm:text-sm bg-cyan-500 text-slate-950 hover:bg-cyan-400 transition"
              >
                Register Another Cohort
              </button>
              <a
                href="#/workshops"
                className="w-full sm:w-auto px-6 py-2.5 rounded-xl font-semibold text-xs sm:text-sm bg-slate-800 text-white hover:bg-slate-700 transition"
              >
                Browse Other Programs
              </a>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-6 sm:p-10 rounded-3xl glass-card border border-slate-800 space-y-8">
            
            {/* Step 1: School Information */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Building className="w-5 h-5 text-cyan-400" />
                <h3 className="text-lg font-bold text-white">1. School Information</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    School Name *
                  </label>
                  <input
                    type="text"
                    name="schoolName"
                    value={formData.schoolName}
                    onChange={handleChange}
                    placeholder="e.g. Lincoln Science Academy"
                    className={`w-full bg-slate-900 border ${errors.schoolName ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                  />
                  {errors.schoolName && <p className="text-[11px] text-rose-400 mt-1">{errors.schoolName}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    School District / Charter Org
                  </label>
                  <input
                    type="text"
                    name="district"
                    value={formData.district}
                    onChange={handleChange}
                    placeholder="e.g. Unified School District #4"
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  School Physical Street Address *
                </label>
                <div className="relative">
                  <MapPin className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                  <input
                    type="text"
                    name="schoolAddress"
                    value={formData.schoolAddress}
                    onChange={handleChange}
                    placeholder="e.g. 1044 Innovation Blvd, Cityville, ST 90210"
                    className={`w-full bg-slate-900 border ${errors.schoolAddress ? 'border-rose-500' : 'border-slate-700'} rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                  />
                </div>
                {errors.schoolAddress && <p className="text-[11px] text-rose-400 mt-1">{errors.schoolAddress}</p>}
              </div>
            </div>

            {/* Step 2: Contact Person */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <User className="w-5 h-5 text-orange-400" />
                <h3 className="text-lg font-bold text-white">2. Lead Educator / Coordinator</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Contact Person's Full Name *
                  </label>
                  <input
                    type="text"
                    name="contactPerson"
                    value={formData.contactPerson}
                    onChange={handleChange}
                    placeholder="e.g. Dr. Robert Vance"
                    className={`w-full bg-slate-900 border ${errors.contactPerson ? 'border-rose-500' : 'border-slate-700'} rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                  />
                  {errors.contactPerson && <p className="text-[11px] text-rose-400 mt-1">{errors.contactPerson}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Role / Title
                  </label>
                  <select
                    name="roleTitle"
                    value={formData.roleTitle}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Principal">School Principal / Vice Principal</option>
                    <option value="STEM Coordinator">STEM / Technology Coordinator</option>
                    <option value="Science Teacher">Science / Math Department Lead</option>
                    <option value="Activities Director">Student Activities Director</option>
                    <option value="PTA President">PTA / Foundation Officer</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Institutional Email *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="rvance@lincolnmiddle.edu"
                      className={`w-full bg-slate-900 border ${errors.email ? 'border-rose-500' : 'border-slate-700'} rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                    />
                  </div>
                  {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Direct Phone Number *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 382-9102"
                      className={`w-full bg-slate-900 border ${errors.phone ? 'border-rose-500' : 'border-slate-700'} rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                    />
                  </div>
                  {errors.phone && <p className="text-[11px] text-rose-400 mt-1">{errors.phone}</p>}
                </div>
              </div>
            </div>

            {/* Step 3: Workshop Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 border-b border-slate-800 pb-3">
                <Layers className="w-5 h-5 text-amber-400" />
                <h3 className="text-lg font-bold text-white">3. Workshop Logistics & Preferences</h3>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Workshop *
                  </label>
                  <select
                    name="preferredWorkshop"
                    value={formData.preferredWorkshop}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="Introduction to 3D Printing">1. Introduction to 3D Printing (2.5h)</option>
                    <option value="Beginner CAD Modelling">2. Beginner CAD Modelling (3.0h)</option>
                    <option value="Digital Fabrication">3. Digital Fabrication (4.0h)</option>
                    <option value="Rapid Prototyping">4. Rapid Prototyping (3.5h)</option>
                    <option value="Creative STEM Projects">5. Creative STEM Projects (4.0h)</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Number of Participating Students
                  </label>
                  <select
                    name="studentsCount"
                    value={formData.studentsCount}
                    onChange={handleChange}
                    className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                  >
                    <option value="20-30">Single Classroom (20 - 30 Students)</option>
                    <option value="40-60">Two Cohorts (40 - 60 Students)</option>
                    <option value="75-100">Full Grade Level (75 - 100 Students)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Preferred Target Date *
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      name="preferredDate"
                      value={formData.preferredDate}
                      onChange={handleChange}
                      className={`w-full bg-slate-900 border ${errors.preferredDate ? 'border-rose-500' : 'border-slate-700'} rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500`}
                    />
                  </div>
                  {errors.preferredDate && <p className="text-[11px] text-rose-400 mt-1">{errors.preferredDate}</p>}
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-300 mb-1">
                    Alternate / Backup Date
                  </label>
                  <div className="relative">
                    <Calendar className="absolute left-3.5 top-3 w-4 h-4 text-slate-500" />
                    <input
                      type="date"
                      name="backupDate"
                      value={formData.backupDate}
                      onChange={handleChange}
                      className="w-full bg-slate-900 border border-slate-700 rounded-xl pl-10 pr-3.5 py-2.5 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Van Access Checkbox */}
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
              <div className="flex items-start gap-3">
                <input
                  type="checkbox"
                  id="parkingAvailable"
                  name="parkingAvailable"
                  checked={formData.parkingAvailable}
                  onChange={handleChange}
                  className="mt-1 w-4 h-4 rounded text-cyan-500 focus:ring-cyan-500 bg-slate-800 border-slate-700"
                />
                <label htmlFor="parkingAvailable" className="text-xs text-slate-300">
                  <strong className="text-white">Van Parking Spot Available:</strong> We confirm the school has space for a 24-foot mobile lab van in the bus loop, visitor parking, or courtyard near an entrance.
                </label>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">
                Special Requests or Curriculum Focus (Optional)
              </label>
              <textarea
                name="specialRequirements"
                rows={3}
                value={formData.specialRequirements}
                onChange={handleChange}
                placeholder="e.g. Our 7th graders are currently studying kinetic energy; we would love to customize the print project around wind turbine blades or gearboxes."
                className="w-full bg-slate-900 border border-slate-700 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500"
              />
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl font-bold text-sm sm:text-base bg-gradient-to-r from-orange-500 to-amber-500 text-slate-950 shadow-glow-orange hover:brightness-110 active:scale-95 transition disabled:opacity-60 flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                    <span>Submitting Registration to Dispatch...</span>
                  </>
                ) : (
                  <>
                    <Calendar className="w-4 h-4" />
                    <span>Submit School Registration & Lock Date</span>
                  </>
                )}
              </button>
            </div>

          </form>
        )}

      </div>
    </div>
  );
};

