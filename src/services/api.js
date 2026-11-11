import { WORKSHOPS, INITIAL_BOOKINGS, INITIAL_STUDENT_COURSES, INITIAL_SUBMISSIONS } from './mockData';

const BASE_URL = '/api';

// Helper for local persistent fallback
const getStorageItem = (key, fallback) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : fallback;
  } catch {
    return fallback;
  }
};

const setStorageItem = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (e) {
    console.error('Storage error', e);
  }
};

export const api = {
  // Workshops
  async getWorkshops() {
    try {
      const res = await fetch(`${BASE_URL}/workshops`);
      if (res.ok) return await res.json();
    } catch {}
    return WORKSHOPS;
  },

  async getWorkshopById(id) {
    try {
      const res = await fetch(`${BASE_URL}/workshops/${id}`);
      if (res.ok) return await res.json();
    } catch {}
    return WORKSHOPS.find(w => w.id === id || w.slug === id) || WORKSHOPS[0];
  },

  // Bookings
  async getBookings() {
    try {
      const res = await fetch(`${BASE_URL}/bookings`);
      if (res.ok) return await res.json();
    } catch {}
    return getStorageItem('makerspace_bookings', INITIAL_BOOKINGS);
  },

  async createBooking(bookingData) {
    try {
      const res = await fetch(`${BASE_URL}/bookings`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });
      if (res.ok) return await res.json();
    } catch {}

    // Fallback store
    const current = getStorageItem('makerspace_bookings', INITIAL_BOOKINGS);
    const newBooking = {
      id: `BK-${Math.floor(1000 + Math.random() * 9000)}`,
      ...bookingData,
      status: 'Pending',
      amount: '$650',
      instructor: 'Pending Assignment',
      vanId: 'Van-Alpha-01',
      createdAt: new Date().toISOString()
    };
    const updated = [newBooking, ...current];
    setStorageItem('makerspace_bookings', updated);
    return { success: true, booking: newBooking };
  },

  async updateBookingStatus(id, status) {
    try {
      const res = await fetch(`${BASE_URL}/bookings/${id}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status })
      });
      if (res.ok) return await res.json();
    } catch {}

    const current = getStorageItem('makerspace_bookings', INITIAL_BOOKINGS);
    const updated = current.map(b => b.id === id ? { ...b, status } : b);
    setStorageItem('makerspace_bookings', updated);
    return { success: true, id, status };
  },

  // Student Courses & Submissions
  async getStudentCourses() {
    try {
      const res = await fetch(`${BASE_URL}/students/courses`);
      if (res.ok) return await res.json();
    } catch {}
    return INITIAL_STUDENT_COURSES;
  },

  async getSubmissions() {
    try {
      const res = await fetch(`${BASE_URL}/submissions`);
      if (res.ok) return await res.json();
    } catch {}
    return getStorageItem('makerspace_submissions', INITIAL_SUBMISSIONS);
  },

  async submitProject(projectData) {
    try {
      const res = await fetch(`${BASE_URL}/submissions`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(projectData)
      });
      if (res.ok) return await res.json();
    } catch {}

    const current = getStorageItem('makerspace_submissions', INITIAL_SUBMISSIONS);
    const newSub = {
      id: `sub-${Date.now()}`,
      ...projectData,
      date: new Date().toISOString().split('T')[0],
      status: 'In Review',
      feedback: 'Model uploaded successfully. Pre-flight mesh check in progress by Mobile Lab Instructor.',
      score: 'Pending',
      reviewer: 'Marcus Chen'
    };
    const updated = [newSub, ...current];
    setStorageItem('makerspace_submissions', updated);
    return { success: true, submission: newSub };
  },

  // Overview stats
  async getStats() {
    try {
      const res = await fetch(`${BASE_URL}/stats`);
      if (res.ok) return await res.json();
    } catch {}

    return {
      totalSchools: 48,
      totalStudents: 3420,
      totalInstructors: 14,
      totalWorkshops: 5,
      pendingBookings: 6,
      completedWorkshops: 182,
      activeMobileVans: 3,
      printedHours: '4,890+'
    };
  }
};

