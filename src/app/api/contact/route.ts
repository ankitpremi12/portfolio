import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  try {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const user = process.env.GMAIL_USER || 'ankitpremiji@gmail.com';
    const pass = process.env.GMAIL_APP_PASSWORD;

    if (!pass) {
      return NextResponse.json(
        { error: 'Email delivery not configured (missing GMAIL_APP_PASSWORD)' },
        { status: 500 }
      );
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user,
        pass,
      },
    });

    await transporter.sendMail({
      from: `"${name}" <${email}>`,
      to: user,
      subject: `[Portfolio] New Message from ${name}`,
      text: `You have received a new message from ${name} (${email}):\n\n${message}`,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Email error:', error);
    return NextResponse.json({ error: 'Failed to send message' }, { status: 500 });
  }
}
