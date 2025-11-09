import { Component, ChangeDetectionStrategy, inject, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Employee, Shift, Delivery, HRRequest, Announcement } from '../models/app.models';
import { ChartComponent } from './chart.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, ChartComponent],
  templateUrl: './dashboard.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {
  authService = inject(AuthService);
  dataService = inject(DataService);

  currentUser = this.authService.currentUser;
  isManager = this.authService.isManager;

  // Manager-specific signals
  activeEmployees = computed(() => this.dataService.employees().filter(e => e.status === 'Active').length);
  inactiveEmployees = computed(() => this.dataService.employees().filter(e => e.status === 'Inactive').length);
  missedShifts = computed(() => this.dataService.shifts().filter(s => s.status === 'Missed'));
  pendingRequests = computed(() => this.dataService.hrRequests().filter(r => r.status === 'Pending'));
  
  // Employee-specific signals
  myShifts = computed(() => this.dataService.shifts().filter(s => s.employeeId === this.currentUser()?.id));
  myDeliveries = computed(() => this.dataService.deliveries().filter(d => d.assignedStaffId === this.currentUser()?.id));
  myHrRequests = computed(() => this.dataService.hrRequests().filter(r => r.employeeId === this.currentUser()?.id));
  myAnnouncements = computed(() => this.dataService.announcements().filter(a => !a.readBy.includes(this.currentUser()?.id ?? -1)));

  // Derived signals for employee dashboard to avoid logic in template
  myUpcomingShifts = computed(() => this.myShifts().filter(s => s.status === 'Scheduled'));
  myPendingDeliveries = computed(() => this.myDeliveries().filter(d => d.status !== 'Completed'));
  myPendingHrRequests = computed(() => this.myHrRequests().filter(r => r.status === 'Pending'));

  // Chart Data
  shiftOverviewData = computed(() => {
    const shifts = this.dataService.shifts();
    const scheduled = shifts.filter(s => s.status === 'Scheduled').length;
    const completed = shifts.filter(s => s.status === 'Completed').length;
    const missed = shifts.filter(s => s.status === 'Missed').length;
    return {
      labels: ['Scheduled', 'Completed', 'Missed'],
      datasets: [{
        label: 'Shifts This Week',
        data: [scheduled, completed, missed],
        backgroundColor: ['#facc15', '#4ade80', '#f87171'],
      }]
    };
  });

  deliveryStatusData = computed(() => {
    const deliveries = this.dataService.deliveries();
    const pending = deliveries.filter(d => d.status === 'Pending').length;
    const inProgress = deliveries.filter(d => d.status === 'In Progress').length;
    const completed = deliveries.filter(d => d.status === 'Completed').length;
    const delayed = deliveries.filter(d => d.status === 'Delayed').length;
    return {
      labels: ['Pending', 'In Progress', 'Completed', 'Delayed'],
      datasets: [{
        data: [pending, inProgress, completed, delayed],
        backgroundColor: ['#fb923c', '#60a5fa', '#4ade80', '#f87171'],
      }]
    };
  });

  chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
  };

  getEmployeeName(id: number): string {
    return this.dataService.getEmployeeById(id)?.fullName ?? 'Unknown';
  }
}
