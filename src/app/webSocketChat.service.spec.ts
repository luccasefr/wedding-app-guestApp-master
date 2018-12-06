import { TestBed, inject } from '@angular/core/testing';

import { webSocketChatService } from './webSocketChat.service';

describe('ChatService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [webSocketChatService]
    });
  });

  it('should be created', inject([webSocketChatService], (service: webSocketChatService) => {
    expect(service).toBeTruthy();
  }));
});
