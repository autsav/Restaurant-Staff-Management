import { Injectable, signal } from '@angular/core';
import { Employee, Announcement, Shift, Delivery, HRRequest } from '../models/app.models';

@Injectable({ providedIn: 'root' })
export class DataService {
  employees = signal<Employee[]>([
    { id: 1, fullName: 'Alice Johnson', role: 'Manager', phone: '555-0101', email: 'alice@restauranthub.app', availabilityNotes: 'Mon-Fri, 9am-5pm', joinDate: '2022-01-15', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=1' },
    { id: 2, fullName: 'Bob Williams', role: 'Chef', phone: '555-0102', email: 'bob@restauranthub.app', availabilityNotes: 'Flexible weekends', joinDate: '2022-03-20', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=2' },
    { id: 3, fullName: 'Charlie Brown', role: 'Waiter', phone: '555-0103', email: 'charlie@restauranthub.app', availabilityNotes: 'Evenings only', joinDate: '2023-05-10', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=3' },
    { id: 4, fullName: 'Diana Miller', role: 'Delivery Driver', phone: '555-0104', email: 'diana@restauranthub.app', availabilityNotes: 'All days', joinDate: '2023-06-01', status: 'Active', avatarUrl: 'https://i.pravatar.cc/150?u=4' },
    { id: 5, fullName: 'Eve Davis', role: 'Host', phone: '555-0105', email: 'eve@restauranthub.app', availabilityNotes: 'Weekends', joinDate: '2023-02-11', status: 'Inactive', avatarUrl: 'https://i.pravatar.cc/150?u=5' }
  ]);

  announcements = signal<Announcement[]>([
    { id: 1, title: 'Staff Meeting This Friday', message: 'All hands meeting this Friday at 10 AM to discuss the new menu. Attendance is mandatory.', postedBy: 1, datePosted: '2024-07-20T10:00:00Z', category: 'Urgent', readBy: [2, 3] },
    { id: 2, title: 'New Uniform Policy', message: 'Please see the attached document regarding the updated uniform policy, effective next Monday.', postedBy: 1, datePosted: '2024-07-18T14:30:00Z', category: 'Policy', readBy: [] },
    { id: 3, title: 'Welcome to the team, Diana!', message: 'Let\'s all give a warm welcome to our new delivery driver, Diana Miller!', postedBy: 1, datePosted: '2024-07-15T09:00:00Z', category: 'General', readBy: [2,3,4,5] }
  ]);

  shifts = signal<Shift[]>([
    { id: 1, date: '2024-07-25', startTime: '17:00', endTime: '22:00', employeeId: 3, role: 'Waiter', status: 'Scheduled' },
    { id: 2, date: '2024-07-25', startTime: '16:00', endTime: '23:00', employeeId: 2, role: 'Chef', status: 'Scheduled' },
    { id: 3, date: '2024-07-25', startTime: '18:00', endTime: '21:00', employeeId: 4, role: 'Delivery Driver', status: 'Scheduled' },
    { id: 4, date: '2024-07-24', startTime: '17:00', endTime: '22:00', employeeId: 3, role: 'Waiter', status: 'Completed' },
    { id: 5, date: '2024-07-23', startTime: '17:00', endTime: '22:00', employeeId: 3, role: 'Waiter', status: 'Missed', notes: 'Called in sick' },
  ]);

  deliveries = signal<Delivery[]>([
    { id: 1, date: '2024-07-25', orderId: 'ORD-101', customerName: 'John Doe', deliveryAddress: '123 Main St, Anytown', assignedStaffId: 4, expectedTime: '19:00', status: 'In Progress' },
    { id: 2, date: '2024-07-25', orderId: 'ORD-102', customerName: 'Jane Smith', deliveryAddress: '456 Oak Ave, Anytown', assignedStaffId: 4, expectedTime: '19:30', status: 'Pending' },
    { id: 3, date: '2024-07-24', orderId: 'ORD-099', customerName: 'Peter Jones', deliveryAddress: '789 Pine Ln, Anytown', assignedStaffId: 4, expectedTime: '20:00', status: 'Completed', photoProofUrl: 'https://picsum.photos/200' },
  ]);

  hrRequests = signal<HRRequest[]>([
    { id: 1, employeeId: 3, type: 'Leave', startDate: '2024-08-01', endDate: '2024-08-05', reason: 'Family vacation.', status: 'Pending' },
    { id: 2, employeeId: 2, type: 'Availability Change', startDate: '2024-08-10', endDate: '2024-08-10', reason: 'Switching to weekend availability only.', status: 'Approved', managerNotes: 'Discussed and approved.' },
    { id: 3, employeeId: 4, type: 'Leave', startDate: '2024-07-28', endDate: '2024-07-28', reason: 'Doctor\'s appointment', status: 'Denied', managerNotes: 'Not enough notice provided.' },
  ]);
  
  getEmployeeById(id: number): Employee | undefined {
    return this.employees().find(e => e.id === id);
  }
}
