import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: parseInt(process.env.EMAIL_PORT || '587'),
  secure: false, // true for 465, false for other ports
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export async function sendMail({ to, subject, html }: { to: string; subject: string; html: string }) {
  try {
    const info = await transporter.sendMail({
      from: `"CSEC Gwalior" <${process.env.EMAIL_USER}>`,
      to,
      subject,
      html,
    });
    return info;
  } catch (error) {
    console.error('Error sending email:', error);
    // throw error; // Don't crash for email errors
  }
}

export const emailTemplates = {
  welcome: (name: string, affiliateLink: string, loginUrl: string) => ({
    subject: 'Welcome to CSEC Partner Program!',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Welcome, ${name}!</h2>
        <p>You have successfully registered as a CSEC Affiliate Partner.</p>
        <p><strong>Your Affiliate Link:</strong> <a href="${affiliateLink}">${affiliateLink}</a></p>
        <p>You can now start submitting student leads and earn commissions.</p>
        <p>Login to your dashboard here: <a href="${loginUrl}">${loginUrl}</a></p>
        <br />
        <p>Best regards,<br />Team CSEC Gwalior</p>
      </div>
    `,
  }),
  studentSubmitted: (studentName: string) => ({
    subject: 'Student Submitted Successfully',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Success!</h2>
        <p>Student <strong>${studentName}</strong> has been submitted successfully.</p>
        <p>Our team will review the details soon.</p>
        <br />
        <p>Best regards,<br />Team CSEC Gwalior</p>
      </div>
    `,
  }),
  statusChanged: (studentName: string, status: string) => ({
    subject: `Student Status Updated: ${status}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Status Update</h2>
        <p>The status of student <strong>${studentName}</strong> has been updated to: <strong>${status}</strong>.</p>
        <br />
        <p>Best regards,<br />Team CSEC Gwalior</p>
      </div>
    `,
  }),
  earningAdded: (amount: number, type: string) => ({
    subject: `New Earning Added: ₹${amount}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>Good News!</h2>
        <p>A new <strong>${type}</strong> of <strong>₹${amount}</strong> has been added to your account.</p>
        <br />
        <p>Best regards,<br />Team CSEC Gwalior</p>
      </div>
    `,
  }),
  adminNewPartner: (name: string, email: string, mobile: string) => ({
    subject: 'New Partner Registered',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Partner Registration</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Mobile:</strong> ${mobile}</p>
      </div>
    `,
  }),
  adminNewStudent: (studentName: string, partnerName: string) => ({
    subject: 'New Student Submitted by Partner',
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>New Student Lead</h2>
        <p><strong>Student Name:</strong> ${studentName}</p>
        <p><strong>Submitted by Partner:</strong> ${partnerName}</p>
      </div>
    `,
  }),
};
