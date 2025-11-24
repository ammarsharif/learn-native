export const validators = {
  email: (email: string): string | null => {
    if (!email) {
      return 'Email is required';
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return 'Please enter a valid email address';
    }
    return null;
  },

  password: (password: string): string | null => {
    if (!password) {
      return 'Password is required';
    }
    if (password.length < 6) {
      return 'Password must be at least 6 characters';
    }
    return null;
  },

  name: (name: string): string | null => {
    if (!name) {
      return 'Name is required';
    }
    if (name.length < 2) {
      return 'Name must be at least 2 characters';
    }
    return null;
  },

  validateLogin: (email: string, password: string): { email?: string; password?: string } => {
    const errors: { email?: string; password?: string } = {};
    const emailError = validators.email(email);
    const passwordError = validators.password(password);

    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
  },

  validateRegister: (
    name: string,
    email: string,
    password: string
  ): { name?: string; email?: string; password?: string } => {
    const errors: { name?: string; email?: string; password?: string } = {};
    const nameError = validators.name(name);
    const emailError = validators.email(email);
    const passwordError = validators.password(password);

    if (nameError) errors.name = nameError;
    if (emailError) errors.email = emailError;
    if (passwordError) errors.password = passwordError;

    return errors;
  },
};

