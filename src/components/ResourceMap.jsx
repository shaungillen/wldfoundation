import React, { useState } from 'react';
import { Brain, Cpu, Shield, Zap, RefreshCw } from 'lucide-react';

const llmOptions = [
    { id: 'llama3', name: 'Llama 3 (Local)', cost: 'Free', speed: 'Fast', icon: <Cpu className="w-4 h-4" /> },
    { id: 'gpt4omin', name: 'GPT-4o mini', cost: '$', speed: 'Very Fast', icon: <Zap className="w-4 h-4" /> },
    { id: 'claude35sonnet', name: 'Claude 3.5 Sonnet', cost: '$$', speed: 'Normal', icon: <Brain className="w-4 h-4" /> },
];

const INITIAL_AGENTS = [
    {
        id: 'scout',
        name: 'Scout',
        role: 'Data Harvesting & Initial Triage',
        icon: <Zap className="w-5 h-5 text-blue-400" />,
        color: 'border-blue-500/30 bg-blue-500/10 text-blue-400',
        defaultModel: 'llama3'
    },
    {
        id: 'processor',
        name: 'Processor',
        role: 'Deep Analytical Processing',
        icon: <Cpu className="w-5 h-5 text-emerald-400" />,
        color: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-400',
        defaultModel: 'gpt4omin'
    },
    {
        id: 'watchdog',
        name: 'Watchdog',
        role: 'Real-time Compliance Checking',
        icon: <Shield className="w-5 h-5 text-amber-400" />,
        color: 'border-amber-500/30 bg-amber-500/10 text-amber-400',
        defaultModel: 'claude35sonnet'
    }
];

export default function ResourceMap() {
    // State to track the selected LLM for each agent
    const [agentModels, setAgentModels] = useState(() => {
        const initialState = {};
        INITIAL_AGENTS.forEach(agent => {
            initialState[agent.id] = agent.defaultModel;
        });
        return initialState;
    });

    const handleModelChange = (agentId, newModelId) => {
        setAgentModels(prev => ({
            ...prev,
            [agentId]: newModelId
        }));
    };

    return (
        <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 font-mono h-full flex flex-col">
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-zinc-100 font-semibold flex items-center gap-2 uppercase tracking-wide">
                    <Brain className="w-5 h-5 text-zinc-400" />
                    MCP Resource Allocation
                </h3>
                <span className="text-xs text-zinc-500 uppercase tracking-widest bg-zinc-950 px-2 py-1 rounded border border-zinc-800">
                    Live Mapping
                </span>
            </div>

            <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                {INITIAL_AGENTS.map((agent) => {
                    const currentModelId = agentModels[agent.id];
                    const selectedLLM = llmOptions.find(opt => opt.id === currentModelId);

                    return (
                        <div key={agent.id} className="bg-zinc-950 border border-zinc-800 rounded-lg p-4 group transition-colors hover:border-zinc-700">
                            <div className="flex items-center justify-between mb-3 border-b border-zinc-800 pb-3">
                                <div className="flex items-center gap-3">
                                    <div className={`p-2 rounded-lg border ${agent.color}`}>
                                        {agent.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-zinc-200 font-bold uppercase text-sm tracking-wide">{agent.name}</h4>
                                        <p className="text-zinc-500 text-xs mt-1">{agent.role}</p>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs text-zinc-500 mb-1">Target Engine</div>
                                    <div className="text-emerald-400 text-xs font-semibold uppercase flex items-center justify-end gap-1">
                                        <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
                                        Online
                                    </div>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-3 items-center">
                                <div className="col-span-2 sm:col-span-1">
                                    <label className="text-[10px] text-zinc-500 uppercase tracking-wider block mb-1">Intelligence Core</label>
                                    <div className="relative">
                                        <select
                                            value={currentModelId}
                                            onChange={(e) => handleModelChange(agent.id, e.target.value)}
                                            className="w-full bg-zinc-900 border border-zinc-700 text-zinc-300 text-sm rounded px-3 py-2 appearance-none focus:outline-none focus:border-zinc-500 transition-colors"
                                        >
                                            {llmOptions.map(opt => (
                                                <option key={opt.id} value={opt.id}>{opt.name}</option>
                                            ))}
                                        </select>
                                        <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-zinc-500">
                                            <RefreshCw className="w-4 h-4" />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-span-2 sm:col-span-1 flex gap-2 justify-end">
                                    {selectedLLM && (
                                        <>
                                            <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 flex flex-col justify-center items-center flex-1 sm:flex-none">
                                                <span className="text-[10px] text-zinc-500 uppercase">Cost</span>
                                                <span className={`${selectedLLM.cost === 'Free' ? 'text-emerald-500' : 'text-zinc-300'} text-xs font-bold`}>{selectedLLM.cost}</span>
                                            </div>
                                            <div className="bg-zinc-900 px-3 py-1.5 rounded border border-zinc-800 flex flex-col justify-center items-center flex-1 sm:flex-none">
                                                <span className="text-[10px] text-zinc-500 uppercase">Speed</span>
                                                <span className="text-zinc-300 text-xs font-bold">{selectedLLM.speed}</span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="mt-4 pt-4 border-t border-zinc-800 flex justify-between items-center text-xs text-zinc-500">
                <span>System Protocol: <span className="text-emerald-500 uppercase">Cost-Neutral Default</span></span>
                <button className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded transition-colors uppercase font-bold tracking-wide active:scale-95">
                    Commit Changes
                </button>
            </div>
        </div>
    );
}
