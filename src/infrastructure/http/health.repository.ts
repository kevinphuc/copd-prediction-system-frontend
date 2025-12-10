import { IHealthRepository } from '@/domain/repositories/health.repository.interface';
import { HealthInputEntity } from '@/domain/entities/health-input.entity';
import { API_ENDPOINTS } from '@/shared/constants/api.constants';
import { apiClient } from './api-client';

export class HealthRepository implements IHealthRepository {
  async uploadHealthData(audioFile: File): Promise<{
    message: string;
    input_id: string;
    risk_score: number;
  }> {
    const formData = new FormData();
    formData.append('audio_file', audioFile);

    const response = await apiClient.instance.post(
      API_ENDPOINTS.HEALTH.UPLOAD,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );
    return response.data;
  }

  async getHealthHistory(): Promise<HealthInputEntity[]> {
    const response = await apiClient.instance.get<HealthInputEntity[]>(
      API_ENDPOINTS.HEALTH.HISTORY
    );
    
    // Transform date strings to Date objects
    return response.data.map((item) => ({
      ...item,
      created_at: new Date(item.created_at),
      prediction_result: item.prediction_result
        ? {
            ...item.prediction_result,
            created_at: new Date(item.prediction_result.created_at),
          }
        : undefined,
      spectrogram: item.spectrogram
        ? {
            ...item.spectrogram,
            created_at: new Date(item.spectrogram.created_at),
          }
        : undefined,
    }));
  }

  async getHealthDetails(inputId: string): Promise<HealthInputEntity> {
    const response = await apiClient.instance.get<HealthInputEntity>(
      API_ENDPOINTS.HEALTH.DETAILS(inputId)
    );
    
    // Transform date strings to Date objects
    return {
      ...response.data,
      created_at: new Date(response.data.created_at),
      prediction_result: response.data.prediction_result
        ? {
            ...response.data.prediction_result,
            created_at: new Date(response.data.prediction_result.created_at),
          }
        : undefined,
      spectrogram: response.data.spectrogram
        ? {
            ...response.data.spectrogram,
            created_at: new Date(response.data.spectrogram.created_at),
          }
        : undefined,
    };
  }
}

export const healthRepository = new HealthRepository();