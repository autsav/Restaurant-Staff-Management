import { Component, ChangeDetectionStrategy, inject } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AuthService } from '../services/auth.service';
import { DataService } from '../services/data.service';
import { Announcement } from '../models/app.models';

@Component({
  selector: 'app-announcements',
  standalone: true,
  imports: [CommonModule, DatePipe],
  templateUrl: './announcements.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AnnouncementsComponent {
  authService = inject(AuthService);
  dataService = inject(DataService);

  currentUser = this.authService.currentUser;
  isManager = this.authService.isManager;
  announcements = this.dataService.announcements;

  getPosterName(id: number): string {
    return this.dataService.getEmployeeById(id)?.fullName ?? 'Unknown';
  }

  isRead(announcement: Announcement): boolean {
    const userId = this.currentUser()?.id;
    return userId ? announcement.readBy.includes(userId) : false;
  }

  markAsRead(announcementId: number): void {
    const userId = this.currentUser()?.id;
    if (!userId) return;

    this.dataService.announcements.update(announcements =>
      announcements.map(a => {
        if (a.id === announcementId && !a.readBy.includes(userId)) {
          return { ...a, readBy: [...a.readBy, userId] };
        }
        return a;
      })
    );
  }

  deleteAnnouncement(announcementId: number): void {
    if (!this.isManager()) return;
    this.dataService.announcements.update(announcements =>
      announcements.filter(a => a.id !== announcementId)
    );
  }
}
