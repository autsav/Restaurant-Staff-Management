export type Role = 'Manager' | 'Chef' | 'Waiter' | 'Delivery Driver' | 'Host';
export type EmployeeStatus = 'Active' | 'Inactive';
export type AnnouncementCategory = 'General' | 'Urgent' | 'Policy';
export type ShiftStatus = 'Scheduled' | 'Completed' | 'Missed';
export type DeliveryStatus = 'Pending' | 'In Progress' | 'Completed' | 'Delayed';
export type HRRequestType = 'Leave' | 'Availability Change';
export type HRRequestStatus = 'Pending' | 'Approved' | 'Denied';

export interface Employee {
  id: number;
  fullName: string;
  role: Role;
  phone: string;
  email: string;
  availabilityNotes: string;
  joinDate: string; // ISO 8601 format
  status: EmployeeStatus;
  avatarUrl: string;
}

export interface Announcement {
  id: number;
  title: string;
  message: string;
  postedBy: number; // Employee ID
  datePosted: string; // ISO 8601 format
  category: AnnouncementCategory;
  readBy: number[]; // Array of Employee IDs
}

export interface Shift {
  id: number;
  date: string; // YYYY-MM-DD
  startTime: string; // HH:mm
  endTime: string; // HH:mm
  employeeId: number;
  role: Role;
  status: ShiftStatus;
  notes?: string;
}

export interface Delivery {
  id: number;
  date: string; // YYYY-MM-DD
  orderId: string;
  customerName: string;
  deliveryAddress: string;
  assignedStaffId: number;
  expectedTime: string; // HH:mm
  status: DeliveryStatus;
  comments?: string;
  photoProofUrl?: string;
}

export interface HRRequest {
  id: number;
  employeeId: number;
  type: HRRequestType;
  startDate: string; // YYYY-MM-DD
  endDate: string; // YYYY-MM-DD
  reason: string;
  status: HRRequestStatus;
  managerNotes?: string;
}
