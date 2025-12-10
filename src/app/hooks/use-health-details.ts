import { useQuery } from '@tanstack/react-query';
import { healthRepository } from '@/infrastructure/http/health.repository';

export const useHealthDetails = (inputId: string | null) => {
  return useQuery({
    queryKey: ['health-details', inputId],
    queryFn: () => healthRepository.getHealthDetails(inputId!),
    enabled: !!inputId,
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};