import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';
import { serve } from 'https://deno.land/std@0.224.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, OPTIONS',
  'Content-Type': 'application/json'
};

serve(async (request) => {
  if (request.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  if (request.method !== 'GET') {
    return new Response(JSON.stringify({ ok: false, error: 'Method not allowed. Use GET.' }), {
      status: 405,
      headers: corsHeaders
    });
  }

  const authHeader = request.headers.get('Authorization');

  if (!authHeader) {
    return new Response(JSON.stringify({ ok: false, error: 'Missing Authorization header.' }), {
      status: 401,
      headers: corsHeaders
    });
  }

  const supabaseUrl = Deno.env.get('SUPABASE_URL');
  const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY');

  if (!supabaseUrl || !supabaseAnonKey) {
    return new Response(JSON.stringify({ ok: false, error: 'Server misconfiguration.' }), {
      status: 500,
      headers: corsHeaders
    });
  }

  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    global: { headers: { Authorization: authHeader } }
  });

  const url = new URL(request.url);
  const difficulty = url.searchParams.get('difficulty');
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 20;

  let query = supabase
    .from('workouts')
    .select('id, title, difficulty, duration_in_minutes, created_at')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (difficulty && ['Beginner', 'Intermediate', 'Advanced'].includes(difficulty)) {
    query = query.eq('difficulty', difficulty);
  }

  const { data, error } = await query;

  if (error) {
    return new Response(JSON.stringify({ ok: false, error: error.message }), {
      status: 400,
      headers: corsHeaders
    });
  }

  return new Response(JSON.stringify({ ok: true, data, count: data?.length ?? 0 }), {
    status: 200,
    headers: corsHeaders
  });
});
