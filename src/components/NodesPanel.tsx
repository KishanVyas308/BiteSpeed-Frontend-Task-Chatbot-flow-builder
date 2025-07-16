import type { DragEvent } from 'react';
import type { NodeType } from '../types';

interface NodesPanelProps {
  isVisible: boolean;
}

/**
 * NodesPanel component displays available node types for drag and drop
 * Features:
 * - Extensible design for adding new node types
 * - Drag and drop functionality
 * - Only shows when no node is selected
 * - Hover effects with Tailwind CSS
 */
const NodesPanel = ({ isVisible }: NodesPanelProps) => {
  // Available node types - easily extensible for future node types
  const nodeTypes: NodeType[] = [
    {
      type: 'textNode',
      label: 'Message',
      icon: '💬',
      data: { text: '', label: 'Send Message' }
    }
    // Future node types can be added here:
    // { type: 'imageNode', label: 'Image', icon: '🖼️', data: { ... } },
    // { type: 'buttonNode', label: 'Button', icon: '🔘', data: { ... } },
  ];

  /**
   * Handle drag start - sets the node type data for drop handling
   */
  const onDragStart = (event: DragEvent, nodeType: NodeType) => {
    event.dataTransfer.setData('application/reactflow', JSON.stringify(nodeType));
    event.dataTransfer.effectAllowed = 'move';
  };

  if (!isVisible) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md h-fit">
      <div className="bg-gray-50 border-b border-gray-200 rounded-t-lg p-4">
        <h3 className="text-base font-semibold text-gray-700 m-0">Nodes</h3>
      </div>
      
      <div className="p-4">
        {nodeTypes.map((nodeType) => (
          <div
            key={nodeType.type}
            className="flex items-center p-3 mb-2 bg-gray-50 border border-gray-200 rounded-md cursor-grab 
                       transition-all duration-200 select-none hover:bg-gray-100 hover:border-blue-400 
                       hover:transform hover:-translate-y-0.5 hover:shadow-md active:cursor-grabbing 
                       active:transform active:translate-y-0"
            draggable
            onDragStart={(event) => onDragStart(event, nodeType)}
          >
            <div className="flex items-center justify-center w-6 h-6 mr-3 text-lg">
              {nodeType.icon}
            </div>
            <div className="text-sm font-medium text-gray-700">{nodeType.label}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NodesPanel;
