import bodyParser from 'body-parser';
import cors from 'cors';
import express, { Express, Request, Response } from 'express';
import webpush from 'web-push';

const app: Express = express();

app.use(bodyParser.json());
app.use(cors());

const publicVapidKey = 'BPwAheySEk5TJKlLze_zG8fsKqO6rpDfHUueaRQLXnCI2JZGcxBv9BjMlhmia_e2hbuSiIH-FVzRDZqr7Cgk40E';
const privateVapidKey = 'kvkfaOrFsF8sC_nIbO47koEusO2K58GR7LQoCcl3HGk'; // do not commit this to your repo!!

const localSubscription = {
  endpoint:
    'https://fcm.googleapis.com/fcm/send/c4DkcXw3yuA:APA91bFc_AeFMiyJ0AciBoCk5TQvkirOd-8qgeZgtq7TMjtRRYLNPtw7tzRJi8nZHTUqc1OYLeCBjbsA_W6OqkThi5cZaxVhO36T-nXdJm2Jlm4-DKdIl3YAsTWVQGmKPL1PAmdkKTA3',
  expirationTime: null,
  keys: {
    p256dh: 'BFA17G-DsWBsByLinIpfQKi6dxcO7nJnl4toHSq17JhiYxxoPRqgQGrAeZUOspTFlXEtRdo5Bl3AbsV9_9d472g',
    auth: 'ZHUNwI9ApTDko28tN9jS8w',
  },
};

webpush.setVapidDetails('mailto:ng.philip.91@gmail.com', publicVapidKey, privateVapidKey);

// TODO persist subscriptions in a database
let safedSubscription: any;

app.post('/subscribe', (req: Request, res: Response) => {
  console.log('someone subscribed!', req.body);
  const subscription = req.body;
  safedSubscription = subscription;

  res.status(201).json({});

  const payload = JSON.stringify({
    title: 'You just subscribed!',
  });

  // wait 10 seconds before sending the notification
  setTimeout(() => {
    webpush.sendNotification(subscription, payload).catch((error: any) => console.error(error));
  }, 10000);
});

app.post('/send-notification', (req: Request, res: Response) => {
  const notification = req.body;

  res.status(200).json({});

  const payload = {
    notification: {
      title: notification.text,
    },
  };
  console.log('new push notification: payload', payload);

  if (!safedSubscription) {
    console.error('No subscription found');
  }

  // wait 10 seconds before sending the notification
  setTimeout(() => {
    webpush.sendNotification(safedSubscription, JSON.stringify(payload)).catch((error: any) => console.error(error));
    console.log('SEND');
  }, 10000);
});

app.get('/', (req: Request, res: Response) => {
  res.send('Server works! :)');
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
