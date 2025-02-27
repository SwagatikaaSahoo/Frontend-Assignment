import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { RuleManagementComponent } from './rule-management/rule-management.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule, RouterOutlet, RuleManagementComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'ag-grid-crud-app-17';
}
