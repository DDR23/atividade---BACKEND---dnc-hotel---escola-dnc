export const templateHTML = (username: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
    <h1 style="color: #041d40;">Pending Reservation Approval</h1>
    <h3 style="color: #041d40;">Dear ${username},</h3>
    <p style="font-size: 16px; color: #333;">You have a new reservation pending approval. Please review the reservation details and approve or decline the reservation at your earliest convenience.</p>
    <p style="font-size: 16px; color: #333;">To view the reservation, please access your hotel owner profile
    <p style="margin-top: 20px;">Thank you for your prompt attention to this matter.<br>Best regards,<br><span style="font-weight: bold; color: #041d40;">DNC Hotel Management System</span></p>
  </div>
`
