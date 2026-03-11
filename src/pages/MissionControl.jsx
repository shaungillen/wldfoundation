import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import ResourceMap from '../components/ResourceMap';
import {
    Terminal,
    Activity,
    Database,
    LayoutDashboard,
    Settings,
    Search,
    Plus,
    ArrowRight,
    ClipboardList,
    Mic,
    Send,
    Radar,
    Shield,
    Cpu,
    Link as LinkIcon
} from 'lucide-react';

const MissionControl = () => {
    const [command, setCommand] = useState('');
    const [isListening, setIsListening] = useState(false);

    // Agent States
    const [agents, setAgents] = useState({
        scout: false,
        watchdog: false,
        processor: false
    });

    const recognitionRef = useRef(null);

    useEffect(() => {
        // Initialize Web Speech API if supported
        const SpeechRecognition = window.SpeechRecognition || window['webkitSpeechRecognition'];
        if (SpeechRecognition) {
            recognitionRef.current = new SpeechRecognition();
            recognitionRef.current.continuous = true;
            recognitionRef.current.interimResults = true;

            recognitionRef.current.onstart = () => setIsListening(true);

            recognitionRef.current.onresult = (event) => {
                let finalTranscript = '';
                for (let i = event.resultIndex; i < event.results.length; ++i) {
                    if (event.results[i].isFinal) {
                        finalTranscript += event.results[i][0].transcript;
                    }
                }
                if (finalTranscript) {
                    setCommand((prev) => prev + finalTranscript + ' ');
                }
            };

            recognitionRef.current.onerror = (event) => {
                console.error("Speech recognition error", event.error);
                setIsListening(false);
            };

            recognitionRef.current.onend = () => setIsListening(false);
        }

        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.stop();
            }
        };
    }, []);

    const [ledgerEntries, setLedgerEntries] = useState([
        {
            txId: "OP-SCOUT-01",
            operation: "Scraped 25 Grant Deadlines",
            source: 'Filter: "NY State Artists"',
            cost: "~1,250 🪙",
            context: "mcp_web_search",
            color: "blue"
        }
    ]);

    const toggleListening = () => {
        if (isListening) {
            recognitionRef.current?.stop();
        } else {
            recognitionRef.current?.start();
        }
    };

    const toggleAgent = (agent) => {
        setAgents(prev => ({ ...prev, [agent]: !prev[agent] }));

        // If we are activating the processor, run the report processing script
        if (agent === 'processor' && !agents.processor) {
            runProcessorScript();
        }

        // If we are activating the scout, run the web scraper
        if (agent === 'scout' && !agents.scout) {
            runScoutScript();
        }
    };

    const runProcessorScript = async () => {
        // Add a temporary "processing" entry
        const tempId = "PR-CORE-" + Math.floor(Math.random() * 100);
        setLedgerEntries(prev => [{
            txId: tempId,
            operation: "Parsing Callicoon Intelligence Dossier...",
            source: "Destination: Local LLM Brain (Llama 3)",
            cost: "...",
            context: "mcp:bridge_api",
            color: "emerald"
        }, ...prev]);

        try {
            const res = await fetch("http://localhost:5001/api/run/process-report", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ report_name: "callicoon_intelligence_dossier.md" })
            });
            const data = await res.json();

            if (data.success && data.tasks) {
                // Remove the temp entry and add the real tasks
                setLedgerEntries(prev => prev.filter(e => e.txId !== tempId));

                const newEntries = data.tasks.map(task => ({
                    txId: task.task_id || `PR-CORE-${Math.floor(Math.random() * 100)}`,
                    operation: task.description,
                    source: `Agent: ${task.agent}`,
                    cost: `~${task.estimated_tokens || 100} 🪙`,
                    context: "mcp:exec_task",
                    color: "emerald"
                }));

                setLedgerEntries(prev => [...newEntries, ...prev]);
            }
        } catch (error) {
            console.error("Failed to run processor", error);
        }
    };

    const runScoutScript = async () => {
        // Add a temporary "scraping" entry
        const tempId = "SC-SCAN-" + Math.floor(Math.random() * 100);
        setLedgerEntries(prev => [{
            txId: tempId,
            operation: "Initializing Web Scraper Library (Selenium)...",
            source: "Target: wldfoundation.org",
            cost: "...",
            context: "mcp:bridge_api",
            color: "blue"
        }, ...prev]);

        try {
            const res = await fetch("http://localhost:5001/api/run/scraper", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url: "https://example.com" })
            });
            const data = await res.json();

            if (data.status === 'success' && data.tasks) {
                // Remove the temp entry and add the real tasks
                setLedgerEntries(prev => prev.filter(e => e.txId !== tempId));

                const newEntries = data.tasks.map(task => ({
                    txId: task.task_id || `SC-SCAN-${Math.floor(Math.random() * 100)}`,
                    operation: task.description,
                    source: `Agent: ${task.agent}`,
                    cost: `~${task.estimated_tokens || 100} 🪙`,
                    context: "mcp:web_scrape",
                    color: "blue"
                }));

                setLedgerEntries(prev => [...newEntries, ...prev]);
            }
        } catch (error) {
            console.error("Failed to run scout scraper", error);
        }
    };

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex overflow-hidden font-mono text-zinc-300">
            {/* Floating Connection Nodes System (Industrial Sidebar) */}
            <aside className="w-20 border-r border-zinc-800 bg-zinc-950 flex flex-col items-center py-6 shadow-[4px_0_24px_rgba(0,0,0,0.5)] z-10 relative">
                <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center mb-8 shadow-lg shadow-blue-900/50">
                    <Terminal className="w-5 h-5 text-white" />
                </div>

                <nav className="flex flex-col gap-6 flex-1 w-full px-4 relative">
                    {/* Scout Node */}
                    <div className="relative group">
                        <button
                            onClick={() => toggleAgent('scout')}
                            className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border ${agents.scout ? 'bg-blue-900/20 border-blue-500/50 text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.3)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}`}
                        >
                            <Radar className={`w-5 h-5 ${agents.scout ? 'animate-pulse' : ''}`} />
                        </button>
                        <div className="hidden group-hover:block absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap z-50 pointer-events-none before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-zinc-800">
                            <strong>[Scout]</strong> OpenClaw Scraping
                        </div>
                    </div>

                    {/* Watchdog Node */}
                    <div className="relative group">
                        <button
                            onClick={() => toggleAgent('watchdog')}
                            className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border ${agents.watchdog ? 'bg-amber-900/20 border-amber-500/50 text-amber-400 shadow-[0_0_15px_rgba(245,158,11,0.3)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}`}
                        >
                            <Shield className={`w-5 h-5 ${agents.watchdog ? 'animate-pulse' : ''}`} />
                        </button>
                        <div className="hidden group-hover:block absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap z-50 pointer-events-none before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-zinc-800">
                            <strong>[Watchdog]</strong> Real-time Compliance Check
                        </div>
                    </div>

                    {/* Processor Node */}
                    <div className="relative group">
                        <button
                            onClick={() => toggleAgent('processor')}
                            className={`w-full aspect-square rounded-xl flex items-center justify-center transition-all duration-300 border ${agents.processor ? 'bg-emerald-900/20 border-emerald-500/50 text-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]' : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:text-zinc-300 hover:border-zinc-700'}`}
                        >
                            <Cpu className={`w-5 h-5 ${agents.processor ? 'animate-pulse' : ''}`} />
                        </button>
                        <div className="hidden group-hover:block absolute left-full ml-4 top-1/2 -translate-y-1/2 bg-zinc-800 text-white text-xs px-3 py-1.5 rounded-md whitespace-nowrap z-50 pointer-events-none before:absolute before:right-full before:top-1/2 before:-translate-y-1/2 before:border-4 before:border-transparent before:border-r-zinc-800">
                            <strong>[Processor]</strong> Data Operations
                        </div>
                    </div>

                    {/* Vertical connecting line decorative */}
                    <div className="absolute left-1/2 top-4 bottom-4 w-px bg-zinc-800 -z-10" />
                </nav>

                <div className="mt-auto pt-4 flex flex-col gap-4 items-center">
                    <button className="w-10 h-10 flex items-center justify-center text-zinc-500 hover:text-zinc-300">
                        <Settings className="w-5 h-5" />
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 overflow-y-auto p-8 space-y-8 bg-zinc-950/50">
                <header className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold flex items-center gap-2 text-zinc-100">
                            Antigravity Cockpit
                        </h1>
                        <p className="text-zinc-500 text-sm mt-1">Status: Floating Nodes Online · Resources Allocated</p>
                    </div>

                    <div className="flex gap-2">
                        <button className="p-2 border border-zinc-800 rounded-md hover:bg-zinc-900">
                            <Search className="w-5 h-5" />
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 text-sm">
                            <Plus className="w-4 h-4" /> Run New Script
                        </button>
                    </div>
                </header>

                <section className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <Card className="bg-zinc-900/80 border-zinc-800 p-0 overflow-hidden backdrop-blur-md">
                        <CardContent className="p-6 flex flex-col gap-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest">OpenClaw Capacity</span>
                            <div className="text-3xl font-bold font-mono">247/250</div>
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                                <div className="bg-blue-500 h-full w-[98%]" />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900/80 border-zinc-800 p-0 overflow-hidden backdrop-blur-md">
                        <CardContent className="p-6 flex flex-col gap-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest">Active Bridges</span>
                            <div className="text-3xl font-bold font-mono">03</div>
                            <div className="flex gap-1">
                                <span className={`w-2 h-2 rounded-full ${agents.scout ? 'bg-blue-500 animate-pulse' : 'bg-zinc-700'}`} />
                                <span className={`w-2 h-2 rounded-full ${agents.watchdog ? 'bg-amber-500 animate-pulse' : 'bg-zinc-700'}`} />
                                <span className={`w-2 h-2 rounded-full ${agents.processor ? 'bg-emerald-500 animate-pulse' : 'bg-zinc-700'}`} />
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="bg-zinc-900 border-zinc-800 p-0 overflow-hidden">
                        <CardContent className="p-6 flex flex-col gap-2">
                            <span className="text-xs text-zinc-500 uppercase tracking-widest">Recent Success Rate</span>
                            <div className="text-3xl font-bold font-mono text-green-500">100%</div>
                            <span className="text-xs text-zinc-600">No errors detected in last 24h</span>
                        </CardContent>
                    </Card>
                </section>

                {/* Mid Section: Gemini 4 & Resource Allocation Map */}
                <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Gemini 4 Command Interface */}
                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6 relative overflow-hidden flex flex-col h-full">
                        {/* Decorative subtle background gradient */}
                        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/10 to-purple-900/10 pointer-events-none" />

                        <div className="flex items-center gap-3 mb-4 relative">
                            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center shadow-[0_0_15px_rgba(37,99,235,0.5)]">
                                <Terminal className="w-4 h-4 text-white" />
                            </div>
                            <div>
                                <h2 className="text-sm font-bold text-zinc-100 flex items-center gap-2">
                                    Gemini 4 Manager
                                    {isListening && (
                                        <span className="flex h-2 w-2 relative">
                                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                                            <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                                        </span>
                                    )}
                                </h2>
                                <p className="text-xs text-zinc-500">Speech-to-Text Controller active. Awaiting input...</p>
                            </div>
                        </div>

                        <div className="relative flex-1 flex flex-col">
                            <textarea
                                value={command}
                                onChange={(e) => setCommand(e.target.value)}
                                placeholder="Dictate commands here (Apple Dictation shortcut: Fn twice) or use the mic button..."
                                className="w-full flex-1 bg-zinc-950 border border-zinc-800 rounded-lg p-4 pr-32 text-sm text-zinc-300 placeholder:text-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 resize-none min-h-[120px] shadow-inner"
                            />
                            <div className="absolute bottom-4 right-4 flex gap-2">
                                <button
                                    onClick={toggleListening}
                                    className={`p-2 rounded-md transition-all duration-300 ${isListening ? 'bg-red-500/20 text-red-500 hover:bg-red-500/30 shadow-[0_0_10px_rgba(239,68,68,0.3)]' : 'bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-zinc-300'}`}
                                    title="Browser Speech-to-Text"
                                >
                                    <Mic className={`w-4 h-4 ${isListening ? 'animate-pulse' : ''}`} />
                                </button>
                                <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md font-bold flex items-center gap-2 text-sm transition-colors shadow-lg">
                                    <Send className="w-4 h-4" /> Transmit
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Resource Allocation Map */}
                    <div className="h-full">
                        <ResourceMap />
                    </div>
                </section>

                {/* The Agent Audit Ledger */}
                <section className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden shadow-2xl">
                    <div className="p-5 border-b border-zinc-800 bg-zinc-950/50 flex justify-between items-center">
                        <div>
                            <h2 className="text-[11px] font-bold uppercase tracking-widest text-zinc-400">Agent Ledger</h2>
                            <p className="text-xs text-zinc-600 mt-1">Audit trail tracking all Scout & Processor Handshakes</p>
                        </div>
                        <button className="text-xs text-blue-500 font-bold flex items-center gap-1 hover:text-blue-400 transition-colors uppercase tracking-wider">
                            Full Audit <ArrowRight className="w-3 h-3" />
                        </button>
                    </div>

                    <table className="w-full text-left text-sm border-collapse">
                        <thead>
                            <tr className="border-b border-zinc-800 text-zinc-500 uppercase text-[10px] tracking-widest bg-zinc-950">
                                <th className="px-6 py-3 font-semibold">Agent ID</th>
                                <th className="px-6 py-3 font-semibold">Action Taken</th>
                                <th className="px-6 py-3 font-semibold text-right">Token Cost</th>
                                <th className="px-6 py-3 font-semibold">Context Link</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-zinc-800/50">
                            {ledgerEntries.map((entry, index) => (
                                <tr key={index} className="hover:bg-zinc-800/40 transition-colors group">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className={`w-2 h-2 rounded-full bg-${entry.color || 'blue'}-500 ${entry.cost === '...' ? 'animate-pulse' : ''}`} />
                                            <span className="font-mono text-zinc-300 font-bold">{entry.txId}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="text-sm font-semibold text-zinc-200">{entry.operation}</div>
                                        <div className="text-[11px] text-zinc-500">{entry.source}</div>
                                    </td>
                                    <td className="px-6 py-4 text-right">
                                        <span className={`font-mono text-xs text-${entry.color || 'blue'}-400 bg-${entry.color || 'blue'}-400/10 px-2 py-1 rounded inline-block`}>
                                            {entry.cost}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button className="flex items-center gap-1 text-xs text-zinc-400 hover:text-blue-400 transition-colors group-hover:bg-zinc-800 px-3 py-1.5 rounded-full border border-zinc-800 hover:border-blue-500/50">
                                            <LinkIcon className="w-3 h-3" /> {entry.context}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </main>
        </div>
    );
};

export default MissionControl;
