import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem, type PageProps } from '@/types';

interface DashboardProps extends PageProps {
    chatbots?: {
        data: Array<{
            id: number;
            name: string;
            description: string;
            status: string;
            knowledge_bases_count: number;
            conversations_count: number;
            created_at: string;
        }>;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ auth, chatbots }: DashboardProps) {
    const handleCreateChatbot = () => {
        router.get(route('chatbots.create'));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="🤖 AI Chatbot Dashboard" />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">🤖 AI Chatbot Dashboard</h1>
                        <p className="mt-2 text-gray-600">
                            Welcome back, {auth.user.name}! Manage your intelligent WhatsApp chatbots.
                        </p>
                    </div>
                    <Button onClick={handleCreateChatbot} size="lg">
                        Create New Bot 🚀
                    </Button>
                </div>

                {/* Quick Stats */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Bots</CardTitle>
                            <span className="text-2xl">🤖</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-blue-600">{chatbots?.data?.length || 0}</div>
                            <p className="text-xs text-gray-500 mt-1">
                                Active AI assistants
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Knowledge Bases</CardTitle>
                            <span className="text-2xl">📚</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-green-600">
                                {chatbots?.data?.reduce((sum, bot) => sum + bot.knowledge_bases_count, 0) || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Uploaded documents
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Conversations</CardTitle>
                            <span className="text-2xl">💬</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-purple-600">
                                {chatbots?.data?.reduce((sum, bot) => sum + bot.conversations_count, 0) || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Customer chats
                            </p>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Active Bots</CardTitle>
                            <span className="text-2xl">⚡</span>
                        </CardHeader>
                        <CardContent>
                            <div className="text-3xl font-bold text-orange-600">
                                {chatbots?.data?.filter(bot => bot.status === 'active').length || 0}
                            </div>
                            <p className="text-xs text-gray-500 mt-1">
                                Ready to serve
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Recent Chatbots */}
                <div>
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-gray-900">Your Chatbots</h2>
                        <Button variant="outline" asChild>
                            <Link href={route('chatbots.index')}>View All Bots</Link>
                        </Button>
                    </div>
                    
                    {!chatbots?.data?.length ? (
                        <Card className="text-center py-16 border-0 shadow-lg">
                            <CardContent>
                                <div className="text-8xl mb-6">🤖</div>
                                <CardTitle className="text-2xl mb-4">No chatbots yet</CardTitle>
                                <CardDescription className="text-lg mb-8 max-w-md mx-auto">
                                    Create your first AI chatbot to start automating customer conversations through WhatsApp.
                                </CardDescription>
                                <Button onClick={handleCreateChatbot} size="lg" className="px-8">
                                    Create Your First Bot 🚀
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <div className="grid gap-4">
                            {chatbots.data.slice(0, 3).map((chatbot) => (
                                <Card key={chatbot.id} className="border-0 shadow-md hover:shadow-lg transition-all duration-200">
                                    <CardContent className="flex items-center justify-between p-6">
                                        <div className="flex items-center space-x-4">
                                            <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                                                <span className="text-white text-2xl">🤖</span>
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-semibold text-gray-900">{chatbot.name}</h3>
                                                <p className="text-gray-600 mb-2">
                                                    {chatbot.description || 'No description provided'}
                                                </p>
                                                <div className="flex items-center space-x-4">
                                                    <Badge 
                                                        variant={chatbot.status === 'active' ? 'default' : 'secondary'}
                                                        className={chatbot.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                                    >
                                                        {chatbot.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                                                    </Badge>
                                                    <span className="text-sm text-gray-500 flex items-center">
                                                        📚 {chatbot.knowledge_bases_count} docs
                                                    </span>
                                                    <span className="text-sm text-gray-500 flex items-center">
                                                        💬 {chatbot.conversations_count} chats
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex space-x-3">
                                            <Button variant="outline" asChild>
                                                <Link href={route('chatbots.show', chatbot.id)}>
                                                    View Details
                                                </Link>
                                            </Button>
                                            <Button asChild>
                                                <Link href={route('chatbots.edit', chatbot.id)}>
                                                    Edit Bot
                                                </Link>
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>
                            ))}
                        </div>
                    )}
                </div>

                {/* Quick Actions */}
                <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <Card 
                            className="border-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group" 
                            onClick={handleCreateChatbot}
                        >
                            <CardHeader className="text-center">
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">🚀</div>
                                <CardTitle className="text-xl">Create New Bot</CardTitle>
                                <CardDescription className="text-base">
                                    Set up a new AI chatbot for your business and start serving customers instantly
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        
                        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group">
                            <CardHeader className="text-center">
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📚</div>
                                <CardTitle className="text-xl">Upload Documents</CardTitle>
                                <CardDescription className="text-base">
                                    Add PDF and Excel files to create smart knowledge bases for your bots
                                </CardDescription>
                            </CardHeader>
                        </Card>
                        
                        <Card className="border-0 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer group">
                            <CardHeader className="text-center">
                                <div className="text-6xl mb-4 group-hover:scale-110 transition-transform duration-200">📊</div>
                                <CardTitle className="text-xl">View Analytics</CardTitle>
                                <CardDescription className="text-base">
                                    Monitor conversations, performance metrics, and customer satisfaction
                                </CardDescription>
                            </CardHeader>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}