import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, MessageCircle, MapPin, Send } from 'lucide-react';
import { useLanguage } from '../contexts/LanguageContext';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { mockCommunityPosts } from '../data/mockData';
import { getRelativeTime, generateId } from '../utils/helpers';
import type { CommunityPost, Comment } from '../types';

export default function CommunityPage() {
    const { t, language } = useLanguage();
    const [posts, setPosts] = useState<CommunityPost[]>(mockCommunityPosts);
    const [expandedPostId, setExpandedPostId] = useState<string | null>(null);
    const [newComment, setNewComment] = useState('');

    const [likedPosts, setLikedPosts] = useState<Set<string>>(new Set());
    const [isCreatingPost, setIsCreatingPost] = useState(false);
    const [newPostContent, setNewPostContent] = useState('');
    const [newPostTitle, setNewPostTitle] = useState('');
    const [newPostHashtags, setNewPostHashtags] = useState('');

    const handleLike = (postId: string) => {
        const isLiked = likedPosts.has(postId);
        const newLikedPosts = new Set(likedPosts);

        if (isLiked) {
            newLikedPosts.delete(postId);
        } else {
            newLikedPosts.add(postId);
        }
        setLikedPosts(newLikedPosts);

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return { ...post, likes: post.likes + (isLiked ? -1 : 1) };
            }
            return post;
        }));
    };

    const handleCreatePost = (e: React.FormEvent) => {
        e.preventDefault();
        if (!newPostTitle.trim() || !newPostContent.trim()) return;

        const tags = newPostHashtags
            .split(',')
            .map(tag => tag.trim().replace(/^#/, ''))
            .filter(tag => tag.length > 0);

        const newPost: CommunityPost = {
            id: generateId(),
            author: t('you'),
            title: newPostTitle,
            content: newPostContent,
            timestamp: new Date(),
            tags: tags.length > 0 ? tags : ['community'],
            likes: 0,
            comments: 0,
            commentsList: []
        };

        setPosts([newPost, ...posts]);
        setNewPostTitle('');
        setNewPostContent('');
        setNewPostHashtags('');
        setIsCreatingPost(false);
    };

    const toggleComments = (postId: string) => {
        if (expandedPostId === postId) {
            setExpandedPostId(null);
        } else {
            setExpandedPostId(postId);
            setNewComment('');
        }
    };

    const handleAddComment = (postId: string) => {
        if (!newComment.trim()) return;

        const comment: Comment = {
            id: generateId(),
            author: t('you'),
            content: newComment,
            timestamp: new Date(),
        };

        setPosts(posts.map(post => {
            if (post.id === postId) {
                return {
                    ...post,
                    comments: post.comments + 1,
                    commentsList: [...(post.commentsList || []), comment]
                };
            }
            return post;
        }));

        setNewComment('');
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-4xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="mb-8 flex justify-between items-end">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('community_notice_board')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('community_desc')}
                        </p>
                    </div>
                    <Button onClick={() => setIsCreatingPost(!isCreatingPost)}>
                        {isCreatingPost ? t('cancel') : t('create_post') || "Create Post"}
                    </Button>
                </div>

                {/* Create Post Form */}
                <AnimatePresence>
                    {isCreatingPost && (
                        <motion.div
                            initial={{ height: 0, opacity: 0, marginBottom: 0 }}
                            animate={{ height: 'auto', opacity: 1, marginBottom: 24 }}
                            exit={{ height: 0, opacity: 0, marginBottom: 0 }}
                            className="overflow-hidden"
                        >
                            <Card>
                                <form onSubmit={handleCreatePost} className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {t('title') || "Title"} *
                                        </label>
                                        <input
                                            type="text"
                                            value={newPostTitle}
                                            onChange={(e) => setNewPostTitle(e.target.value)}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {t('content')} *
                                        </label>
                                        <textarea
                                            value={newPostContent}
                                            onChange={(e) => setNewPostContent(e.target.value)}
                                            rows={3}
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                            {t('hashtags')}
                                        </label>
                                        <input
                                            type="text"
                                            value={newPostHashtags}
                                            onChange={(e) => setNewPostHashtags(e.target.value)}
                                            placeholder="#safety, #alert"
                                            className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                        />
                                    </div>
                                    <div className="flex justify-end">
                                        <Button type="submit">
                                            {t('post')}
                                        </Button>
                                    </div>
                                </form>
                            </Card>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Posts */}
                <div className="space-y-6">
                    {posts.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1 }}
                        >
                            <Card hover>
                                {/* Post Header */}
                                <div className="flex items-start gap-3 mb-4">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary-500 to-secondary-500 flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-semibold text-sm">
                                            {post.author.charAt(0)}
                                        </span>
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-baseline justify-between gap-2">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">
                                                {post.author}
                                            </h3>
                                            <span className="text-sm text-gray-500 dark:text-gray-400">
                                                {getRelativeTime(post.timestamp)}
                                            </span>
                                        </div>
                                        {post.location && (
                                            <p className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                                                <MapPin className="w-3 h-3" />
                                                {language === 'hi' ? post.location_hi || post.location : post.location}
                                            </p>
                                        )}
                                    </div>
                                </div>

                                {/* Post Content */}
                                <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                                    {language === 'hi' ? post.title_hi || post.title : post.title}
                                </h2>
                                <p className="text-gray-700 dark:text-gray-300 mb-4">
                                    {language === 'hi' ? post.content_hi || post.content : post.content}
                                </p>

                                {/* Tags */}
                                <div className="flex flex-wrap gap-2 mb-4">
                                    {post.tags.map((tag) => (
                                        <span
                                            key={tag}
                                            className="px-2 py-1 bg-accent-100 dark:bg-accent-900/20 text-accent-700 dark:text-accent-400 text-xs rounded-full"
                                        >
                                            #{tag}
                                        </span>
                                    ))}
                                </div>

                                {/* Interaction Bar */}
                                <div className="flex items-center gap-6 pt-4 border-t border-gray-200 dark:border-gray-700">
                                    <button
                                        onClick={() => handleLike(post.id)}
                                        className={`flex items-center gap-2 transition-colors ${likedPosts.has(post.id) ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
                                    >
                                        <Heart className={`w-5 h-5 ${likedPosts.has(post.id) ? 'fill-current' : ''}`} />
                                        <span className="text-sm font-medium">{post.likes}</span>
                                    </button>
                                    <button
                                        onClick={() => toggleComments(post.id)}
                                        className={`flex items-center gap-2 transition-colors ${expandedPostId === post.id ? 'text-primary-600 dark:text-primary-400' : 'text-gray-600 dark:text-gray-400 hover:text-primary-600 dark:hover:text-primary-400'}`}
                                    >
                                        <MessageCircle className="w-5 h-5" />
                                        <span className="text-sm font-medium">{post.comments}</span>
                                    </button>
                                </div>

                                {/* Comments Section */}
                                <AnimatePresence>
                                    {expandedPostId === post.id && (
                                        <motion.div
                                            initial={{ height: 0, opacity: 0 }}
                                            animate={{ height: 'auto', opacity: 1 }}
                                            exit={{ height: 0, opacity: 0 }}
                                            className="overflow-hidden"
                                        >
                                            <div className="pt-4 mt-4 border-t border-gray-100 dark:border-gray-800 space-y-4">
                                                {/* Comment List */}
                                                <div className="space-y-3 pl-2">
                                                    {post.commentsList?.map((comment) => (
                                                        <div key={comment.id} className="flex gap-3">
                                                            <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                                                                <span className="text-xs font-medium text-gray-600 dark:text-gray-300">
                                                                    {comment.author.charAt(0)}
                                                                </span>
                                                            </div>
                                                            <div className="flex-1 bg-gray-50 dark:bg-gray-800/50 rounded-lg p-3">
                                                                <div className="flex justify-between items-baseline mb-1">
                                                                    <span className="font-medium text-sm text-gray-900 dark:text-white">
                                                                        {comment.author}
                                                                    </span>
                                                                    <span className="text-xs text-gray-500">
                                                                        {getRelativeTime(comment.timestamp)}
                                                                    </span>
                                                                </div>
                                                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                                                    {comment.content}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>

                                                {/* Add Comment Input */}
                                                <div className="flex gap-2 pt-2">
                                                    <input
                                                        type="text"
                                                        value={newComment}
                                                        onChange={(e) => setNewComment(e.target.value)}
                                                        placeholder={t('write_comment')}
                                                        className="flex-1 px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:border-primary-500 focus:ring-1 focus:ring-primary-500 outline-none text-sm transition-colors"
                                                        onKeyDown={(e) => e.key === 'Enter' && handleAddComment(post.id)}
                                                    />
                                                    <Button
                                                        size="sm"
                                                        onClick={() => handleAddComment(post.id)}
                                                        disabled={!newComment.trim()}
                                                        icon={<Send className="w-4 h-4" />}
                                                    >
                                                        {t('send')}
                                                    </Button>
                                                </div>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </Card>
                        </motion.div>
                    ))}
                </div>
            </div>
        </div>
    );
}
