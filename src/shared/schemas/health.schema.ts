import { z } from 'zod';

const MAX_FILE_SIZE = 50 * 1024 * 1024; // 50MB
const ACCEPTED_AUDIO_TYPES = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/x-wav'];

export const healthUploadSchema = z.object({
  audio_file: z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, 'Max file size is 50MB')
    .refine(
      (file) => ACCEPTED_AUDIO_TYPES.includes(file.type),
      'Only WAV and MP3 files are accepted'
    ),
});

export type HealthUploadInput = z.infer<typeof healthUploadSchema>;