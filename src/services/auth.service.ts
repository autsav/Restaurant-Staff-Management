import { Injectable, signal, computed, inject } from '@angular/core';
import { Employee } from '../models/app.models';
import { DataService } from './data.service';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private dataService = inject(DataService);
  private employees = this.dataService.employees;
  
  // Start as Manager (Alice)
  private currentUserId = signal<number>(1);
  
  currentUser = computed<Employee | undefined>(() => {
    return this.employees().find(e => e.id === this.currentUserId());
  });

  isManager = computed<boolean>(() => {
    return this.currentUser()?.role === 'Manager';
  });

  switchUser() {
    // Switch between Manager (Alice, ID 1) and Employee (Charlie, ID 3)
    this.currentUserId.set(this.currentUserId() === 1 ? 3 : 1);
  }
}
