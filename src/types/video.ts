
export interface Participant {
  id: number;
  name: string;
  isSelf?: boolean;
  isMuted: boolean;
  isVideoOff: boolean;
  avatar: string;
  hasPicture?: boolean;
}
