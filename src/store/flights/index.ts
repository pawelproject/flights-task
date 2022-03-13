import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import dijkstra, { Graph } from "dijkstrajs";

import { AIRPORTS, AIRPORTS_CONNECTIONS } from "../../data/dummy-data";

interface FlightState {
  airports: string[];
  connections: string[][];
  originalSyntaxGraph: Graph;
  doubleLinkedGraph: Graph;
  path: { airports: string[]; connections: string[][] };
}

const initialState: FlightState = {
  airports: [],
  connections: [],
  path: { airports: [], connections: [] },
  originalSyntaxGraph: {},
  doubleLinkedGraph: {},
};

export const flightSlice = createSlice({
  name: "flight",
  initialState,
  reducers: {
    fetchData: (state) => {
      const originalSyntaxGraph: Graph = {};
      AIRPORTS.map((airport) => {
        originalSyntaxGraph[airport] = {};
      });
      AIRPORTS_CONNECTIONS.map((link) => {
        originalSyntaxGraph[link[0]] = {
          ...originalSyntaxGraph[link[0]],
          [link[1]]: 1,
        };
      });
      const doubleLinkedGraph = { ...originalSyntaxGraph };
      AIRPORTS_CONNECTIONS.map((link) => {
        doubleLinkedGraph[link[1]] = {
          ...doubleLinkedGraph[link[1]],
          [link[0]]: 1,
        };
      });

      state.airports = AIRPORTS;
      state.connections = AIRPORTS_CONNECTIONS;
      state.originalSyntaxGraph = originalSyntaxGraph;
      state.doubleLinkedGraph = doubleLinkedGraph;
    },
    calculateRoute: (
      state,
      action: PayloadAction<{ start: string; end: string }>
    ) => {
      const find_path = dijkstra.find_path;

      const pathAirportList: string[] = find_path(
        state.doubleLinkedGraph,
        action.payload.start,
        action.payload.end
      );

      const pathConnectionList: string[][] = [];

      pathAirportList.map((airport, i, arr) => {
        if (i === arr.length - 1) {
          return;
        }

        if (
          Object.keys(state.originalSyntaxGraph[airport]).includes(arr[i + 1])
        ) {
          pathConnectionList.push([airport, arr[i + 1]]);
        } else {
          pathConnectionList.push([arr[i + 1], airport]);
        }
      });

      state.path = {
        airports: pathAirportList,
        connections: pathConnectionList,
      };
    },
  },
});

export const { calculateRoute, fetchData } = flightSlice.actions;

export default flightSlice.reducer;
