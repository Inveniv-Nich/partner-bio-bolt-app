import { useEffect, useState, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';

// Function to create user record in public.users table
const createUserRecord = async (user: User) => {
  try {
    // Check if user already exists in public.users table
    const { data: existingUser, error: checkError } = await supabase
      .from('users')
      .select('id')
      .eq('id', user.id)
      .single();

    if (checkError && checkError.code !== 'PGRST116') {
      // PGRST116 is "not found" error, which is expected for new users
      console.error('Error checking existing user:', checkError);
      return;
    }

    // If user doesn't exist, create new record
    if (!existingUser) {
      // Extract onboarding data from user metadata
      const role = user.user_metadata?.role || null;
      const organization = user.user_metadata?.organization || null;
      
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          role: role,
          organization: organization,
          age: null, // Will be updated later if needed
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error creating user record:', insertError);
      } else {
        console.log('User record created successfully for:', user.email, 'with role:', role, 'and organization:', organization);
      }
    } else {
      // User exists, but check if we need to update role/organization from metadata
      const role = user.user_metadata?.role;
      const organization = user.user_metadata?.organization;
      
      if (role || organization) {
        const updateData: any = { updated_at: new Date().toISOString() };
        if (role) updateData.role = role;
        if (organization) updateData.organization = organization;
        
        const { error: updateError } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating user record:', updateError);
        } else {
          console.log('User record updated with onboarding data for:', user.email);
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error in createUserRecord:', error);
  }
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted.current) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Create user record if session exists and user is confirmed
        if (session?.user && session.user.email_confirmed_at) {
          createUserRecord(session.user);
        }
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted.current) {
        setSession(session);
        setUser(session?.user ?? null);
        setLoading(false);
        
        // Create user record on SIGNED_IN event if user is confirmed
        if (event === 'SIGNED_IN' && session?.user && session.user.email_confirmed_at) {
          createUserRecord(session.user);
        }
      }
    });

    return () => {
      mounted.current = false;
      subscription.unsubscribe();
    };
  }, []);

  const signOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error('Error signing out:', error);
    }
  };

  return {
    session,
    user,
    loading,
    signOut,
  };
}