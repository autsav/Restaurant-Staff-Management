import { Component, ChangeDetectionStrategy, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './services/auth.service';
import { DashboardComponent } from './components/dashboard.component';
import { AnnouncementsComponent } from './components/announcements.component';
// Placeholder components for other tabs
// import { RotaComponent } from './components/rota.component';
// import { DeliveriesComponent } from './components/deliveries.component';
// import { HrComponent } from './components/hr.component';
// import { ReportsComponent } from './components/reports.component';

type Tab = 'Dashboard' | 'Rota' | 'Deliveries' | 'HR' | 'Announcements' | 'Reports';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, DashboardComponent, AnnouncementsComponent], // Add other components here
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  title = 'restaurant-staff-hub';
  authService = inject(AuthService);
  currentUser = this.authService.currentUser;
  isManager = this.authService.isManager;

  activeTab = signal<Tab>('Dashboard');
  tabs: Tab[] = ['Dashboard', 'Rota', 'Deliveries', 'HR', 'Announcements', 'Reports'];
  
  mobileMenuOpen = signal(false);

  setActiveTab(tab: Tab) {
    this.activeTab.set(tab);
    this.mobileMenuOpen.set(false);
  }

  switchUser() {
    this.authService.switchUser();
  }
  
  toggleMobileMenu() {
    this.mobileMenuOpen.update(open => !open);
  }
}
