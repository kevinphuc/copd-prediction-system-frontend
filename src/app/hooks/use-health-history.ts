import { useQuery } from '@tanstack/react-query';
import { healthRepository } from '@/infrastructure/http/health.repository';

export const useHealthHistory = () => {
  return useQuery({
    queryKey: ['health-history'],
    queryFn: () => healthRepository.getHealthHistory(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};