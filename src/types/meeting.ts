
export interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  duration: number;
  host: string;
  description: string;
  registrants: Attendee[];
}

export interface Attendee {
  id: number;
  name: string;
  avatar: string;
}
