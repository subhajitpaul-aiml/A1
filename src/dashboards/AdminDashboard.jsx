import React, { useState, useEffect } from 'react';
import { DashboardLayout } from './DashboardLayout';
import { 
  Building, 
  Users, 
  GraduationCap, 
  Layers, 
  Clock, 
  CheckCircle, 
  Truck, 
  AlertCircle,
  MoreVertical,
  Calendar,
  Search,
  Filter
} from 'lucide-react';
import { api } from '../services/api';
import { useToast } from '../context/ToastContext';

export const AdminDashboard = () => {
  const { showToast } = useToast();
  const [stats, setStats] = useState({
    totalSchools: 48,
    totalStudents: 3420,
    totalInstructors: 14,
    totalWorkshops: 5,
    pendingBookings: 6,
    completedWorkshops: 182,
    activeMobileVans: 3
  });

  const [bookings, setBookings] = useState([]);
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    const load = async () => {
      const data = await api.getBookings();
      setBookings(data);
      const s = await api.getStats();
      setStats(s);
    };
    load();
  }, []);

  const handleStatusUpdate = async (id, newStatus) => {
    await api.updateBookingStatus(id, newStatus);
    setBookings(prev => prev.map(b => b.id === id ? { ...b, status: newStatus } : b));
    showToast(`Booking ${id} marked as ${newStatus}!`, 'success');
  };

  const filteredBookings = filterStatus === 'All' 
    ? bookings 
    : bookings.filter(b => b.status === filterStatus);

  return (
    <DashboardLayout
      title="Super Admin Fleet Management"
      subtitle="District overview, mobile lab van routing, and workshop reservations"
    >
      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl glass-card border border-cyan-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Partner Schools</span>
            <Building className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-mono">
            {stats.totalSchools}
          </div>
          <div className="text-[11px] text-cyan-400 mt-1">Across 4 regional districts</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-emerald-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Students Reached</span>
            <Users className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-mono">
            {stats.totalStudents}
          </div>
          <div className="text-[11px] text-emerald-400 mt-1">100% printed a physical design</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-orange-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Pending Bookings</span>
            <Clock className="w-4 h-4 text-orange-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-mono">
            {bookings.filter(b => b.status === 'Pending').length}
          </div>
          <div className="text-[11px] text-orange-400 mt-1">Requires instructor assignment</div>
        </div>

        <div className="p-5 rounded-2xl glass-card border border-purple-500/30">
          <div className="flex items-center justify-between text-slate-400 text-xs">
            <span>Completed Workshops</span>
            <CheckCircle className="w-4 h-4 text-purple-400" />
          </div>
          <div className="text-2xl sm:text-3xl font-extrabold text-white mt-2 font-mono">
            {stats.completedWorkshops}
          </div>
          <div className="text-[11px] text-purple-400 mt-1">4.92 avg educator rating</div>
        </div>

      </div>

      {/* Mobile Fleet Vans Real-Time Status */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        <h3 className="text-base font-bold text-white flex items-center gap-2">
          <Truck className="w-5 h-5 text-cyan-400" />
          <span>Mobile Fabrication Fleet Units</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Van Unit Alpha-01</span>
              <span className="px-2 py-0.5 rounded-full bg-emerald-950 text-emerald-300 border border-emerald-800 text-[10px]">On Location</span>
            </div>
            <p className="text-xs text-slate-400">At Lincoln Middle School • 12 Bambu X1C units printing</p>
            <div className="text-[11px] text-slate-500">Lead: Marcus Chen • Route District 3</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Van Unit Beta-02</span>
              <span className="px-2 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800 text-[10px]">Depot Prep</span>
            </div>
            <p className="text-xs text-slate-400">Restocking 30kg PLA Filament spools & cleaning build plates</p>
            <div className="text-[11px] text-slate-500">Lead: David Reynolds • Scheduled for Oakridge</div>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-700/70 space-y-2">
            <div className="flex justify-between items-center text-xs">
              <span className="font-bold text-white">Van Unit Gamma-03</span>
              <span className="px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700 text-[10px]">Standby Fleet</span>
            </div>
            <p className="text-xs text-slate-400">Battery 100% charged • Firmware upgraded to v2.4</p>
            <div className="text-[11px] text-slate-500">Scheduled for West Valley STEM</div>
          </div>
        </div>
      </div>

      {/* Booking Management Table */}
      <div className="p-6 rounded-2xl glass-card border border-slate-800 space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h3 className="text-lg font-bold text-white">School Workshop Bookings</h3>
            <p className="text-xs text-slate-400">Manage dispatch dates, assign mobile instructors, and approve itineraries</p>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-2 text-xs">
            <span className="text-slate-400">Status:</span>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="bg-slate-900 border border-slate-700 rounded-lg px-2.5 py-1 text-xs text-white"
            >
              <option value="All">All Bookings</option>
              <option value="Confirmed">Confirmed</option>
              <option value="Pending">Pending</option>
              <option value="Completed">Completed</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-900/80 text-slate-400 uppercase tracking-wider font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Booking Ref</th>
                <th className="py-3 px-4">School & Contact</th>
                <th className="py-3 px-4">Workshop</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4">Cohort</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80">
              {filteredBookings.map((b) => (
                <tr key={b.id} className="hover:bg-slate-800/40 transition">
                  <td className="py-3 px-4 font-mono font-bold text-cyan-300">{b.id}</td>
                  <td className="py-3 px-4">
                    <div className="font-bold text-white">{b.schoolName}</div>
                    <div className="text-[11px] text-slate-400">{b.contactPerson} ({b.phone})</div>
                  </td>
                  <td className="py-3 px-4 text-slate-300">{b.workshopTitle}</td>
                  <td className="py-3 px-4 font-mono">{b.date}</td>
                  <td className="py-3 px-4 text-slate-300">{b.studentsCount} Students</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded-full font-semibold text-[10px] border ${
                      b.status === 'Confirmed'
                        ? 'bg-emerald-950 text-emerald-300 border-emerald-800'
                        : b.status === 'Pending'
                        ? 'bg-amber-950 text-amber-300 border-amber-800'
                        : 'bg-slate-800 text-slate-300 border-slate-700'
                    }`}>
                      {b.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right space-x-1.5 whitespace-nowrap">
                    {b.status === 'Pending' && (
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'Confirmed')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 border border-emerald-500/40"
                      >
                        Approve
                      </button>
                    )}
                    {b.status === 'Confirmed' && (
                      <button
                        onClick={() => handleStatusUpdate(b.id, 'Completed')}
                        className="px-2.5 py-1 rounded-lg text-[11px] font-bold bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 border border-purple-500/40"
                      >
                        Mark Done
                      </button>
                    )}
                    <button
                      onClick={() => handleStatusUpdate(b.id, 'Cancelled')}
                      className="px-2 py-1 rounded-lg text-[11px] font-semibold text-slate-400 hover:text-rose-400 hover:bg-slate-800"
                    >
                      Cancel
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

      </div>

    </DashboardLayout>
  );
};

