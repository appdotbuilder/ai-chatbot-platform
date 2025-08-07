import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';

interface KnowledgeBasesIndexProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
    };
    knowledgeBases: {
        data: Array<{
            id: number;
            name: string;
            type: string;
            status: string;
            original_filename: string;
            created_at: string;
        }>;
    };
    [key: string]: unknown;
}

export default function KnowledgeBasesIndex({ chatbot, knowledgeBases }: KnowledgeBasesIndexProps) {
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
        {
            title: 'Knowledge Bases',
            href: `/chatbots/${chatbot.id}/knowledge-bases`,
        },
    ];

    const handleCreateKnowledgeBase = () => {
        router.get(route('chatbots.knowledge-bases.create', chatbot.id));
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`📚 ${chatbot.name} - Knowledge Bases`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">📚 Knowledge Bases</h1>
                        <p className="mt-2 text-gray-600">
                            Manage documents and knowledge for <strong>{chatbot.name}</strong>
                        </p>
                    </div>
                    <Button onClick={handleCreateKnowledgeBase} size="lg">
                        📤 Upload Document
                    </Button>
                </div>

                {/* Knowledge Bases List */}
                {!knowledgeBases.data.length ? (
                    <Card className="text-center py-16 border-0 shadow-lg">
                        <CardContent>
                            <div className="text-8xl mb-6">📚</div>
                            <CardTitle className="text-2xl mb-4">No knowledge base files</CardTitle>
                            <CardDescription className="text-lg mb-8 max-w-md mx-auto">
                                Upload PDF and Excel files to teach your chatbot about your business
                            </CardDescription>
                            <Button onClick={handleCreateKnowledgeBase} size="lg">
                                📤 Upload First Document
                            </Button>
                        </CardContent>
                    </Card>
                ) : (
                    <div className="grid gap-4">
                        {knowledgeBases.data.map((kb) => (
                            <Card key={kb.id} className="border-0 shadow-md hover:shadow-lg transition-shadow">
                                <CardContent className="flex items-center justify-between p-6">
                                    <div className="flex items-center space-x-4">
                                        <div className="w-14 h-14 bg-blue-100 rounded-xl flex items-center justify-center">
                                            <span className="text-3xl">
                                                {kb.type === 'pdf' ? '📄' : 
                                                 kb.type === 'excel' ? '📊' : '📝'}
                                            </span>
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold text-gray-900">{kb.name}</h3>
                                            <p className="text-gray-600 mb-2">
                                                {kb.original_filename || 'No filename'}
                                            </p>
                                            <div className="flex items-center space-x-4">
                                                <Badge 
                                                    variant={
                                                        kb.status === 'ready' ? 'default' : 
                                                        kb.status === 'processing' ? 'secondary' : 'destructive'
                                                    }
                                                    className={
                                                        kb.status === 'ready' ? 'bg-green-100 text-green-800' :
                                                        kb.status === 'processing' ? 'bg-yellow-100 text-yellow-800' :
                                                        'bg-red-100 text-red-800'
                                                    }
                                                >
                                                    {kb.status === 'ready' ? '✅ Ready' :
                                                     kb.status === 'processing' ? '⏳ Processing' : '❌ Error'}
                                                </Badge>
                                                <span className="text-sm text-gray-500">
                                                    {new Date(kb.created_at).toLocaleDateString()}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex space-x-2">
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('knowledge-bases.show', kb.id)}>
                                                View Details
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link href={route('knowledge-bases.edit', kb.id)}>
                                                Edit
                                            </Link>
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}
            </div>
        </AppLayout>
    );
}