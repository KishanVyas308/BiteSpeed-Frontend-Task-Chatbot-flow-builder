import { useState, useEffect } from 'react';
import type { CustomNode } from '../types';

interface SettingsPanelProps {
  selectedNode: CustomNode | null;
  onNodeUpdate: (nodeId: string, newData: any) => void;
  onClose: () => void;
}

/**
 * SettingsPanel component for editing node properties
 * Features:
 * - Edits text content of selected text node
 * - Replaces NodesPanel when a node is selected
 * - Provides back button to return to NodesPanel
 * - Styled with Tailwind CSS
 */
const SettingsPanel = ({ selectedNode, onNodeUpdate, onClose }: SettingsPanelProps) => {
  const [text, setText] = useState('');

  // Update local state when selected node changes
  useEffect(() => {
    if (selectedNode) {
      setText(selectedNode.data.text || '');
    }
  }, [selectedNode]);

  /**
   * Handle text change and update the node
   */
  const handleTextChange = (newText: string) => {
    setText(newText);
    if (selectedNode) {
      onNodeUpdate(selectedNode.id, { ...selectedNode.data, text: newText });
    }
  };

  if (!selectedNode) return null;

  return (
    <div className="bg-white border border-gray-200 rounded-lg shadow-md h-fit">
      <div className="bg-gray-50 border-b border-gray-200 rounded-t-lg p-4 flex items-center gap-3">
        <button 
          className="text-blue-600 hover:text-blue-800 hover:bg-blue-50 transition-colors px-2 py-1 rounded"
          onClick={onClose}
        >
          ← Back
        </button>
        <h3 className="text-base font-semibold text-gray-700 m-0">Message Settings</h3>
      </div>
      
      <div className="p-4">
        <div className="mb-4">
          <label 
            htmlFor="message-text" 
            className="block mb-2 text-sm font-medium text-gray-700"
          >
            Message Text:
          </label>
          <textarea
            id="message-text"
            value={text}
            onChange={(e) => handleTextChange(e.target.value)}
            placeholder="Enter your message..."
            className="w-full p-3 border border-gray-300 rounded-md text-sm resize-y min-h-[80px] 
                       focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500
                       placeholder:text-gray-400 transition-colors"
            rows={4}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
