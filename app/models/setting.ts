export class Setting {
  id: string;
  gametypeId: string;
  name: string;
  description: string;
  type: string;
  value: string;
  default: string;
  children: Setting[];
  enabled: boolean;
}
