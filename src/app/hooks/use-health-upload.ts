import { useMutation, useQueryClient } from '@tanstack/react-query';
import { healthRepository } from '@/infrastructure/http/health.repository';
import { toast } from '@/presentation/components/ui/use-toast';

export const useHealthUpload = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (audioFile: File) => healthRepository.uploadHealthData(audioFile),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ['health-history'] });
      toast({
        title: 'Upload Successful',
        description: `Risk Score: ${(data.risk_score * 100).toFixed(1)}%`,
        variant: 'default',
      });
    },
    onError: (error: any) => {
      toast({
        title: 'Upload Failed',
        description: error.response?.data?.detail || 'An error occurred during upload.',
        variant: 'destructive',
      });
    },
  });
};