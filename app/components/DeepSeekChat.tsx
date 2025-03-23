'use client';

import { useState } from 'react';

interface Message {
    role: 'user' | 'assistant' | 'system';
    content: string;
}

export default function DeepSeekChat() {
    const [messages, setMessages] = useState<Message[]>([]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        setIsLoading(true);
        setError(null);

        const userMessage: Message = {
            role: 'user',
            content: input.trim()
        };

        try {
            const response = await fetch('/api/deepseek', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: [...messages, userMessage]
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate response');
            }

            const data = await response.json();
            
            setMessages(prev => [...prev, userMessage, {
                role: 'assistant',
                content: data.content
            }]);
            setInput('');
        } catch (err) {
            setError(err instanceof Error ? err.message : 'An error occurred');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-2xl mx-auto p-4">
            <div className="bg-gray-900 rounded-lg shadow-xl p-4 mb-4 border border-gray-800">
                <div className="space-y-4 h-[400px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                    {messages.map((message, index) => (
                        <div
                            key={index}
                            className={`p-3 rounded-lg ${
                                message.role === 'user'
                                    ? 'bg-blue-900 text-blue-100 ml-auto'
                                    : 'bg-gray-800 text-gray-100'
                            } max-w-[80%]`}
                        >
                            {message.content}
                        </div>
                    ))}
                    {isLoading && (
                        <div className="bg-gray-800 text-gray-100 p-3 rounded-lg max-w-[80%]">
                            Generating response...
                        </div>
                    )}
                </div>
            </div>

            {error && (
                <div className="text-red-400 mb-4">
                    {error}
                </div>
            )}

            <form onSubmit={handleSubmit} className="flex gap-2">
                <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                    className="flex-1 p-2 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-100 placeholder-gray-400"
                    disabled={isLoading}
                />
                <button
                    type="submit"
                    disabled={isLoading}
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-blue-800 disabled:cursor-not-allowed transition-colors"
                >
                    Send
                </button>
            </form>
        </div>
    );
} 