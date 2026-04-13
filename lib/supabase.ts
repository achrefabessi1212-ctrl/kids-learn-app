import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.https://mwqtdmtcstfejervzfoa.supabase.co;
const supabaseKey = process.env.sb_publishable_XNvIG3hbOgWcYBWyvP7DCw_uaDhQXA4;

export const supabase = createClient(supabaseUrl, supabaseKey);
