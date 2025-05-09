export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      course_instructor: {
        Row: {
          course_id: string
          created_at: string | null
          instructor_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          instructor_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          instructor_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_instructor_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_instructor_instructor_id_fkey"
            columns: ["instructor_id"]
            isOneToOne: false
            referencedRelation: "instructors"
            referencedColumns: ["id"]
          },
        ]
      }
      course_predictions: {
        Row: {
          academic_year: string
          avg_per_section: number
          code: string
          course_id: string | null
          created_at: string | null
          id: string
          predicted: number
          sections: number
          semester: string
          title: string
          updated_at: string | null
        }
        Insert: {
          academic_year: string
          avg_per_section?: number
          code: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          predicted?: number
          sections?: number
          semester: string
          title: string
          updated_at?: string | null
        }
        Update: {
          academic_year?: string
          avg_per_section?: number
          code?: string
          course_id?: string | null
          created_at?: string | null
          id?: string
          predicted?: number
          sections?: number
          semester?: string
          title?: string
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_predictions_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_requests: {
        Row: {
          course_id: string | null
          created_at: string | null
          id: string
          rejection_reason: string | null
          reviewed_by: string | null
          status: Database["public"]["Enums"]["request_status"] | null
          student_id: string | null
          updated_at: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          rejection_reason?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          id?: string
          rejection_reason?: string | null
          reviewed_by?: string | null
          status?: Database["public"]["Enums"]["request_status"] | null
          student_id?: string | null
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_requests_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_requests_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_schedules: {
        Row: {
          academic_year: string
          course_id: string | null
          created_at: string | null
          day_of_week: number
          end_time: string
          id: string
          semester: string
          start_time: string
        }
        Insert: {
          academic_year: string
          course_id?: string | null
          created_at?: string | null
          day_of_week: number
          end_time: string
          id?: string
          semester: string
          start_time: string
        }
        Update: {
          academic_year?: string
          course_id?: string | null
          created_at?: string | null
          day_of_week?: number
          end_time?: string
          id?: string
          semester?: string
          start_time?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_schedules_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
        ]
      }
      course_sections: {
        Row: {
          course_prediction_id: string | null
          created_at: string | null
          filled: number
          id: string
          seats: number
          section_number: number
          updated_at: string | null
        }
        Insert: {
          course_prediction_id?: string | null
          created_at?: string | null
          filled?: number
          id?: string
          seats?: number
          section_number: number
          updated_at?: string | null
        }
        Update: {
          course_prediction_id?: string | null
          created_at?: string | null
          filled?: number
          id?: string
          seats?: number
          section_number?: number
          updated_at?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "course_sections_course_prediction_id_fkey"
            columns: ["course_prediction_id"]
            isOneToOne: false
            referencedRelation: "course_predictions"
            referencedColumns: ["id"]
          },
        ]
      }
      course_student: {
        Row: {
          course_id: string
          created_at: string | null
          date: string | null
          grade: string | null
          status: string
          student_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          date?: string | null
          grade?: string | null
          status?: string
          student_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          date?: string | null
          grade?: string | null
          status?: string
          student_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_student_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_student_student_id_fkey"
            columns: ["student_id"]
            isOneToOne: false
            referencedRelation: "students"
            referencedColumns: ["id"]
          },
        ]
      }
      course_time_slot: {
        Row: {
          course_id: string
          created_at: string | null
          time_slot_id: string
        }
        Insert: {
          course_id: string
          created_at?: string | null
          time_slot_id: string
        }
        Update: {
          course_id?: string
          created_at?: string | null
          time_slot_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "course_time_slot_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "course_time_slot_time_slot_id_fkey"
            columns: ["time_slot_id"]
            isOneToOne: false
            referencedRelation: "time_slots"
            referencedColumns: ["id"]
          },
        ]
      }
      courses: {
        Row: {
          code: string
          created_at: string | null
          credits: number
          id: string
          prerequisites: string[] | null
          title: string
          updated_at: string | null
        }
        Insert: {
          code: string
          created_at?: string | null
          credits: number
          id?: string
          prerequisites?: string[] | null
          title: string
          updated_at?: string | null
        }
        Update: {
          code?: string
          created_at?: string | null
          credits?: number
          id?: string
          prerequisites?: string[] | null
          title?: string
          updated_at?: string | null
        }
        Relationships: []
      }
      exam_schedule: {
        Row: {
          course_id: string | null
          created_at: string | null
          end_time: string
          exam_date: string
          id: string
          start_time: string
          updated_at: string | null
          venue_id: string | null
        }
        Insert: {
          course_id?: string | null
          created_at?: string | null
          end_time: string
          exam_date: string
          id?: string
          start_time: string
          updated_at?: string | null
          venue_id?: string | null
        }
        Update: {
          course_id?: string | null
          created_at?: string | null
          end_time?: string
          exam_date?: string
          id?: string
          start_time?: string
          updated_at?: string | null
          venue_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "exam_schedule_course_id_fkey"
            columns: ["course_id"]
            isOneToOne: false
            referencedRelation: "courses"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "exam_schedule_venue_id_fkey"
            columns: ["venue_id"]
            isOneToOne: false
            referencedRelation: "exam_venues"
            referencedColumns: ["id"]
          },
        ]
      }
      exam_venues: {
        Row: {
          capacity: number
          created_at: string | null
          id: string
          name: string
        }
        Insert: {
          capacity: number
          created_at?: string | null
          id?: string
          name: string
        }
        Update: {
          capacity?: number
          created_at?: string | null
          id?: string
          name?: string
        }
        Relationships: []
      }
      instructors: {
        Row: {
          created_at: string | null
          department: string
          id: string
          name: string
          phone: string | null
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          department: string
          id?: string
          name: string
          phone?: string | null
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          department?: string
          id?: string
          name?: string
          phone?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      students: {
        Row: {
          acquired_hours: number | null
          created_at: string | null
          gpa: number | null
          id: string
          level: number
          major: string | null
          name: string
          student_id: string
          updated_at: string | null
          user_id: string | null
        }
        Insert: {
          acquired_hours?: number | null
          created_at?: string | null
          gpa?: number | null
          id: string
          level: number
          major?: string | null
          name: string
          student_id: string
          updated_at?: string | null
          user_id?: string | null
        }
        Update: {
          acquired_hours?: number | null
          created_at?: string | null
          gpa?: number | null
          id?: string
          level?: number
          major?: string | null
          name?: string
          student_id?: string
          updated_at?: string | null
          user_id?: string | null
        }
        Relationships: []
      }
      time_slots: {
        Row: {
          created_at: string | null
          id: string
          ts_day: number
          ts_end: string
          ts_start: string
        }
        Insert: {
          created_at?: string | null
          id?: string
          ts_day: number
          ts_end: string
          ts_start: string
        }
        Update: {
          created_at?: string | null
          id?: string
          ts_day?: number
          ts_end?: string
          ts_start?: string
        }
        Relationships: []
      }
      user_roles: {
        Row: {
          created_at: string | null
          id: string
          role: string
          user_id: string | null
        }
        Insert: {
          created_at?: string | null
          id?: string
          role: string
          user_id?: string | null
        }
        Update: {
          created_at?: string | null
          id?: string
          role?: string
          user_id?: string | null
        }
        Relationships: []
      }
      user_types: {
        Row: {
          created_at: string | null
          type: string
          user_id: string
        }
        Insert: {
          created_at?: string | null
          type: string
          user_id: string
        }
        Update: {
          created_at?: string | null
          type?: string
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      check_prerequisites: {
        Args: { p_student_id: string; p_course_id: string }
        Returns: boolean
      }
      check_schedule_conflicts: {
        Args: { p_student_id: string; p_course_id: string }
        Returns: boolean
      }
    }
    Enums: {
      request_status: "pending" | "approved" | "rejected"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DefaultSchema = Database[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? (Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      Database[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
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
    | { schema: keyof Database },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends { schema: keyof Database }
  ? Database[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof Database },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof Database
  }
    ? keyof Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends { schema: keyof Database }
  ? Database[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      request_status: ["pending", "approved", "rejected"],
    },
  },
} as const
