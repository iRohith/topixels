import { Database } from "./database.types";
import { SupabaseClient as SC, User } from "@supabase/supabase-js";

export type SupabaseClient = SC<Database>;
export type SupabaseUser = User;
