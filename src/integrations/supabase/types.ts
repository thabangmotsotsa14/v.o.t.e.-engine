export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5"
  }
  public: {
    Tables: {
      contact_submissions: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string
          source: string | null
          subject: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message: string
          source?: string | null
          subject?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string
          source?: string | null
          subject?: string | null
        }
        Relationships: []
      }
      deed_of_foundation_signatures: {
        Row: {
          digital_consent: boolean
          email: string | null
          full_name: string
          id: string
          id_number_hash: string
          province: string
          signed_at: string
          transaction_id: string
        }
        Insert: {
          digital_consent?: boolean
          email?: string | null
          full_name: string
          id?: string
          id_number_hash: string
          province: string
          signed_at?: string
          transaction_id?: string
        }
        Update: {
          digital_consent?: boolean
          email?: string | null
          full_name?: string
          id?: string
          id_number_hash?: string
          province?: string
          signed_at?: string
          transaction_id?: string
        }
        Relationships: []
      }
      donations: {
        Row: {
          amount: number
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          purpose: string
          transaction_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          purpose: string
          transaction_id?: string
        }
        Update: {
          amount?: number
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          purpose?: string
          transaction_id?: string
        }
        Relationships: []
      }
      hotspot_metadata: {
        Row: {
          category: string
          created_at: string
          description: string | null
          display_order: number | null
          icon: string | null
          id: string
          search_tags: string[] | null
          target_url: string
          title: string
        }
        Insert: {
          category: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          search_tags?: string[] | null
          target_url: string
          title: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string | null
          display_order?: number | null
          icon?: string | null
          id?: string
          search_tags?: string[] | null
          target_url?: string
          title?: string
        }
        Relationships: []
      }
      interview_bookings: {
        Row: {
          created_at: string
          email: string
          full_name: string
          id: string
          message: string | null
          organization: string | null
          preferred_date: string | null
          topic: string | null
        }
        Insert: {
          created_at?: string
          email: string
          full_name: string
          id?: string
          message?: string | null
          organization?: string | null
          preferred_date?: string | null
          topic?: string | null
        }
        Update: {
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          message?: string | null
          organization?: string | null
          preferred_date?: string | null
          topic?: string | null
        }
        Relationships: []
      }
      members: {
        Row: {
          email: string
          full_name: string
          id: string
          is_verified: boolean | null
          joined_at: string
          mobile_number: string | null
          province: string | null
        }
        Insert: {
          email: string
          full_name: string
          id?: string
          is_verified?: boolean | null
          joined_at?: string
          mobile_number?: string | null
          province?: string | null
        }
        Update: {
          email?: string
          full_name?: string
          id?: string
          is_verified?: boolean | null
          joined_at?: string
          mobile_number?: string | null
          province?: string | null
        }
        Relationships: []
      }
      pledge_audit_log: {
        Row: {
          created_at: string
          email_status: string | null
          id: string
          ip_hash: string | null
          outcome: string
          pledge_id: string | null
          reason: string | null
          transaction_id: string | null
          user_agent: string | null
        }
        Insert: {
          created_at?: string
          email_status?: string | null
          id?: string
          ip_hash?: string | null
          outcome: string
          pledge_id?: string | null
          reason?: string | null
          transaction_id?: string | null
          user_agent?: string | null
        }
        Update: {
          created_at?: string
          email_status?: string | null
          id?: string
          ip_hash?: string | null
          outcome?: string
          pledge_id?: string | null
          reason?: string | null
          transaction_id?: string | null
          user_agent?: string | null
        }
        Relationships: []
      }
      pledge_rate_limit: {
        Row: {
          count: number
          ip_hash: string
          updated_at: string
          window_start: string
        }
        Insert: {
          count?: number
          ip_hash: string
          updated_at?: string
          window_start?: string
        }
        Update: {
          count?: number
          ip_hash?: string
          updated_at?: string
          window_start?: string
        }
        Relationships: []
      }
      pledges: {
        Row: {
          contact_method: string
          created_at: string
          email: string | null
          full_name: string
          id: string
          mobile: string | null
          national_id: string | null
          province: string
          transaction_id: string
        }
        Insert: {
          contact_method: string
          created_at?: string
          email?: string | null
          full_name: string
          id?: string
          mobile?: string | null
          national_id?: string | null
          province: string
          transaction_id?: string
        }
        Update: {
          contact_method?: string
          created_at?: string
          email?: string | null
          full_name?: string
          id?: string
          mobile?: string | null
          national_id?: string | null
          province?: string
          transaction_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      get_donation_totals: {
        Args: never
        Returns: {
          total_amount: number
          total_count: number
        }[]
      }
      get_member_count: { Args: never; Returns: number }
      get_pledge_count: { Args: never; Returns: number }
      get_signature_count: { Args: never; Returns: number }
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
