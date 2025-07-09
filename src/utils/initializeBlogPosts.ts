
import { supabase } from '@/integrations/supabase/client';
import { sampleBlogPosts } from './sampleBlogPosts';

export async function initializeSampleBlogPosts() {
  try {
    // Check if we already have blog posts
    const { data: existingPosts, error: checkError } = await supabase
      .from('blog_posts')
      .select('id')
      .limit(1);

    if (checkError) {
      console.error('Error checking existing posts:', checkError);
      return;
    }

    // If we already have posts, don't add samples
    if (existingPosts && existingPosts.length > 0) {
      console.log('Blog posts already exist, skipping sample data initialization');
      return;
    }

    // Get the current user (should be admin)
    const { data: { user }, error: userError } = await supabase.auth.getUser();
    
    if (userError || !user) {
      console.error('No authenticated user found:', userError);
      return;
    }

    // Check if user is admin
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('role')
      .eq('user_id', user.id)
      .single();

    if (profileError || profile?.role !== 'admin') {
      console.error('User is not admin or profile not found');
      return;
    }

    console.log('Adding sample blog posts...');

    // Add sample blog posts
    const postsToInsert = sampleBlogPosts.map(post => ({
      ...post,
      author_id: user.id,
      published: true,
      created_at: new Date(Date.now() - Math.random() * 30 * 24 * 60 * 60 * 1000).toISOString(), // Random date within last 30 days
    }));

    const { data: insertedPosts, error: insertError } = await supabase
      .from('blog_posts')
      .insert(postsToInsert)
      .select();

    if (insertError) {
      console.error('Error inserting sample posts:', insertError);
      return;
    }

    console.log(`Successfully added ${insertedPosts?.length || 0} sample blog posts`);
    return insertedPosts;
  } catch (error) {
    console.error('Unexpected error initializing blog posts:', error);
  }
}
