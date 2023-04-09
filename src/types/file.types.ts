export interface Tag {
  value: string;
  label: string;
}

export type TFile = {
  id?: string;
  created_at?: string;
  label: string;
  url: string;
  extension: string;
  size: number;
  user_id: string;
  tags?: string;
}

export type TOption = {
  value: string;
  label: string;
}