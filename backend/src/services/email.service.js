import nodemailer from "nodemailer";


// const testAccount = await nodemailer.createTestAccount();

// const transporter = nodemailer.createTransport({
//   host: testAccount.smtp.host,
//   port: testAccount.smtp.port,
//   secure: testAccount.smtp.secure,
//   auth: {
//     user: testAccount.user,
//     pass: testAccount.pass,
//   },
// });

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

const htmlTemplate = ({ fullName, country, visaType, score, summary }) => `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Visa Evaluation Result</title>
  <style>
    body {
      font-family: Arial, Helvetica, sans-serif;
      background-color: #f4f6f8;
      margin: 0;
      padding: 0;
    }
    .container {
      max-width: 600px;
      margin: 30px auto;
      background: #ffffff;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 4px 12px rgba(0,0,0,0.08);
    }
    .header {
      background: #1f2937;
      color: #ffffff;
      padding: 20px;
      text-align: center;
    }
    .header h1 {
      margin: 0;
      font-size: 22px;
    }
    .content {
      padding: 24px;
      color: #333333;
    }
    .info {
      margin-bottom: 20px;
      line-height: 1.6;
    }
    .score-box {
      background: #f0f9ff;
      border-left: 5px solid #0284c7;
      padding: 16px;
      margin-bottom: 20px;
      border-radius: 4px;
    }
    .score {
      font-size: 32px;
      font-weight: bold;
      color: #0284c7;
    }
    .summary-box {
      background: #fafafa;
      padding: 16px;
      border-radius: 4px;
      border: 1px solid #e5e7eb;
    }
    .footer {
      text-align: center;
      font-size: 12px;
      color: #6b7280;
      padding: 16px;
      background: #f9fafb;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Visa Evaluation Result</h1>
    </div>

    <div class="content">
      <div class="info">
        <strong>Applicant:</strong> ${fullName}<br />
        <strong>Country:</strong> ${country}<br />
        <strong>Visa Type:</strong> ${visaType}
      </div>

      <div class="score-box">
        <div>Approval Likelihood Score</div>
        <div class="score">${score} / 100</div>
      </div>

      <div class="summary-box">
        <strong>Evaluation Summary</strong>
        <p>${summary}</p>
      </div>
    </div>

    <div class="footer">
      This evaluation is AI-generated and provided for guidance only.<br/>
      It does not guarantee visa approval.
    </div>
  </div>
</body>
</html>
`;

const notifyUser = async (receipent) => {
  const info = await transporter.sendMail({
    from: `Visa Evaluation ${process.env.EMAIL}`,
    to: receipent.email,
    subject: "Congratulations! Your US Visa Evaluation Results",
    html: htmlTemplate({
      fullName: receipent.fullName,
      country: receipent.country,
      visaType: receipent.visaType,
      score: receipent.score,
      summary: receipent.summary,
    }),
  });
  console.log(info.response);
  console.log(info.messageId)
  console.log(nodemailer.getTestMessageUrl(info))
  return info.response;
};

export default notifyUser;
