// Small test script (not in Payload config)
import { Resend } from 'resend'

// Use the same key you put in the Payload config
const resend = new Resend('re_PUgFTsWf_4E2PcB7vSBuSgvoGud4zRnEt')

export async function testEmail() {
  try {
    const { error } = await resend.emails.send({
      from: 'noreply@brick.com.hr',
      to: ['roguljbruno@gmail.com'],
      subject: 'Local Resend Test',
      html: '<p>It works!</p>',
    })
    if (error) {
      console.error('RESEND API ERROR:', error)
    } else {
      console.log('Success! Resend works outside Payload.')
    }
  } catch (e) {
    // Check this log for the 400 error
    console.error('FETCH ERROR:', e)
  }
}
