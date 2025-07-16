import { useState, useCallback, useRef } from 'react';
import type { DragEvent } from 'react';
import ReactFlow, {
  addEdge,
  useNodesState,
  useEdgesState,
  Background,
  Controls,
  MiniMap,
  ReactFlowProvider,
  MarkerType,
} from 'reactflow';
import type {
  Connection,
  Edge,
  ReactFlowInstance,
  Node,
} from 'reactflow';
import 'reactflow/dist/style.css';
import { v4 as uuidv4 } from 'uuid';

import TextNode from './TextNode';
import NodesPanel from './NodesPanel';
import SettingsPanel from './SettingsPanel';
import Toast from './Toast';
import type { CustomNode, NodeType } from '../types';

// Define custom node types for React Flow
const nodeTypes = {
  textNode: TextNode,
};

/**
 * ChatbotFlowBuilder - Main component for the chatbot flow builder
 * Features:
 * - Drag and drop nodes from panel
 * - Connect nodes with edges (side by side)
 * - Edit node properties in settings panel
 * - Save flow with validation and error toast
 * - Source handle can only have one outgoing edge
 * - Click edge to delete it
 * - Arrow markers on edges
 * - Tailwind CSS styling
 */
const ChatbotFlowBuilder = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [selectedNode, setSelectedNode] = useState<CustomNode | null>(null);
  const [reactFlowInstance, setReactFlowInstance] = useState<ReactFlowInstance | null>(null);
  const [toast, setToast] = useState<{ message: string; type: 'error' | 'success' | 'info'; isVisible: boolean }>({
    message: '',
    type: 'error',
    isVisible: false,
  });
  const reactFlowWrapper = useRef<HTMLDivElement>(null);

  /**
   * Show toast notification
   */
  const showToast = useCallback((message: string, type: 'error' | 'success' | 'info' = 'error') => {
    setToast({ message, type, isVisible: true });
  }, []);

  /**
   * Hide toast notification
   */
  const hideToast = useCallback(() => {
    setToast(prev => ({ ...prev, isVisible: false }));
  }, []);

  /**
   * Handle connection between nodes
   * Validates that source handle can only have one outgoing edge
   */
  const onConnect = useCallback((params: Connection | Edge) => {
    // Check if source handle already has an outgoing edge
    const existingEdge = edges.find(edge => 
      edge.source === params.source && edge.sourceHandle === params.sourceHandle
    );
    
    if (existingEdge) {
      // Remove existing edge before adding new one
      setEdges(eds => eds.filter(edge => edge.id !== existingEdge.id));
    }
    
    const newEdge = {
      ...params,
      id: uuidv4(),
      markerEnd: {
        type: MarkerType.ArrowClosed,
        width: 20,
        height: 20,
        color: '#3b82f6',
      },
      style: {
        stroke: '#3b82f6',
        strokeWidth: 2,
      },
    };
    
    setEdges(eds => addEdge(newEdge, eds));
  }, [edges, setEdges]);

  /**
   * Handle edge click to delete it
   */
  const onEdgeClick = useCallback((_: React.MouseEvent, edge: Edge) => {
    setEdges(eds => eds.filter(e => e.id !== edge.id));
  }, [setEdges]);

  /**
   * Handle node selection
   */
  const onNodeClick = useCallback((_: React.MouseEvent, node: Node) => {
    setSelectedNode(node as CustomNode);
  }, []);

  /**
   * Handle clicking on empty space to deselect
   */
  const onPaneClick = useCallback(() => {
    setSelectedNode(null);
  }, []);

  /**
   * Handle drag over for drop functionality
   */
  const onDragOver = useCallback((event: DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  /**
   * Handle drop to create new node
   */
  const onDrop = useCallback(
    (event: DragEvent) => {
      event.preventDefault();

      if (!reactFlowWrapper.current || !reactFlowInstance) return;

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const nodeTypeData = event.dataTransfer.getData('application/reactflow');
      
      if (!nodeTypeData) return;

      const nodeType: NodeType = JSON.parse(nodeTypeData);
      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      const newNode = {
        id: uuidv4(),
        type: nodeType.type as 'textNode',
        position,
        data: { ...nodeType.data },
      };

      setNodes(nds => [...nds, newNode]);
    },
    [reactFlowInstance, setNodes]
  );

  /**
   * Update node data
   */
  const onNodeUpdate = useCallback((nodeId: string, newData: any) => {
    setNodes(nds =>
      nds.map(node =>
        node.id === nodeId ? { ...node, data: { ...node.data, ...newData } } : node
      )
    );
  }, [setNodes]);

  /**
   * Save flow with validation
   * Shows error toast if more than one node has empty target handles
   */
  const onSave = useCallback(() => {
    if (nodes.length <= 1) {
      showToast('Flow saved successfully!', 'success');
      return;
    }

    // Find nodes with no incoming edges (empty target handles)
    const nodesWithNoTarget = nodes.filter(node => 
      !edges.some(edge => edge.target === node.id)
    );

    if (nodesWithNoTarget.length > 1) {
      showToast('Error: Cannot save flow. More than one node has empty target handles.', 'error');
      return;
    }

    showToast('Flow saved successfully!', 'success');
    
    // Here you would typically save to a backend
    console.log('Saving flow:', { nodes, edges });
  }, [nodes, edges, showToast]);

  /**
   * Close settings panel
   */
  const closeSettings = useCallback(() => {
    setSelectedNode(null);
  }, []);

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      {/* Toast notification */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={hideToast}
      />

      {/* Header */}
      <div className="bg-white border-b border-gray-200 p-4 flex justify-between items-center shadow-sm z-10">
        <h1 className="text-xl font-semibold text-gray-800 m-0">Chatbot Flow Builder</h1>
        <button
          className="bg-blue-600 text-white px-5 py-2 rounded-lg text-sm font-medium 
                     hover:bg-blue-700 transition-colors shadow-sm"
          onClick={onSave}
        >
          Save Changes
        </button>
      </div>

      {/* Main content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Flow container */}
        <div className="flex-1 relative">
          <div className="w-full h-full" ref={reactFlowWrapper}>
            <ReactFlow
              nodes={nodes}
              edges={edges}
              onNodesChange={onNodesChange}
              onEdgesChange={onEdgesChange}
              onConnect={onConnect}
              onNodeClick={onNodeClick}
              onPaneClick={onPaneClick}
              onEdgeClick={onEdgeClick}
              onInit={setReactFlowInstance}
              onDrop={onDrop}
              onDragOver={onDragOver}
              nodeTypes={nodeTypes}
              fitView
              attributionPosition="bottom-left"
              className="bg-gray-50"
            >
              <Background color="#e5e7eb" gap={16} />
              <Controls className="bg-white border border-gray-200 rounded-lg shadow-sm" />
              <MiniMap 
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
                maskColor="rgba(59, 130, 246, 0.1)"
                nodeColor="#3b82f6"
              />
            </ReactFlow>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-80 bg-gray-50 border-l border-gray-200 p-4 overflow-y-auto">
          <NodesPanel isVisible={!selectedNode} />
          <SettingsPanel
            selectedNode={selectedNode}
            onNodeUpdate={onNodeUpdate}
            onClose={closeSettings}
          />
        </div>
      </div>
    </div>
  );
};

/**
 * Wrapped component with ReactFlowProvider
 */
const ChatbotFlowBuilderWrapper = () => (
  <ReactFlowProvider>
    <ChatbotFlowBuilder />
  </ReactFlowProvider>
);

export default ChatbotFlowBuilderWrapper;
