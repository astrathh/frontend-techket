import { useState } from 'react';
import { PurchaseService } from '@/lib/purchase.service';

export function usePurchase() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);
  const [success, setSuccess] = useState(false);

  const purchaseTicket = async (eventId: number) => {
    try {
      setIsLoading(true);
      setError(null);
      setSuccess(false);
      
      const result = await PurchaseService.purchase(eventId);
      setSuccess(true);
      return result;
    } catch (err) {
      if (err instanceof Error) {
        setError(err);
      } else {
        setError(new Error('Ocorreu um erro desconhecido'));
      }
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { purchaseTicket, isLoading, error, success };
}