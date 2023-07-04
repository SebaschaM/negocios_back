import { createTransport } from "nodemailer";

export const sendEmailOrder = async ({
  email,
  fullname,
  productname,
  quantity,
  price,
  purchasedate,
}) => {
    console.log(email, fullname, productname, quantity, price, purchasedate)
  const transporter = createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    auth: {
      user: "sebastianaronyactayo@gmail.com",
      pass: "sfdtlxdtupdhapfr",
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  const info = await transporter.sendMail({
    from: "Trefisa",
    to: email,
    subject: "Orden generada",
    text: `Se genero la siguiente orden:`,
    html: `  <div style="font-family: Arial, sans-serif; background-color: #f7f7f7; padding: 20px;">
    <h2 style="color: #333;">¡Orden generada!</h2>
    <p>${fullname}, se ha generado la siguiente orden:</p>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">Producto:</td>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">${productname}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">Cantidad:</td>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">${quantity}</td>
      </tr>
      <tr>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">Total:</td>
        <td style="padding: 10px; border-bottom: 1px solid #ccc;">S/ ${price}</td>
      </tr>
      <tr>
        <td style="padding: 10px;">Fecha compra:</td>
        <td style="padding: 10px;">${purchasedate}</td>
      </tr>
    </table>
    <p style="margin-top: 20px;">¡Gracias por tu compra!</p>
    <img src="https://res.cloudinary.com/sebas-2001-yac/image/upload/v1688501234/logo_yzltss.png" alt="Logo de la empresa" style="max-width: 200px;">
  </div>
        `,
  });

  console.log("Email send: %s", info.messageId);
};
