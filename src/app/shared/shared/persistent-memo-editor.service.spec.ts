import { TestBed } from '@angular/core/testing';

import { PersistentMemoEditorService } from './persistent-memo-editor.service';

describe('PersistentMemoEditorService', () => {
  let service: PersistentMemoEditorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PersistentMemoEditorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
