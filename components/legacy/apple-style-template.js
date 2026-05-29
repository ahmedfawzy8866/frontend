"use strict";
/**
 * Apple Human Interface Guidelines compliant webview template
 * Follows Apple's design principles for premium user experience
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppleHIGWebviewTemplate = void 0;
class AppleHIGWebviewTemplate {
    /**
     * Generate premium Apple-style webview HTML
     */
    /**
     * Generate Apple HIG compliant webview
     */
    static generateAppleStyleWebview(title, content, styles = '') {
        const headContent = this.generateHeadContent(title);
        const bodyContent = this.generateBodyContent(content, styles);
        return this.wrapHtmlDocument(headContent, bodyContent);
    }
    /**
     * Generate head section with Apple fonts and styles
     */
    static generateHeadContent(title) {
        return `
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${title}</title>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
    <style>${this.getAppleStyles()}</style>`;
    }
    /**
     * Generate body content with animations and interactions
     */
    static generateBodyContent(content, customStyles) {
        return `
    <div class="container animate-in">
        ${content}
    </div>
    <script>${this.getAppleScripts()}</script>
    <style>${customStyles}</style>`;
    }
    /**
     * Wrap complete HTML document
     */
    static wrapHtmlDocument(head, body) {
        return `
<!DOCTYPE html>
<html lang="en">
<head>${head}</head>
<body>${body}</body>
</html>`;
    }
    /**
     * Get Apple HIG compliant styles
     */
    static getAppleStyles() {
        return `
        :root {
            --apple-blue: #007AFF;
            --apple-purple: #5856D6;
            --apple-green: #30D158;
            --apple-orange: #FF9500;
            --apple-red: #FF3B30;
            --system-background: rgba(255, 255, 255, 0.95);
            --system-label: rgba(0, 0, 0, 0.85);
            --system-label-secondary: rgba(0, 0, 0, 0.6);
            --system-separator: rgba(60, 60, 67, 0.12);
            --system-fill: rgba(120, 120, 128, 0.12);
            --font-family: 'Inter', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
            --font-size-base: 14px;
            --spacing-base: 16px;
            --radius-base: 8px;
            --shadow-sm: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
            font-family: var(--font-family);
            font-size: var(--font-size-base);
            color: var(--system-label);
            background: linear-gradient(135deg, rgba(0, 122, 255, 0.02) 0%, rgba(88, 86, 214, 0.02) 100%);
            min-height: 100vh;
            -webkit-font-smoothing: antialiased;
        }
        .container { max-width: 1200px; margin: 0 auto; padding: var(--spacing-base); }
        .card {
            background: var(--system-background);
            backdrop-filter: blur(20px);
            border-radius: var(--radius-base);
            box-shadow: var(--shadow-sm);
            border: 1px solid var(--system-separator);
            margin-bottom: var(--spacing-base);
            overflow: hidden;
            transition: all 0.2s ease;
        }
        .card:hover { box-shadow: 0 4px 16px rgba(0, 0, 0, 0.1); transform: translateY(-1px); }
        .card-header {
            padding: var(--spacing-base);
            border-bottom: 1px solid var(--system-separator);
            background: rgba(249, 249, 249, 0.95);
        }
        .card-title {
            font-size: 16px;
            font-weight: 600;
            color: var(--system-label);
            margin-bottom: 4px;
        }
        .card-content { padding: var(--spacing-base); }
        .btn {
            display: inline-flex;
            align-items: center;
            justify-content: center;
            padding: 8px 16px;
            border-radius: var(--radius-base);
            font-size: var(--font-size-base);
            font-weight: 500;
            text-decoration: none;
            border: none;
            cursor: pointer;
            transition: all 0.2s ease;
            min-height: 32px;
            gap: 4px;
        }
        .btn-primary {
            background: var(--apple-blue);
            color: white;
            box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
        }
        .btn-primary:hover { background: #0051D5; transform: translateY(-1px); }
        .btn-secondary {
            background: var(--system-fill);
            color: var(--system-label);
        }
        .btn-secondary:hover { background: rgba(120, 120, 128, 0.16); }
        @keyframes slideIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-in { animation: slideIn 0.3s ease-out; }
        @keyframes ripple {
            from { transform: scale(0); opacity: 1; }
            to { transform: scale(4); opacity: 0; }
        }`;
    }
    /**
     * Get Apple HIG compliant scripts
     */
    static getAppleScripts() {
        return `
        document.documentElement.style.scrollBehavior = 'smooth';
        document.querySelectorAll('.btn').forEach(button => {
            button.addEventListener('click', function(e) {
                const ripple = document.createElement('span');
                const rect = this.getBoundingClientRect();
                const size = Math.max(rect.width, rect.height);
                const x = e.clientX - rect.left - size / 2;
                const y = e.clientY - rect.top - size / 2;
                ripple.style.cssText = \`position: absolute; width: \${size}px; height: \${size}px; border-radius: 50%; background: rgba(255, 255, 255, 0.5); left: \${x}px; top: \${y}px; animation: ripple 0.6s ease-out; pointer-events: none;\`;
                this.style.position = 'relative';
                this.style.overflow = 'hidden';
                this.appendChild(ripple);
                setTimeout(() => ripple.remove(), 600);
            });
        });`;
    }
    /**
     * Generate premium status card
     */
    static generateStatusCard(title, status, details) {
        const config = this.getStatusConfig(status);
        return this.buildStatusCard(title, config, details);
    }
    /**
     * Get status configuration
     */
    static getStatusConfig(status) {
        const configs = {
            running: { color: 'var(--apple-green)', icon: '🟢', text: 'Running' },
            stopped: { color: 'var(--apple-red)', icon: '🔴', text: 'Stopped' },
            loading: { color: 'var(--apple-orange)', icon: '🟡', text: 'Loading' }
        };
        return configs[status];
    }
    /**
     * Build status card HTML
     */
    static buildStatusCard(title, config, details) {
        return `
            <div class="card">
                <div class="card-header">
                    <div style="display: flex; align-items: center; gap: 8px;">
                        <span style="font-size: 20px;">${config.icon}</span>
                        <div>
                            <div class="card-title">${title}</div>
                            <div class="card-subtitle" style="color: ${config.color}; font-weight: 500;">
                                ${config.text}
                            </div>
                        </div>
                    </div>
                </div>
                <div class="card-content">
                    <p style="color: var(--system-label-secondary); margin-bottom: 16px;">
                        ${details}
                    </p>
                    <div style="display: flex; gap: 8px;">
                        <button class="btn btn-primary" onclick="postMessage({command: 'restart'})">
                            🔄 Restart
                        </button>
                        <button class="btn btn-secondary" onclick="postMessage({command: 'stop'})">
                            ⏹️ Stop
                        </button>
                    </div>
                </div>
            </div>
        `;
    }
    /**
     * Generate feature list with Apple-style design
     */
    static generateFeatureList(features) {
        const listItems = features.map(feature => this.buildFeatureItem(feature)).join('');
        return `<div class="list">${listItems}</div>`;
    }
    /**
     * Build individual feature item
     */
    static buildFeatureItem(feature) {
        const statusBadge = feature.status ? `<span class="badge badge-primary">${feature.status}</span>` : '';
        return `
            <div class="list-item">
                <div class="list-item-icon" style="background: linear-gradient(135deg, var(--apple-blue), var(--apple-purple)); display: flex; align-items: center; justify-content: center; color: white; font-size: 12px;">
                    ${feature.icon}
                </div>
                <div class="list-item-content">
                    <div class="list-item-title">${feature.title}</div>
                    <div class="list-item-subtitle">${feature.description}</div>
                </div>
                ${statusBadge}
            </div>
        `;
    }
}
exports.AppleHIGWebviewTemplate = AppleHIGWebviewTemplate;
//# sourceMappingURL=apple-style-template.js.map