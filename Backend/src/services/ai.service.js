import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { AIMessage, HumanMessage, SystemMessage, tool, createAgent } from "langchain";
import * as z from "zod";
import { searchInternet } from "./internet.service.js";
import { sendEmail } from "./mail.service.js";
import { marked } from "marked";

const mistralModel = process.env.MISTRAL_API_KEY ? new ChatMistralAI({
    model: process.env.MISTRAL_MODEL || "open-mistral-7b",
    apiKey: process.env.MISTRAL_API_KEY
}) : null;

const geminiModel = process.env.GEMINI_API_KEY ? new ChatGoogleGenerativeAI({
    model: process.env.GEMINI_MODEL || "gemini-2.5-flash-lite",
    apiKey: process.env.GEMINI_API_KEY
}) : null;

const searchInternetTool = tool(
    searchInternet,
    {
        name: "searchInternet",
        description: "Use this tool to get the latest information from the internet.",
        schema: z.object({
            query: z.string().describe("The search query to look up on the internet.")
        })
    }
);

// Global operational state to temporarily capture email data during agent execution loops
let lastSentEmailData = null; 

const sendEmailTool = tool(
    async ({ to, subject, body }) => {
        try {
            // Convert the AI's Markdown text directly into structural HTML tags
            const parsedHtmlContent = await marked.parse(body);

            // Wrap the parsed HTML into a responsive, elegant email container template
            const beautifullyDraftedHtml = `
                <div style="font-family: 'Segoe UI', Arial, sans-serif; line-height: 1.7; color: #333333; max-width: 650px; margin: 0 auto; padding: 20px; border: 1px solid #e5e7eb; border-radius: 8px; background-color: #ffffff;">
                    <div style="padding: 10px 5px;">
                        ${parsedHtmlContent}
                    </div>
                    
                    <style>
                        h1, h2, h3 { color: #1e1b4b; margin-top: 24px; margin-bottom: 12px; font-weight: 600; }
                        h1 { font-size: 24px; border-bottom: 2px solid #e0e7ff; padding-bottom: 8px; }
                        h2 { font-size: 20px; }
                        p { margin-bottom: 16px; font-size: 15px; color: #4b5563; }
                        ul, ol { margin-bottom: 16px; padding-left: 20px; }
                        li { margin-bottom: 6px; font-size: 15px; color: #4b5563; }
                        blockquote { border-left: 4px solid #4f46e5; background: #f9fafb; padding: 12px 16px; margin: 16px 0; font-style: italic; color: #4b5563; }
                        
                        /* Table Formatting rules for email clients */
                        table { width: 100%; border-collapse: collapse; margin: 20px 0; font-size: 14px; text-align: left; }
                        th { background-color: #f3f4f6; color: #1f2937; font-weight: 600; padding: 10px 12px; border: 1px solid #e5e7eb; }
                        td { padding: 10px 12px; border: 1px solid #e5e7eb; color: #4b5563; }
                        tr:nth-child(even) { background-color: #f9fafb; }
                    </style>

                    <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 30px 0 20px 0;" />
                    <p style="font-size: 12px; color: #9ca3af; text-align: center; margin: 0;">
                        This research brief was compiled and processed automatically via the Perplexity AI Service integration.
                    </p>
                </div>
            `;

            // Deliver using your standard backend mail delivery client configuration
            await sendEmail({
                to,
                subject,
                text: body, // Text fallback configuration
                html: beautifullyDraftedHtml // Render full rich text template setup
            });

            // Capture tracking meta payload for target controller storage logic
            lastSentEmailData = { to, subject, content: body, status: 'sent' };

            return JSON.stringify({ success: true, message: `Beautiful HTML email successfully delivered to ${to}` });
        } catch (error) {
            console.error("Tool Mail Layout Compilation Error:", error);
            
            // Capture execution tracking meta payload on failures 
            lastSentEmailData = { to, subject, content: body, status: 'failed' };

            return JSON.stringify({ success: false, error: error.message });
        }
    },
    {
        name: "sendEmail",
        description: "Use this tool to send a beautifully styled rich text email summary report to a target recipient.",
        schema: z.object({
            to: z.string().email().describe("The recipient's valid destination email address."),
            subject: z.string().describe("A concise and formal subject line descriptive of the context contents."),
            body: z.string().describe("The core markdown analysis body text context content compiled by you. Use headers, bullet lists, bolding, and markdown tables to keep data reports incredibly clean and professional.")
        })
    }
);

const mistralAgent = mistralModel ? createAgent({
    model: mistralModel,
    tools: [ searchInternetTool, sendEmailTool ]
}) : null;

const geminiAgent = geminiModel ? createAgent({
    model: geminiModel,
    tools: [ searchInternetTool, sendEmailTool ]
}) : null;

export async function generateResponse(messages) {
    // Reset state variable indicator before starting a tool iteration cycle
    lastSentEmailData = null; 

    const formattedMessages = [
        new SystemMessage(`
            You are a helpful, smart and precise assistant for answering questions, researching data, and performing automated actions like sending emails.
            If you don't know the answer, say you don't know. 
            
            - If the question requires up-to-date information, use the "searchInternet" tool.
            - If the user asks you to send an email, compose a well-structured message body and trigger the "sendEmail" tool.
            - You can combine tools: if a user asks you to look something up and email it to them, first use "searchInternet", then use "sendEmail" with the compiled data.
        `),
        ...messages.map(msg => {
            if (msg.role === "user") {
                return new HumanMessage(msg.content);
            } else if (msg.role === "ai" || msg.role === "email") {
                return new AIMessage(msg.content);
            }
            return new HumanMessage(msg.content);
        }).filter(Boolean)
    ];

    let response;
    if (mistralAgent) {
        try {
            response = await mistralAgent.invoke({ messages: formattedMessages });
        } catch (primaryErr) {
            console.warn("Mistral agent invocation failed:", primaryErr.message);
            if (geminiAgent) {
                console.log("Attempting fallback with Gemini...");
                response = await geminiAgent.invoke({ messages: formattedMessages });
            } else {
                throw primaryErr;
            }
        }
    } else if (geminiAgent) {
        response = await geminiAgent.invoke({ messages: formattedMessages });
    } else {
        throw new Error("No AI model provider configured (MISTRAL_API_KEY or GEMINI_API_KEY).");
    }

    // Return structured text interface alongside dynamic email tracking states
    return {
        text: response.messages[ response.messages.length - 1 ].text,
        emailAction: lastSentEmailData 
    };
}

export const generateChatTitle = async (message) => {
    const promptMessages = [
        new SystemMessage(`You are a helpful assistant that generate concise and descriptive titles for chat conversations.
        User will provide you with the first message of a chat conversation, and you will generate a title that captures the essence of the conversation in 2-4 words. The title should be clear, relevant, and engaging. Return ONLY the title with no extra quotes or punctuation.`),
        new HumanMessage(`Generate a title for a chat conversation based on the following first message: "${message}"`)
    ];

    if (mistralModel) {
        try {
            const response = await mistralModel.invoke(promptMessages);
            return response.text?.trim() || "New Chat";
        } catch (err) {
            console.warn("Mistral title generation failed:", err.message);
            if (geminiModel) {
                try {
                    const response = await geminiModel.invoke(promptMessages);
                    return response.text?.trim() || "New Chat";
                } catch (geminiErr) {
                    console.error("Gemini title fallback also failed:", geminiErr.message);
                }
            }
            return "New Chat";
        }
    } else if (geminiModel) {
        try {
            const response = await geminiModel.invoke(promptMessages);
            return response.text?.trim() || "New Chat";
        } catch (err) {
            console.error("Gemini title generation failed:", err.message);
            return "New Chat";
        }
    }

    return "New Chat";
}