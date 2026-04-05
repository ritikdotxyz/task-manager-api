import { Queue } from 'bullmq'

const emailQueue = new Queue("email")

const sendEmail = async (userId: String) => {
    await emailQueue.add(
        "welcome",
        {
            userId,
            message: `Welcome ${userId}`
        }
    )
}

export { sendEmail }