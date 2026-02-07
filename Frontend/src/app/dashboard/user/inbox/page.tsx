"use client";

import React, { useState } from "react";
import Header from "@/app/components/layout/Header";
import { Search, MessageSquare, User, Clock, Check, Send, ShieldCheck, ArrowLeft, MoreVertical, Filter } from "lucide-react";
import Link from "next/link";
import Button from "@/app/components/ui/Button";

interface Message {
    id: string;
    sender: string;
    text: string;
    time: string;
    isMe: boolean;
}

interface Thread {
    id: string;
    senderName: string;
    lastMessage: string;
    time: string;
    unread: number;
    avatar: string;
    caseName: string;
}

const initialThreads: Thread[] = [
    {
        id: "1",
        senderName: "Anonymous Helper",
        lastMessage: "I saw someone similar at the supermarket near Piazza...",
        time: "2m ago",
        unread: 1,
        avatar: "AH",
        caseName: "Abebe Kebede"
    },
    {
        id: "2",
        senderName: "Tinsae G.",
        lastMessage: "Checking the hospitals in Bole now. Will update.",
        time: "1h ago",
        unread: 0,
        avatar: "TG",
        caseName: "Abebe Kebede"
    },
    {
        id: "3",
        senderName: "Birtukan Z.",
        lastMessage: "Is there any reward offered for information?",
        time: "5h ago",
        unread: 0,
        avatar: "BZ",
        caseName: "Sarah M."
    }
];

const initialMessages: Record<string, Message[]> = {
    "1": [
        { id: "m1", sender: "Anonymous Helper", text: "Hello, I saw someone matching the description of your case near the Piazza supermarket.", time: "10:20 AM", isMe: false },
        { id: "m2", sender: "Me", text: "Thank you for reaching out! Did you notice what they were wearing specifically?", time: "10:25 AM", isMe: true },
        { id: "m3", sender: "Anonymous Helper", text: "I saw someone similar at the supermarket near Piazza. They had a blue jacket just like you described.", time: "10:30 AM", isMe: false }
    ],
    "2": [
        { id: "m1", sender: "Me", text: "Any news from the Bole side?", time: "Yesterday", isMe: true },
        { id: "m2", sender: "Tinsae G.", text: "Checking the hospitals in Bole now. Will update.", time: "1h ago", isMe: false }
    ],
    "3": [
        { id: "m1", sender: "Birtukan Z.", text: "Is there any reward offered for information?", time: "5h ago", isMe: false }
    ]
};

export default function InboxPage() {
    const [selectedThreadId, setSelectedThreadId] = useState("1");
    const [newMessage, setNewMessage] = useState("");
    const [threads, setThreads] = useState(initialThreads);
    const [messages, setMessages] = useState(initialMessages);

    const activeThread = threads.find(t => t.id === selectedThreadId);
    const threadMessages = messages[selectedThreadId] || [];

    const handleSendMessage = () => {
        if (!newMessage.trim()) return;

        const msg: Message = {
            id: Date.now().toString(),
            sender: "Me",
            text: newMessage,
            time: "Just now",
            isMe: true
        };

        setMessages(prev => ({
            ...prev,
            [selectedThreadId]: [...(prev[selectedThreadId] || []), msg]
        }));
        setNewMessage("");
    };

    return (
        <div className="h-screen bg-dark flex flex-col overflow-hidden text-white font-sans">
            <Header />

            <main className="flex-grow pt-24 pb-6 px-6 max-w-7xl mx-auto w-full flex gap-6 overflow-hidden">
                {/* THREADS LIST (Left Sidebar) */}
                <div className="w-full md:w-80 flex flex-col bg-dark-light/50 border border-white/5 rounded-3xl overflow-hidden shrink-0">
                    <div className="p-6 border-b border-white/5">
                        <div className="flex items-center justify-between mb-6">
                            <h1 className="text-xl font-bold flex items-center gap-2">
                                <MessageSquare className="text-secondary" /> Inbox
                            </h1>
                            <Button variant="ghost" className="p-2"><Filter size={18} className="text-gray-500" /></Button>
                        </div>
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
                            <input
                                placeholder="Search messages..."
                                className="w-full bg-dark border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-sm outline-none focus:border-secondary transition-all"
                            />
                        </div>
                    </div>

                    <div className="flex-grow overflow-y-auto p-4 space-y-2">
                        {threads.map(thread => (
                            <button
                                key={thread.id}
                                onClick={() => setSelectedThreadId(thread.id)}
                                className={`w-full text-left p-4 rounded-2xl transition-all flex gap-3 relative group ${selectedThreadId === thread.id
                                        ? "bg-secondary text-white"
                                        : "hover:bg-white/5"
                                    }`}
                            >
                                <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg shrink-0 border ${selectedThreadId === thread.id ? "bg-white/20 border-white/30" : "bg-secondary/10 border-secondary/20 text-secondary"
                                    }`}>
                                    {thread.avatar}
                                </div>
                                <div className="min-w-0 pr-6">
                                    <div className="flex justify-between items-center mb-1">
                                        <h3 className="font-bold truncate">{thread.senderName}</h3>
                                        <span className={`text-[10px] ${selectedThreadId === thread.id ? "text-white/70" : "text-gray-500"}`}>{thread.time}</span>
                                    </div>
                                    <p className={`text-xs truncate ${selectedThreadId === thread.id ? "text-white/80" : "text-gray-400"}`}>
                                        {thread.lastMessage}
                                    </p>
                                    <div className="mt-1.5 flex items-center gap-1.5">
                                        <span className={`text-[9px] px-2 py-0.5 rounded-full border ${selectedThreadId === thread.id ? "bg-white/10 border-white/20 text-white" : "bg-dark/50 border-white/5 text-gray-500"
                                            }`}>
                                            Case: {thread.caseName}
                                        </span>
                                    </div>
                                </div>
                                {thread.unread > 0 && selectedThreadId !== thread.id && (
                                    <div className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 bg-danger rounded-full flex items-center justify-center text-[10px] font-bold">
                                        {thread.unread}
                                    </div>
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* ACTIVE CONVERSATION (Right Side) */}
                <div className="hidden md:flex flex-col flex-grow bg-dark-light/50 border border-white/5 rounded-3xl overflow-hidden relative">
                    {/* Chat Header */}
                    <div className="p-6 border-b border-white/5 flex items-center justify-between bg-dark-light/30 backdrop-blur-md">
                        <div className="flex items-center gap-4">
                            <div className="w-10 h-10 bg-secondary/10 border border-secondary/20 rounded-full flex items-center justify-center text-secondary font-bold">
                                {activeThread?.avatar}
                            </div>
                            <div>
                                <h2 className="font-bold">{activeThread?.senderName}</h2>
                                <div className="flex items-center gap-1.5 text-[10px] text-gray-500">
                                    <Clock size={10} /> {activeThread?.time} • Re: {activeThread?.caseName}
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4">
                            <div className="flex items-center gap-2 bg-success/10 border border-success/20 px-3 py-1 rounded-lg">
                                <ShieldCheck size={14} className="text-success" />
                                <span className="text-[10px] font-bold text-success uppercase">Encrypted</span>
                            </div>
                            <Button variant="ghost" className="p-2"><MoreVertical size={18} className="text-gray-500" /></Button>
                        </div>
                    </div>

                    {/* Messages Area */}
                    <div className="flex-grow overflow-y-auto p-8 space-y-6 flex flex-col">
                        <div className="self-center bg-white/5 text-[10px] text-gray-500 px-4 py-1.5 rounded-full mb-4 uppercase tracking-widest font-bold">
                            End-to-End Encrypted Secure Connection
                        </div>

                        {threadMessages.map(msg => (
                            <div key={msg.id} className={`max-w-[80%] flex flex-col ${msg.isMe ? "self-end items-end" : "self-start items-start"}`}>
                                <div className={`px-5 py-3.5 rounded-2xl shadow-sm text-sm ${msg.isMe
                                        ? "bg-secondary text-white rounded-tr-none"
                                        : "bg-dark border border-white/5 text-gray-200 rounded-tl-none"
                                    }`}>
                                    {msg.text}
                                </div>
                                <div className="flex items-center gap-1.5 mt-1.5 px-1">
                                    <span className="text-[10px] text-gray-500">{msg.time}</span>
                                    {msg.isMe && <Check size={12} className="text-secondary" />}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Chat Input */}
                    <div className="p-6 bg-dark-light/30 border-t border-white/5">
                        <div className="flex gap-4 items-center">
                            <div className="flex-grow relative">
                                <input
                                    value={newMessage}
                                    onChange={(e) => setNewMessage(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                                    placeholder="Type your secure response..."
                                    className="w-full bg-dark border border-white/10 rounded-2xl px-6 py-4 outline-none focus:border-secondary transition-all pr-12 text-sm shadow-inner"
                                />
                                <button
                                    onClick={handleSendMessage}
                                    className="absolute right-4 top-1/2 -translate-y-1/2 text-secondary hover:scale-110 transition-transform"
                                >
                                    <Send size={20} />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* MOBILE FALLBACK (Placeholder if thread not selected or split view not possible) */}
                <div className="md:hidden flex-grow flex items-center justify-center p-8 text-center bg-dark-light/50 border border-white/5 rounded-3xl">
                    <p className="text-gray-500">Select a conversation from the list to view messages.</p>
                </div>
            </main>
        </div>
    );
}
