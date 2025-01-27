import {Component, OnInit} from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatCardModule} from '@angular/material/card';
import {MatListModule} from '@angular/material/list';
import {Memo} from '../../models/memo.model'
import {DatePipe, NgClass, NgForOf, NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';
import {MatToolbar} from '@angular/material/toolbar';
import {MatButton, MatIconButton} from '@angular/material/button';
import {MatPaginatorModule, PageEvent} from '@angular/material/paginator';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {FormsModule} from '@angular/forms';
import {FaIconComponent} from '@fortawesome/angular-fontawesome';
import {faFilter} from '@fortawesome/free-solid-svg-icons';
import {MatTooltip} from '@angular/material/tooltip';
import {
  CdkMenu,
  CdkMenuItemCheckbox,
  CdkMenuTrigger,
} from '@angular/cdk/menu';
import {ActivatedRoute, Router} from '@angular/router';
import {ChangeDetectorRef} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {QuillModule} from 'ngx-quill';
import {PersistentMemoEditorService} from '../../shared/shared/persistent-memo-editor.service';

@Component({
  selector: 'app-inbox',
  imports: [
    MatTabsModule,
    MatCardModule,
    MatListModule,
    DatePipe,
    MatIcon,
    MatToolbar,
    MatIconButton,
    NgClass,
    MatFormFieldModule,
    MatInput,
    FormsModule,
    MatPaginatorModule,
    FaIconComponent,
    MatTooltip,
    CdkMenuTrigger,
    CdkMenu,
    CdkMenuItemCheckbox,
    MatButton,
    NgIf,
    NgForOf,
    QuillModule,
  ],
  templateUrl: './inbox.component.html',
  styleUrl: './inbox.component.css'
})
export class InboxComponent implements OnInit {

  memos: Memo[] = [];
  selectedMemo: Memo | null = null;
  isListVisible: boolean = true;

  // Filter
  filterText: string = '';

  // Pagination
  pageIndex: number = 0;
  pageSize: number = 10;
  pageSizeOptions: number[] = [5, 10, 20];


  selectedMemoIds: Set<string> = new Set<string>();
  hoveredMemoIds: Set<string> = new Set<string>();

  all = true;
  internal = false;
  external = false;

  constructor(private router: Router,
              private route: ActivatedRoute,
              private cdr: ChangeDetectorRef,
              private snackBar: MatSnackBar,
              private memoEditorService: PersistentMemoEditorService,) { }

  ngOnInit(): void {
    this.memos = memoMockData;

    // Check if there's a memo_id in the fragment when the page is loaded
    this.route.fragment.subscribe((fragment) => {
      if (fragment) {
        const memo = this.memos.find((m) => m.id === fragment);
        if (memo) {
          this.selectMemoOnInit(memo);
        }
      }
    });
  }

  selectMemoOnInit(memo: Memo): void {
    // Set the selected memo and hide the list
    this.selectedMemo = memo;
    this.isListVisible = false;

    // Manually trigger change detection to update the UI
    this.cdr.detectChanges();
  }

  selectMemo(memo: Memo): void {
    this.isListVisible = false; // Hide the list
    this.selectedMemo = memo;  // Set the selected memo for details view

    // Update the router with the memo ID as the hash
    this.router.navigate([], {
      fragment: memo.id,
      queryParamsHandling: 'merge',
    });

    // Detect changes to refresh UI
    this.cdr.markForCheck();
  }

  deselectMemo(): void {
    this.isListVisible = true; // Show the list
    this.selectedMemo = null; // Clear the selected memo
    this.hoveredMemoIds.clear();
    // Clear the router hash fragment
    this.router.navigate([], {
      fragment: undefined,
      queryParamsHandling: 'merge',
    });

    // Detect changes to refresh UI
    this.cdr.markForCheck();
  }

  // Boolean to track forward history visibility
  showForwardHistory = false;

  // Toggles the forward history visibility
  toggleForwardHistory(): void {
    this.showForwardHistory = !this.showForwardHistory;
  }


  // Controls whether the editor is visible
  isEditorVisible = false;
  // Determines editor mode ('reply' or 'forward')
  editorMode: 'reply' | 'forward' | null = null;
  // Stores content of the editor
  editorContent = '';

  forwardRecipient: string = ''; // Holds the recipient for forward mode


  disableButtons: boolean = false; // State to disable buttons


  /**
   * Opens the editor based on action type
   * @param mode Reply or Forward
   */
  openEditor(mode: 'reply' | 'forward'): void {
    this.editorMode = mode;
    this.isEditorVisible = true;
    this.editorContent = ''; // Clear the editor content each time
    this.forwardRecipient = ''; // Clear the forward recipient field
  }


  /**
   * Closes the editor and resets its state
   */
  closeEditor(): void {
    this.isEditorVisible = false;
    this.editorMode = null; // Reset mode when closing
  }


  /**
   * Handles sending a message (replace with actual logic)
   */
  sendMessage(): void {
    if (this.editorMode === 'reply') {
      console.log(`Replying with message: ${this.editorContent}`);
    } else if (this.editorMode === 'forward') {
      console.log(`Forwarding to: ${this.forwardRecipient}, message: ${this.editorContent}`);
    }
    this.closeEditor(); // Close the editor after sending the message
  }


  // Filter logic: returns a new array of memos that match the filter
  get filteredMemos(): Memo[] {
    if (!this.filterText) {
      return this.memos;
    }
    const lowerFilter = this.filterText.toLowerCase();
    return this.memos.filter(memo => {
      const subjectMatch = memo.subject.toLowerCase().includes(lowerFilter);
      const senderMatch = (
        memo.sentBy.firstName + ' ' + memo.sentBy.lastName + ' ' + memo.sentBy.role
      ).toLowerCase().includes(lowerFilter);
      return subjectMatch || senderMatch;
    });
  }

  // Update pageIndex and/or pageSize when changing pages
  onPageChange(event: PageEvent): void {
    this.pageIndex = event.pageIndex;
    this.pageSize = event.pageSize;
  }

  // Sliced array for the current page
  get pagedMemos(): Memo[] {
    const startIdx = this.pageIndex * this.pageSize;
    const endIdx = startIdx + this.pageSize;
    return this.filteredMemos.slice(startIdx, endIdx);
  }

  // Toggle the memo’s selection status
  toggleSelection(memo: Memo): void {
    if (this.selectedMemoIds.has(memo.id)) {
      this.selectedMemoIds.delete(memo.id);
    } else {
      this.selectedMemoIds.add(memo.id);
    }
  }

  // Check if a memo is currently selected
  isSelected(memo: Memo): boolean {
    return this.selectedMemoIds.has(memo.id);
  }

  onHover(memo: Memo, hovered: boolean): void {
    if (hovered) {
      this.hoveredMemoIds.add(memo.id);
    } else {
      this.hoveredMemoIds.delete(memo.id);
    }
  }

  // Function to change the status of the selected memo
  changeMemoStatus(newStatus: string): void {
    if (this.selectedMemo) {
      // Check if status is 'closed'
      if (this.selectedMemo.status === 'closed') {
        // Notify the user that the action is denied
        this.showSnackbar('Action denied: The memo is closed');
        return; // Do not modify the memo status
      }

      this.disableButtons = true; // Disable buttons while updating status

      // Update the memo status
      this.selectedMemo.status = newStatus;

      // Simulate an action (e.g., asynchronous API call)
      setTimeout(() => {
        this.disableButtons = false; // Re-enable buttons after completion

        // Notify the user of the successful status change
        this.showSnackbar(`Memo status updated to: ${newStatus}`);
        console.log(`Memo status updated to: ${newStatus}`);
      }, 1000); // Delay to mimic completion
    }
  }


  // Snackbar display method
  private showSnackbar(message: string): void {
    this.snackBar.open(message, 'Close', {
      duration: 3000, // Duration in milliseconds
      horizontalPosition: 'left', // Align to the bottom-left
      verticalPosition: 'bottom'  // Align to the bottom-left
    });
  }


// Configure toolbar options for the Quill editor
  editorModules = {
    toolbar: [
      ['bold', 'underline'], // Formatting options: Bold and Underline
      [{ list: 'ordered' }, { list: 'bullet' }] // List options
    ]
  };

  openReply(): void {
    this.memoEditorService.openEditor('reply', {
      id: '1',
      subject: 'Project Update',
      status: 'pending',
      sentBy: { firstName: 'John', lastName: 'Doe', position: 'Manager' },
      isRead: false
    });
  }



  protected readonly faFilter = faFilter;
}

export const memoMockData: Memo[] = [
  {
    id: "memo1",
    sentBy: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Manager",
      role: "Manager",
      createdAt: new Date(2023, 0, 15),
      updatedAt: new Date(2023, 0, 16),
    },
    receiver: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 1, 10),
      updatedAt: new Date(2023, 1, 13),
    },
    createdAt: new Date(2023, 2, 1),
    updatedAt: new Date(2023, 2, 2),
    forwardHistory: [],
    subject: "Subject 1",
    content: "Content of memo 1.",
    status: "pending",
    isRead: true,
    isForwarded: false
  },
  {
    id: "memo2",
    sentBy: {
      id: 3,
      firstName: "Alice",
      lastName: "Brown",
      email: "alice.brown@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Admin",
      role: "Admin",
      createdAt: new Date(2023, 2, 15),
      updatedAt: new Date(2023, 2, 16),
    },
    receiver: {
      id: 4,
      firstName: "Bob",
      lastName: "Davis",
      email: "bob.davis@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 3, 12),
      updatedAt: new Date(2023, 3, 14),
    },
    createdAt: new Date(2023, 3, 1),
    updatedAt: new Date(2023, 3, 2),
    forwardHistory: [
      {
        from: {
          id: 5,
          firstName: "Carol",
          lastName: "Johnson",
          email: "carol.johnson@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "Administrator",
          role: "Administrator",
          createdAt: new Date(2023, 1, 5),
          updatedAt: new Date(2023, 1, 6),
        },
        to: {
          id: 6,
          firstName: "Eve",
          lastName: "Martinez",
          email: "eve.martinez@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "User",
          role: "User",
          createdAt: new Date(2023, 2, 7),
          updatedAt: new Date(2023, 2, 8),
        },
      },
    ],
    subject: "Subject 2",
    content: "Content of memo 2.",
    status: "approved",
    isRead: true,
    isForwarded: true
  },
  {
    id: "memo3",
    sentBy: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 1, 10),
      updatedAt: new Date(2023, 1, 13),
    },
    receiver: {
      id: 5,
      firstName: "Carol",
      lastName: "Johnson",
      email: "carol.johnson@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Administrator",
      role: "Administrator",
      createdAt: new Date(2023, 1, 5),
      updatedAt: new Date(2023, 1, 6),
    },
    createdAt: new Date(2023, 3, 5),
    updatedAt: new Date(2023, 3, 7),
    forwardHistory: [],
    subject: "Subject 3",
    content: "Content of memo 3.",
    status: "rejected",
    isRead: false,
    isForwarded: false
  },
  {
    id: "memo4",
    sentBy: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Manager",
      role: "Manager",
      createdAt: new Date(2023, 0, 15),
      updatedAt: new Date(2023, 0, 16),
    },
    receiver: {
      id: 6,
      firstName: "Eve",
      lastName: "Martinez",
      email: "eve.martinez@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "User",
      role: "User",
      createdAt: new Date(2023, 2, 7),
      updatedAt: new Date(2023, 2, 8),
    },
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 3, 12),
    forwardHistory: [],
    subject: "Subject 4",
    content: "Content of memo 4.",
    status: "closed",
    isRead: true,
    isForwarded: false
  },
  {
    id: "memo5",
    sentBy: {
      id: 3,
      firstName: "Alice",
      lastName: "Brown",
      email: "alice.brown@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Admin",
      role: "Admin",
      createdAt: new Date(2023, 2, 15),
      updatedAt: new Date(2023, 2, 16),
    },
    receiver: {
      id: 4,
      firstName: "Bob",
      lastName: "Davis",
      email: "bob.davis@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 3, 12),
      updatedAt: new Date(2023, 3, 14),
    },
    createdAt: new Date(2023, 3, 10),
    updatedAt: new Date(2023, 3, 11),
    forwardHistory: [],
    subject: "Subject 5",
    content: "Content of memo 5.",
    status: "unread",
    isRead: false,
    isForwarded: false
  },
  {
    id: "memo6",
    sentBy: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Manager",
      role: "Manager",
      createdAt: new Date(2023, 0, 15),
      updatedAt: new Date(2023, 0, 16),
    },
    receiver: {
      id: 5,
      firstName: "Carol",
      lastName: "Johnson",
      email: "carol.johnson@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Administrator",
      role: "Administrator",
      createdAt: new Date(2023, 1, 5),
      updatedAt: new Date(2023, 1, 6),
    },
    createdAt: new Date(2023, 3, 2),
    updatedAt: new Date(2023, 3, 2),
    forwardHistory: [
      {
        from: {
          id: 4,
          firstName: "Bob",
          lastName: "Davis",
          email: "bob.davis@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "Employee",
          role: "Employee",
          createdAt: new Date(2023, 3, 12),
          updatedAt: new Date(2023, 3, 14),
        },
        to: {
          id: 3,
          firstName: "Alice",
          lastName: "Brown",
          email: "alice.brown@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "Admin",
          role: "Admin",
          createdAt: new Date(2023, 2, 15),
          updatedAt: new Date(2023, 2, 16),
        },
      },
    ],
    subject: "Subject 6",
    content: "Content of memo 6.",
    status: "read",
    isRead: true,
    isForwarded: true
  },
  {
    id: "memo7",
    sentBy: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 1, 10),
      updatedAt: new Date(2023, 1, 13),
    },
    receiver: {
      id: 4,
      firstName: "Bob",
      lastName: "Davis",
      email: "bob.davis@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 3, 12),
      updatedAt: new Date(2023, 3, 14),
    },
    createdAt: new Date(2023, 3, 16),
    updatedAt: new Date(2023, 3, 17),
    forwardHistory: [],
    subject: "Subject 7",
    content: "Content of memo 7.",
    status: "unread",
    isRead: false,
    isForwarded: false
  },
  {
    id: "memo8",
    sentBy: {
      id: 5,
      firstName: "Carol",
      lastName: "Johnson",
      email: "carol.johnson@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Administrator",
      role: "Administrator",
      createdAt: new Date(2023, 1, 5),
      updatedAt: new Date(2023, 1, 6),
    },
    receiver: {
      id: 6,
      firstName: "Eve",
      lastName: "Martinez",
      email: "eve.martinez@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "User",
      role: "User",
      createdAt: new Date(2023, 2, 7),
      updatedAt: new Date(2023, 2, 8),
    },
    createdAt: new Date(2023, 3, 18),
    updatedAt: new Date(2023, 3, 19),
    forwardHistory: [],
    subject: "Subject 8",
    content: "Content of memo 8.",
    status: "read",
    isRead: true,
    isForwarded: false
  },
  {
    id: "memo9",
    sentBy: {
      id: 3,
      firstName: "Alice",
      lastName: "Brown",
      email: "alice.brown@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Admin",
      role: "Admin",
      createdAt: new Date(2023, 2, 15),
      updatedAt: new Date(2023, 2, 16),
    },
    receiver: {
      id: 1,
      firstName: "John",
      lastName: "Doe",
      email: "john.doe@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Manager",
      role: "Manager",
      createdAt: new Date(2023, 0, 15),
      updatedAt: new Date(2023, 0, 16),
    },
    createdAt: new Date(2023, 3, 20),
    updatedAt: new Date(2023, 3, 21),
    forwardHistory: [],
    subject: "Subject 9",
    content: "Content of memo 9.",
    status: "unread",
    isRead: false,
    isForwarded: false
  },
  {
    id: "memo10",
    sentBy: {
      id: 4,
      firstName: "Bob",
      lastName: "Davis",
      email: "bob.davis@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 3, 12),
      updatedAt: new Date(2023, 3, 14),
    },
    receiver: {
      id: 2,
      firstName: "Jane",
      lastName: "Smith",
      email: "jane.smith@example.com",
      password: "placeholderPassword",
      department: { id: 1, name: "General" },
      position: "Employee",
      role: "Employee",
      createdAt: new Date(2023, 1, 10),
      updatedAt: new Date(2023, 1, 13),
    },
    createdAt: new Date(2023, 3, 22),
    updatedAt: new Date(2023, 3, 23),
    forwardHistory: [
      {
        from: {
          id: 6,
          firstName: "Eve",
          lastName: "Martinez",
          email: "eve.martinez@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "User",
          role: "User",
          createdAt: new Date(2023, 2, 7),
          updatedAt: new Date(2023, 2, 8),
        },
        to: {
          id: 5,
          firstName: "Carol",
          lastName: "Johnson",
          email: "carol.johnson@example.com",
          password: "placeholderPassword",
          department: { id: 1, name: "General" },
          position: "Administrator",
          role: "Administrator",
          createdAt: new Date(2023, 1, 5),
          updatedAt: new Date(2023, 1, 6),
        },
      },
    ],
    subject: "Subject 10",
    content: "Content of memo 10.",
    status: "read",
    isRead: true,
    isForwarded: true
  },
];// Example usage:
// console.log(memoMockData);
