import { Worker } from "bullmq";
import IORedis from 'ioredis'

const connection = new IORedis({ maxRetriesPerRequest: null })

const worker = new Worker(
    "email",
    async (job) => {
        console.log(`Starting ${job.id}`)
        console.log(job.data.message)
    },
    {connection}
)

worker.on("completed", job => {
    console.log(`${job.id} has completed.`)
})

worker.on("failed", (job, err) => {
    console.log(`${job.id} has failed with ${err.message}`);
})