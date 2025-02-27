import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
 import { AgGridModule } from 'ag-grid-angular';



@Component({
  selector: 'app-rule-management',
  standalone: true,
  imports: [FormsModule,AgGridModule,CommonModule],
  templateUrl: './rule-management.component.html',
  styleUrl: './rule-management.component.scss'
})
export class RuleManagementComponent {
  private gridApi!: GridApi;

  // Form Data
  newRule: any = {
    ruleName: '',
    active: '',
    type: '',
    favourite: '',
    scheduled: '',
    createdDate: '',
    alert: '',
  };

  // Edit Row Data
  editRowData: any = {
    slNo: null,
    ruleName: '',
    active: 'Y',
    type: 'Match',
    favourite: 'N',
    scheduled: 'Y',
    createdDate: '',
    alert: 'Y',
  };

  // View Row Data
  viewRowData: any = {
    slNo: null,
    ruleName: '',
    active: '',
    type: '',
    favourite: '',
    scheduled: '',
    createdDate: '',
    alert: '',
  };

  // Column Definitions
  columnDefs: ColDef[] = [
    {
      headerName: 'Sl. No.',
      field: 'slNo',
      width: 100,
      sortable: false,
      filter: false,
    },
    { headerName: 'Rule Name', field: 'ruleName', sortable: true, filter: true, width: 200 },
    { headerName: 'Active', field: 'active', sortable: true, filter: true, width: 120 },
    { headerName: 'Type', field: 'type', sortable: true, filter: true, width: 150 },
    { headerName: 'Favourite', field: 'favourite', sortable: true, filter: true, width: 120 },
    { headerName: 'Scheduled', field: 'scheduled', sortable: true, filter: true, width: 120 },
    { headerName: 'Created Date', field: 'createdDate', sortable: true, filter: true, width: 180 },
    { headerName: 'Alert', field: 'alert', sortable: true, filter: true, width: 120 },
    {
      headerName: 'Action',
      cellRenderer: (params: any) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.display = 'flex';
        buttonContainer.style.gap = '5px';
        buttonContainer.style.justifyContent = 'center';

        // View Button
        const viewButton = document.createElement('button');
        viewButton.innerText = 'View';
        viewButton.classList.add('btn', 'btn-primary', 'btn-sm');
        viewButton.addEventListener('click', () => this.viewRow(params.data));
        buttonContainer.appendChild(viewButton);

        // Edit Button
        const editButton = document.createElement('button');
        editButton.innerText = 'Edit';
        editButton.classList.add('btn', 'btn-warning', 'btn-sm');
        editButton.addEventListener('click', () => this.openEditModal(params.data));
        buttonContainer.appendChild(editButton);

        // Delete Button
        const deleteButton = document.createElement('button');
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('btn', 'btn-danger', 'btn-sm');
        deleteButton.addEventListener('click', () => this.deleteRow(params.data));
        buttonContainer.appendChild(deleteButton);

        return buttonContainer;
      },
      width: 250,
      suppressSizeToFit: true,
    },
  ];

  // Row Data
  rowData: any[] = [
    {
      slNo: 1,
      ruleName: '2DS - Trace Changes',
      active: 'Y',
      type: 'Match',
      favourite: 'N',
      scheduled: 'Y',
      createdDate: '01-May-2024 01:15 PM',
      alert: 'Y',
    },
  ];

  // Default Column Definitions
  defaultColDef: ColDef = {
    flex: 1,
    minWidth: 100,
    resizable: true,
    suppressSizeToFit: false,
  };

  constructor() {}

  // Grid Ready Event
  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  // Add New Row
  addRow() {
    if (this.newRule.ruleName.trim() === '' || this.newRule.createdDate === '') {
      alert('Rule Name and Created Date are required.');
      return;
    }

    if (
      this.newRule.active === '' ||
      this.newRule.type === '' ||
      this.newRule.favourite === '' ||
      this.newRule.scheduled === '' ||
      this.newRule.alert === ''
    ) {
      alert('Please select valid options for all dropdowns.');
      return;
    }

    const newRow = {
      slNo: this.rowData.length + 1,
      ...this.newRule,
    };
    this.rowData = [...this.rowData, newRow];
    this.gridApi.setRowData(this.rowData);
    this.resetForm();
  }

  // View Row
  viewRow(rowData: any) {
    this.viewRowData = { ...rowData };
    const modal = document.getElementById('viewModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Open Edit Modal
  openEditModal(rowData: any) {
    this.editRowData = { ...rowData };
    const modal = document.getElementById('editModal');
    if (modal) {
      const bootstrapModal = new bootstrap.Modal(modal);
      bootstrapModal.show();
    }
  }

  // Update Row
  updateRow() {
    if (this.editRowData.ruleName.trim() === '' || this.editRowData.createdDate === '') {
      alert('Rule Name and Created Date are required.');
      return;
    }

    const index = this.rowData.findIndex((row) => row.slNo === this.editRowData.slNo);
    if (index !== -1) {
      this.rowData[index] = { ...this.editRowData };
      this.gridApi.setRowData(this.rowData);
    }
    this.closeModal();
  }

  // Close Modal
  closeModal() {
    const modal = document.getElementById('editModal');
    if (modal) {
      const bootstrapModal = bootstrap.Modal.getInstance(modal);
      bootstrapModal.hide();
    }
  }

  // Delete Row
  deleteRow(rowData: any) {
    this.rowData = this.rowData.filter((row) => row.slNo !== rowData.slNo);
    this.updateSerialNumbers();
    this.gridApi.setRowData(this.rowData);
  }

  // Update Serial Numbers
  updateSerialNumbers() {
    this.rowData.forEach((row, index) => {
      row.slNo = index + 1;
    });
  }

  // Reset Form
  resetForm() {
    this.newRule = {
      ruleName: '',
      active: '',
      type: '',
      favourite: '',
      scheduled: '',
      createdDate: '',
      alert: '',
    };
  }
}
