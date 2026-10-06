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
    readonly ellisisChatbotTable: Locator;
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
        
    }

    async goto(): Promise<void> {
        const targetRoute = [
            '/home',
            '/account',
            '/dashboard'
        ] ;

        

        
    }




}