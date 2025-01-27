import { Component, Input, Output, EventEmitter } from '@angular/core';
import {MatButton, MatIconButton} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import {QuillEditorComponent} from 'ngx-quill';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInput} from '@angular/material/input';
import {NgIf} from '@angular/common';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-editor-content',
  templateUrl: './editor-content.component.html',
  imports: [
    MatButton,
    FormsModule,
    QuillEditorComponent,
    MatCardModule,
    MatFormFieldModule,
    MatInput,
    NgIf,
    MatIconButton,
    MatIcon
  ],
  styleUrls: ['./editor-content.component.css']
})
export class EditorContentComponent {
  @Input() editorMode: "reply" | "forward" | "new" = null;
  @Input() selectedMemo: any = null;
  @Input() editorContent: string = '';
  @Input() forwardRecipient: string = '';

  @Output() closeEditor = new EventEmitter<void>();

  isMinimized = false;

  // Toggle minimize/expand state
  toggleMinimize(): void {
    this.isMinimized = !this.isMinimized;
  }



  editorModules = {
    toolbar: [
      ['bold', 'underline'], // Basic styling options
      [{ list: 'ordered' }, { list: 'bullet' }] // List options
    ]
  };

  sendMessage(): void {
    if (this.editorMode === 'reply') {
      console.log(`Replying with content: ${this.editorContent}`);
    } else if (this.editorMode === 'forward') {
      console.log(`Forwarding content to ${this.forwardRecipient}: ${this.editorContent}`);
    }
    this.closeOverlayEditor();
  }

  closeOverlayEditor(): void {
    this.closeEditor.emit(); // Emit close event to parent
  }

}
