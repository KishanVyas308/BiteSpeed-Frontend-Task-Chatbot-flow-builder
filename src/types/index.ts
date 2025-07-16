// Types for the chatbot flow builder
import type { Node, Edge } from 'reactflow';

export interface TextNodeData {
  text: string;
  label: string;
}

export interface CustomNode extends Node {
  data: TextNodeData;
  type: 'textNode';
}

export interface CustomEdge extends Edge {
  id: string;
  source: string;
  target: string;
}

export interface FlowState {
  nodes: CustomNode[];
  edges: CustomEdge[];
}

export interface NodeType {
  type: string;
  label: string;
  icon?: string;
  data: any;
}
