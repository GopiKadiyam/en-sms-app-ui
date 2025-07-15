import { Component } from '@angular/core';
import { SidebarComponent } from './sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-layout-shell',
  standalone: true,
  imports: [SidebarComponent, RouterOutlet],
  template: `
    <div class="flex min-h-screen w-full bg-background">
      <app-sidebar />
      <main class="flex-1 min-h-screen h-full max-h-screen overflow-auto p-4">
        <router-outlet />
      </main>
    </div>
  `,
})
export class LayoutShellComponent {} 