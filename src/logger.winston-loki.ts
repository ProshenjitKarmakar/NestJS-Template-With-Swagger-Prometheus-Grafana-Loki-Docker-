import { json } from 'stream/consumers';
import { createLogger, format, transports } from 'winston';
const LokiTransport = require('winston-loki');

const logger = createLogger({
    level: 'info', // Default log level
    format: format.combine(
        format.timestamp(),
        format.json(),
    ),
    transports: [
        new LokiTransport({
            host: 'http://192.168.0.189:3100', // Loki endpoint
            labels: { app: 'nestjs-app' }, // Add custom labels
            json: true, // Ensure logs are sent as JSON
            batching: true, // Batch logs before sending
            interval: 5 * 1000, // Send logs in batches every 5 seconds
            dynamicMeta: (log) => {
                return {
                    level: log.level, // Add 'level' as a label dynamically
                    // Ensure refid or any other fields are in the correct format:
                    refid: log.refid ? String(log.refid) : 'default-refid', // Convert refid to string
                };
            },
            onConnectionError: (err) => console.error('Loki connection error:', err), // Log connection errors
        }),
        new transports.Console(), // Optional: Log to the console as well
    ],
});

export default logger;
