import { useState } from 'react';
import { User } from '../types/types';

interface ValidationRules {
  [key: string]: (value: string) => string;
}

const useFormValidation = (user: User) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const validationRules: ValidationRules = {
    first_name: (value: string) => {
      if (!value.trim()) return 'First name is required';
      if (/[^a-zA-Z ]/.test(value)) return 'Only letters are allowed';
      if (value.length > 15) return 'Maximum length of 15 characters exceeded';
      return '';
    },
    last_name: (value: string) => {
      if (/[^a-zA-Z ]/.test(value)) return 'Only letters are allowed';
      if (value.length > 15) return 'Maximum length of 15 characters exceeded';
      return '';
    },
    email: (value: string) => {
      if (!value.trim()) return 'Email is required';
      if (!/\S+@\S+\.\S+/.test(value)) return 'Must be a valid email address';
      return '';
    },
    avatar: (value: string) => {
      if (value.trim()) { 
        const urlPattern = /^https:\/\/.*\.(jpg|jpeg|png|gif)$/i;
        if (!urlPattern.test(value)) return 'Please enter a valid image URL (must start with https:// and end with .jpg, .jpeg, .png, or .gif)';
      }
      return '';
    },
  };

  const validateField = (name: string, value: string) => {
    const error = validationRules[name] ? validationRules[name](value) : '';
    setErrors((prevErrors) => ({ ...prevErrors, [name]: error }));
  };

  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    Object.keys(validationRules).forEach((key) => {
      const error = validationRules[key](user[key as keyof User] as string);
      if (error) newErrors[key] = error;
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  return { errors, validateField, validateForm };
};

export default useFormValidation;
