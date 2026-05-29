// AI Code Quality Report JavaScript
const vscode = acquireVsCodeApi();

// Global functions for webview interactions
window.runAnalysis = function() {
    vscode.postMessage({
        type: 'runAnalysis'
    });
};

window.fixIssue = function(issueId) {
    vscode.postMessage({
        type: 'fixIssue',
        issueId: issueId
    });
};

window.ignoreIssue = function(issueId) {
    vscode.postMessage({
        type: 'ignoreIssue',
        issueId: issueId
    });
};

window.showIssueDetails = function(issueId) {
    vscode.postMessage({
        type: 'showIssueDetails',
        issueId: issueId
    });
};

window.exportReport = function() {
    vscode.postMessage({
        type: 'exportReport'
    });
};

window.showSettings = function() {
    vscode.postMessage({
        type: 'showSettings'
    });
};

// Initialize tooltips and interactive elements
document.addEventListener('DOMContentLoaded', function() {
    // Add hover effects for issue items
    const issueItems = document.querySelectorAll('.issue-item');
    issueItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
            this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
        });
        
        item.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = 'none';
        });
    });

    // Add click handlers for score categories
    const scoreCategories = document.querySelectorAll('.score-category');
    scoreCategories.forEach(category => {
        category.addEventListener('click', function() {
            const categoryName = this.querySelector('.category-label').textContent.split(' ')[1];
            vscode.postMessage({
                type: 'filterByCategory',
                category: categoryName.toLowerCase()
            });
        });
    });

    // Add progress animation for score bars
    const scoreFills = document.querySelectorAll('.score-fill');
    scoreFills.forEach(fill => {
        const width = fill.style.width;
        fill.style.width = '0%';
        setTimeout(() => {
            fill.style.width = width;
        }, 100);
    });

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.ctrlKey || e.metaKey) {
            switch(e.key) {
                case 'r':
                    e.preventDefault();
                    runAnalysis();
                    break;
                case 'e':
                    e.preventDefault();
                    exportReport();
                    break;
            }
        }
    });
});
