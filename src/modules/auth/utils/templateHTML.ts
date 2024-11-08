export const forgotUserEmail = (username: string, token: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
  <h2>Olá ${username},</h2>
  <p>Você solicitou a redefinição de sua senha. Use o token abaixo para completar o processo:</p>
  <div style="background-color: #f0f0f0; padding: 10px; margin: 20px 0; text-align: center;">
    <strong>${token}</strong>
  </div>
  <p>Se você não solicitou esta alteração, por favor ignore este email.</p>
  <p>Atenciosamente,<br>Equipe DNC Hotel</p>
</div>
`
