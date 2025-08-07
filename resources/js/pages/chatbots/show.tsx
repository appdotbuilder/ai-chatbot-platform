import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { type BreadcrumbItem } from '@/types';

interface ChatbotShowProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
        status: string;
        whatsapp_phone_number: string;
        whatsapp_access_token: string;
        whatsapp_webhook_verify_token: string;
        created_at: string;
        updated_at: string;
        knowledge_bases: Array<{
            id: number;
            name: string;
            type: string;
            status: string;
            original_filename: string;
            created_at: string;
        }>;
        conversations: Array<{
            id: number;
            whatsapp_phone_number: string;
            whatsapp_name: string;
            status: string;
            last_message_at: string;
            messages: Array<{
                id: number;
                type: string;
                content: string;
                created_at: string;
            }>;
        }>;
    };
    [key: string]: unknown;
}

export default function ChatbotShow({ chatbot }: ChatbotShowProps) {
    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: '/dashboard',
        },
        {
            title: 'Chatbots',
            href: '/chatbots',
        },
        {
            title: chatbot.name,
            href: `/chatbots/${chatbot.id}`,
        },
    ];

    const handleDeleteChatbot = () => {
        if (confirm('Are you sure you want to delete this chatbot? This action cannot be undone.')) {
            router.delete(route('chatbots.destroy', chatbot.id));
        }
    };

    const handleAddKnowledgeBase = () => {
        router.get(route('chatbots.knowledge-bases.create', chatbot.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`🤖 ${chatbot.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-white text-2xl">🤖</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{chatbot.name}</h1>
                            <p className="mt-1 text-gray-600">
                                {chatbot.description || 'No description provided'}
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                                <Badge 
                                    variant={chatbot.status === 'active' ? 'default' : 'secondary'}
                                    className={chatbot.status === 'active' ? 'bg-green-100 text-green-800' : ''}
                                >
                                    {chatbot.status === 'active' ? '🟢 Active' : '🔴 Inactive'}
                                </Badge>
                                {chatbot.whatsapp_phone_number && (
                                    <span className="text-sm text-gray-600 flex items-center">
                                        📱 {chatbot.whatsapp_phone_number}
                                    </span>
                                )}
                                <span className="text-sm text-gray-500">
                                    Created {new Date(chatbot.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Button variant="outline" asChild>
                            <Link href={route('chatbots.edit', chatbot.id)}>
                                Edit Bot
                            </Link>
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={handleDeleteChatbot}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                            Delete Bot
                        </Button>
                    </div>
                </div>

                {/* Stats Cards */}
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <Card className="border-0 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Knowledge Bases</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-blue-600">
                                    {chatbot.knowledge_bases?.length || 0}
                                </span>
                                <span className="text-2xl ml-2">📚</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Active Conversations</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-green-600">
                                    {chatbot.conversations?.filter(c => c.status === 'active').length || 0}
                                </span>
                                <span className="text-2xl ml-2">💬</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Total Messages</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-purple-600">
                                    {chatbot.conversations?.reduce((sum, conv) => sum + (conv.messages?.length || 0), 0) || 0}
                                </span>
                                <span className="text-2xl ml-2">📨</span>
                            </div>
                        </CardContent>
                    </Card>
                    
                    <Card className="border-0 shadow-md">
                        <CardHeader className="pb-2">
                            <CardTitle className="text-sm font-medium text-gray-600">Ready Files</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-center">
                                <span className="text-3xl font-bold text-orange-600">
                                    {chatbot.knowledge_bases?.filter(kb => kb.status === 'ready').length || 0}
                                </span>
                                <span className="text-2xl ml-2">✅</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>

                {/* Main Content Tabs */}
                <Tabs defaultValue="overview" className="flex-1">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="overview">📊 Overview</TabsTrigger>
                        <TabsTrigger value="knowledge">📚 Knowledge Base</TabsTrigger>
                        <TabsTrigger value="conversations">💬 Conversations</TabsTrigger>
                        <TabsTrigger value="settings">⚙️ Settings</TabsTrigger>
                    </TabsList>

                    <TabsContent value="overview" className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">📈</span>
                                        Bot Performance
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between items-center">
                                            <span>Status</span>
                                            <Badge variant={chatbot.status === 'active' ? 'default' : 'secondary'}>
                                                {chatbot.status}
                                            </Badge>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>Knowledge Sources</span>
                                            <span className="font-semibold">{chatbot.knowledge_bases?.length || 0}</span>
                                        </div>
                                        <div className="flex justify-between items-center">
                                            <span>WhatsApp Connected</span>
                                            <span className="font-semibold">
                                                {chatbot.whatsapp_phone_number ? '✅ Yes' : '❌ No'}
                                            </span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">🚀</span>
                                        Quick Actions
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <Button onClick={handleAddKnowledgeBase} className="w-full justify-start">
                                        📚 Add Knowledge Base
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start" asChild>
                                        <Link href={route('chatbots.edit', chatbot.id)}>
                                            ⚙️ Configure WhatsApp
                                        </Link>
                                    </Button>
                                    <Button variant="outline" className="w-full justify-start">
                                        🧪 Test Bot
                                    </Button>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    <TabsContent value="knowledge" className="space-y-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-xl font-semibold">Knowledge Base Files</h3>
                                <p className="text-gray-600">Upload and manage documents that train your AI</p>
                            </div>
                            <Button onClick={handleAddKnowledgeBase}>
                                📤 Upload Document
                            </Button>
                        </div>

                        {!chatbot.knowledge_bases?.length ? (
                            <Card className="text-center py-16 border-0 shadow-md">
                                <CardContent>
                                    <div className="text-6xl mb-4">📚</div>
                                    <CardTitle className="text-xl mb-2">No knowledge base files</CardTitle>
                                    <CardDescription className="mb-6">
                                        Upload PDF and Excel files to teach your chatbot about your business
                                    </CardDescription>
                                    <Button onClick={handleAddKnowledgeBase}>
                                        📤 Upload First Document
                                    </Button>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="grid gap-4">
                                {chatbot.knowledge_bases.map((kb) => (
                                    <Card key={kb.id} className="border-0 shadow-md">
                                        <CardContent className="flex items-center justify-between p-4">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                                                    <span className="text-2xl">
                                                        {kb.type === 'pdf' ? '📄' : 
                                                         kb.type === 'excel' ? '📊' : '📝'}
                                                    </span>
                                                </div>
                                                <div>
                                                    <h4 className="font-semibold">{kb.name}</h4>
                                                    <p className="text-sm text-gray-600">
                                                        {kb.original_filename || 'No filename'}
                                                    </p>
                                                    <div className="flex items-center space-x-2 mt-1">
                                                        <Badge 
                                                            variant={
                                                                kb.status === 'ready' ? 'default' : 
                                                                kb.status === 'processing' ? 'secondary' : 'destructive'
                                                            }
                                                        >
                                                            {kb.status === 'ready' ? '✅ Ready' :
                                                             kb.status === 'processing' ? '⏳ Processing' : '❌ Error'}
                                                        </Badge>
                                                        <span className="text-xs text-gray-500">
                                                            {new Date(kb.created_at).toLocaleDateString()}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                            <Button variant="outline" size="sm" asChild>
                                                <Link href={route('knowledge-bases.show', kb.id)}>
                                                    View
                                                </Link>
                                            </Button>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="conversations" className="space-y-6">
                        <div>
                            <h3 className="text-xl font-semibold mb-2">Recent Conversations</h3>
                            <p className="text-gray-600">Customer interactions with your chatbot</p>
                        </div>

                        {!chatbot.conversations?.length ? (
                            <Card className="text-center py-16 border-0 shadow-md">
                                <CardContent>
                                    <div className="text-6xl mb-4">💬</div>
                                    <CardTitle className="text-xl mb-2">No conversations yet</CardTitle>
                                    <CardDescription>
                                        Conversations will appear here when customers start chatting with your bot
                                    </CardDescription>
                                </CardContent>
                            </Card>
                        ) : (
                            <div className="space-y-4">
                                {chatbot.conversations.slice(0, 10).map((conversation) => (
                                    <Card key={conversation.id} className="border-0 shadow-md">
                                        <CardContent className="p-4">
                                            <div className="flex items-start justify-between">
                                                <div className="flex items-center space-x-3">
                                                    <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                        <span className="text-lg">👤</span>
                                                    </div>
                                                    <div>
                                                        <h4 className="font-semibold">
                                                            {conversation.whatsapp_name || 'Anonymous'}
                                                        </h4>
                                                        <p className="text-sm text-gray-600">
                                                            {conversation.whatsapp_phone_number}
                                                        </p>
                                                        <div className="flex items-center space-x-2 mt-1">
                                                            <Badge variant={conversation.status === 'active' ? 'default' : 'secondary'}>
                                                                {conversation.status}
                                                            </Badge>
                                                            <span className="text-xs text-gray-500">
                                                                {conversation.messages?.length || 0} messages
                                                            </span>
                                                            <span className="text-xs text-gray-500">
                                                                Last: {conversation.last_message_at ? 
                                                                    new Date(conversation.last_message_at).toLocaleDateString() : 
                                                                    'Never'
                                                                }
                                                            </span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <Button variant="outline" size="sm">
                                                    View Chat
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </TabsContent>

                    <TabsContent value="settings" className="space-y-6">
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📱</span>
                                    WhatsApp Configuration
                                </CardTitle>
                                <CardDescription>
                                    Connect your bot to WhatsApp Cloud API
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Phone Number</label>
                                        <p className="text-lg font-mono bg-gray-50 p-2 rounded mt-1">
                                            {chatbot.whatsapp_phone_number || 'Not configured'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Access Token</label>
                                        <p className="text-lg font-mono bg-gray-50 p-2 rounded mt-1">
                                            {chatbot.whatsapp_access_token ? '••••••••••••' : 'Not configured'}
                                        </p>
                                    </div>
                                </div>
                                <div className="pt-4">
                                    <Button asChild>
                                        <Link href={route('chatbots.edit', chatbot.id)}>
                                            ⚙️ Configure WhatsApp Settings
                                        </Link>
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>

                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-red-700">
                                    <span className="mr-2">⚠️</span>
                                    Danger Zone
                                </CardTitle>
                                <CardDescription>
                                    Irreversible and destructive actions
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Button 
                                    variant="outline" 
                                    onClick={handleDeleteChatbot}
                                    className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                                >
                                    🗑️ Delete This Chatbot
                                </Button>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </AppLayout>
    );
}