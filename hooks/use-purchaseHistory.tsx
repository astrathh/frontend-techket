import { useState, useEffect } from 'react';
import { PurchaseService } from '@/lib/purchase.service';

export function useEvent(eventId: string) {
  const [event, setEvent] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setIsLoading(true);
        const eventData = await PurchaseService.getPurchaseHistory();
        setEvent(eventData);
      } catch (err) {
        setError(err instanceof Error ? err : new Error(String(err)));
      } finally {
        setIsLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

  return { event, isLoading, error };
}