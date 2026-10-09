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


    }

    async goto(): Promise<void> {
        const targetRoute = [
            '/home',
            '/account',
            '/dashboard',
            '/home-v2'
        ];




    }

    




}