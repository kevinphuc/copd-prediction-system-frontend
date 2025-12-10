'use client';

import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { RegisterInput, LoginInput } from '@/shared/schemas/auth.schema';
import { authRepository } from '@/infrastructure/http/auth.repository';
import { toast } from 'sonner'; // Changed from custom toast

export const useRegister = () => {
  const router = useRouter();

  return useMutation({
    mutationFn: (data: RegisterInput) => authRepository.register(data),
    onSuccess: (data) => {
      toast.success('Registration Successful', {
        description: data.message || 'Please check your email to verify your account.',
      });
      router.push('/login');
    },
    onError: (error: any) => {
      console.error('❌ Registration Error:', error);
      toast.error('Registration Failed', {
        description: error.response?.data?.detail || 'An error occurred during registration.',
      });
    },
  });
};

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: LoginInput) => {
      console.log('🔐 Login mutation started with:', { email: data.email });
      const result = await authRepository.login(data);
      console.log('✅ Login API response:', result);
      return result;
    },
    onSuccess: (data) => {
      console.log('🎉 Login onSuccess triggered');
      console.log('📦 Token data:', {
        access_token: data.access_token.substring(0, 20) + '...',
        user_id: data.user_id,
      });

      // Verify localStorage
      const storedToken = localStorage.getItem('access_token');
      const storedUserId = localStorage.getItem('user_id');
      console.log('💾 Stored in localStorage:', {
        token: storedToken?.substring(0, 20) + '...',
        userId: storedUserId,
      });

      // Invalidate all queries to refresh data
      queryClient.invalidateQueries();

      toast.success('Login Successful', {
        description: 'Welcome back!',
      });

      console.log('🚀 Attempting redirect to /dashboard');
      
      // Use replace instead of push to avoid back button issues
      router.replace('/dashboard');
      
      // Alternative: Force page reload after redirect (if needed)
      setTimeout(() => {
        window.location.href = '/dashboard';
      }, 100);
    },
    onError: (error: any) => {
      console.error('❌ Login Error:', error);
      console.error('Error details:', {
        response: error.response?.data,
        status: error.response?.status,
        message: error.message,
      });
      
      toast.error('Login Failed', {
        description: error.response?.data?.detail || 'Invalid email or password.',
      });
    },
  });
};

export const useLogout = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      console.log('🚪 Logout started');
      await authRepository.logout();
    },
    onSuccess: () => {
      console.log('✅ Logout successful');
      queryClient.clear();
      
      toast.success('Logged Out', {
        description: 'You have been logged out successfully.',
      });
      
      router.replace('/');
    },
  });
};