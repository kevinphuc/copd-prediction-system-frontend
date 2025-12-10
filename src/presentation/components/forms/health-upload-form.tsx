'use client';

import { useState } from 'react';
import { useHealthUpload } from '@/app/hooks/use-health-upload';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function HealthUploadForm() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [error, setError] = useState<string>('');
  const uploadMutation = useHealthUpload();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setError('');
    
    if (!file) {
      setSelectedFile(null);
      return;
    }

    // Validate file type
    const validTypes = ['audio/wav', 'audio/mpeg', 'audio/mp3', 'audio/x-wav'];
    if (!validTypes.includes(file.type)) {
      setError('Only WAV and MP3 files are accepted');
      setSelectedFile(null);
      return;
    }

    // Validate file size (50MB)
    const maxSize = 50 * 1024 * 1024;
    if (file.size > maxSize) {
      setError('File size must be less than 50MB');
      setSelectedFile(null);
      return;
    }

    console.log('✅ File selected:', {
      name: file.name,
      type: file.type,
      size: file.size,
      isFile: file instanceof File
    });

    setSelectedFile(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedFile) {
      setError('Please select a file');
      return;
    }

    console.log('📤 Submitting file:', selectedFile);
    
    uploadMutation.mutate(selectedFile, {
      onSuccess: () => {
        setSelectedFile(null);
        setError('');
        // Reset file input
        const fileInput = document.getElementById('audio_file') as HTMLInputElement;
        if (fileInput) fileInput.value = '';
      },
      onError: (error: any) => {
        console.error('❌ Upload error:', error);
        setError(error.response?.data?.detail || 'Upload failed');
      }
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Upload Audio File</CardTitle>
        <CardDescription>
          Upload a respiratory audio recording (WAV or MP3 format)
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="audio_file" className="text-sm font-medium text-zinc-700">
              Audio File
            </label>
            <Input
              id="audio_file"
              type="file"
              accept="audio/wav,audio/mpeg,audio/mp3,audio/x-wav"
              onChange={handleFileChange}
              disabled={uploadMutation.isPending}
            />
            {selectedFile && (
              <div className="text-sm text-zinc-600 bg-zinc-50 p-2 rounded">
                <p className="font-medium">Selected: {selectedFile.name}</p>
                <p>Size: {(selectedFile.size / 1024 / 1024).toFixed(2)} MB</p>
                <p>Type: {selectedFile.type}</p>
              </div>
            )}
            {error && (
              <p className="text-sm text-red-600">{error}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={uploadMutation.isPending || !selectedFile}
          >
            {uploadMutation.isPending ? 'Uploading and Analyzing...' : 'Upload and Analyze'}
          </Button>
          
          {uploadMutation.isPending && (
            <p className="text-sm text-zinc-600 text-center">
              This may take 10-30 seconds...
            </p>
          )}
        </form>
      </CardContent>
    </Card>
  );
}
