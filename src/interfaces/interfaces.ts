export interface NodeInterface {
     row: number;
     column: number;
     ID: number;
     Wall: boolean;
     Visited: boolean;
     Startpt: boolean;
     Endpt: boolean;
     distFS: number;
     previousCell: NodeInterface | null;
     isDest: boolean;
     f: number;
     g: number;
     h: number;
}
