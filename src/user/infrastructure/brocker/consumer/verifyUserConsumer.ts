import { setupRabbitMQ } from '../../../../config/rabbitConfig';
import amqp from "amqplib";
import {MySqlUserRepository} from "../../repository/mysqlUserRepository";

const QUEUE = 'verify_user_id';

export class VerifyUserConsumer {
    private channel: amqp.Channel | null = null;

    constructor(private readonly repository: MySqlUserRepository) {}

    async initialize() {
        try {
            this.channel = await setupRabbitMQ(QUEUE);
            this.channel.consume(QUEUE, this.handleMessage.bind(this), { noAck: false });
        } catch (error) {
            console.error('Error initializing VerifyUserConsumer:', error);
            throw error;
        }
    }

    private async handleMessage(msg: amqp.ConsumeMessage | null) {
        if (!msg) {
            return;
        }

        const userId = msg.content.toString();
        const exists = await this.repository.getById(userId);

        this.channel?.sendToQueue(msg.properties.replyTo!, Buffer.from(JSON.stringify({ exists })), {
            correlationId: msg.properties.correlationId!,
        });
        this.channel?.ack(msg);
    }

    async close() {
        await this.channel?.close();
    }
}

