import { useEffect, useState, useRef } from 'react';
import { Session, User } from '@supabase/supabase-js';
import { supabase } from '@/utils/supabase';

// Enhanced user type that includes data from public.users table
interface EnrichedUser extends User {
  user_metadata: User['user_metadata'] & {
    avatar_url?: string;
    full_name?: string;
    role?: string;
    organization?: string;
  };
}

// Function to fetch and enrich user data with public.users table data
const fetchAndEnrichUser = async (user: User): Promise<EnrichedUser> => {
  try {
    const { data: userData, error } = await supabase
      .from('users')
      .select('avatar_url, name, age, created_at')
      .eq('id', user.id)
      .single();

    if (error && error.code !== 'PGRST116') {
      console.error('Error fetching user data:', error);
      return user as EnrichedUser;
    }

    // Merge public.users data into user_metadata
    const enrichedUser: EnrichedUser = {
      ...user,
      user_metadata: {
        ...user.user_metadata,
        avatar_url: userData?.avatar_url || user.user_metadata?.avatar_url,
        full_name: userData?.name || user.user_metadata?.full_name,
        role: user.user_metadata?.role,
        organization: user.user_metadata?.organization,
      },
    };

    return enrichedUser;
  } catch (error) {
    console.error('Unexpected error enriching user data:', error);
    return user as EnrichedUser;
  }
};

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
      const avatarUrl = user.user_metadata?.avatar_url || null;
      
      const { error: insertError } = await supabase
        .from('users')
        .insert({
          id: user.id,
          email: user.email!,
          name: user.user_metadata?.full_name || user.email?.split('@')[0] || 'User',
          avatar_url: avatarUrl,
          age: null, // Will be updated later if needed
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        });

      if (insertError) {
        console.error('Error creating user record:', insertError);
      } else {
        console.log('User record created successfully for:', user.email);
      }
    } else {
      // User exists, but check if we need to update role/organization from metadata
      const avatarUrl = user.user_metadata?.avatar_url;
      
      if (avatarUrl) {
        const updateData: any = { updated_at: new Date().toISOString() };
        if (avatarUrl) updateData.avatar_url = avatarUrl;
        
        const { error: updateError } = await supabase
          .from('users')
          .update(updateData)
          .eq('id', user.id);
          
        if (updateError) {
          console.error('Error updating user record:', updateError);
        } else {
          console.log('User record updated with avatar for:', user.email);
        }
      }
    }
  } catch (error) {
    console.error('Unexpected error in createUserRecord:', error);
  }
};

export function useAuth() {
  const [session, setSession] = useState<Session | null>(null);
  const [user, setUser] = useState<EnrichedUser | null>(null);
  const [loading, setLoading] = useState(true);
  const mounted = useRef(true);

  useEffect(() => {
    mounted.current = true;

    // Get initial session
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (mounted.current && session?.user) {
        fetchAndEnrichUser(session.user).then((enrichedUser) => {
          if (mounted.current) {
            setSession(session);
            setUser(enrichedUser);
            setLoading(false);
            
            // Create user record if user is confirmed
            if (session.user.email_confirmed_at) {
              createUserRecord(session.user);
            }
          }
        });
      } else if (mounted.current) {
        setSession(session);
        setUser(null);
        setLoading(false);
      }
    });

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((event, session) => {
      if (mounted.current && session?.user) {
        fetchAndEnrichUser(session.user).then((enrichedUser) => {
          if (mounted.current) {
            setSession(session);
            setUser(enrichedUser);
            setLoading(false);
            
            // Create user record on SIGNED_IN event if user is confirmed
            if (event === 'SIGNED_IN' && session.user.email_confirmed_at) {
              createUserRecord(session.user);
            }
          }
        });
      } else if (mounted.current) {
        setSession(session);
        setUser(null);
        setLoading(false);
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

  const refreshUser = async () => {
    if (session?.user) {
      const enrichedUser = await fetchAndEnrichUser(session.user);
      setUser(enrichedUser);
    }
  };

  return {
    session,
    user,
    loading,
    signOut,
    refreshUser,
  };
}