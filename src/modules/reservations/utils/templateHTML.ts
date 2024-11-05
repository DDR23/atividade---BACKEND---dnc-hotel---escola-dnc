export const createOwnerEmail = (username: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
    <h1 style="color: #041d40;">Pending Reservation Approval</h1>
    <h3 style="color: #041d40;">Dear ${username},</h3>
    <p style="font-size: 16px; color: #333;">You have a new reservation pending approval. Please review the reservation details and approve or decline the reservation at your earliest convenience.</p>
    <p style="font-size: 16px; color: #333;">To view the reservation, please access your hotel owner profile
    <p style="margin-top: 20px;">Thank you for your prompt attention to this matter.<br>Best regards,<br><span style="font-weight: bold; color: #041d40;">DNC Hotel Management System</span></p>
  </div>
`
export const createUserEmail = (username: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
    <h1 style="color: #041d40;">Reservation Pending Approval</h1>
    <h3 style="color: #041d40;">Dear ${username},</h3>
    <p style="font-size: 16px; color: #333;">
        Thank you for your reservation request. Your booking is currently pending approval by the hotel owner. 
        You will receive a notification as soon as your reservation status is updated.
    </p>
    <p style="font-size: 16px; color: #333;">For any questions, feel free to reach out to us through your profile.</p>
    <p style="margin-top: 20px;">Best regards,<br><span style="font-weight: bold; color: #041d40;">DNC Hotel Management System</span></p>
  </div>
`

export const updateUserEmail = (username: string, reservationStatus: string) => `
  <div style="font-family: Arial, sans-serif; padding: 20px; color: #333; text-align: center; border: 2px solid #041d40; border-radius: 10px; margin: auto; width: 60%;">
    <h1 style="color: #041d40;">Reservation Status Update</h1>
    <h3 style="color: #041d40;">Dear ${username},</h3>
    <p style="font-size: 16px; color: #333;">We are pleased to inform you that your reservation status has been updated. Your current reservation status is:</p>
    <h2 style="color: #041d40;">${reservationStatus}</h2>
    <p style="margin-top: 10px;">For any further assistance, please do not hesitate to contact us.<br>Best regards,<br><span style="font-weight: bold; color: #041d40;">DNC Hotel</span></p>
  </div>
`
