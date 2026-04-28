// Contact Management PWA - Main Application

class ContactManager {
    constructor() {
        this.contacts = [];
        this.filteredContacts = [];
        this.currentDept = 'all';
        this.searchQuery = '';
        this.currentContact = null;
        this.db = null;
        
        this.init();
    }
    
    async init() {
        await this.initDatabase();
        this.setupEventListeners();
        this.setupNetworkListeners();
        await this.loadContacts();
        this.renderDepartmentFilter();
        this.updateInstallButton();
    }
    
    // Initialize IndexedDB
    async initDatabase() {
        return new Promise((resolve, reject) => {
            const request = indexedDB.open('ContactsDB', 1);
            
            request.onerror = () => reject(request.error);
            request.onsuccess = () => {
                this.db = request.result;
                resolve();
            };
            
            request.onupgradeneeded = (event) => {
                const db = event.target.result;
                if (!db.objectStoreNames.contains('contacts')) {
                    const store = db.createObjectStore('contacts', { keyPath: 'id' });
                    store.createIndex('department', 'department', { unique: false });
                    store.createIndex('name', 'name', { unique: false });
                }
            };
        });
    }
    
    // Load contacts from IndexedDB or seed data
    async loadContacts() {
        try {
            const stored = await this.getAllContactsFromDB();
            
            if (stored.length === 0) {
                // Seed initial data
                await this.seedContacts();
                this.contacts = [...contactsData];
            } else {
                this.contacts = stored;
            }
            
            this.filteredContacts = [...this.contacts];
            this.renderContacts();
            this.updateStats();
        } catch (error) {
            console.error('Error loading contacts:', error);
            this.showToast('加載數據失敗，請刷新頁面重試');
        }
    }
    
    // Seed contacts to IndexedDB
    async seedContacts() {
        const transaction = this.db.transaction(['contacts'], 'readwrite');
        const store = transaction.objectStore('contacts');
        
        for (const contact of contactsData) {
            await new Promise((resolve, reject) => {
                const request = store.put(contact);
                request.onsuccess = () => resolve();
                request.onerror = () => reject(request.error);
            });
        }
    }
    
    // Get all contacts from IndexedDB
    async getAllContactsFromDB() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['contacts'], 'readonly');
            const store = transaction.objectStore('contacts');
            const request = store.getAll();
            
            request.onsuccess = () => resolve(request.result);
            request.onerror = () => reject(request.error);
        });
    }
    
    // Save contact to IndexedDB
    async saveContactToDB(contact) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['contacts'], 'readwrite');
            const store = transaction.objectStore('contacts');
            const request = store.put(contact);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    
    // Delete contact from IndexedDB
    async deleteContactFromDB(id) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction(['contacts'], 'readwrite');
            const store = transaction.objectStore('contacts');
            const request = store.delete(id);
            
            request.onsuccess = () => resolve();
            request.onerror = () => reject(request.error);
        });
    }
    
    // Setup event listeners
    setupEventListeners() {
        // Search
        const searchInput = document.getElementById('searchInput');
        const clearSearch = document.getElementById('clearSearch');
        
        searchInput.addEventListener('input', (e) => {
            this.searchQuery = e.target.value.trim().toLowerCase();
            clearSearch.classList.toggle('hidden', this.searchQuery === '');
            this.filterContacts();
        });
        
        clearSearch.addEventListener('click', () => {
            searchInput.value = '';
            this.searchQuery = '';
            clearSearch.classList.add('hidden');
            this.filterContacts();
        });
        
        // Refresh button
        document.getElementById('refreshBtn').addEventListener('click', () => {
            this.loadContacts();
            this.showToast('數據已刷新');
        });
        
        // FAB button
        document.getElementById('fabBtn').addEventListener('click', () => {
            this.openEditModal();
        });
        
        // Modal close buttons
        document.getElementById('closeModal').addEventListener('click', () => {
            this.closeModal();
        });
        
        document.getElementById('closeEditModal').addEventListener('click', () => {
            this.closeEditModal();
        });
        
        // Contact actions
        document.getElementById('editContact').addEventListener('click', () => {
            if (this.currentContact) {
                this.closeModal();
                this.openEditModal(this.currentContact);
            }
        });
        
        document.getElementById('deleteContact').addEventListener('click', () => {
            if (this.currentContact) {
                this.deleteContact(this.currentContact.id);
            }
        });
        
        // Form submission
        document.getElementById('contactForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveContact();
        });
        
        // Close modals on outside click
        document.getElementById('contactModal').addEventListener('click', (e) => {
            if (e.target.id === 'contactModal') this.closeModal();
        });
        
        document.getElementById('editModal').addEventListener('click', (e) => {
            if (e.target.id === 'editModal') this.closeEditModal();
        });
        
        // Install button
        document.getElementById('installBtn')?.addEventListener('click', () => {
            this.installApp();
        });
    }
    
    // Setup network listeners
    setupNetworkListeners() {
        const offlineIndicator = document.getElementById('offlineIndicator');
        
        window.addEventListener('online', () => {
            offlineIndicator.classList.remove('show');
            this.showToast('已恢復連線');
        });
        
        window.addEventListener('offline', () => {
            offlineIndicator.classList.add('show');
            this.showToast('進入離線模式');
        });
        
        // Check initial state
        if (!navigator.onLine) {
            offlineIndicator.classList.add('show');
        }
    }
    
    // Render department filter buttons
    renderDepartmentFilter() {
        const container = document.getElementById('deptFilter');
        const allButton = container.querySelector('[data-dept="all"]');
        
        // Clear existing except "All"
        container.innerHTML = '';
        container.appendChild(allButton);
        
        departments.forEach(dept => {
            const btn = document.createElement('button');
            btn.className = 'dept-badge px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50';
            btn.textContent = dept;
            btn.dataset.dept = dept;
            btn.addEventListener('click', () => this.selectDepartment(dept));
            container.appendChild(btn);
        });
        
        allButton.addEventListener('click', () => this.selectDepartment('all'));
    }
    
    // Select department filter
    selectDepartment(dept) {
        this.currentDept = dept;
        
        // Update UI
        document.querySelectorAll('.dept-badge').forEach(btn => {
            if (btn.dataset.dept === dept) {
                btn.className = 'dept-badge px-4 py-2 bg-primary text-white rounded-full text-sm font-medium whitespace-nowrap';
            } else {
                btn.className = 'dept-badge px-4 py-2 bg-white text-gray-700 border border-gray-300 rounded-full text-sm font-medium whitespace-nowrap hover:bg-gray-50';
            }
        });
        
        this.filterContacts();
    }
    
    // Filter contacts based on search and department
    filterContacts() {
        this.filteredContacts = this.contacts.filter(contact => {
            const matchesDept = this.currentDept === 'all' || contact.department === this.currentDept;
            const matchesSearch = !this.searchQuery || 
                contact.name.toLowerCase().includes(this.searchQuery) ||
                contact.department.toLowerCase().includes(this.searchQuery) ||
                contact.position.toLowerCase().includes(this.searchQuery) ||
                (contact.phone && contact.phone.includes(this.searchQuery)) ||
                (contact.mobile && contact.mobile.includes(this.searchQuery)) ||
                (contact.email && contact.email.toLowerCase().includes(this.searchQuery));
            
            return matchesDept && matchesSearch;
        });
        
        this.renderContacts();
        this.updateStats();
    }
    
    // Render contacts grid
    renderContacts() {
        const grid = document.getElementById('contactsGrid');
        const loadingState = document.getElementById('loadingState');
        const emptyState = document.getElementById('emptyState');
        
        loadingState.classList.add('hidden');
        
        if (this.filteredContacts.length === 0) {
            grid.innerHTML = '';
            emptyState.classList.remove('hidden');
            return;
        }
        
        emptyState.classList.add('hidden');
        
        grid.innerHTML = this.filteredContacts.map(contact => this.createContactCard(contact)).join('');
        
        // Add click handlers
        grid.querySelectorAll('.contact-card').forEach(card => {
            card.addEventListener('click', () => {
                const id = parseInt(card.dataset.id);
                this.openContactModal(id);
            });
        });
    }
    
    // Create contact card HTML
    createContactCard(contact) {
        const initials = contact.name.charAt(0);
        const deptColor = this.getDeptColor(contact.department);
        
        return `
            <div class="contact-card bg-white rounded-xl p-4 shadow-sm border border-gray-100 cursor-pointer" data-id="${contact.id}">
                <div class="flex items-start space-x-3">
                    <div class="w-12 h-12 ${deptColor} rounded-full flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                        ${initials}
                    </div>
                    <div class="flex-1 min-w-0">
                        <h3 class="font-bold text-gray-800 truncate">${contact.name}</h3>
                        <p class="text-sm text-secondary font-medium">${contact.position}</p>
                        <span class="inline-block mt-1 px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">
                            ${contact.department}
                        </span>
                    </div>
                </div>
                <div class="mt-3 pt-3 border-t border-gray-100 flex items-center justify-between text-sm text-gray-500">
                    ${contact.phone ? `<span><i class="fas fa-phone mr-1"></i>${contact.phone}</span>` : '<span></span>'}
                    ${contact.mobile ? `<span><i class="fas fa-mobile-alt mr-1"></i>${contact.mobile}</span>` : ''}
                </div>
            </div>
        `;
    }
    
    // Get department color
    getDeptColor(dept) {
        const colors = {
            '資訊科技部': 'bg-blue-600',
            '網絡安全部': 'bg-red-600',
            '基礎設施部': 'bg-green-600',
            '應用開發部': 'bg-purple-600',
            '數據分析部': 'bg-yellow-600',
            '項目管理部': 'bg-pink-600',
            '技術支援部': 'bg-indigo-600',
            '質量保證部': 'bg-teal-600',
            '雲計算部': 'bg-cyan-600',
            '人工智能部': 'bg-orange-600'
        };
        return colors[dept] || 'bg-gray-600';
    }
    
    // Update statistics
    updateStats() {
        document.getElementById('totalContacts').textContent = `總聯繫人: ${this.contacts.length}`;
        
        const filteredEl = document.getElementById('filteredContacts');
        if (this.filteredContacts.length !== this.contacts.length) {
            filteredEl.textContent = `篩選結果: ${this.filteredContacts.length}`;
            filteredEl.classList.remove('hidden');
        } else {
            filteredEl.classList.add('hidden');
        }
    }
    
    // Open contact detail modal
    openContactModal(id) {
        const contact = this.contacts.find(c => c.id === id);
        if (!contact) return;
        
        this.currentContact = contact;
        
        document.getElementById('modalAvatar').textContent = contact.name.charAt(0);
        document.getElementById('modalName').textContent = contact.name;
        document.getElementById('modalPosition').textContent = contact.position;
        document.getElementById('modalDept').textContent = contact.department;
        document.getElementById('modalPhone').textContent = contact.phone || '未提供';
        document.getElementById('modalMobile').textContent = contact.mobile || '未提供';
        document.getElementById('modalEmail').textContent = contact.email || '未提供';
        document.getElementById('modalNotes').textContent = contact.notes || '無備註';
        
        // Setup action links
        const callPhone = document.getElementById('callPhone');
        if (contact.phone) {
            callPhone.href = `tel:${contact.phone.replace(/\s/g, '')}`;
            callPhone.classList.remove('hidden');
        } else {
            callPhone.classList.add('hidden');
        }
        
        const callMobile = document.getElementById('callMobile');
        if (contact.mobile) {
            callMobile.href = `tel:${contact.mobile.replace(/\s/g, '')}`;
            callMobile.classList.remove('hidden');
        } else {
            callMobile.classList.add('hidden');
        }
        
        const sendEmail = document.getElementById('sendEmail');
        if (contact.email) {
            sendEmail.href = `mailto:${contact.email}`;
            sendEmail.classList.remove('hidden');
        } else {
            sendEmail.classList.add('hidden');
        }
        
        document.getElementById('contactModal').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Close contact modal
    closeModal() {
        document.getElementById('contactModal').classList.add('hidden');
        document.body.style.overflow = '';
        this.currentContact = null;
    }
    
    // Open edit modal
    openEditModal(contact = null) {
        const modal = document.getElementById('editModal');
        const title = document.getElementById('editModalTitle');
        const form = document.getElementById('contactForm');
        
        // Populate department select
        const deptSelect = document.getElementById('formDept');
        deptSelect.innerHTML = '<option value="">選擇部門</option>';
        departments.forEach(dept => {
            const option = document.createElement('option');
            option.value = dept;
            option.textContent = dept;
            deptSelect.appendChild(option);
        });
        
        if (contact) {
            title.textContent = '編輯聯繫人';
            document.getElementById('contactId').value = contact.id;
            document.getElementById('formName').value = contact.name;
            document.getElementById('formDept').value = contact.department;
            document.getElementById('formPosition').value = contact.position;
            document.getElementById('formPhone').value = contact.phone || '';
            document.getElementById('formMobile').value = contact.mobile || '';
            document.getElementById('formEmail').value = contact.email || '';
            document.getElementById('formNotes').value = contact.notes || '';
        } else {
            title.textContent = '新增聯繫人';
            form.reset();
            document.getElementById('contactId').value = '';
        }
        
        modal.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
    }
    
    // Close edit modal
    closeEditModal() {
        document.getElementById('editModal').classList.add('hidden');
        document.body.style.overflow = '';
    }
    
    // Save contact
    async saveContact() {
        const id = document.getElementById('contactId').value;
        const contact = {
            id: id ? parseInt(id) : Date.now(),
            name: document.getElementById('formName').value.trim(),
            department: document.getElementById('formDept').value,
            position: document.getElementById('formPosition').value.trim(),
            phone: document.getElementById('formPhone').value.trim(),
            mobile: document.getElementById('formMobile').value.trim(),
            email: document.getElementById('formEmail').value.trim(),
            notes: document.getElementById('formNotes').value.trim()
        };
        
        try {
            await this.saveContactToDB(contact);
            
            // Update local array
            const index = this.contacts.findIndex(c => c.id === contact.id);
            if (index >= 0) {
                this.contacts[index] = contact;
            } else {
                this.contacts.push(contact);
            }
            
            this.filterContacts();
            this.closeEditModal();
            this.showToast(id ? '聯繫人已更新' : '聯繫人已添加');
        } catch (error) {
            console.error('Error saving contact:', error);
            this.showToast('保存失敗，請重試');
        }
    }
    
    // Delete contact
    async deleteContact(id) {
        if (!confirm('確定要刪除此聯繫人嗎？')) return;
        
        try {
            await this.deleteContactFromDB(id);
            this.contacts = this.contacts.filter(c => c.id !== id);
            this.filterContacts();
            this.closeModal();
            this.showToast('聯繫人已刪除');
        } catch (error) {
            console.error('Error deleting contact:', error);
            this.showToast('刪除失敗，請重試');
        }
    }
    
    // Show toast notification
    showToast(message) {
        const toast = document.getElementById('toast');
        document.getElementById('toastMessage').textContent = message;
        toast.classList.remove('hidden');
        
        setTimeout(() => {
            toast.classList.add('hidden');
        }, 3000);
    }
    
    // Update install button
    updateInstallButton() {
        const installBtn = document.getElementById('installBtn');
        
        window.addEventListener('beforeinstallprompt', (e) => {
            e.preventDefault();
            this.deferredPrompt = e;
            installBtn.classList.remove('hidden');
        });
        
        window.addEventListener('appinstalled', () => {
            installBtn.classList.add('hidden');
            this.deferredPrompt = null;
        });
    }
    
    // Install app
    async installApp() {
        if (!this.deferredPrompt) return;
        
        this.deferredPrompt.prompt();
        const { outcome } = await this.deferredPrompt.userChoice;
        
        if (outcome === 'accepted') {
            this.showToast('應用已安裝');
        }
        
        this.deferredPrompt = null;
    }
}

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.contactManager = new ContactManager();
});

// Register Service Worker
if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('service-worker.js')
            .then(registration => {
                console.log('SW registered:', registration);
            })
            .catch(error => {
                console.log('SW registration failed:', error);
            });
    });
}
