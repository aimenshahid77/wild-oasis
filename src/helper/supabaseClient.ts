import { createClient } from "@supabase/supabase-js";
const supabaseUrl= 'https://tvdgfajtgtpnfqizgntb.supabase.co'
const supabaseAnonKey = " sb_publishable_4u_VO190I8A3QJL8IUv_dQ_nl_dDn-V"

const supabase= createClient(supabaseUrl, supabaseAnonKey);

export default supabase;
