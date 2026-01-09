import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = process.env.OPENAI_API_KEY ? new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
}) : null;

export async function POST(request: NextRequest) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { error: 'Prompt is required' },
        { status: 400 }
      );
    }

    if (!openai) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 503 }
      );
    }

    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: [
        {
          role: 'system',
          content: `You are an expert prompt engineer. Your task is to enhance prompts to make them:
- More specific and clear
- Better structured
- More likely to produce high-quality results
- Include relevant context and constraints
- Use best practices for AI interactions

Return ONLY the enhanced prompt, no explanations or meta-commentary.`
        },
        {
          role: 'user',
          content: `Enhance this prompt:\n\n${prompt}`
        }
      ],
      temperature: 0.7,
      max_tokens: 1000
    });

    const enhanced = completion.choices[0]?.message?.content || prompt;

    return NextResponse.json({ enhanced });
  } catch (error: any) {
    console.error('Error enhancing prompt:', error);
    return NextResponse.json(
      { error: 'Failed to enhance prompt', details: error.message },
      { status: 500 }
    );
  }
}
