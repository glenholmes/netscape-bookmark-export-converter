export interface JsonDataTreeObject {
  tagName?: string;
  attribs?: any;
  data?: string;
  children?: Array<any>;
}

export interface Bookmark {
  url: string;
  tags: Array<string>;
}
