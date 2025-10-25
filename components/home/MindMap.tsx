"use client";

import ReactFlow, { Background, Controls } from "reactflow";
import "reactflow/dist/style.css";

interface MindMapProps {
  summaryData: { heading: string; points: string[] }[];
}

export default function MindMap({ summaryData }: MindMapProps) {
  if (!summaryData.length) return null;

  const { nodes, edges } = convertToMindMap(summaryData);

  return (
    <div className="w-full h-[600px] bg-white dark:bg-slate-900 border border-slate-300 dark:border-slate-700 rounded-xl mt-10 shadow-lg">
      <ReactFlow nodes={nodes} edges={edges} fitView>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

// Helper to transform summary into nodes + edges
function convertToMindMap(summaryData: { heading: string; points: string[] }[]) {
  const nodes: any[] = [];
  const edges: any[] = [];
  let yOffset = 0;

  // Root node
  nodes.push({
    id: "root",
    data: { label: "📘 PDF Summary" },
    position: { x: 0, y: 0 },
    style: {
      background: "#2563eb",
      color: "white",
      padding: 10,
      borderRadius: 8,
      fontWeight: 600,
    },
  });

  // Build section + point nodes
  summaryData.forEach((section, i) => {
    const sectionId = `section-${i}`;
    nodes.push({
      id: sectionId,
      data: { label: section.heading },
      position: { x: 250, y: yOffset },
      style: {
        background: "#1e293b",
        color: "white",
        padding: 8,
        borderRadius: 8,
      },
    });
    edges.push({ id: `e-root-${sectionId}`, source: "root", target: sectionId });

    section.points.forEach((point, j) => {
      const pointId = `point-${i}-${j}`;
      nodes.push({
        id: pointId,
        data: { label: point },
        position: { x: 500, y: yOffset + j * 80 },
        style: {
          background: "#f1f5f9",
          color: "#0f172a",
          padding: 6,
          borderRadius: 6,
        },
      });
      edges.push({ id: `e-${sectionId}-${pointId}`, source: sectionId, target: pointId });
    });

    yOffset += (section.points.length + 1) * 100;
  });

  return { nodes, edges };
}
