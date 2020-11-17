export interface Champion {
  blurb: string;
  id: string;
  image: {
    full: string
    group: string
    h: number
    w: number
    x: number
    y: number
    sprite: string
  };
  info: {
    attack: number
    defense: number
    difficulty: number
    magic: number
  };
  key: string;
  name: string;
  partype: string;
  stats: object;
  tags: any;
  title: string;
  version: string;

}
