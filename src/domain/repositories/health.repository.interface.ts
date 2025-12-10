import { HealthInputEntity } from '@/domain/entities/health-input.entity';

export interface IHealthRepository {
  uploadHealthData(audioFile: File): Promise<{
    message: string;
    input_id: string;
    risk_score: number;
  }>;
  getHealthHistory(): Promise<HealthInputEntity[]>;
  getHealthDetails(inputId: string): Promise<HealthInputEntity>;
}