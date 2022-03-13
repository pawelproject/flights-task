declare module "dijkstrajs" {
  export default {
    find_path(
      graph: Graph,
      startingPoint: String,
      endingPoint: string
    ): string[];,
  };
  export interface Graph {
    [key: string]: GraphElement;
  }
  export interface GraphElement {
    [key: string]: number;
  }
}
