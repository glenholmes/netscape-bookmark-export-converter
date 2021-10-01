export interface JsonDataTreeObject {
  tagName?: string;
  attribs?: any;
  data?: string;
  children?: any[];
}

export interface Bookmark {
  url: string;
  tags: string[];
}
