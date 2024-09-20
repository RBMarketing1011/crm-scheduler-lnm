import sendSchedulerInstallInstruct from '@lib/utils/nodemailer/sendSchedulerInstallInstruct'

const sendInstructions = async (req) =>
{
  const {
    email, locationname, user,
    accountId, locationId, isGlobal
  } = await req.json()

  try
  {
    await sendSchedulerInstallInstruct(email, locationname, user, accountId, locationId, isGlobal)

    return Response.json({ success: 'Instructions sent successfully!' }, { status: 200 })
  } catch (error)
  {
    return Response.json({ error: error.message }, { status: 500 })
  }
}

export { sendInstructions as POST }