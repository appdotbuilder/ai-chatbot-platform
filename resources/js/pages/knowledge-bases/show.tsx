import React from 'react';
import { Link, router } from '@inertiajs/react';
import { Head } from '@inertiajs/react';
import AppLayout from '@/layouts/app-layout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { type BreadcrumbItem } from '@/types';

interface KnowledgeBaseShowProps {
    chatbot: {
        id: number;
        name: string;
        description: string;
    };
    knowledgeBase: {
        id: number;
        name: string;
        type: string;
        status: string;
        original_filename: string;
        content: string;
        metadata: Record<string, unknown>;
        created_at: string;
        updated_at: string;
    };
    [key: string]: unknown;
}

export default function KnowledgeBaseShow({ chatbot, knowledgeBase }: KnowledgeBaseShowProps) {
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
        {
            title: knowledgeBase.name,
            href: `/knowledge-bases/${knowledgeBase.id}`,
        },
    ];

    const handleDeleteKnowledgeBase = () => {
        if (confirm('Are you sure you want to delete this knowledge base? This action cannot be undone.')) {
            router.delete(route('knowledge-bases.destroy', knowledgeBase.id));
        }
    };

    const getTypeIcon = (type: string) => {
        switch (type) {
            case 'pdf': return '📄';
            case 'excel': return '📊';
            case 'text': return '📝';
            default: return '📄';
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'ready': return 'bg-green-100 text-green-800';
            case 'processing': return 'bg-yellow-100 text-yellow-800';
            case 'error': return 'bg-red-100 text-red-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={`📚 ${knowledgeBase.name}`} />
            
            <div className="flex h-full flex-1 flex-col gap-6 p-6">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                        <div className="w-16 h-16 bg-blue-100 rounded-xl flex items-center justify-center shadow-md">
                            <span className="text-3xl">{getTypeIcon(knowledgeBase.type)}</span>
                        </div>
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900">{knowledgeBase.name}</h1>
                            <p className="mt-1 text-gray-600">
                                Knowledge base for <strong>{chatbot.name}</strong>
                            </p>
                            <div className="flex items-center space-x-4 mt-3">
                                <Badge 
                                    className={getStatusColor(knowledgeBase.status)}
                                >
                                    {knowledgeBase.status === 'ready' ? '✅ Ready' :
                                     knowledgeBase.status === 'processing' ? '⏳ Processing' : '❌ Error'}
                                </Badge>
                                <span className="text-sm text-gray-500">
                                    Type: {knowledgeBase.type.toUpperCase()}
                                </span>
                                <span className="text-sm text-gray-500">
                                    Created {new Date(knowledgeBase.created_at).toLocaleDateString()}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex space-x-3">
                        <Button variant="outline" asChild>
                            <Link href={route('knowledge-bases.edit', knowledgeBase.id)}>
                                Edit
                            </Link>
                        </Button>
                        <Button 
                            variant="outline" 
                            onClick={handleDeleteKnowledgeBase}
                            className="text-red-600 hover:text-red-700 border-red-200 hover:border-red-300"
                        >
                            Delete
                        </Button>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* File Information */}
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <span className="mr-2">📋</span>
                                    File Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">File Name</label>
                                        <p className="text-lg font-mono bg-gray-50 p-2 rounded mt-1">
                                            {knowledgeBase.original_filename || 'No file uploaded'}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Type</label>
                                        <p className="text-lg bg-gray-50 p-2 rounded mt-1 capitalize">
                                            {knowledgeBase.type}
                                        </p>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Status</label>
                                        <div className="mt-1">
                                            <Badge className={getStatusColor(knowledgeBase.status)}>
                                                {knowledgeBase.status}
                                            </Badge>
                                        </div>
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium text-gray-700">Last Updated</label>
                                        <p className="text-lg bg-gray-50 p-2 rounded mt-1">
                                            {new Date(knowledgeBase.updated_at).toLocaleDateString()}
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Content Preview */}
                        {knowledgeBase.content && (
                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center">
                                        <span className="mr-2">📖</span>
                                        Content Preview
                                    </CardTitle>
                                    <CardDescription>
                                        First 1000 characters of the processed content
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="bg-gray-50 rounded-lg p-4 max-h-96 overflow-y-auto">
                                        <pre className="whitespace-pre-wrap text-sm text-gray-800">
                                            {knowledgeBase.content.length > 1000 
                                                ? knowledgeBase.content.substring(0, 1000) + '...'
                                                : knowledgeBase.content
                                            }
                                        </pre>
                                    </div>
                                    {knowledgeBase.content.length > 1000 && (
                                        <p className="text-sm text-gray-500 mt-2">
                                            Showing first 1000 characters of {knowledgeBase.content.length} total characters.
                                        </p>
                                    )}
                                </CardContent>
                            </Card>
                        )}
                    </div>

                    {/* Sidebar */}
                    <div className="space-y-6">
                        {/* Metadata */}
                        {knowledgeBase.metadata && Object.keys(knowledgeBase.metadata).length > 0 && (
                            <Card className="border-0 shadow-md">
                                <CardHeader>
                                    <CardTitle className="flex items-center text-lg">
                                        <span className="mr-2">📊</span>
                                        File Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-3">
                                        {Object.entries(knowledgeBase.metadata).map(([key, value]) => (
                                            <div key={key}>
                                                <label className="text-sm font-medium text-gray-700 capitalize">
                                                    {key.replace(/_/g, ' ')}
                                                </label>
                                                <p className="text-sm text-gray-900 bg-gray-50 p-2 rounded mt-1">
                                                    {typeof value === 'object' ? JSON.stringify(value) : String(value)}
                                                </p>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        )}

                        {/* Actions */}
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">⚡</span>
                                    Quick Actions
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="space-y-3">
                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <Link href={route('knowledge-bases.edit', knowledgeBase.id)}>
                                        ✏️ Edit Knowledge Base
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <Link href={route('chatbots.show', chatbot.id)}>
                                        🤖 Back to Chatbot
                                    </Link>
                                </Button>
                                <Button variant="outline" className="w-full justify-start" asChild>
                                    <Link href={route('chatbots.knowledge-bases.index', chatbot.id)}>
                                        📚 All Knowledge Bases
                                    </Link>
                                </Button>
                            </CardContent>
                        </Card>

                        {/* Status Information */}
                        <Card className="border-0 shadow-md">
                            <CardHeader>
                                <CardTitle className="flex items-center text-lg">
                                    <span className="mr-2">ℹ️</span>
                                    Status Information
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                {knowledgeBase.status === 'ready' && (
                                    <div className="p-3 bg-green-50 rounded-lg">
                                        <h4 className="font-semibold text-green-900">✅ Ready</h4>
                                        <p className="text-sm text-green-800 mt-1">
                                            This knowledge base is processed and ready to be used by your chatbot.
                                        </p>
                                    </div>
                                )}
                                {knowledgeBase.status === 'processing' && (
                                    <div className="p-3 bg-yellow-50 rounded-lg">
                                        <h4 className="font-semibold text-yellow-900">⏳ Processing</h4>
                                        <p className="text-sm text-yellow-800 mt-1">
                                            The content is being processed. This usually takes a few minutes.
                                        </p>
                                    </div>
                                )}
                                {knowledgeBase.status === 'error' && (
                                    <div className="p-3 bg-red-50 rounded-lg">
                                        <h4 className="font-semibold text-red-900">❌ Error</h4>
                                        <p className="text-sm text-red-800 mt-1">
                                            There was an error processing this knowledge base. Please try uploading again.
                                        </p>
                                    </div>
                                )}
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}