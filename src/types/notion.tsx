// Define individual property types
export interface DateProperty {
  type: "date";
  
}

export interface SelectOption {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface SelectProperty {
  type: "select";
  select: {
    options: SelectOption[];
  };
}

export interface StatusOption {
  id: string;
  name: string;
  color: string;
  description?: string;
}

export interface StatusGroup {
  id: string;
  name: string;
  color: string;
  option_ids: string[];
}

export interface StatusProperty {
  type: "status";
  status: {
    options: StatusOption[];
    groups: StatusGroup[];
  };
}

export interface TitleProperty {
  type: "title";
  
}

// Union type for all property types
export type NotionProperty =
  | DateProperty
  | SelectProperty
  | StatusProperty
  | TitleProperty;

// Define the structure of a Notion page
export interface NotionPage {
  id: string;
  properties: {
    "Due Date": DateProperty;
    Priority: SelectProperty;
    Status: StatusProperty;
    Name: TitleProperty;
  };
}