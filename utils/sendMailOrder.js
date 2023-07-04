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
    html: `<p>${fullname}  Se genero la siguiente orden:</p>
    <p>Producto: ${productname}</p>
    <p>Cantidad: ${quantity}</p>
    <p>Total: S/ ${price}</p>
    <p>Fecha compra: ${purchasedate}</p>
        `,
  });

  console.log("Email send: %s", info.messageId);
};
