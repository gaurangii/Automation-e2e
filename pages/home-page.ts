import { expect, Locator, Page } from '@playwright/test'

export class HomePage {

    readonly page: Page;
    readonly messagesCard: Locator;
    readonly totalWhatsAppMessagesCard: Locator;
    readonly aiMessagesCard: Locator;
    readonly leadsCard: Locator;
    readonly chatbotTable: Locator;
    readonly aiAgentTable: Locator;
    readonly editChatbotButton: Locator;
    readonly deleteChatbotButton: Locator;
    readonly ellipsisChatbotTable: Locator;
    readonly copyChatbotID: Locator;
    readonly copyBotIDSuccessToast: Locator;
    readonly editAIAgentButton: Locator;
    readonly deleteAIAgentButton: Locator;
    readonly ellipsisAIAgentTable: Locator;
    readonly copyVoicebotID: Locator;
    readonly copyAIIDSuccessToast: Locator;
    readonly notificationButton: Locator;
    readonly myProfileButton: Locator;
    readonly homePageNavButton: Locator;
    readonly spinnerOverlay: Locator;


    constructor(page: Page) {
        this.page = page;
        this.messagesCard = page.getByText(/Messages/i).first();
        this.totalWhatsAppMessagesCard = page.getByText(/Total.?WhatsApp.?Messages/i).first();
        this.aiMessagesCard = page.getByText(/AI.?Messages/i).first();
        this.leadsCard = page.getByText(/Leads/i).first();
        this.chatbotTable = page.locator('.bots-listing').or(page.locator('.rt-table')).first();
        this.aiAgentTable = page.locator('.agent-listing').or(page.locator('.rt-table')).first();
        this.editChatbotButton = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Bot 24', exact: true }) })
            .locator('img[src*="edit"]');
        this.deleteChatbotButton = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Bot 24', exact: true }) })
            .locator('img[src*="delete"]');
        this.ellipsisChatbotTable = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Bot 24', exact: true }) })
            .locator('img[src*="more"] ');
        this.copyChatbotID = page.getByText(/Copy.?Bot.?ID/i).first();
        this.copyBotIDSuccessToast = page.getByText(/ID.?Copied.?successfully/i).first();
        this.editAIAgentButton = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Voice Bot 2', exact: true }) })
            .locator('img[src*="edit"]');
        this.deleteAIAgentButton = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Voice Bot 2', exact: true }) })
            .locator('img[src*="delete"]');
        this.ellipsisAIAgentTable = page
            .getByRole('row')
            .filter({ has: page.getByRole('link', { name: 'Voice Bot 2', exact: true }) })
            .locator('img[src*="more"] ');
        this.copyVoicebotID = page.getByText(/Copy.?Voice.?Bot.?ID/i).first();
        this.copyAIIDSuccessToast = page.getByText(/ID.?Copied.?successfully/i).first();
        this.notificationButton = page.locator('span', { hasText: 'notifications' });
        this.myProfileButton = page.locator('img[routerlink="/settings/details"]');
        this.homePageNavButton = page.locator('#bp-sb-itm-home');
        this.spinnerOverlay = page.locator('.ngx-spinner-overlay');



    }

    async goto(): Promise<void> {
        const targetRoute = [
            '/home',
            '/account',
            '/dashboard',
            '/home-v2'
        ];

        for (const target of targetRoute) {
            try {
                await this.page.goto('/home', { waitUntil: 'domcontentloaded', timeout: 90000 });

                await this.waitForSpinnerToClear(20000);

                if (await this.waitForHomeSurface()) {
                    return;
                }
            } catch (error) {
                console.log(`Navigation failed for route ${'/home'}:`, error);
            }
        }

        throw new Error(
            `HomePage.goto: authentication surface did not render after retries. ${await this.getSurfaceDiagnostics()}`
        );

    }

    async verifyCardData(): Promise<boolean> {
        return this.messagesCard.isVisible().catch(() => false);
        return this.totalWhatsAppMessagesCard.isVisible().catch(() => false);
        return this.aiMessagesCard.isVisible().catch(() => false);
        return this.leadsCard.isVisible().catch(() => false);
    }

    async verifyChatbotTablePresent(): Promise<boolean> {
        return this.chatbotTable.isVisible().catch(() => false);
        if (this.chatbotTable.isVisible)
    }




    async waitForSpinnerToClear(
        timeout = 15000
    ): Promise<void> {
        await this.spinnerOverlay
            .waitFor({ state: 'hidden', timeout })
            .catch(() => { });
    }

    private async waitForHomeSurface(): Promise<boolean> {
        return this.messagesCard.isVisible().catch(() => false);
    }

    private async getSurfaceDiagnostics(): Promise<string> {
        return this.page.evaluate(() => {
            const bodyText =
                document.body?.innerText?.replace(/\s+/g, ' ').trim() ?? '';

            return JSON.stringify({
                url: window.location.href,
                readyState: document.readyState,
                bodyText: bodyText.slice(0, 300),
                bodyLength: document.body?.innerText?.length ?? 0
            });
        }).catch(error =>
            `diagnostics unavailable: ${error instanceof Error ? error.message : String(error)
            }`
        );
    }
}


