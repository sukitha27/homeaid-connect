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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      donors: {
        Row: {
          amount_offered: number | null
          created_at: string
          donation_type: Database["public"]["Enums"]["donation_type"]
          email: string
          full_name: string
          id: string
          is_anonymous: boolean | null
          materials_offered: string[] | null
          notes: string | null
          organization: string | null
          phone: string
          preferred_districts: string[] | null
          status: Database["public"]["Enums"]["approval_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          amount_offered?: number | null
          created_at?: string
          donation_type: Database["public"]["Enums"]["donation_type"]
          email: string
          full_name: string
          id?: string
          is_anonymous?: boolean | null
          materials_offered?: string[] | null
          notes?: string | null
          organization?: string | null
          phone: string
          preferred_districts?: string[] | null
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          amount_offered?: number | null
          created_at?: string
          donation_type?: Database["public"]["Enums"]["donation_type"]
          email?: string
          full_name?: string
          id?: string
          is_anonymous?: boolean | null
          materials_offered?: string[] | null
          notes?: string | null
          organization?: string | null
          phone?: string
          preferred_districts?: string[] | null
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          created_at: string
          district: string | null
          email: string | null
          full_name: string | null
          id: string
          phone: string | null
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          district?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          district?: string | null
          email?: string | null
          full_name?: string | null
          id?: string
          phone?: string | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      project_donors: {
        Row: {
          amount: number | null
          contributed_at: string
          contribution_type: Database["public"]["Enums"]["donation_type"]
          donor_id: string
          id: string
          materials: string[] | null
          notes: string | null
          project_id: string
        }
        Insert: {
          amount?: number | null
          contributed_at?: string
          contribution_type: Database["public"]["Enums"]["donation_type"]
          donor_id: string
          id?: string
          materials?: string[] | null
          notes?: string | null
          project_id: string
        }
        Update: {
          amount?: number | null
          contributed_at?: string
          contribution_type?: Database["public"]["Enums"]["donation_type"]
          donor_id?: string
          id?: string
          materials?: string[] | null
          notes?: string | null
          project_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_donors_donor_id_fkey"
            columns: ["donor_id"]
            isOneToOne: false
            referencedRelation: "donors"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_donors_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_updates: {
        Row: {
          created_at: string
          created_by: string | null
          id: string
          images: string[] | null
          progress_percentage: number | null
          project_id: string
          update_text: string
        }
        Insert: {
          created_at?: string
          created_by?: string | null
          id?: string
          images?: string[] | null
          progress_percentage?: number | null
          project_id: string
          update_text: string
        }
        Update: {
          created_at?: string
          created_by?: string | null
          id?: string
          images?: string[] | null
          progress_percentage?: number | null
          project_id?: string
          update_text?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_updates_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
        ]
      }
      project_volunteers: {
        Row: {
          assigned_at: string
          id: string
          project_id: string
          status: string | null
          volunteer_id: string
        }
        Insert: {
          assigned_at?: string
          id?: string
          project_id: string
          status?: string | null
          volunteer_id: string
        }
        Update: {
          assigned_at?: string
          id?: string
          project_id?: string
          status?: string | null
          volunteer_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "project_volunteers_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_volunteers_volunteer_id_fkey"
            columns: ["volunteer_id"]
            isOneToOne: false
            referencedRelation: "volunteers"
            referencedColumns: ["id"]
          },
        ]
      }
      projects: {
        Row: {
          actual_completion: string | null
          amount_spent: number | null
          created_at: string
          description: string | null
          estimated_completion: string | null
          id: string
          progress: number
          start_date: string | null
          status: Database["public"]["Enums"]["request_status"]
          title: string
          total_budget: number | null
          updated_at: string
          victim_id: string
        }
        Insert: {
          actual_completion?: string | null
          amount_spent?: number | null
          created_at?: string
          description?: string | null
          estimated_completion?: string | null
          id?: string
          progress?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          title: string
          total_budget?: number | null
          updated_at?: string
          victim_id: string
        }
        Update: {
          actual_completion?: string | null
          amount_spent?: number | null
          created_at?: string
          description?: string | null
          estimated_completion?: string | null
          id?: string
          progress?: number
          start_date?: string | null
          status?: Database["public"]["Enums"]["request_status"]
          title?: string
          total_budget?: number | null
          updated_at?: string
          victim_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "projects_victim_id_fkey"
            columns: ["victim_id"]
            isOneToOne: false
            referencedRelation: "victims"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
      victims: {
        Row: {
          address: string
          created_at: string
          damage_description: string | null
          damage_level: Database["public"]["Enums"]["damage_level"]
          district: string
          email: string | null
          family_size: number
          full_name: string
          gn_division: string
          id: string
          images: string[] | null
          phone: string
          status: Database["public"]["Enums"]["approval_status"]
          submitted_by: string | null
          updated_at: string
          urgent_needs: string[] | null
        }
        Insert: {
          address: string
          created_at?: string
          damage_description?: string | null
          damage_level?: Database["public"]["Enums"]["damage_level"]
          district: string
          email?: string | null
          family_size?: number
          full_name: string
          gn_division: string
          id?: string
          images?: string[] | null
          phone: string
          status?: Database["public"]["Enums"]["approval_status"]
          submitted_by?: string | null
          updated_at?: string
          urgent_needs?: string[] | null
        }
        Update: {
          address?: string
          created_at?: string
          damage_description?: string | null
          damage_level?: Database["public"]["Enums"]["damage_level"]
          district?: string
          email?: string | null
          family_size?: number
          full_name?: string
          gn_division?: string
          id?: string
          images?: string[] | null
          phone?: string
          status?: Database["public"]["Enums"]["approval_status"]
          submitted_by?: string | null
          updated_at?: string
          urgent_needs?: string[] | null
        }
        Relationships: []
      }
      volunteers: {
        Row: {
          address: string | null
          age: number | null
          availability: string[] | null
          created_at: string
          email: string | null
          experience_years: number | null
          full_name: string
          has_tools: boolean | null
          has_transport: boolean | null
          id: string
          motivation: string | null
          phone: string
          preferred_districts: string[] | null
          skills: Database["public"]["Enums"]["volunteer_skill"][]
          status: Database["public"]["Enums"]["approval_status"]
          updated_at: string
          user_id: string | null
        }
        Insert: {
          address?: string | null
          age?: number | null
          availability?: string[] | null
          created_at?: string
          email?: string | null
          experience_years?: number | null
          full_name: string
          has_tools?: boolean | null
          has_transport?: boolean | null
          id?: string
          motivation?: string | null
          phone: string
          preferred_districts?: string[] | null
          skills: Database["public"]["Enums"]["volunteer_skill"][]
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
          user_id?: string | null
        }
        Update: {
          address?: string | null
          age?: number | null
          availability?: string[] | null
          created_at?: string
          email?: string | null
          experience_years?: number | null
          full_name?: string
          has_tools?: boolean | null
          has_transport?: boolean | null
          id?: string
          motivation?: string | null
          phone?: string
          preferred_districts?: string[] | null
          skills?: Database["public"]["Enums"]["volunteer_skill"][]
          status?: Database["public"]["Enums"]["approval_status"]
          updated_at?: string
          user_id?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      is_admin: { Args: never; Returns: boolean }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      approval_status: "pending" | "approved" | "rejected"
      damage_level: "minor" | "partial" | "severe" | "total_loss"
      donation_type: "materials" | "funds" | "sponsorship"
      request_status:
        | "pending"
        | "verified"
        | "assigned"
        | "in_progress"
        | "completed"
        | "rejected"
      volunteer_skill:
        | "carpentry"
        | "masonry"
        | "electrical"
        | "plumbing"
        | "painting"
        | "roofing"
        | "welding"
        | "helper"
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
    Enums: {
      app_role: ["admin", "moderator", "user"],
      approval_status: ["pending", "approved", "rejected"],
      damage_level: ["minor", "partial", "severe", "total_loss"],
      donation_type: ["materials", "funds", "sponsorship"],
      request_status: [
        "pending",
        "verified",
        "assigned",
        "in_progress",
        "completed",
        "rejected",
      ],
      volunteer_skill: [
        "carpentry",
        "masonry",
        "electrical",
        "plumbing",
        "painting",
        "roofing",
        "welding",
        "helper",
      ],
    },
  },
} as const
