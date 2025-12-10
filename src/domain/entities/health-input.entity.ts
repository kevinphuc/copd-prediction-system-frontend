import { PredictionResultEntity } from "./prediction.entity";
import { SpectrogramEntity } from "./spectrogram.entity";

export interface SpirometryEntity {
  fev1: number;
  fvc: number;
}

export interface HealthInputEntity {
  input_id: string;
  user_id: string;
  created_at: Date;
  spirometry?: SpirometryEntity;
  prediction_result?: PredictionResultEntity;
  spectrogram?: SpectrogramEntity;
}