export interface SpectrogramEntity {
  spectrogram_id: string;
  input_id: string;
  spectrogram_url: string;
  file_format: string;
  dimensions: {
    width: number;
    height: number;
  };
  file_size: number;
  created_at: Date;
}