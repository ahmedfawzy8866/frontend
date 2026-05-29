// AI Chat Interface JavaScript
(function() {
    const vscode = acquireVsCodeApi();
    let currentTaskType = 'code_generation';
    let selectedModel = '';

    // Initialize the interface
    document.addEventListener('DOMContentLoaded', function() {
        initializeEventListeners();
        focusInput();
    });

    function initializeEventListeners() {
        // Chat input handling
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        const taskTypeSelect = document.getElementById('task-type-select');
        const modelSelect = document.getElementById('model-select');

        if (chatInput) {
            chatInput.addEventListener('keydown', function(e) {
                if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
                    e.preventDefault();
                    sendMessage();
                } else if (e.key === 'Escape') {
                    chatInput.blur();
                }
            });

            // Auto-resize textarea
            chatInput.addEventListener('input', function() {
                this.style.height = 'auto';
                this.style.height = Math.min(this.scrollHeight, 200) + 'px';
            });
        }

        if (sendButton) {
            sendButton.addEventListener('click', sendMessage);
        }

        if (taskTypeSelect) {
            taskTypeSelect.addEventListener('change', function() {
                currentTaskType = this.value;
                updatePlaceholder();
            });
            currentTaskType = taskTypeSelect.value;
            updatePlaceholder();
        }

        if (modelSelect) {
            modelSelect.addEventListener('change', function() {
                selectedModel = this.value;
            });
        }

        // Keyboard shortcuts
        document.addEventListener('keydown', function(e) {
            if (e.ctrlKey || e.metaKey) {
                switch(e.key) {
                    case 'n':
                        e.preventDefault();
                        newConversation();
                        break;
                    case 'e':
                        e.preventDefault();
                        exportConversation();
                        break;
                    case '/':
                        e.preventDefault();
                        focusInput();
                        break;
                }
            }
        });
    }

    function updatePlaceholder() {
        const chatInput = document.getElementById('chat-input');
        if (!chatInput) return;

        const placeholders = {
            'code_generation': 'Describe what code you want to generate...',
            'code_review': 'Paste your code for review or describe the file...',
            'debugging': 'Describe the bug or error you\'re encountering...',
            'documentation': 'What code or concept needs documentation?',
            'testing': 'What code needs tests or testing strategy?',
            'refactoring': 'Describe the code that needs refactoring...',
            'explanation': 'What code or concept needs explanation?',
            'optimization': 'What code needs performance optimization?',
            'security_analysis': 'Paste code for security analysis...',
            'translation': 'What code needs to be translated to another language?'
        };

        chatInput.placeholder = placeholders[currentTaskType] || 'Ask AI anything about your code...';
    }

    function focusInput() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.focus();
        }
    }

    // Global functions for HTML onclick handlers
    window.sendMessage = function() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        
        if (!chatInput || !chatInput.value.trim()) return;

        const message = chatInput.value.trim();
        
        // Disable input while processing
        chatInput.disabled = true;
        sendButton.disabled = true;
        sendButton.textContent = 'Sending...';

        vscode.postMessage({
            type: 'sendMessage',
            message: message,
            taskType: currentTaskType,
            modelPreference: selectedModel || undefined
        });

        chatInput.value = '';
        chatInput.style.height = 'auto';
    };

    window.newConversation = function() {
        const title = prompt('Enter conversation title (optional):');
        vscode.postMessage({
            type: 'newConversation',
            title: title || undefined
        });
    };

    window.loadConversation = function(conversationId) {
        vscode.postMessage({
            type: 'loadConversation',
            conversationId: conversationId
        });
    };

    window.useTemplate = function(templateId) {
        // Show template variable input dialog
        showTemplateDialog(templateId);
    };

    window.configureAPI = function() {
        vscode.postMessage({
            type: 'configureAPI'
        });
    };

    window.showUsageStats = function() {
        vscode.postMessage({
            type: 'showUsageStats'
        });
    };

    window.exportConversation = function() {
        vscode.postMessage({
            type: 'exportConversation'
        });
    };

    window.quickStart = function(taskType) {
        currentTaskType = taskType;
        const taskTypeSelect = document.getElementById('task-type-select');
        if (taskTypeSelect) {
            taskTypeSelect.value = taskType;
        }
        updatePlaceholder();
        focusInput();

        // Add a helpful starter message based on task type
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            const starters = {
                'code_generation': 'I need help generating code for ',
                'code_review': 'Please review this code:\n\n```\n\n```',
                'debugging': 'I\'m having an issue with my code: ',
                'explanation': 'Can you explain how this works:\n\n```\n\n```'
            };
            
            if (starters[taskType]) {
                chatInput.value = starters[taskType];
                chatInput.focus();
                // Position cursor appropriately
                if (taskType === 'code_review' || taskType === 'explanation') {
                    const pos = chatInput.value.indexOf('```\n\n```') + 4;
                    chatInput.setSelectionRange(pos, pos);
                } else {
                    chatInput.setSelectionRange(chatInput.value.length, chatInput.value.length);
                }
            }
        }
    };

    window.attachCode = function() {
        // Get selected code from active editor
        vscode.postMessage({
            type: 'attachCode'
        });
    };

    window.attachFile = function() {
        // Attach file content
        vscode.postMessage({
            type: 'attachFile'
        });
    };

    function showTemplateDialog(templateId) {
        // This would show a modal dialog for template variables
        // For now, we'll use a simple approach
        const variables = {};
        
        // Common template variables
        const commonVars = ['language', 'code', 'context', 'requirements'];
        
        for (const varName of commonVars) {
            const value = prompt(`Enter value for ${varName} (optional):`);
            if (value) {
                variables[varName] = value;
            }
        }

        vscode.postMessage({
            type: 'useTemplate',
            templateId: templateId,
            variables: variables
        });
    }

    // Handle messages from extension
    window.addEventListener('message', event => {
        const message = event.data;
        
        switch (message.type) {
            case 'fillPrompt':
                fillPromptFromTemplate(message.prompt, message.taskType);
                break;
            case 'showTyping':
                showTypingIndicator();
                break;
            case 'hideTyping':
                hideTypingIndicator();
                enableInput();
                break;
            case 'codeAttached':
                appendToInput(`\n\n\`\`\`${message.language}\n${message.code}\n\`\`\``);
                break;
            case 'fileAttached':
                appendToInput(`\n\nFile: ${message.fileName}\n\`\`\`\n${message.content}\n\`\`\``);
                break;
        }
    });

    function fillPromptFromTemplate(prompt, taskType) {
        const chatInput = document.getElementById('chat-input');
        const taskTypeSelect = document.getElementById('task-type-select');
        
        if (chatInput) {
            chatInput.value = prompt;
            chatInput.focus();
        }
        
        if (taskTypeSelect) {
            taskTypeSelect.value = taskType;
            currentTaskType = taskType;
        }
    }

    function appendToInput(text) {
        const chatInput = document.getElementById('chat-input');
        if (chatInput) {
            chatInput.value += text;
            chatInput.focus();
            chatInput.scrollTop = chatInput.scrollHeight;
        }
    }

    function showTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'flex';
            scrollToBottom();
        }
    }

    function hideTypingIndicator() {
        const indicator = document.getElementById('typing-indicator');
        if (indicator) {
            indicator.style.display = 'none';
        }
    }

    function enableInput() {
        const chatInput = document.getElementById('chat-input');
        const sendButton = document.getElementById('send-button');
        
        if (chatInput) {
            chatInput.disabled = false;
            chatInput.focus();
        }
        
        if (sendButton) {
            sendButton.disabled = false;
            sendButton.textContent = 'Send';
        }
    }

    function scrollToBottom() {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }
    }

    // Auto-scroll to bottom when new messages arrive
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
                // Check if a new message was added
                const addedMessage = Array.from(mutation.addedNodes).find(node => 
                    node.classList && node.classList.contains('message')
                );
                if (addedMessage) {
                    setTimeout(scrollToBottom, 100);
                }
            }
        });
    });

    // Start observing when DOM is ready
    document.addEventListener('DOMContentLoaded', function() {
        const chatMessages = document.querySelector('.chat-messages');
        if (chatMessages) {
            observer.observe(chatMessages, { childList: true, subtree: true });
        }
    });

    // Cleanup
    window.addEventListener('beforeunload', function() {
        observer.disconnect();
    });

    // Copy code blocks functionality
    document.addEventListener('click', function(e) {
        if (e.target.tagName === 'CODE' && e.target.parentElement.tagName === 'PRE') {
            const code = e.target.textContent;
            navigator.clipboard.writeText(code).then(() => {
                // Show temporary feedback
                const originalText = e.target.textContent;
                e.target.textContent = 'Copied!';
                setTimeout(() => {
                    e.target.textContent = originalText;
                }, 1000);
            }).catch(err => {
                console.error('Failed to copy code:', err);
            });
        }
    });

    // Add tooltips for buttons
    const tooltips = {
        '➕': 'New Conversation (Ctrl/Cmd+N)',
        '📊': 'Usage Statistics',
        '⚙️': 'Configure API Keys',
        '📤': 'Export Conversation (Ctrl/Cmd+E)',
        '📎': 'Attach Selected Code',
        '📁': 'Attach File Content'
    };

    document.addEventListener('mouseover', function(e) {
        if (e.target.classList.contains('btn-icon') || e.target.classList.contains('btn-secondary')) {
            const text = e.target.textContent.trim();
            if (tooltips[text]) {
                e.target.title = tooltips[text];
            }
        }
    });

})();
