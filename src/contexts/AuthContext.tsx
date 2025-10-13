import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  cpf: string;
  phone: string;
  role: 'student' | 'admin';
}

interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  courseName: string;
  enrolledAt: string;
  status: 'active' | 'completed' | 'cancelled';
}

interface AuthContextType {
  user: User | null;
  users: User[];
  enrollments: Enrollment[];
  login: (email: string, password: string) => boolean;
  register: (data: Omit<User, 'id' | 'role'> & { password: string }) => boolean;
  logout: () => void;
  enroll: (courseId: string, courseName: string) => boolean;
  getMyEnrollments: () => Enrollment[];
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>([
    {
      id: '1',
      name: 'Admin Demo',
      email: 'admin@senac.com',
      cpf: '000.000.000-00',
      phone: '(51) 99999-9999',
      role: 'admin'
    }
  ]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [passwords] = useState<Record<string, string>>({
    'admin@senac.com': 'admin123'
  });

  const login = (email: string, password: string): boolean => {
    const foundUser = users.find(u => u.email === email);
    if (foundUser && passwords[email] === password) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (data: Omit<User, 'id' | 'role'> & { password: string }): boolean => {
    if (users.find(u => u.email === data.email || u.cpf === data.cpf)) {
      return false;
    }

    const newUser: User = {
      id: Date.now().toString(),
      name: data.name,
      email: data.email,
      cpf: data.cpf,
      phone: data.phone,
      role: 'student'
    };

    setUsers([...users, newUser]);
    passwords[data.email] = data.password;
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
  };

  const enroll = (courseId: string, courseName: string): boolean => {
    if (!user) return false;

    const existingEnrollment = enrollments.find(
      e => e.userId === user.id && e.courseId === courseId
    );

    if (existingEnrollment) return false;

    const newEnrollment: Enrollment = {
      id: Date.now().toString(),
      userId: user.id,
      courseId,
      courseName,
      enrolledAt: new Date().toLocaleDateString('pt-BR'),
      status: 'active'
    };

    setEnrollments([...enrollments, newEnrollment]);
    return true;
  };

  const getMyEnrollments = (): Enrollment[] => {
    if (!user) return [];
    return enrollments.filter(e => e.userId === user.id);
  };

  return (
    <AuthContext.Provider value={{ 
      user, 
      users, 
      enrollments, 
      login, 
      register, 
      logout, 
      enroll,
      getMyEnrollments 
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
