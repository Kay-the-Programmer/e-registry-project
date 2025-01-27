import { Injectable } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { EditorContentComponent } from './editor-content/editor-content.component';

@Injectable({
  providedIn: 'root',
})
export class PersistentMemoEditorService {
  private overlayRef: OverlayRef | null = null;

  constructor(private overlay: Overlay) {}

  // Open the editor and position it in the bottom-right corner
  openEditor(mode: 'reply' | 'forward' | 'new' , memo: any = null): void {
    if (!this.overlayRef) {
      const positionStrategy = this.overlay
        .position()
        .global()
        .bottom('0px') // 16px from the bottom
        .right('100px'); // 16px from the right

      this.overlayRef = this.overlay.create({
        hasBackdrop: false, // No backdrop to allow navigation
        panelClass: 'editor-overlay', // Add custom class for styling
        positionStrategy,
      });

      const editorPortal = new ComponentPortal(EditorContentComponent);
      const componentInstance = this.overlayRef.attach(editorPortal).instance;
      componentInstance.editorMode = mode;
      componentInstance.selectedMemo = memo;

      // Close the editor when the child component emits the event
      componentInstance.closeEditor.subscribe(() => this.closeEditor());
    }
  }

  // Close the editor overlay if it's open
  closeEditor(): void {
    if (this.overlayRef) {
      this.overlayRef.dispose();
      this.overlayRef = null;
    }
  }

}
