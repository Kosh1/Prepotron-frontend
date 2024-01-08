import { ENV } from '../config';

class SSEConnection {
  private eventSource: EventSource | undefined;

  init(userId: string) {
    if (this.eventSource) return;

    this.eventSource = new EventSource(
      `${ENV.VITE_API_URL}/lesson/stream/message?userId=${userId}`
    );
  }

  getEventSource() {
    if (!this.eventSource) throw new Error('eventsource not initialised');
    return this.eventSource;
  }
}

export const SSEMessageConnection = new SSEConnection();
