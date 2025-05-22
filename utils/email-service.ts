export interface EmailOptions {
  to: string
  subject: string
  body: string
  from?: string
}

export async function sendEmail({ to, subject, body, from = "noreply@flarehub.com" }: EmailOptions): Promise<boolean> {
  // In a real app, this would make an API call to your email service
  console.log(`Sending email to ${to} from ${from}`)
  console.log(`Subject: ${subject}`)
  console.log(`Body: ${body}`)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Dispatch custom event for UI notification
  const event = new CustomEvent("emailSent", {
    detail: { to, subject, from },
  })
  window.dispatchEvent(event)

  // Simulate success (would be the response from your email service in a real app)
  return true
}

export const emailTemplates = {
  applicationSubmitted: (name: string) => ({
    subject: "Application Received",
    body: `Dear ${name},\n\nThank you for submitting your application to Flare Hub. We will review it shortly.`,
  }),
  applicationApproved: (name: string, startupName: string) => ({
    subject: "Application Approved!",
    body: `Dear ${name},\n\nCongratulations! Your application for ${startupName} has been approved!`,
  }),
  applicationRejected: (name: string, startupName: string, comments?: string) => ({
    subject: "Application Update",
    body: `Dear ${name},\n\nWe regret to inform you that your application for ${startupName} was not approved.${comments ? `\n\nComments: ${comments}` : ""}`,
  }),
}
