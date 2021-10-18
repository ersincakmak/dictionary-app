export interface ApiResponse {
  head: Head;
  def: Def[];
}

export interface Def {
  text: string;
  pos: string;
  ts: string;
  tr: Tr[];
}

export interface Tr {
  text: string;
  pos: string;
  fr: number;
  syn?: Syn[];
  mean?: Mean[];
  ex?: Ex[];
}

export interface Ex {
  text: string;
  tr: Mean[];
}

export interface Mean {
  text: string;
}

export interface Syn {
  text: string;
  pos: string;
  fr: number;
}

export interface Head {}
