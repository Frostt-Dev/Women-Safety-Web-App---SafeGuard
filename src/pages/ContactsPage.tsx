import { useState } from 'react';
import { motion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { useApp } from '../contexts/AppContext';
import { useLanguage } from '../contexts/LanguageContext';
import { ContactCard } from '../components/ContactCard';
import { Modal } from '../components/Modal';
import { Button } from '../components/Button';
import { generateId } from '../utils/helpers';
import type { Contact } from '../types';

export default function ContactsPage() {
    const { contacts, addContact, updateContact, removeContact } = useApp();
    const { t } = useLanguage();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingContact, setEditingContact] = useState<Contact | null>(null);
    const [formData, setFormData] = useState({
        name: '',
        phone: '',
        email: '',
        relationship: '',
        isPrimary: false,
    });

    const handleOpenModal = (contact?: Contact) => {
        if (contact) {
            setEditingContact(contact);
            setFormData({
                name: contact.name,
                phone: contact.phone,
                email: contact.email || '',
                relationship: contact.relationship,
                isPrimary: contact.isPrimary || false,
            });
        } else {
            setEditingContact(null);
            setFormData({
                name: '',
                phone: '',
                email: '',
                relationship: '',
                isPrimary: false,
            });
        }
        setIsModalOpen(true);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (editingContact) {
            updateContact(editingContact.id, formData);
        } else {
            addContact({
                id: generateId(),
                ...formData,
            });
        }

        setIsModalOpen(false);
        setFormData({ name: '', phone: '', email: '', relationship: '', isPrimary: false });
    };

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-16 pb-20 md:pl-20 md:pb-8">
            <div className="max-w-7xl mx-auto px-4 md:px-8 py-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                            {t('trusted_contacts')}
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400">
                            {t('manage_contacts')}
                        </p>
                    </div>
                    <Button
                        onClick={() => handleOpenModal()}
                        icon={<Plus className="w-5 h-5" />}
                    >
                        {t('add_contact')}
                    </Button>
                </div>

                {/* Contacts Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {contacts.map((contact, index) => (
                        <motion.div
                            key={contact.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.05 }}
                        >
                            <ContactCard
                                contact={contact}
                                onEdit={handleOpenModal}
                                onRemove={removeContact}
                            />
                        </motion.div>
                    ))}
                </div>

                {contacts.length === 0 && (
                    <div className="text-center py-16">
                        <p className="text-gray-500 dark:text-gray-400 text-lg mb-4">
                            {t('no_contacts')}
                        </p>
                        <Button onClick={() => handleOpenModal()}>
                            {t('add_first_contact')}
                        </Button>
                    </div>
                )}

                {/* Add/Edit Contact Modal */}
                <Modal
                    isOpen={isModalOpen}
                    onClose={() => setIsModalOpen(false)}
                    title={editingContact ? t('edit_contact') : t('add_new_contact')}
                >
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('full_name')} *
                            </label>
                            <input
                                type="text"
                                value={formData.name}
                                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('phone')} *
                            </label>
                            <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('email')}
                            </label>
                            <input
                                type="email"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                                {t('relationship')} *
                            </label>
                            <input
                                type="text"
                                value={formData.relationship}
                                onChange={(e) => setFormData({ ...formData, relationship: e.target.value })}
                                placeholder={t('relationship_placeholder')}
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 outline-none"
                                required
                            />
                        </div>

                        <div className="flex items-center gap-2">
                            <input
                                type="checkbox"
                                id="isPrimary"
                                checked={formData.isPrimary}
                                onChange={(e) => setFormData({ ...formData, isPrimary: e.target.checked })}
                                className="w-4 h-4 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                            />
                            <label htmlFor="isPrimary" className="text-sm text-gray-700 dark:text-gray-300">
                                {t('mark_primary')}
                            </label>
                        </div>

                        <div className="flex gap-3 pt-4">
                            <Button type="submit" className="flex-1">
                                {editingContact ? t('update') : t('add')}
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => setIsModalOpen(false)}
                            >
                                {t('cancel')}
                            </Button>
                        </div>
                    </form>
                </Modal>
            </div>
        </div>
    );
}
