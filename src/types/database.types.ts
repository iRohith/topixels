export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[];

export interface Database {
  public: {
    Tables: {
      [tableName: string]: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
    Views?: {
      [viewName: string]: {
        Row: any;
        Insert: any;
        Update: any;
      };
    };
    Functions?: {
      [functionName: string]: {
        Args: any;
        Returns: any;
      };
    };
    Enums?: { [enumName: string]: string[] };
  };
}
