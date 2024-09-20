import { transporter } from './transporter'

const sendSchedulerInstallInstruct = async (email, locationname, user, accountId, locationId, isGlobal) =>
{
  const globalScript = `<p><span>&lt;script</span> <br/> <span style='margin-left:10px;'>src='<a href='#' style='color: #333; text-decoration: none;'>https://your-url.com/scheduler.js</a>'</span> <br/> <span style='margin-left:10px;'>account='${ accountId }'</span> <br/> &gt;&lt;/script&gt;`

  const locationScript = `<p><span>&lt;script</span> <br/> <span style='margin-left:10px;'>src='<a href='#' style='color: #333; text-decoration: none;'>https://your-url.com/scheduler.js</a>'</span> <br/> <span style='margin-left:10px;'>account='${ accountId }'</span> <br/> <span style='margin-left:10px;'>location='${ locationId }'</span> <br/> &gt;&lt;/script&gt;`
  async function main ()
  {
    // send mail with defined transport object
    const info = await transporter.sendMail({
      from: process.env.EMAIL_FROM, // sender address
      to: email, // list of receivers
      subject: "Scheduler Installation Instructions", // Subject line
      text: "Scheduler Installation Instructions Enclosed!", // plain text body
      html: `
      <div style='width: 50%;'>

        <p>Hi Team,</p>

        <p>
          I hope this email finds you well. Below are the instructions to integrate the scheduler for ${ locationname } on ${ user }'s website. The address,
          hours, and services setup have been taken care of, so all that's left is the script installation.
        </p>

        <h3 style="color: #333;">Step 1: Install the Scheduler Script</h3>

        <ol style="margin-left: 20px;">

          <li style="margin-top: 10px;">
            <strong>Copy the Script Tag</strong>
            <p style="margin: 0 0 10px 0;">
              Here is the script to install on your website:
            </p>
            <div style="background-color: #f4f4f4; padding: 10px; border: 1px solid #ddd;">
              ${ isGlobal ? globalScript : locationScript }
            </div>
          </li>

          <li style="margin-top: 10px;">
            <strong>Add Scheduler Button</strong>
            <p style="margin: 0 0 10px 0;">
              To trigger the scheduler pop-up, simply add the following class to any button or link on your website:
            </p>
            <div style="width: 100%; background-color: #f4f4f4; border: 1px solid #ddd; padding: 10px;">
              .schedule-appt-btn
            </div>
          </li>
        </ol>

        <h3 style="color: #333;">Step 2: Test the Scheduler</h3>

        <p>
          After adding the script and button, test your website to ensure the scheduler pop-up works when you click any elements with the
          <strong>.schedule-appt-btn</strong> class.
        </p>

        <p>Let us know if you encounter any issues or need further adjustments.</p>

        <p>
          Best regards,<br>
          Leads Near Me®<br>
          support@leadsnearme.com
        </p>
      </div >
      `, // html body
    })

    console.log("Message sent: %s", info.messageId)
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
  }

  await main().catch(console.error)
}

export default sendSchedulerInstallInstruct