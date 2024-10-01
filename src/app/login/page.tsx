'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [currentForm, setCurrentForm] = useState('login');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();
  const { data: session, status } = useSession();

  useEffect(() => {
    if (session) {
      console.log('[LoginPage] User already logged in, redirecting');
      if (session.user.isAdmin) {
        console.log('[LoginPage] Admin user detected, redirecting to admin dashboard');
        router.replace('/admin/dashboard');
      } else {
        console.log('[LoginPage] Regular user detected, redirecting to welcome page');
        router.replace('/valkommsida');
      }
    }
  }, [session, router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    console.log(`[LoginPage] Attempting ${currentForm}`);
  
    switch (currentForm) {
      case 'login':
        try {
          console.log('[LoginPage] Login attempt for email:', email);
          const result = await signIn('credentials', {
            redirect: false,
            email,
            password,
            remember: rememberMe,
          });
          
          if (result?.error) {
            console.error('[LoginPage] Login failed:', result.error);
            setError(result.error);
          } else if (result?.ok) {
            console.log('[LoginPage] Login successful');
            router.push('/valkommsida');
          }
        } catch (error) {
          console.error('[LoginPage] Error during login:', error);
          setError('Ett fel uppstod vid inloggning');
        }
        break;

      case 'register':
        try {
          if (password !== confirmPassword) {
            setError('Lösenorden matchar inte');
            return;
          }
          console.log('[LoginPage] Registration attempt for email:', email);
          const response = await fetch('/api/auth/register', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password, firstName, lastName }),
          });
          
          console.log('[LoginPage] Registration response status:', response.status);
          
          const data = await response.json();
          if (response.ok) {
            console.log('[LoginPage] Registration successful');
            setCurrentForm('login');
            setError('Registrering lyckades. Vänligen logga in.');
          } else {
            console.error('[LoginPage] Registration failed:', data.message);
            setError(data.message || 'Registrering misslyckades');
          }
        } catch (error) {
          console.error('[LoginPage] Error during registration:', error);
          setError('Ett fel uppstod vid registrering');
        }
        break;

      case 'resetPassword':
        try {
          console.log('[LoginPage] Password reset attempted for:', email);
          const response = await fetch('/api/auth/reset-password', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email }),
          });
          
          const data = await response.json();
          if (response.ok) {
            setError('En länk för lösenordsåterställning har skickats till din e-post.');
          } else {
            setError(data.message || 'Lösenordsåterställning misslyckades');
          }
        } catch (error) {
          console.error('[LoginPage] Error during password reset:', error);
          setError('Ett fel uppstod vid lösenordsåterställning');
        }
        break;
    }
  };

  const renderForm = () => {
    switch (currentForm) {
      case 'login':
        return (
          <>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-postadress
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Lösenord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  id="remember-me"
                  name="remember-me"
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 text-[#20c997] focus:ring-[#20c997] border-gray-300 rounded"
                />
                <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
                  Kom ihåg mig
                </label>
              </div>
            </div>
          </>
        );
      case 'register':
        return (
          <>
            <div>
              <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                Förnamn
              </label>
              <input
                id="firstName"
                name="firstName"
                type="text"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                Efternamn
              </label>
              <input
                id="lastName"
                name="lastName"
                type="text"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                E-postadress
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Lösenord
              </label>
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="new-password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                Bekräfta lösenord
              </label>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                autoComplete="new-password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
              />
            </div>
          </>
        );
      case 'resetPassword':
        return (
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              E-postadress
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-[#20c997] focus:border-[#20c997] sm:text-sm"
            />
          </div>
        );
    }
  };

  const getFormTitle = () => {
    switch (currentForm) {
      case 'login':
        return 'Logga in på ditt konto';
      case 'register':
        return 'Skapa ett nytt konto';
      case 'resetPassword':
        return 'Återställ ditt lösenord';
    }
  };

  const getSubmitButtonText = () => {
    switch (currentForm) {
      case 'login':
        return 'Logga in';
      case 'register':
        return 'Registrera';
      case 'resetPassword':
        return 'Skicka återställningslänk';
    }
  };

  if (status === 'loading') {
    return <div>Laddar...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link href="/" className="flex justify-center text-2xl font-bold mb-6">
          <span className="text-[#2C3E50]">SOCIAL</span>
          <span className="text-[#20c997]">GUIDEN.SE</span>
        </Link>
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          {getFormTitle()}
        </h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          {error && (
            <div className="mb-4 text-red-600 text-sm">
              {error}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            {renderForm()}
            <div>
              <motion.button
                type="submit"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#20c997] hover:bg-[#1ba37e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#20c997]"
              >
                {getSubmitButtonText()}
              </motion.button>
            </div>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white text-gray-500">
                  Eller
                </span>
              </div>
            </div>

            <div className="mt-6 grid grid-cols-2 gap-3">
              <button
                onClick={() => setCurrentForm('login')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Logga in
              </button>
              <button
                onClick={() => setCurrentForm('register')}
                className="w-full inline-flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm bg-white text-sm font-medium text-gray-500 hover:bg-gray-50"
              >
                Registrera
              </button>
            </div>
            
            {currentForm !== 'resetPassword' && (
              <div className="mt-3 text-center">
                <button
                  onClick={() => setCurrentForm('resetPassword')}
                  className="font-medium text-[#20c997] hover:text-[#1ba37e]"
                >
                  Glömt ditt lösenord?
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;