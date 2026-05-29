import * as vscode from 'vscode';
import * as https from 'https';

export interface LicenseInfo {
  valid: boolean;
  accessLevel: 'free' | 'pro' | 'enterprise' | 'lifetime_pro';
  features: string[];
  expiresAt?: string;
  message: string;
}

export class LicenseManager {
  private static instance: LicenseManager;
  private licenseInfo: LicenseInfo | null = null;
  private userEmail: string | null = null;

  private constructor() {}

  static getInstance(): LicenseManager {
    if (!LicenseManager.instance) {
      LicenseManager.instance = new LicenseManager();
    }
    return LicenseManager.instance;
  }

  async checkLicense(): Promise<LicenseInfo> {
    // Get stored email or prompt user
    this.userEmail = await this.getUserEmail();
    
    if (!this.userEmail) {
      return this.getFreeTierInfo();
    }

    try {
      // Use VS Code's built-in HTTP client
      const response = await this.makeHttpRequest('https://autoboot.dev/.netlify/functions/verify-license', {
        email: this.userEmail
      });

      this.licenseInfo = response;
      return this.licenseInfo!;

    } catch (error) {
      console.error('License check failed:', error);
      vscode.window.showWarningMessage('AutoBoot: Could not verify license. Using free tier.');
      return this.getFreeTierInfo();
    }
  }

  private async getUserEmail(): Promise<string | null> {
    // Try to get stored email first
    const config = vscode.workspace.getConfiguration('autoboot');
    let email = config.get<string>('userEmail');

    if (!email) {
      // Prompt user for email
      email = await vscode.window.showInputBox({
        prompt: 'Enter your AutoBoot account email',
        placeHolder: 'your@email.com',
        validateInput: (value) => {
          if (!value || !value.includes('@')) {
            return 'Please enter a valid email address';
          }
          return null;
        }
      });

      if (email) {
        // Store email for future use
        await config.update('userEmail', email, vscode.ConfigurationTarget.Global);
      }
    }

    return email || null;
  }

  private getFreeTierInfo(): LicenseInfo {
    return {
      valid: true,
      accessLevel: 'free',
      features: [
        'Basic project detection (3 languages)',
        'Community support'
      ],
      message: 'Free tier access'
    };
  }

  hasFeature(feature: string): boolean {
    if (!this.licenseInfo) {
      return false;
    }

    const featureMap: Record<string, string[]> = {
      'all_languages': ['pro', 'enterprise', 'lifetime_pro'],
      'maven_modules': ['pro', 'enterprise', 'lifetime_pro'],
      'security_scanning': ['pro', 'enterprise', 'lifetime_pro'],
      'ai_suggestions': ['pro', 'enterprise', 'lifetime_pro'],
      'team_features': ['enterprise'],
      'custom_integrations': ['enterprise'],
      'priority_support': ['pro', 'enterprise', 'lifetime_pro']
    };

    const allowedLevels = featureMap[feature];
    return allowedLevels ? allowedLevels.includes(this.licenseInfo.accessLevel) : false;
  }

  getAccessLevel(): string {
    return this.licenseInfo?.accessLevel || 'free';
  }

  async showLicenseStatus() {
    const info = await this.checkLicense();
    
    const statusItems = [
      `Access Level: ${info.accessLevel.toUpperCase()}`,
      `Features: ${info.features.length}`,
      info.expiresAt ? `Expires: ${new Date(info.expiresAt).toLocaleDateString()}` : 'No expiration'
    ];

    vscode.window.showInformationMessage(
      `AutoBoot License: ${info.message}`,
      'View Features',
      'Upgrade'
    ).then(selection => {
      if (selection === 'View Features') {
        this.showFeatureList(info);
      } else if (selection === 'Upgrade') {
        vscode.env.openExternal(vscode.Uri.parse('https://autoboot.dev/register'));
      }
    });
  }

  private showFeatureList(info: LicenseInfo) {
    const panel = vscode.window.createWebviewPanel(
      'autobootLicense',
      'AutoBoot License Features',
      vscode.ViewColumn.One,
      {}
    );

    panel.webview.html = `
      <!DOCTYPE html>
      <html>
      <head>
        <title>AutoBoot License</title>
        <style>
          body { font-family: var(--vscode-font-family); padding: 20px; }
          .feature { margin: 10px 0; padding: 10px; background: var(--vscode-editor-background); border-radius: 5px; }
          .access-level { font-size: 1.2em; font-weight: bold; margin-bottom: 20px; }
          .upgrade-btn { background: #007acc; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; }
        </style>
      </head>
      <body>
        <div class="access-level">Access Level: ${info.accessLevel.toUpperCase()}</div>
        <h3>Your Features:</h3>
        ${info.features.map(feature => `<div class="feature">✅ ${feature}</div>`).join('')}
        
        ${info.accessLevel === 'free' ? `
          <br>
          <button class="upgrade-btn" onclick="window.open('https://autoboot.dev#pricing')">
            Upgrade to Premium - $47 Lifetime
          </button>
        ` : ''}
      </body>
      </html>
    `;
  }

  async promptUpgrade(feature: string) {
    const result = await vscode.window.showWarningMessage(
      `AutoBoot: ${feature} requires Pro or higher subscription`,
      'Upgrade Now',
      'Learn More',
      'Continue with Free'
    );

    if (result === 'Upgrade Now') {
      vscode.env.openExternal(vscode.Uri.parse('https://autoboot.dev'));
      return false;
    } else if (result === 'Learn More') {
      vscode.env.openExternal(vscode.Uri.parse('https://autoboot.dev#features'));
      return false;
    }

    return result === 'Continue with Free';
  }

  private async makeHttpRequest(url: string, data: any): Promise<LicenseInfo> {
    return new Promise((resolve, reject) => {
      const postData = JSON.stringify(data);
      const urlObj = new URL(url);
      
      const options = {
        hostname: urlObj.hostname,
        port: urlObj.port || 443,
        path: urlObj.pathname,
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Content-Length': Buffer.byteLength(postData)
        }
      };

      const req = https.request(options, (res) => {
        let responseData = '';
        
        res.on('data', (chunk) => {
          responseData += chunk;
        });
        
        res.on('end', () => {
          try {
            const result = JSON.parse(responseData);
            resolve(result);
          } catch (error) {
            reject(new Error('Invalid JSON response'));
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.write(postData);
      req.end();
    });
  }
}
