import React from 'react';
import { Head, Link } from '@inertiajs/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface Props {
    canLogin?: boolean;
    canRegister?: boolean;
    [key: string]: unknown;
}

export default function Welcome({ canLogin, canRegister }: Props) {
    return (
        <>
            <Head title="AI Chatbot Platform - Build Smart WhatsApp Bots" />
            
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
                {/* Navigation */}
                <nav className="flex justify-between items-center p-6">
                    <div className="flex items-center space-x-2">
                        <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                            <span className="text-white font-bold text-sm">🤖</span>
                        </div>
                        <span className="text-xl font-bold text-gray-900">ChatBot Pro</span>
                    </div>
                    
                    {(canLogin || canRegister) && (
                        <div className="space-x-4">
                            {canLogin && (
                                <Link
                                    href="/login"
                                    className="text-gray-600 hover:text-gray-900 font-medium"
                                >
                                    Log in
                                </Link>
                            )}
                            {canRegister && (
                                <Button asChild>
                                    <Link href="/register">Get Started</Link>
                                </Button>
                            )}
                        </div>
                    )}
                </nav>

                {/* Hero Section */}
                <div className="max-w-7xl mx-auto px-6 py-16">
                    <div className="text-center mb-16">
                        <Badge className="mb-6 bg-blue-100 text-blue-800 hover:bg-blue-200">
                            🚀 AI-Powered WhatsApp Integration
                        </Badge>
                        <h1 className="text-5xl font-bold text-gray-900 mb-6">
                            Build Intelligent 
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                                {' '}ChatBots{' '}
                            </span>
                            for Your Business
                        </h1>
                        <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-10">
                            Create AI-powered chatbots that understand your business documents and engage customers 
                            through WhatsApp. Upload PDFs and Excel files to build smart knowledge bases.
                        </p>
                        <div className="flex justify-center gap-4">
                            {canRegister && (
                                <Button size="lg" asChild className="px-8 py-3">
                                    <Link href="/register">Start Building Free 🚀</Link>
                                </Button>
                            )}
                            {canLogin && (
                                <Button variant="outline" size="lg" asChild className="px-8 py-3">
                                    <Link href="/login">Sign In</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Features Grid */}
                    <div className="grid md:grid-cols-3 gap-8 mb-16">
                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">📚</span>
                                </div>
                                <CardTitle>Smart Knowledge Base</CardTitle>
                                <CardDescription>
                                    Upload PDF and Excel files to create intelligent knowledge bases. 
                                    Your chatbot learns from your documents automatically.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">PDF Support</Badge>
                                    <Badge variant="secondary">Excel/CSV</Badge>
                                    <Badge variant="secondary">Auto Processing</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">💬</span>
                                </div>
                                <CardTitle>WhatsApp Integration</CardTitle>
                                <CardDescription>
                                    Connect directly to WhatsApp Cloud API. Your customers can chat with 
                                    your AI assistant through their favorite messaging app.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">WhatsApp API</Badge>
                                    <Badge variant="secondary">Real-time</Badge>
                                    <Badge variant="secondary">Multi-user</Badge>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                            <CardHeader>
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                                    <span className="text-2xl">⚡</span>
                                </div>
                                <CardTitle>Easy Management</CardTitle>
                                <CardDescription>
                                    Intuitive dashboard to create, configure, and monitor your chatbots. 
                                    Track conversations and update knowledge bases with ease.
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="flex flex-wrap gap-2">
                                    <Badge variant="secondary">Dashboard</Badge>
                                    <Badge variant="secondary">Analytics</Badge>
                                    <Badge variant="secondary">Multi-bot</Badge>
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* How It Works */}
                    <div className="text-center mb-16">
                        <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
                        <p className="text-gray-600 mb-12">Get your AI chatbot running in 3 simple steps</p>
                        
                        <div className="grid md:grid-cols-3 gap-8">
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                    1
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Create Your Bot</h3>
                                <p className="text-gray-600 text-center">
                                    Sign up and create your first chatbot. Give it a name and description.
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                    2
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Upload Knowledge</h3>
                                <p className="text-gray-600 text-center">
                                    Upload your PDF documents and Excel files. The AI will process and learn from them.
                                </p>
                            </div>
                            
                            <div className="flex flex-col items-center">
                                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold text-xl mb-4">
                                    3
                                </div>
                                <h3 className="text-xl font-semibold mb-2">Connect WhatsApp</h3>
                                <p className="text-gray-600 text-center">
                                    Configure your WhatsApp credentials and start receiving customer inquiries.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* CTA Section */}
                    <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
                        <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Customer Service?</h2>
                        <p className="text-xl mb-8 opacity-90">
                            Join thousands of businesses using AI chatbots to provide 24/7 customer support
                        </p>
                        <div className="flex justify-center gap-4">
                            {canRegister && (
                                <Button size="lg" variant="secondary" asChild className="px-8 py-3">
                                    <Link href="/register">Start Your Free Trial 🎉</Link>
                                </Button>
                            )}
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
                        <div>
                            <div className="text-3xl font-bold text-blue-600 mb-2">99.9%</div>
                            <div className="text-gray-600">Uptime</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-green-600 mb-2">24/7</div>
                            <div className="text-gray-600">Support</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-purple-600 mb-2">10MB</div>
                            <div className="text-gray-600">File Limit</div>
                        </div>
                        <div>
                            <div className="text-3xl font-bold text-orange-600 mb-2">∞</div>
                            <div className="text-gray-600">Conversations</div>
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <footer className="border-t bg-gray-50 py-8">
                    <div className="max-w-7xl mx-auto px-6 text-center text-gray-600">
                        <p>&copy; 2024 ChatBot Pro. Built with Laravel & React. Ready to serve your customers.</p>
                    </div>
                </footer>
            </div>
        </>
    );
}